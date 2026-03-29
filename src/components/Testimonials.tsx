import { testimonials } from "@/data/site";

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 py-20 sm:py-24"
      aria-labelledby="reviews-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
            Reviews
          </p>
          <h2
            id="reviews-heading"
            className="font-display mt-3 text-4xl tracking-wide text-stone-50 sm:text-5xl"
          >
            Belleville keeps coming back
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            Real talk on portions, char, and the stuff that actually matters when
            you’re starving.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <blockquote className="flex h-full flex-col rounded-2xl border border-white/10 bg-stone-900/40 p-7 transition duration-300 hover:-translate-y-0.5 hover:border-amber-500/15">
                <p className="flex-1 text-base leading-relaxed text-stone-300">
                  “{t.quote}”
                </p>
                <footer className="mt-6 border-t border-white/10 pt-5">
                  <cite className="not-italic">
                    <span className="font-semibold text-stone-100">{t.name}</span>
                    <span className="mt-1 block text-sm text-stone-500">
                      {t.detail}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
