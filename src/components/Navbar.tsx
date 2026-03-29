"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business, navLinks } from "@/data/site";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 48);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const heroCompact = isHome && !scrolled;

  const shell = heroCompact
    ? "bg-transparent"
    : scrolled
      ? "bg-stone-950/85 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.75)] backdrop-blur-xl border-b border-white/5"
      : "bg-transparent";

  const linkBase = heroCompact
    ? "text-white/90 hover:bg-white/10 hover:text-white"
    : "text-stone-300 hover:bg-white/5 hover:text-stone-50";

  const wordmarkTitle = heroCompact ? "text-white" : "text-stone-100 group-hover:text-amber-200";
  const taglineColor = heroCompact
    ? "text-white/80"
    : "text-amber-200/90";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${shell}`}
      >
        <nav
          aria-label="Primary"
          className={
            heroCompact
              ? "relative mx-auto flex max-w-7xl items-center px-4 py-5 sm:px-8"
              : "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
          }
        >
          <Link
            href="#top"
            className="group z-10 flex shrink-0 flex-col leading-tight"
            onClick={() => setOpen(false)}
          >
            <span
              className={`font-display text-xl font-normal tracking-[0.04em] transition sm:text-2xl ${wordmarkTitle}`}
            >
              SMOKIN BUNS
            </span>
            <span
              className={`mt-1 max-w-[14rem] text-[9px] font-semibold uppercase leading-snug tracking-[0.2em] sm:text-[10px] ${taglineColor}`}
            >
              Chargrilled burgers and bowls
            </span>
          </Link>

          {heroCompact && (
            <p className="pointer-events-none absolute left-1/2 top-1/2 hidden max-w-[16rem] -translate-x-1/2 -translate-y-1/2 text-center font-accent-serif text-sm italic text-white/95 sm:block md:max-w-none md:text-base">
              Belleville, since the first flame
            </p>
          )}

          {!heroCompact && (
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${linkBase}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div
            className={heroCompact ? "z-10 ml-auto flex items-center gap-2" : "flex items-center gap-2"}
          >
            {!heroCompact && (
              <Link
                href={business.orderUrl}
                className="hidden rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-stone-950 shadow-[0_0_40px_-8px_rgba(251,191,36,0.65)] transition hover:brightness-110 md:inline-flex"
              >
                Order Now
              </Link>
            )}
            <button
              type="button"
              className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-lg transition ${
                heroCompact
                  ? "bg-[#facc15] text-neutral-900 hover:bg-[#fde047]"
                  : "bg-amber-400 text-stone-950 hover:bg-amber-300 lg:hidden"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Toggle menu</span>
              <span className="flex flex-col items-center justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-5 origin-center rounded-full transition ${heroCompact ? "bg-neutral-900" : "bg-stone-950"} ${open ? "translate-y-2 rotate-45" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full transition ${heroCompact ? "bg-neutral-900" : "bg-stone-950"} ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`block h-0.5 w-5 origin-center rounded-full transition ${heroCompact ? "bg-neutral-900" : "bg-stone-950"} ${open ? "-translate-y-2 -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-stone-950/95 backdrop-blur-xl transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pb-10 pt-24">
          <ul className="flex flex-col gap-1">
            {navLinks.map((item, i) => (
              <li
                key={item.label}
                className="border-b border-white/5"
                style={{
                  transitionDelay: open ? `${i * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                <Link
                  href={item.href}
                  className="block py-4 text-lg font-medium text-stone-100"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pt-8">
            <Link
              href={business.orderUrl}
              className="flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 py-4 text-base font-semibold text-stone-950"
              onClick={() => setOpen(false)}
            >
              Order Online
            </Link>
            <a
              href={`tel:${business.phoneTel}`}
              className="flex items-center justify-center rounded-full border border-white/15 py-4 text-base font-medium text-stone-200"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
