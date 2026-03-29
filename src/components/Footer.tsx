import Link from "next/link";
import { business, hours, navLinks } from "@/data/site";
import { menuThemes } from "@/data/menu";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-stone-950 pb-28 pt-14 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-3xl tracking-wide text-stone-50">
              {business.name}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-amber-200/85">
              {business.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-400">
              {business.description}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-stone-300 transition hover:text-amber-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Visit
            </p>
            <address className="mt-4 not-italic text-sm text-stone-300">
              {business.address.full}
            </address>
            <p className="mt-3 text-sm text-stone-400">
              {hours.summary}: {hours.lines[0]}
            </p>
            <a
              href={`tel:${business.phoneTel}`}
              className="mt-2 inline-block text-sm font-semibold text-amber-200 hover:text-amber-100"
            >
              {business.phone}
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Menu themes
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {menuThemes.map((m) => (
              <li
                key={m}
                className="rounded-full border border-white/10 bg-stone-900/50 px-3 py-1 text-xs text-stone-400"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {business.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 transition hover:text-amber-200"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
