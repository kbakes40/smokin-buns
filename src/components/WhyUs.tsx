import { whyUs } from "@/data/site";

function WhyIcon({ variant }: { variant: number }) {
  const common = "h-5 w-5 text-amber-200";
  switch (variant) {
    case 0:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3c-2 3.2-5 5.8-5 9.5a5 5 0 1010 0c0-3.7-3-6.3-5-9.5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M9 14h6M10.5 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 1:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 11h14l-1 7H6l-1-7z" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7 11V9a5 5 0 0110 0v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case 2:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <ellipse cx="12" cy="14" rx="7" ry="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5 14v2c0 2 3.2 3.5 7 3.5s7-1.5 7-3.5v-2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 10V7M9 8l1.5 1.5M15 8l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 3:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 10h10v8H7v-8zM9 8V6a3 3 0 016 0v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 4:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 5v14M6 8h12M8 5h8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 12s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}

export function WhyUs() {
  return (
    <section
      id="about"
      className="relative border-t border-white/5 bg-stone-950 py-20 sm:py-24"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/80">
            Why Smokin Buns
          </p>
          <h2
            id="why-heading"
            className="font-display mt-3 text-4xl tracking-wide text-stone-50 sm:text-5xl"
          >
            Fire, fat, flavor — no filler story
          </h2>
          <p className="mt-4 text-lg text-stone-400">
            We’re not here to whisper. We grill loud, season with intent, and send
            you out fed like you meant it.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item, i) => (
            <li key={item.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-stone-900/35 p-6 transition duration-300 hover:-translate-y-0.5 hover:border-amber-500/20 hover:bg-stone-900/55">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/15">
                  <WhyIcon variant={i} />
                </span>
                <h3 className="mt-4 font-display text-xl tracking-wide text-stone-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
