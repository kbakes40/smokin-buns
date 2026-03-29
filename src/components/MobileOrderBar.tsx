"use client";

import Link from "next/link";
import { business } from "@/data/site";

export function MobileOrderBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-stone-950/90 px-4 py-3 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg gap-3">
        <Link
          href={business.orderUrl}
          className="flex flex-1 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 text-sm font-semibold text-stone-950 shadow-[0_0_30px_-8px_rgba(251,191,36,0.5)]"
        >
          Order Online
        </Link>
        <a
          href={`tel:${business.phoneTel}`}
          className="flex flex-1 items-center justify-center rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-stone-100"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
