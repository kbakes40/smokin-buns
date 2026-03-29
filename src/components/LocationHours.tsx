import Link from "next/link";
import { business, hours } from "@/data/site";

export function LocationHours() {
  return (
    <section
      id="location"
      className="relative border-t border-white/5 bg-stone-950 py-20 sm:py-24"
      aria-labelledby="location-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
              Visit
            </p>
            <h2
              id="location-heading"
              className="font-display mt-3 text-4xl tracking-wide text-stone-50 sm:text-5xl"
            >
              Location &amp; Hours
            </h2>
            <p className="mt-4 text-lg text-stone-400">
              Pull up to Belleville — hot window, fast pickup, flavors that show
              out in the car on the way home.
            </p>

            <address className="mt-8 not-italic">
              <p className="font-display text-2xl tracking-wide text-stone-100">
                {business.address.street}
              </p>
              <p className="mt-1 text-lg text-stone-400">
                {business.address.city}, {business.address.state}
              </p>
            </address>

            <div className="mt-8 rounded-2xl border border-white/10 bg-stone-900/50 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                {hours.summary}
              </p>
              {hours.lines.map((line) => (
                <p
                  key={line}
                  className="mt-2 font-display text-2xl tracking-wide text-amber-100"
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={business.orderUrl}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 text-sm font-semibold text-stone-950 shadow-[0_0_40px_-12px_rgba(251,191,36,0.5)] transition hover:brightness-110"
              >
                Order Online
              </Link>
              <a
                href={`tel:${business.phoneTel}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-stone-100 transition hover:border-amber-400/30"
              >
                Call {business.phone}
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-stone-900/40">
            <div
              className="relative aspect-[4/3] w-full bg-gradient-to-br from-stone-800 to-stone-950"
              role="img"
              aria-label="Map placeholder for restaurant location"
            >
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-8 rounded-2xl border border-dashed border-white/20" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.8)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(250,250,250,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(250,250,250,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <p className="font-display text-2xl tracking-wide text-stone-200">
                  Map preview
                </p>
                <p className="mt-2 max-w-xs text-sm text-stone-500">
                  Drop in your embed or static map image — layout stays ready.
                </p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(business.address.full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full border border-amber-500/35 bg-amber-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-amber-100 transition hover:bg-amber-500/20"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
