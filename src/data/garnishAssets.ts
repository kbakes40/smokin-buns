import type { GarnishTheme } from "@/data/burgerLayers";

/**
 * Optional photoreal garnish PNGs (transparent) under /public/garnish/
 * If a file 404s, HeroGarnish falls back to the CSS stand-in for that slot.
 */
export type GarnishSlot = {
  file: string;
  className: string;
  blur?: boolean;
};

export const garnishSlots: Record<GarnishTheme, GarnishSlot[]> = {
  chips: [
    { file: "chip-1.png", className: "left-[3%] top-[16%] h-8 w-[4.2rem] -rotate-[22deg]", blur: false },
    { file: "chip-2.png", className: "right-[5%] top-[20%] h-7 w-14 rotate-[16deg]", blur: true },
    { file: "chip-3.png", className: "left-[10%] bottom-[24%] h-7 w-[3.8rem] rotate-[8deg]", blur: true },
    { file: "chip-4.png", className: "right-[12%] bottom-[18%] h-8 w-[4rem] -rotate-[14deg]", blur: false },
    { file: "chip-5.png", className: "left-[18%] top-[38%] h-6 w-12 rotate-[-12deg]", blur: true },
    { file: "chip-6.png", className: "right-[6%] bottom-[36%] h-7 w-[3.5rem] rotate-[20deg]", blur: false },
    { file: "chip-7.png", className: "left-[8%] top-[48%] h-5 w-11 rotate-[6deg]", blur: true },
    { file: "chip-8.png", className: "right-[18%] top-[42%] h-6 w-12 -rotate-[18deg]", blur: true },
  ],
  tomato: [
    { file: "tomato-1.png", className: "left-[8%] top-[22%] h-10 w-10", blur: false },
    { file: "tomato-2.png", className: "right-[10%] top-[28%] h-9 w-9", blur: true },
    { file: "tomato-3.png", className: "left-[14%] bottom-[28%] h-8 w-8", blur: true },
    { file: "tomato-4.png", className: "right-[14%] bottom-[22%] h-11 w-11", blur: false },
    { file: "tomato-5.png", className: "right-[4%] top-[50%] h-7 w-7", blur: true },
  ],
  cucumber: [
    { file: "cucumber-1.png", className: "left-[6%] top-[26%] h-6 w-[4.5rem] -rotate-12", blur: false },
    { file: "cucumber-2.png", className: "right-[8%] top-[30%] h-5 w-20 rotate-8", blur: true },
    { file: "cucumber-3.png", className: "left-[12%] bottom-[30%] h-5 w-[4rem] rotate-[12deg]", blur: true },
    { file: "cucumber-4.png", className: "right-[10%] bottom-[26%] h-6 w-[4.25rem] -rotate-[6deg]", blur: false },
  ],
  onion: [
    { file: "onion-ring-1.png", className: "left-[8%] top-[24%] h-6 w-[5.25rem] -rotate-8", blur: false },
    { file: "onion-ring-2.png", className: "right-[6%] top-[32%] h-5 w-24 rotate-14", blur: true },
    { file: "onion-ring-3.png", className: "left-[4%] bottom-[36%] h-6 w-[5rem] rotate-[12deg]", blur: true },
    { file: "onion-ring-4.png", className: "right-[12%] bottom-[28%] h-5 w-[5.5rem] -rotate-10", blur: false },
  ],
  herb: [
    { file: "herb-1.png", className: "left-[10%] top-[22%] h-10 w-8 -rotate-[26deg]", blur: false },
    { file: "herb-2.png", className: "right-[8%] top-[26%] h-12 w-9 rotate-[20deg]", blur: true },
    { file: "herb-3.png", className: "left-[6%] bottom-[32%] h-10 w-8 rotate-14", blur: true },
    { file: "herb-4.png", className: "right-[14%] bottom-[24%] h-9 w-7 -rotate-[18deg]", blur: false },
  ],
};
