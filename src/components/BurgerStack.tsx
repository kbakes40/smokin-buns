"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  assembledContentHeightPx,
  burgerLayers,
  type BurgerLayerDef,
  type BurgerLayerId,
  type GarnishTheme,
} from "@/data/burgerLayers";
import { garnishSlots, type GarnishSlot } from "@/data/garnishAssets";
import { cn } from "@/lib/cn";

/** Hero wheel transition only — slight spread vs tight stack (click explode unchanged) */
export type BurgerScrollLayerMotion =
  | "idle"
  | "exit"
  | "enterLoose"
  | "enterTight";

export type SlideTransitionPhase = "idle" | "melting-exit" | "assembling-enter";

export type BurgerStackProps = {
  exploded: boolean;
  onToggle?: () => void;
  garnishType: GarnishTheme;
  compact?: boolean;
  reduceMotion?: boolean;
  showGarnish?: boolean;
  className?: string;
  scrollLayerMotion?: BurgerScrollLayerMotion;
  slideTransition?: SlideTransitionPhase;
  onExitComplete?: () => void;
  onEnterComplete?: () => void;
};

const BURGER_EASE = "cubic-bezier(0.22, 0.94, 0.32, 1)";
const BURGER_DURATION_MS = 680;
/** Match hero slide transition when spreading/recompacting layers */
const HERO_SCROLL_LAYER_MS = 800;
/** Stacked overlap multiplier when layers loosen for scroll exit / enter-from-below */
const SCROLL_LAYER_LOOSE_FACTOR = 0.38;

/** Exploded row height (px): image + room for labels (side annotations / mobile stack). */
function explodedRowHeight(layer: BurgerLayerDef, compact: boolean): number {
  const base = assembledContentHeightPx[layer.id as BurgerLayerId];
  const wScale = layer.layerImgScale ?? 1;
  let h = Math.round(base * wScale);
  if (compact) h = Math.round(h * 0.9);
  const imgH = Math.max(24, h);
  return Math.max(52, imgH) + (compact ? 8 : 28);
}

/** Stacked: narrow art. Exploded: room for labels */
const ROOT_MAX_W_STACKED = "min(100vw - 1.25rem, 500px)" as const;
const ROOT_MAX_W_EXPLODED =
  "min(100vw - 1.25rem, min(94vw, 56rem))" as const;
const LAUNCH_MAX_W_COMPACT =
  "min(100vw - 1.25rem, min(96vw, 42rem))" as const;

/** Visual cap ~400px tall after scale; tune if PNGs change */
const STACK_SCALE = "scale-[0.5] sm:scale-[0.54] md:scale-[0.58]";
const STACK_SCALE_COMPACT =
  "scale-[0.42] sm:scale-[0.46] md:scale-[0.48]";

function scaleLayer(layer: BurgerLayerDef, compact: boolean): BurgerLayerDef {
  if (!compact) return layer;
  const s = 0.9;
  return {
    ...layer,
    assembledTopPx: Math.round(layer.assembledTopPx * s),
    explodedY:
      layer.explodedY === 0 ? 0 : Math.round(layer.explodedY * s),
    stackedXNudgePx: Math.round(layer.stackedXNudgePx * s),
  };
}

/** Bottom edge (px) of layer artwork for assembled container height. */
function assembledLayerBottom(
  layer: BurgerLayerDef,
  topPx: number,
  compact: boolean,
): number {
  const base = assembledContentHeightPx[layer.id as BurgerLayerId];
  const wScale = layer.layerImgScale ?? 1;
  let h = Math.round(base * wScale);
  if (compact) h = Math.round(h * 0.9);
  return topPx + Math.max(24, h);
}

function LayerPhoto({
  layer,
  compact,
  stackedLayout,
}: {
  layer: BurgerLayerDef;
  compact?: boolean;
  stackedLayout: boolean;
}) {
  const L = scaleLayer(layer, !!compact);
  const imgScale = layer.layerImgScale ?? 1;
  const scaledNarrow = imgScale < 1;
  const nudge =
    L.stackedXNudgePx !== 0 || L.stackedRotateDeg !== 0
      ? `translateX(${L.stackedXNudgePx}px) rotate(${L.stackedRotateDeg}deg)`
      : undefined;

  return (
    <div
      className="relative flex min-w-0 justify-center shadow-none"
      style={{
        transform: nudge,
        zIndex: L.zIndex,
        width: stackedLayout ? "100%" : undefined,
        maxWidth: stackedLayout ? 500 : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={layer.png}
        alt={layer.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={cn(
          "mx-auto block h-auto object-contain object-center shadow-none [image-rendering:auto]",
          stackedLayout || compact
            ? scaledNarrow
              ? "max-w-[500px]"
              : "w-full max-w-[500px]"
            : scaledNarrow
              ? "max-w-[min(500px,92vw)]"
              : "w-full max-w-[min(500px,92vw)]",
        )}
        style={{
          boxShadow: "none",
          filter: "none",
          ...(scaledNarrow ? { width: `${imgScale * 100}%` } : {}),
        }}
      />
    </div>
  );
}

function ExplodedAnnotations({
  layer,
  side,
}: {
  layer: BurgerLayerDef;
  side: "left" | "right";
}) {
  const isLeft = side === "left";
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center gap-2 sm:gap-3",
        isLeft ? "min-h-[56px] justify-end sm:min-h-[60px]" : "min-h-[56px] justify-start sm:min-h-[60px]",
      )}
    >
      {isLeft && (
        <>
          <div className="flex max-w-[10rem] flex-col sm:max-w-[12rem] sm:items-end sm:text-right">
            <span className="text-base font-semibold uppercase tracking-tight text-white sm:text-lg md:text-xl">
              {layer.label}
            </span>
            <span className="mt-0.5 text-xs font-medium leading-tight text-white/85 sm:text-sm md:text-base">
              {layer.calories}
            </span>
          </div>
          <div className="flex shrink-0 items-center" aria-hidden>
            <div className="h-px w-10 bg-white/70 sm:w-14" />
            <div className="ml-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
          </div>
        </>
      )}
      {!isLeft && (
        <>
          <div className="flex shrink-0 items-center" aria-hidden>
            <div className="mr-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
            <div className="h-px w-10 bg-white/70 sm:w-14" />
          </div>
          <div className="flex max-w-[10rem] flex-col sm:max-w-[12rem] sm:items-start sm:text-left">
            <span className="text-base font-semibold uppercase tracking-tight text-white sm:text-lg md:text-xl">
              {layer.label}
            </span>
            <span className="mt-0.5 text-xs font-medium leading-tight text-white/85 sm:text-sm md:text-base">
              {layer.calories}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function garnishCssNode(theme: GarnishTheme, slot: GarnishSlot): ReactNode {
  const chip = (
    <div className="h-full w-full rounded-sm bg-gradient-to-br from-amber-500 via-amber-600 to-amber-900 shadow-lg ring-1 ring-black/15" />
  );
  if (theme === "chips") return chip;
  if (theme === "tomato")
    return (
      <div className="h-full w-full rounded-full bg-gradient-to-br from-red-500 to-red-900 shadow-md ring-1 ring-red-950/25" />
    );
  if (theme === "cucumber")
    return (
      <div className="h-full w-full rounded-full bg-gradient-to-b from-emerald-300 via-emerald-500 to-emerald-900 shadow-md ring-1 ring-emerald-950/20" />
    );
  if (theme === "onion")
    return (
      <div className="h-full w-full rounded-full border-[3px] border-violet-100/90 bg-white/5 shadow" />
    );
  return (
    <div className="h-full w-full rounded-[40%] bg-gradient-to-br from-lime-400 via-emerald-600 to-emerald-900 opacity-95 shadow-lg ring-1 ring-black/10" />
  );
}

function GarnishImagePiece({
  theme,
  slot,
  index,
  reduceMotion,
}: {
  theme: GarnishTheme;
  slot: GarnishSlot;
  index: number;
  reduceMotion?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const src = `/garnish/${slot.file}`;
  const float = !reduceMotion ? "animate-float-garnish" : "";
  const blurClass = slot.blur
    ? "blur-[0.85px] opacity-[0.88]"
    : "blur-[0.45px] opacity-[0.9]";

  return (
    <div
      className={cn(
        "absolute flex items-center justify-center",
        slot.className,
        float,
        blurClass,
        !reduceMotion && "will-change-transform",
      )}
      style={
        reduceMotion ? undefined : { animationDelay: `${index * 0.16}s` }
      }
      aria-hidden
    >
      {!failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          width={400}
          height={400}
          className="h-full w-full object-contain drop-shadow-md"
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        garnishCssNode(theme, slot)
      )}
    </div>
  );
}

const GARNISH_FADE_MS = 800;
const GARNISH_FADE_EASE = "cubic-bezier(0.22, 0.94, 0.32, 1)";

export function HeroGarnish({
  theme,
  reduceMotion,
}: {
  theme: GarnishTheme;
  reduceMotion?: boolean;
}) {
  const slots = useMemo(() => garnishSlots[theme], [theme]);
  const firstTheme = useRef(true);
  const [garnishOpacity, setGarnishOpacity] = useState(1);

  useEffect(() => {
    if (reduceMotion) return;
    if (firstTheme.current) {
      firstTheme.current = false;
      return;
    }
    setGarnishOpacity(0);
    const id = window.setTimeout(() => setGarnishOpacity(1), 24);
    return () => clearTimeout(id);
  }, [theme, reduceMotion]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
      style={
        reduceMotion
          ? undefined
          : {
              opacity: garnishOpacity,
              transition: `opacity ${GARNISH_FADE_MS}ms ${GARNISH_FADE_EASE}`,
            }
      }
    >
      {slots.map((slot, i) => (
        <GarnishImagePiece
          key={`${theme}-${slot.file}-${i}`}
          theme={theme}
          slot={slot}
          index={i}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

/* ── Per-layer melting waterfall constants ── */
const MELT_STAGGER_S = 0.09;
const MELT_EASE: [number, number, number, number] = [0.4, 0, 0.6, 1];
const MELT_DURATION_S = 1.4;
const MELT_EXIT_SCALE = 0.96;

const ASSEMBLE_STAGGER_S = 0.1;
const ASSEMBLE_ENTRY_Y = -800;
const ASSEMBLE_ENTRY_SCALE = 0.94;
const ASSEMBLE_SPRING = { stiffness: 55, damping: 16 };

const LAYER_COUNT = burgerLayers.length;

function MeltLayer({
  children,
  isMelting,
  isAssembling,
  exitDelay,
  enterDelay,
  topPx,
  zIndex,
  isExploded,
  layerMotion,
}: {
  children: ReactNode;
  isMelting: boolean;
  isAssembling: boolean;
  exitDelay: number;
  enterDelay: number;
  topPx: number;
  zIndex: number;
  isExploded: boolean;
  layerMotion: string;
}) {
  const isAnimating = isMelting || isAssembling;

  const meltTarget = useMemo(() => {
    if (typeof window === "undefined") return 1200;
    return Math.round(window.innerHeight * 1.2);
  }, []);

  const animateValues = isMelting
    ? { y: meltTarget, scale: MELT_EXIT_SCALE, opacity: 0 }
    : isAssembling
      ? { y: 0, scale: 1, opacity: 1 }
      : { y: 0, scale: 1, opacity: 1 };

  const transition = isMelting
    ? {
        y: { duration: MELT_DURATION_S, ease: MELT_EASE, delay: exitDelay },
        scale: { duration: MELT_DURATION_S, ease: MELT_EASE, delay: exitDelay },
        opacity: { duration: MELT_DURATION_S * 0.2, ease: "easeIn" as const, delay: exitDelay + MELT_DURATION_S * 0.8 },
      }
    : isAssembling
      ? {
          y: { type: "spring" as const, ...ASSEMBLE_SPRING, delay: enterDelay },
          scale: { type: "spring" as const, ...ASSEMBLE_SPRING, delay: enterDelay },
          opacity: { duration: 0.15, delay: enterDelay },
        }
      : { duration: 0 };

  const initial = isAssembling
    ? { y: ASSEMBLE_ENTRY_Y, scale: ASSEMBLE_ENTRY_SCALE, opacity: 0 }
    : undefined;

  return (
    <motion.div
      className={cn(
        "absolute left-1/2 flex min-w-0 -translate-x-1/2 flex-col items-center will-change-transform",
        !isAnimating && layerMotion,
      )}
      initial={initial}
      animate={animateValues}
      transition={transition}
      style={{
        top: topPx,
        zIndex,
        transitionDuration: isAnimating ? undefined : "var(--burger-dur)",
        width: isExploded
          ? "min(100vw - 1rem, 56rem)"
          : "min(100vw - 1.25rem, 500px)",
        maxWidth: isExploded
          ? "min(100vw - 1rem, 56rem)"
          : "min(100vw - 1.25rem, 500px)",
      }}
    >
      {children}
    </motion.div>
  );
}

function BurgerStackLayers({
  exploded,
  garnishType,
  compact = false,
  reduceMotion = false,
  showGarnish = true,
  scrollLayerMotion = "idle",
  slideTransition = "idle",
  onExitComplete,
  onEnterComplete,
}: Omit<BurgerStackProps, "onToggle" | "className">) {
  const isExploded = exploded === true;
  const exitTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const enterTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const phaseCounterRef = useRef(0);

  const prevTransitionRef = useRef(slideTransition);
  if (prevTransitionRef.current !== slideTransition) {
    prevTransitionRef.current = slideTransition;
    phaseCounterRef.current += 1;
  }
  const phaseKey = phaseCounterRef.current;

  const layerMotion = reduceMotion
    ? ""
    : "transition-[top,max-width] [transition-timing-function:var(--burger-ease)]";

  const useTightStacked =
    scrollLayerMotion === "idle" || scrollLayerMotion === "enterTight";

  const layersScaled = useMemo(
    () => burgerLayers.map((l) => scaleLayer(l, compact)),
    [compact],
  );

  const assembledMetrics = useMemo(() => {
    const scrollLoosenPx =
      reduceMotion || useTightStacked
        ? 0
        : Math.round(22 * (1 - SCROLL_LAYER_LOOSE_FACTOR));
    const tops = layersScaled.map(
      (L, i) => L.assembledTopPx + i * scrollLoosenPx,
    );
    const totalHeight = Math.max(
      ...burgerLayers.map((layer, i) =>
        assembledLayerBottom(layer, tops[i]!, compact),
      ),
    );
    return { tops, totalHeight };
  }, [layersScaled, useTightStacked, reduceMotion, compact]);

  const explodedMetrics = useMemo(() => {
    let y = 0;
    const tops: number[] = [];
    for (let i = 0; i < burgerLayers.length; i++) {
      tops.push(y);
      const rowH = explodedRowHeight(burgerLayers[i]!, compact);
      if (i < burgerLayers.length - 1) {
        y += rowH + layersScaled[i + 1]!.explodedY;
      }
    }
    const last = burgerLayers.length - 1;
    const totalHeight =
      tops[last]! + explodedRowHeight(burgerLayers[last]!, compact);
    return { tops, totalHeight };
  }, [layersScaled, compact]);

  const containerHeight = isExploded
    ? explodedMetrics.totalHeight
    : assembledMetrics.totalHeight;

  const isMelting = slideTransition === "melting-exit";
  const isAssembling = slideTransition === "assembling-enter";
  const isTransitioning = isMelting || isAssembling;

  const exitCalledRef = useRef(false);
  const enterCalledRef = useRef(false);

  useEffect(() => {
    exitTimersRef.current.forEach(clearTimeout);
    exitTimersRef.current = [];
    enterTimersRef.current.forEach(clearTimeout);
    enterTimersRef.current = [];
    exitCalledRef.current = false;
    enterCalledRef.current = false;
  }, [slideTransition]);

  useEffect(() => {
    if (isMelting && onExitComplete && !exitCalledRef.current) {
      const totalMs = (MELT_DURATION_S + MELT_STAGGER_S * (LAYER_COUNT - 1)) * 1000 + 50;
      const t = setTimeout(() => {
        exitCalledRef.current = true;
        onExitComplete();
      }, totalMs);
      exitTimersRef.current.push(t);
      return () => clearTimeout(t);
    }
  }, [isMelting, onExitComplete]);

  useEffect(() => {
    if (isAssembling && onEnterComplete && !enterCalledRef.current) {
      const totalMs = (0.6 + ASSEMBLE_STAGGER_S * (LAYER_COUNT - 1)) * 1000 + 400;
      const t = setTimeout(() => {
        enterCalledRef.current = true;
        onEnterComplete();
      }, totalMs);
      enterTimersRef.current.push(t);
      return () => clearTimeout(t);
    }
  }, [isAssembling, onEnterComplete]);

  return (
    <>
      <div
        className={cn(
          "relative mx-auto w-full max-w-[500px] leading-none",
          compact && !isExploded && "max-w-full",
          isExploded && "max-w-[min(100vw-1.25rem,min(94vw,56rem))]",
          !reduceMotion && !isTransitioning && "transition-[height] [transition-timing-function:var(--burger-ease)]",
        )}
        style={{
          height: containerHeight,
          transitionDuration: reduceMotion || isTransitioning ? undefined : "var(--burger-dur)",
        }}
      >
        {showGarnish && (
          <HeroGarnish theme={garnishType} reduceMotion={reduceMotion} />
        )}

        {burgerLayers.map((layer, i) => {
          const L = layersScaled[i]!;
          const topAssembled = assembledMetrics.tops[i]!;
          const topExploded = explodedMetrics.tops[i]!;
          const topPx = isExploded ? topExploded : topAssembled;

          const reverseIdx = LAYER_COUNT - 1 - i;
          const exitDelay = reverseIdx * MELT_STAGGER_S;
          const enterDelay = i * ASSEMBLE_STAGGER_S;

          return (
            <MeltLayer
              key={`${layer.id}-${phaseKey}`}
              isMelting={isMelting && !isExploded && !reduceMotion}
              isAssembling={isAssembling && !isExploded && !reduceMotion}
              exitDelay={exitDelay}
              enterDelay={enterDelay}
              topPx={topPx}
              zIndex={L.zIndex}
              isExploded={isExploded}
              layerMotion={layerMotion}
            >
              <div
                className={cn(
                  "grid w-full items-center gap-y-2",
                  isExploded
                    ? "grid-cols-1 sm:grid-cols-[minmax(0,1fr)_min(500px,calc(100vw-7rem))_minmax(0,1fr)] sm:gap-x-2 sm:gap-y-0"
                    : "grid-cols-1 place-items-center",
                )}
              >
                <div
                  className={cn(
                    "hidden min-w-0 sm:order-1 sm:block",
                    !isExploded && "sm:hidden",
                  )}
                >
                  {isExploded && layer.annotateSide === "left" ? (
                    <ExplodedAnnotations layer={layer} side="left" />
                  ) : (
                    <div className="min-h-0 min-w-0" aria-hidden />
                  )}
                </div>
                <div className="relative order-1 flex min-w-0 justify-center justify-self-center sm:order-2">
                  <LayerPhoto
                    layer={layer}
                    compact={compact}
                    stackedLayout={!isExploded}
                  />
                  {isExploded ? (
                    <div className="mt-2 flex flex-col items-center gap-0.5 sm:hidden">
                      <span className="text-sm font-semibold uppercase tracking-tight text-white">
                        {layer.label}
                      </span>
                      <span className="text-xs font-medium text-white/85">
                        {layer.calories}
                      </span>
                    </div>
                  ) : null}
                </div>
                <div
                  className={cn(
                    "hidden min-w-0 sm:order-3 sm:block",
                    !isExploded && "sm:hidden",
                  )}
                >
                  {isExploded && layer.annotateSide === "right" ? (
                    <ExplodedAnnotations layer={layer} side="right" />
                  ) : (
                    <div className="min-h-0 min-w-0" aria-hidden />
                  )}
                </div>
              </div>
            </MeltLayer>
          );
        })}

        <div
          className={cn(
            "pointer-events-none absolute left-1/2 z-[3] -translate-x-1/2 rounded-[100%] bg-black/25 blur-xl transition-[width,height,bottom] [transition-timing-function:var(--burger-ease)]",
            isExploded
              ? "bottom-[-2.5rem] h-[4rem] w-[min(90%,500px)] sm:bottom-[-3rem] sm:h-[4.5rem] sm:w-[min(88%,520px)]"
              : "bottom-[-0.75rem] h-[3.5rem] w-[min(88%,420px)] sm:bottom-[-1rem] sm:h-[4.25rem] sm:w-[min(86%,480px)]",
            isMelting && !isExploded && "!opacity-0",
          )}
          style={{ transitionDuration: "var(--burger-dur)" }}
          aria-hidden
        />
      </div>
    </>
  );
}

export function BurgerStack({
  exploded: explodedProp,
  onToggle,
  garnishType,
  compact = false,
  reduceMotion = false,
  showGarnish = true,
  className,
  scrollLayerMotion = "idle",
  slideTransition = "idle",
  onExitComplete,
  onEnterComplete,
}: BurgerStackProps) {
  const isExploded = explodedProp === true;

  const rootMax = compact
    ? LAUNCH_MAX_W_COMPACT
    : isExploded
      ? ROOT_MAX_W_EXPLODED
      : ROOT_MAX_W_STACKED;

  const layerDurMs =
    !isExploded && scrollLayerMotion !== "idle"
      ? HERO_SCROLL_LAYER_MS
      : BURGER_DURATION_MS;

  const inner = (
    <BurgerStackLayers
      exploded={isExploded}
      garnishType={garnishType}
      compact={compact}
      reduceMotion={reduceMotion}
      showGarnish={showGarnish}
      scrollLayerMotion={scrollLayerMotion}
      slideTransition={slideTransition}
      onExitComplete={onExitComplete}
      onEnterComplete={onEnterComplete}
    />
  );

  const stackColumn = (
    <div
      className={cn(
        "relative z-[4] mx-auto flex w-full max-w-full flex-col items-center outline-none",
        onToggle && "cursor-pointer",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[500px] overflow-visible",
          compact && "max-w-full",
          isExploded && "max-w-[min(100vw-1.25rem,min(94vw,56rem))]",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full overflow-visible",
            !reduceMotion && "animate-float-slow",
            compact ? STACK_SCALE_COMPACT : STACK_SCALE,
            "origin-center",
          )}
        >
          {inner}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-full [--burger-ease:cubic-bezier(0.22,0.94,0.32,1)]",
        className,
      )}
      style={
        {
          maxWidth: rootMax,
          WebkitTapHighlightColor: "transparent",
          "--burger-dur": `${layerDurMs}ms`,
        } as CSSProperties
      }
    >
      {onToggle ? (
        <button
          type="button"
          aria-expanded={isExploded}
          aria-label={
            isExploded ? "Collapse burger layers" : "Expand burger layers"
          }
          className={cn(
            "relative mx-auto block w-full max-w-full border-0 bg-transparent p-0 text-left",
            "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        >
          {stackColumn}
        </button>
      ) : (
        <div className="w-full">{stackColumn}</div>
      )}
    </div>
  );
}
