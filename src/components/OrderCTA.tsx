import Link from "next/link";
import { business } from "@/data/site";

export function OrderCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/5 py-16 sm:py-20"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/25 via-red-700/20 to-stone-950" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-red-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-white/10 bg-stone-950/70 p-8 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/90">
              Ready when you are
            </p>
            <h2
              id="cta-heading"
              className="font-display mt-3 text-3xl leading-none tracking-wide text-stone-50 sm:text-4xl lg:text-5xl"
            >
              Belleville flavor, one tap away
            </h2>
            <p className="mt-4 text-base text-stone-400 sm:text-lg">
              Hot off the grill. Tallow fries still audibly crisp. Order now and
              pick up like you planned this craving on purpose — because you did.
            </p>
          </div>
          <Link
            href={business.orderUrl}
            className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-stone-50 px-10 py-4 text-base font-semibold text-stone-950 shadow-[0_0_50px_-12px_rgba(255,255,255,0.35)] transition hover:bg-amber-100 sm:w-auto"
          >
            Order Online
          </Link>
        </div>
      </div>
    </section>
  );
}
