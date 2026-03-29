/**
 * Full-screen slider hero — bright immersive backgrounds, centered composition.
 * Burger visuals: `BurgerStack` + `garnishType`. Transparent PNGs: /public/burger/*.png
 */

import type { GarnishTheme } from "@/data/burgerLayers";

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  background: string;
  featuredItemName: string;
  price: string;
  heroImageSrc?: string;
  heroImageAlt: string;
  /** Floating garnish field (Slider Revolution–style) */
  garnishType: GarnishTheme;
  dotActiveClass?: string;
  stackVariant: "burger" | "bowl" | "fries" | "combo";
};

export const heroSlides: HeroSlide[] = [
  {
    id: "stacked",
    title: "Stacked Happiness",
    subtitle: "Bacon strips · melty cheese · half-pound char",
    background:
      "bg-[radial-gradient(circle_at_50%_42%,#ff4d4d_0%,#dc2626_38%,#991b1b_72%,#7f1d1d_100%)]",
    featuredItemName: "Bacon Cheeseburger",
    price: "$11.50",
    heroImageAlt: "Bacon cheeseburger floating on red",
    stackVariant: "burger",
    garnishType: "chips",
  },
  {
    id: "more-than",
    title: "More Than a Burger",
    subtitle: "Smokin bowl · rice · sauce · big flavor",
    background:
      "bg-[radial-gradient(circle_at_50%_40%,#5eead4_0%,#0d9488_40%,#0f766e_70%,#115e59_100%)]",
    featuredItemName: "Smokin Burger Bowl",
    price: "$14.00",
    heroImageAlt: "Smokin burger bowl on teal",
    stackVariant: "bowl",
    garnishType: "herb",
  },
  {
    id: "fresh-grill",
    title: "Fresh Off the Grill",
    subtitle: "Classic cheeseburger · pickle snap · char crust",
    background:
      "bg-[radial-gradient(circle_at_50%_42%,#86efac_0%,#22c55e_35%,#15803d_68%,#14532d_100%)]",
    featuredItemName: "Cheeseburger",
    price: "$9.50",
    heroImageAlt: "Cheeseburger on green",
    stackVariant: "burger",
    garnishType: "cucumber",
  },
  {
    id: "tasty-combos",
    title: "Tasty Combos",
    subtitle: "Burger · fries · drink — the full lineup",
    background:
      "bg-[radial-gradient(circle_at_50%_40%,#c4b5fd_0%,#7c3aed_38%,#5b21b6_70%,#4c1d95_100%)]",
    featuredItemName: "Combo Meal",
    price: "From $12",
    heroImageAlt: "Combo meal on purple",
    stackVariant: "combo",
    garnishType: "onion",
  },
  {
    id: "flavor-bite",
    title: "Flavor in Every Bite",
    subtitle: "Beef tallow fries · hot crunch · serious salt",
    background:
      "bg-[radial-gradient(circle_at_50%_42%,#fdba74_0%,#f97316_38%,#c2410c_72%,#9a3412_100%)]",
    featuredItemName: "Beef Tallow Fries",
    price: "$5.00",
    heroImageAlt: "Golden fries on orange",
    stackVariant: "fries",
    garnishType: "tomato",
  },
];

export const heroSideSocialLabels = ["facebook", "instagram", "order online"] as const;
