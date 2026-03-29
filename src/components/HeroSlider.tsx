"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BurgerStack } from "@/components/BurgerStack";
import { heroSideSocialLabels, heroSlides, type HeroSlide } from "@/data/heroSlides";
import { business } from "@/data/site";
import { cn } from "@/lib/cn";

const HERO_TRANS_MS = 800;
const HERO_TRANS_EASE = "cubic-bezier(0.22, 0.94, 0.32, 1)";
const HERO_NAV_DEBOUNCE_MS = 1000;
/** Space below featured line to burger (px). Negative = overlap into text. ~half inch up. */
const BURGER_GAP_BELOW_TEXT_PX = -48;
/**
 * When exploded, shift only the burger (not bg/garnish) upward so the stack stays in view.
 * Larger = more lift. Tune 150–220 vs viewport.
 */
const EXPLODED_BURGER_LIFT_Y_PX = 195;

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

function HeroHeadlineStack({ index }: { index: number }) {
  const s = heroSlides[index]!;
  return (
    <div
      key={s.id}
      className="relative z-[1] flex w-full max-w-5xl flex-col items-center gap-5 text-center"
    >
      <h1 className="max-w-[16ch] font-sans text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[0.95] tracking-tight text-white drop-shadow-md">
        {s.title}
      </h1>
      <p className="font-accent-serif max-w-xl text-base italic text-white/90 sm:text-lg">
        {s.subtitle}
      </p>
      <p className="text-sm font-medium text-white/75">
        <span className="text-white/90">{s.featuredItemName}</span>
        <span className="mx-2 text-white/40">·</span>
        <span className="font-sans text-lg font-bold tabular-nums text-white sm:text-xl">
          {s.price}
        </span>
      </p>
    </div>
  );
}

type HeroAnimPhase = "idle" | "exiting" | "entering";

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isExploded, setIsExploded] = useState(false);
  const burgerAreaRef = useRef<HTMLDivElement | null>(null);
  const [heroExited, setHeroExited] = useState(false);
  const [animPhase, setAnimPhase] = useState<HeroAnimPhase>("idle");
  /** After slide change: first paint off-screen below, then animate in */
  const [enterPlay, setEnterPlay] = useState(false);

  const lastNavRef = useRef(0);
  const transitioningRef = useRef(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterRafRef = useRef<number | null>(null);

  const slide: HeroSlide = heroSlides[index];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current);
    };
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
        setAnimPhase("idle");
        transitioningRef.current = false;
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
        if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current);
        setEnterPlay(false);
        setIsExploded(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroExited]);

  const runTransition = useCallback(
    (targetIndex: number) => {
      if (targetIndex === index) return;
      if (targetIndex < 0 || targetIndex >= heroSlides.length) return;
      if (transitioningRef.current) return;
      if (Date.now() - lastNavRef.current < HERO_NAV_DEBOUNCE_MS) return;

      if (reduceMotion) {
        lastNavRef.current = Date.now();
        setIndex(targetIndex);
        setIsExploded(false);
        return;
      }

      lastNavRef.current = Date.now();
      transitioningRef.current = true;
      setEnterPlay(false);
      setAnimPhase("exiting");

      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (enterRafRef.current != null) cancelAnimationFrame(enterRafRef.current);

      exitTimerRef.current = setTimeout(() => {
        setIndex(targetIndex);
        setIsExploded(false);
        setAnimPhase("entering");
        setEnterPlay(false);

        const kickEnter = () => {
          enterRafRef.current = requestAnimationFrame(() => {
            enterRafRef.current = requestAnimationFrame(() => {
              enterRafRef.current = null;
              setEnterPlay(true);
            });
          });
        };
        kickEnter();

        enterTimerRef.current = setTimeout(() => {
          setAnimPhase("idle");
          setEnterPlay(false);
          transitioningRef.current = false;
          enterTimerRef.current = null;
        }, HERO_TRANS_MS);
        exitTimerRef.current = null;
      }, HERO_TRANS_MS);
    },
    [index, reduceMotion],
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

  /** Lock document scroll while exploded so the hero stays fixed in place. */
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

  const textMotionTransform = (() => {
    if (reduceMotion || animPhase === "idle") return "translateY(0)";
    if (animPhase === "exiting") return "translateY(-100vh)";
    return enterPlay ? "translateY(0)" : "translateY(100vh)";
  })();

  const textMotionTransition =
    reduceMotion || animPhase === "idle"
      ? undefined
      : animPhase === "exiting" || (animPhase === "entering" && enterPlay)
        ? `transform ${HERO_TRANS_MS}ms ${HERO_TRANS_EASE}`
        : undefined;

  const burgerScrollLayerMotion =
    reduceMotion || isExploded
      ? ("idle" as const)
      : animPhase === "idle"
        ? ("idle" as const)
        : animPhase === "exiting"
          ? ("exit" as const)
          : enterPlay
            ? ("enterTight" as const)
            : ("enterLoose" as const);

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden"
      aria-roledescription="carousel"
    >
      <span className="sr-only" aria-live="polite">
        Slide {index + 1} of {heroSlides.length}: {slide.title}. {slide.featuredItemName}{" "}
        {slide.price}.
      </span>

      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 z-0",
            s.background,
            i === index ? "opacity-100" : "opacity-0",
          )}
          style={
            reduceMotion
              ? undefined
              : {
                  transition: `opacity ${HERO_TRANS_MS}ms ${HERO_TRANS_EASE}`,
                }
          }
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.1)_100%)]" />

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

      {/* ── Headline: absolutely positioned, never affected by burger ── */}
      <div
        className="absolute inset-x-0 top-0 z-[20] flex min-h-[100dvh] flex-col items-center px-5 pt-24 sm:px-8 sm:pt-28 md:pt-32 pointer-events-none"
      >
        <div
          className={cn(
            "flex w-full flex-col items-center will-change-[opacity,transform,filter] transition-[opacity,transform,filter] duration-300 ease-out",
            isExploded
              ? "pointer-events-none opacity-0 -translate-y-2 blur-[2px]"
              : "pointer-events-auto opacity-100 translate-y-0 blur-0",
          )}
          style={{
            transform: isExploded
              ? "translateY(-8px)"
              : textMotionTransform,
            transition: textMotionTransition
              ? `${textMotionTransition}, opacity 300ms ease-out, filter 300ms ease-out`
              : "opacity 300ms ease-out, transform 300ms ease-out, filter 300ms ease-out",
          }}
        >
          <HeroHeadlineStack index={index} />
        </div>
      </div>

      {/* ── Burger: absolutely positioned, isolated from everything else ── */}
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
