import Link from "next/link";
import { moreMenuPrices, signatureItems } from "@/data/menu";
import { business } from "@/data/site";

const badgeStyles: Record<
  (typeof signatureItems)[number]["badge"],
  string
> = {
  "Best Seller": "border-amber-400/40 bg-amber-500/10 text-amber-100",
  "Local Favorite": "border-rose-400/35 bg-rose-500/10 text-rose-100",
  "Fan Pick": "border-orange-400/35 bg-orange-500/10 text-orange-50",
};

export function SignatureItems() {
  return (
    <section
      className="relative bg-gradient-to-b from-stone-900/80 via-stone-950 to-stone-950 py-20 sm:py-24"
      aria-labelledby="signature-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
              The hits
            </p>
            <h2
              id="signature-heading"
              className="font-display mt-3 text-4xl tracking-wide text-stone-50 sm:text-5xl"
            >
              Signature Items
            </h2>
            <p className="mt-4 text-lg text-stone-400">
              Best sellers people actually reorder — flavor-forward, portion-heavy,
              built to make you hungry again tomorrow.
            </p>
          </div>
          <Link
            href={business.orderUrl}
            className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-400/35 hover:bg-white/5"
          >
            Order favorites
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {signatureItems.map((item) => (
            <li key={item.id}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-stone-900/50 p-8 transition duration-300 hover:-translate-y-0.5 hover:border-amber-500/20 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]">
                <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-amber-500/10 blur-3xl transition group-hover:bg-amber-500/15" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${badgeStyles[item.badge]}`}
                    >
                      {item.badge}
                    </span>
                    <h3 className="font-display mt-4 text-3xl tracking-wide text-stone-50 sm:text-4xl">
                      {item.name}
                    </h3>
                  </div>
                  <p className="font-display text-3xl text-amber-200 tabular-nums">
                    {item.price}
                  </p>
                </div>
                <p className="relative mt-4 max-w-prose text-base leading-relaxed text-stone-400">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-white/10 bg-stone-900/40 p-6 sm:flex sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-stone-400">
            Also on the board:{" "}
            {moreMenuPrices.map((m, i) => (
              <span key={m.name}>
                <span className="text-stone-200">{m.name}</span>{" "}
                <span className="font-display text-lg text-amber-200/90">
                  {m.price}
                </span>
                {i < moreMenuPrices.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <Link
            href="#menu"
            className="mt-4 inline-flex text-sm font-semibold text-amber-200 transition hover:text-amber-100 sm:mt-0"
          >
            Full menu themes →
          </Link>
        </div>
      </div>
    </section>
  );
}
