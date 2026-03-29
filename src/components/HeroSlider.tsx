"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BurgerStack } from "@/components/BurgerStack";
import {
  heroSideSocialLabels,
  heroSlides,
  type HeroSlide,
} from "@/data/heroSlides";
import { business } from "@/data/site";
import { cn } from "@/lib/cn";

const HERO_NAV_DEBOUNCE_MS = 1200;
const BURGER_GAP_BELOW_TEXT_PX = -48;
const EXPLODED_BURGER_LIFT_Y_PX = 195;

/* ── Transition timing (continuous scroll feel, wheel-driven) ── */
const TRANSITION_MS = 1400;
const BG_WIPE_MS = 900;
const BG_WIPE_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const TEXT_ENTER_MS = 800;
const TEXT_ENTER_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";
const TEXT_ENTER_STAGGER_MS = 80;
const TEXT_ENTER_DELAY_AFTER_BURGER_MS = 200;
const CHIP_FADE_OUT_MS = 500;
const CHIP_FADE_IN_MS = 600;
const CHIP_FADE_IN_DELAY_MS = 900;

function socialHrefForLabel(label: string): string {
  const l = label.toLowerCase();
  if (l === "order online") return business.orderUrl;
  const fb = business.social.find((s) =>
    s.label.toLowerCase().includes("facebook"),
  );
  const ig = business.social.find((s) =>
    s.label.toLowerCase().includes("instagram"),
  );
  if (l === "facebook" && fb) return fb.href;
  if (l === "instagram" && ig) return ig.href;
  return "#";
}

function OutlineSideText() {
  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-1/2 z-[1] hidden -translate-y-1/2 select-none md:block"
        aria-hidden
      >
        <span className="block origin-center -rotate-90 font-black text-[min(18vw,11rem)] leading-none text-transparent opacity-[0.16] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)]">
          SMOKIN
        </span>
      </div>
      <div
        className="pointer-events-none absolute right-0 top-1/2 z-[1] hidden -translate-y-1/2 select-none md:block"
        aria-hidden
      >
        <span className="block origin-center rotate-90 font-black text-[min(18vw,11rem)] leading-none text-transparent opacity-[0.16] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)]">
          BUNS
        </span>
      </div>
    </>
  );
}

function HeroTextRiseIn({ slide }: { slide: HeroSlide }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const items = [
    {
      key: "title",
      staggerIdx: 0,
      el: (
        <h1 className="max-w-[16ch] font-sans text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-md">
          {slide.title}
        </h1>
      ),
    },
    {
      key: "subtitle",
      staggerIdx: 1,
      el: (
        <p className="font-accent-serif max-w-xl text-base italic text-white/90 sm:text-lg">
          {slide.subtitle}
        </p>
      ),
    },
    {
      key: "price",
      staggerIdx: 2,
      el: (
        <p className="text-sm font-medium text-white/75">
          <span className="text-white/90">{slide.featuredItemName}</span>
          <span className="mx-2 text-white/40">·</span>
          <span className="font-sans text-lg font-bold tabular-nums text-white sm:text-xl">
            {slide.price}
          </span>
        </p>
      ),
    },
  ];

  return (
    <div className="relative z-[1] flex w-full max-w-5xl flex-col items-center gap-5 text-center">
      {items.map((item) => {
        const enterDelay =
          TEXT_ENTER_DELAY_AFTER_BURGER_MS +
          (items.length - 1 - item.staggerIdx) * TEXT_ENTER_STAGGER_MS;

        return (
          <div
            key={item.key}
            className="will-change-transform"
            style={{
              transform: mounted ? "translateY(0)" : "translateY(60px)",
              opacity: mounted ? 1 : 0,
              transition: `transform ${TEXT_ENTER_MS}ms ${TEXT_ENTER_EASE_CSS} ${enterDelay}ms, opacity ${TEXT_ENTER_MS}ms ${TEXT_ENTER_EASE_CSS} ${enterDelay}ms`,
            }}
          >
            {item.el}
          </div>
        );
      })}
    </div>
  );
}

function HeroTextStatic({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative z-[1] flex w-full max-w-5xl flex-col items-center gap-5 text-center">
      <h1 className="max-w-[16ch] font-sans text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-md">
        {slide.title}
      </h1>
      <p className="font-accent-serif max-w-xl text-base italic text-white/90 sm:text-lg">
        {slide.subtitle}
      </p>
      <p className="text-sm font-medium text-white/75">
        <span className="text-white/90">{slide.featuredItemName}</span>
        <span className="mx-2 text-white/40">·</span>
        <span className="font-sans text-lg font-bold tabular-nums text-white sm:text-xl">
          {slide.price}
        </span>
      </p>
    </div>
  );
}

type FloatingChipDef = {
  src: string;
  size: string;
  top: string;
  left: string;
  rotateDeg: number;
  opacity: number;
  driftY: number;
  driftRotate: number;
  duration: number;
  delay: number;
  blurPx?: number;
};

const FLOATING_CHIPS: FloatingChipDef[] = [
  {
    src: "/images/chips/chip-1.png",
    size: "clamp(62px, 7vw, 98px)",
    top: "33%",
    left: "36%",
    rotateDeg: -28,
    opacity: 1,
    driftY: 10,
    driftRotate: 8,
    duration: 5.0,
    delay: 0,
  },
  {
    src: "/images/chips/chip-2.png",
    size: "clamp(20px, 2.2vw, 30px)",
    top: "24%",
    left: "37%",
    rotateDeg: -10,
    opacity: 0.5,
    driftY: 7,
    driftRotate: 5,
    duration: 4.4,
    delay: 0.4,
    blurPx: 2.5,
  },
  {
    src: "/images/chips/chip-3.png",
    size: "clamp(42px, 4.8vw, 68px)",
    top: "45%",
    left: "38%",
    rotateDeg: -20,
    opacity: 0.95,
    driftY: 12,
    driftRotate: 9,
    duration: 5.4,
    delay: 0.8,
  },
  {
    src: "/images/chips/chip-4.png",
    size: "clamp(30px, 3.4vw, 46px)",
    top: "54%",
    left: "36%",
    rotateDeg: -16,
    opacity: 0.88,
    driftY: 9,
    driftRotate: 7,
    duration: 4.0,
    delay: 1.2,
  },
  {
    src: "/images/chips/chip-5.png",
    size: "clamp(24px, 2.6vw, 36px)",
    top: "19%",
    left: "50%",
    rotateDeg: 6,
    opacity: 0.48,
    driftY: 6,
    driftRotate: 4,
    duration: 5.6,
    delay: 1.6,
    blurPx: 2,
  },
  {
    src: "/images/chips/chip-6.png",
    size: "clamp(64px, 7.2vw, 102px)",
    top: "25%",
    left: "49%",
    rotateDeg: 22,
    opacity: 1,
    driftY: 11,
    driftRotate: 9,
    duration: 4.9,
    delay: 0.2,
  },
  {
    src: "/images/chips/chip-7.png",
    size: "clamp(28px, 3.1vw, 44px)",
    top: "27%",
    left: "55%",
    rotateDeg: 16,
    opacity: 0.9,
    driftY: 8,
    driftRotate: 7,
    duration: 4.3,
    delay: 0.5,
  },
  {
    src: "/images/chips/chip-3.png",
    size: "clamp(26px, 2.9vw, 38px)",
    top: "48%",
    left: "63%",
    rotateDeg: 14,
    opacity: 0.42,
    driftY: 7,
    driftRotate: 6,
    duration: 5.2,
    delay: 1.0,
    blurPx: 3,
  },
  {
    src: "/images/chips/chip-4.png",
    size: "clamp(50px, 5.4vw, 78px)",
    top: "53%",
    left: "60%",
    rotateDeg: 20,
    opacity: 0.95,
    driftY: 11,
    driftRotate: 9,
    duration: 4.6,
    delay: 0.7,
  },
];

function FloatingChips({
  hidden,
  entering,
  reduceMotion,
}: {
  hidden: boolean;
  entering: boolean;
  reduceMotion: boolean;
}) {
  const fadeOut = hidden && !entering;
  const fadeIn = entering;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      style={{
        opacity: fadeOut ? 0 : fadeIn ? 1 : hidden ? 0 : 1,
        transition: fadeOut
          ? `opacity ${CHIP_FADE_OUT_MS}ms ease-out`
          : fadeIn
            ? `opacity ${CHIP_FADE_IN_MS}ms ease-out ${CHIP_FADE_IN_DELAY_MS}ms`
            : "opacity 300ms ease-out",
      }}
      aria-hidden
    >
      {FLOATING_CHIPS.map((chip, i) => (
        <motion.div
          key={`chip-${i}`}
          className="absolute will-change-transform"
          style={{
            top: chip.top,
            left: chip.left,
            width: chip.size,
            opacity: chip.opacity,
          }}
          animate={
            reduceMotion || hidden
              ? { y: 0, rotate: chip.rotateDeg }
              : {
                  y: [0, -chip.driftY, 0, chip.driftY, 0],
                  rotate: [
                    chip.rotateDeg,
                    chip.rotateDeg + chip.driftRotate,
                    chip.rotateDeg,
                    chip.rotateDeg - chip.driftRotate,
                    chip.rotateDeg,
                  ],
                }
          }
          transition={
            reduceMotion || hidden
              ? { duration: 0.4 }
              : {
                  y: {
                    duration: chip.duration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror" as const,
                    delay: chip.delay,
                  },
                  rotate: {
                    duration: chip.duration * 1.1,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror" as const,
                    delay: chip.delay,
                  },
                }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={chip.src}
            alt=""
            className="h-auto w-full drop-shadow-lg"
            style={
              chip.blurPx != null
                ? { filter: `blur(${chip.blurPx}px)` }
                : undefined
            }
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </motion.div>
      ))}
      {/* TODO: new item entry here — incoming element for next slide */}
    </div>
  );
}

type TransPhase = "idle" | "wipe-and-exit" | "enter-new";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const burgerAreaRef = useRef<HTMLDivElement | null>(null);
  const [heroExited, setHeroExited] = useState(false);

  const [transPhase, setTransPhase] = useState<TransPhase>("idle");
  const [burgerPhase, setBurgerPhase] = useState<
    "idle" | "melting-exit" | "assembling-enter"
  >("idle");
  const [bgWipeTarget, setBgWipeTarget] = useState<string | null>(null);
  const [bgWipeActive, setBgWipeActive] = useState(false);

  const pendingIndexRef = useRef<number | null>(null);
  const lastNavRef = useRef(0);
  const transitioningRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const slide: HeroSlide = heroSlides[index]!;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    setIsExploded(false);
  }, [index]);

  useEffect(() => {
    if (!isExploded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExploded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExploded]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 4 && heroExited) {
        setHeroExited(false);
        setIndex(heroSlides.length - 1);
        transitioningRef.current = false;
        setIsExploded(false);
        setTransPhase("idle");
        setBurgerPhase("idle");
        setBgWipeTarget(null);
        setBgWipeActive(false);
        pendingIndexRef.current = null;
        clearTimers();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroExited, clearTimers]);

  const handleMeltExitComplete = useCallback(() => {
    /* Time-driven transition; index switches on timer */
  }, []);

  const handleAssembleEnterComplete = useCallback(() => {
    setBurgerPhase("idle");
    transitioningRef.current = false;
  }, []);

  const runTransition = useCallback(
    (targetIndex: number) => {
      if (targetIndex === index) return;
      if (targetIndex < 0 || targetIndex >= heroSlides.length) return;
      if (transitioningRef.current) return;
      if (Date.now() - lastNavRef.current < HERO_NAV_DEBOUNCE_MS) return;

      lastNavRef.current = Date.now();
      transitioningRef.current = true;
      clearTimers();

      if (reduceMotion) {
        setIndex(targetIndex);
        setIsExploded(false);
        setBurgerPhase("idle");
        setTransPhase("idle");
        setBgWipeTarget(null);
        setBgWipeActive(false);
        pendingIndexRef.current = null;
        transitioningRef.current = false;
        return;
      }

      const target = heroSlides[targetIndex]!;
      pendingIndexRef.current = targetIndex;
      setIsExploded(false);

      setTransPhase("wipe-and-exit");
      setBurgerPhase("melting-exit");
      setBgWipeTarget(target.background);

      const t1 = setTimeout(() => {
        setBgWipeActive(true);
      }, 16);
      timersRef.current.push(t1);

      const switchMs = BG_WIPE_MS * 0.65;
      const t2 = setTimeout(() => {
        setIndex(targetIndex);
        setTransPhase("enter-new");
        setBurgerPhase("assembling-enter");
        setBgWipeTarget(null);
        setBgWipeActive(false);
        pendingIndexRef.current = null;
      }, switchMs);
      timersRef.current.push(t2);

      const t3 = setTimeout(() => {
        setTransPhase("idle");
      }, TRANSITION_MS);
      timersRef.current.push(t3);
    },
    [index, reduceMotion, clearTimers],
  );

  const tryAdvance = useCallback(
    (dir: 1 | -1) => {
      const next = index + dir;
      if (next < 0 || next >= heroSlides.length) return;
      runTransition(next);
    },
    [index, runTransition],
  );

  const goToSlide = useCallback(
    (target: number) => {
      runTransition(target);
    },
    [runTransition],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const onWheel = (e: WheelEvent) => {
      if (isExploded) {
        const area = burgerAreaRef.current;
        if (area?.contains(e.target as Node)) return;
        e.preventDefault();
        return;
      }
      if (window.scrollY >= 4) return;
      if (heroExited) return;

      const dy = e.deltaY;

      if (dy > 0 && index >= heroSlides.length - 1) {
        setHeroExited(true);
        return;
      }

      if (transitioningRef.current) {
        e.preventDefault();
        return;
      }
      if (Date.now() - lastNavRef.current < HERO_NAV_DEBOUNCE_MS) {
        e.preventDefault();
        return;
      }

      if (dy > 0) {
        e.preventDefault();
        tryAdvance(1);
      } else if (dy < 0) {
        if (index > 0) {
          e.preventDefault();
          tryAdvance(-1);
        } else {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [reduceMotion, heroExited, index, tryAdvance, isExploded]);

  useEffect(() => {
    if (!isExploded) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = burgerAreaRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      setIsExploded(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isExploded]);

  useEffect(() => {
    if (!isExploded) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [isExploded]);

  const burgerScrollLayerMotion = "idle" as const;
  const isWiping = transPhase === "wipe-and-exit";
  const isEntering = transPhase === "enter-new";

  const HERO_TRANS_EASE = "cubic-bezier(0.22, 0.94, 0.32, 1)";

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden"
      aria-roledescription="carousel"
    >
      <span className="sr-only" aria-live="polite">
        Slide {index + 1} of {heroSlides.length}: {slide.title}.{" "}
        {slide.featuredItemName} {slide.price}.
      </span>

      <div className={cn("absolute inset-0 z-0", slide.background)} />

      {bgWipeTarget && (
        <div
          className={cn(
            "absolute inset-0 z-[22] will-change-transform",
            bgWipeTarget,
          )}
          style={{
            transform: bgWipeActive ? "translateY(0)" : "translateY(100%)",
            transition: bgWipeActive
              ? `transform ${BG_WIPE_MS}ms ${BG_WIPE_EASE}`
              : "none",
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_100%)]" />

      <FloatingChips
        hidden={isExploded || isWiping}
        entering={isEntering}
        reduceMotion={reduceMotion}
      />

      <OutlineSideText />

      <div className="pointer-events-auto absolute left-4 top-1/2 z-[30] flex -translate-y-1/2 flex-col gap-3 sm:left-6">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            aria-current={i === index}
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5",
              i === index
                ? "scale-125 bg-[#facc15] shadow-[0_0_14px_rgba(250,204,21,0.75)]"
                : "bg-white/35 hover:bg-white/55",
            )}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>

      <div className="pointer-events-auto absolute right-2 top-1/2 z-[30] hidden -translate-y-1/2 sm:block sm:right-5">
        <div className="flex flex-col items-center gap-6 [writing-mode:vertical-rl] rotate-180">
          {heroSideSocialLabels.map((label) => (
            <a
              key={label}
              href={socialHrefForLabel(label)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50 transition hover:text-white/90"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-0 top-0 z-[20] flex min-h-[100dvh] flex-col items-center px-5 pt-24 sm:px-8 sm:pt-28 md:pt-32 pointer-events-none overflow-hidden",
          isExploded && "opacity-0 transition-opacity duration-300",
        )}
      >
        <div className="pointer-events-auto">
          {isEntering ? (
            <HeroTextRiseIn key={`text-enter-${index}`} slide={slide} />
          ) : (
            <HeroTextStatic key={`text-${index}`} slide={slide} />
          )}
        </div>
      </div>

      <div
        ref={burgerAreaRef}
        className={cn(
          "absolute inset-x-0 top-0 z-[15] flex min-h-[100dvh] flex-col items-center justify-center pointer-events-none",
          isExploded &&
            "overflow-y-auto overflow-x-hidden overscroll-y-contain [-ms-overflow-style:auto] [scrollbar-width:thin]",
        )}
      >
        <div
          className="pointer-events-auto flex flex-col items-center will-change-transform"
          style={{
            transform: isExploded
              ? `translateY(-${EXPLODED_BURGER_LIFT_Y_PX}px)`
              : `translateY(${BURGER_GAP_BELOW_TEXT_PX > 0 ? BURGER_GAP_BELOW_TEXT_PX : 0}px)`,
            transition: reduceMotion
              ? undefined
              : `transform 680ms ${HERO_TRANS_EASE}`,
          }}
        >
          <BurgerStack
            exploded={isExploded}
            onToggle={() => setIsExploded((prev) => !prev)}
            garnishType={slide.garnishType}
            reduceMotion={reduceMotion}
            scrollLayerMotion={burgerScrollLayerMotion}
            slideTransition={burgerPhase}
            onExitComplete={handleMeltExitComplete}
            onEnterComplete={handleAssembleEnterComplete}
          />
          {isExploded && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <Link
                href={business.orderUrl}
                className="rounded-full bg-[#facc15] px-9 py-3 text-sm font-bold text-neutral-900 shadow-lg transition hover:bg-[#fde047] sm:px-10 sm:text-base"
              >
                Order Now!
              </Link>
            </div>
          )}
          <p className="mt-5 max-w-lg px-2 text-center text-[10px] font-medium uppercase leading-relaxed tracking-[0.38em] text-white/65 sm:text-[11px] sm:tracking-[0.4em]">
            {isExploded
              ? "TAP OUTSIDE THE STACK OR PRESS ESC TO CLOSE"
              : "CLICK THE BURGER"}
          </p>
        </div>
      </div>
    </section>
  );
}
