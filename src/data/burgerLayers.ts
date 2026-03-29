/**
 * Assembled: absolute `top` in px from stack origin (top bun = 0, values increase downward).
 * Exploded: `explodedY` = marginTop gaps between rows (unchanged).
 */

export type BurgerLayerId =
  | "top-bun"
  | "tomato"
  | "onion"
  | "bacon"
  | "cheese"
  | "patty"
  | "lettuce-top"
  | "lettuce-bot"
  | "bottom-bun";

export type BurgerLayerDef = {
  id: BurgerLayerId;
  png: string;
  alt: string;
  label: string;
  calories: string;
  annotateSide: "left" | "right";
  zIndex: number;
  assembledTopPx: number;
  explodedY: number;
  stackedXNudgePx: number;
  stackedRotateDeg: number;
  layerImgScale?: number;
};

/** Rough drawable height per layer (px) at full column width — only for assembled container height. */
export const assembledContentHeightPx: Record<BurgerLayerId, number> = {
  "top-bun": 124,
  tomato: 62,
  onion: 62,
  bacon: 70,
  cheese: 74,
  patty: 90,
  "lettuce-top": 80,
  "lettuce-bot": 78,
  "bottom-bun": 118,
};

/** DOM order = top → bottom: top bun first, bottom bun last. `assembledTopPx` must be non-decreasing. */
export const burgerLayers: BurgerLayerDef[] = [
  {
    id: "top-bun",
    png: "/burger/top-bun.png",
    alt: "Top bun",
    label: "Bun",
    calories: "130 cal",
    annotateSide: "left",
    zIndex: 80,
    assembledTopPx: 0,
    explodedY: 0,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
  {
    id: "tomato",
    png: "/burger/tomato.png",
    alt: "Tomatoes",
    label: "Tomatoes",
    calories: "16 cal",
    annotateSide: "right",
    zIndex: 72,
    assembledTopPx: 32,
    explodedY: 52,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
    layerImgScale: 0.7,
  },
  {
    id: "onion",
    png: "/burger/oninon.png",
    alt: "Onions",
    label: "Onions",
    calories: "26 cal",
    annotateSide: "left",
    zIndex: 66,
    assembledTopPx: 58,
    explodedY: 54,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
    layerImgScale: 0.7,
  },
  {
    id: "bacon",
    png: "/burger/bacon.png",
    alt: "Bacon",
    label: "Bacon",
    calories: "65 cal",
    annotateSide: "right",
    zIndex: 62,
    assembledTopPx: 82,
    explodedY: 54,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
  {
    id: "cheese",
    png: "/burger/cheese.png",
    alt: "Cheese",
    label: "Cheese",
    calories: "117 cal",
    annotateSide: "left",
    zIndex: 58,
    assembledTopPx: 106,
    explodedY: 56,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
  {
    id: "patty",
    png: "/burger/patty.png",
    alt: "Beef patty",
    label: "Meat",
    calories: "225 cal",
    annotateSide: "right",
    zIndex: 52,
    assembledTopPx: 138,
    explodedY: 58,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
  {
    id: "lettuce-top",
    png: "/burger/lettuce-top.png",
    alt: "Lettuce",
    label: "Salad",
    calories: "7 cal",
    annotateSide: "left",
    zIndex: 46,
    assembledTopPx: 172,
    explodedY: 52,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
  {
    id: "lettuce-bot",
    png: "/burger/lettuce-bot.png",
    alt: "Lettuce",
    label: "Salad",
    calories: "7 cal",
    annotateSide: "right",
    zIndex: 42,
    assembledTopPx: 204,
    explodedY: 52,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
  {
    id: "bottom-bun",
    png: "/burger/bottom-bun.png",
    alt: "Bottom bun",
    label: "Bun",
    calories: "120 cal",
    annotateSide: "right",
    zIndex: 36,
    assembledTopPx: 236,
    explodedY: 54,
    stackedXNudgePx: 0,
    stackedRotateDeg: 0,
  },
];

export type GarnishTheme = "chips" | "tomato" | "cucumber" | "onion" | "herb";
