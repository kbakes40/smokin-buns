import Link from "next/link";
import { featuredCategories } from "@/data/menu";

export function FeaturedCategories() {
  return (
    <section
      id="menu"
      className="relative border-t border-white/5 bg-stone-950 py-20 sm:py-24"
      aria-labelledby="categories-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
            Built for cravings
          </p>
          <h2
            id="categories-heading"
            className="font-display mt-3 text-4xl tracking-wide text-stone-50 sm:text-5xl"
          >
            Featured Categories
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            Pick your lane — each line is dialed for smoke, char, and big portions.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredCategories.map((cat) => (
            <li key={cat.id}>
              <Link
                href={cat.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-stone-900/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/25 hover:shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85)]"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 transition group-hover:opacity-70 ${cat.accent}`}
                  aria-hidden
                />
                <div className="relative">
                  <h3 className="font-display text-2xl tracking-wide text-stone-50">
                    {cat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">
                    {cat.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-wider text-amber-200/90">
                    Explore
                    <span
                      className="ml-2 transition group-hover:translate-x-1"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
