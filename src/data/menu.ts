export type FeaturedCategory = {
  id: string;
  title: string;
  description: string;
  href: string;
  accent: string;
};

export const featuredCategories: FeaturedCategory[] = [
  {
    id: "burgers",
    title: "Chargrilled Burgers",
    description:
      "Half-pound builds with real char, serious melt, and buns that keep up.",
    href: "#menu",
    accent: "from-amber-500/20 to-red-600/10",
  },
  {
    id: "bowls",
    title: "Smokin Bowls",
    description:
      "Protein-forward bowls with smoke, sauce, and texture — not a compromise plate.",
    href: "#menu",
    accent: "from-rose-500/15 to-amber-500/10",
  },
  {
    id: "wings",
    title: "Grilled Wings",
    description:
      "Charred edges, sticky glaze, heat that builds — finger food, elevated.",
    href: "#menu",
    accent: "from-orange-600/20 to-red-700/10",
  },
  {
    id: "chicken",
    title: "Chicken Sandwiches",
    description:
      "Crispy or grilled, built tall, finished like you mean it.",
    href: "#menu",
    accent: "from-yellow-500/15 to-stone-600/20",
  },
  {
    id: "meals",
    title: "Meals & Sides",
    description:
      "Combo logic, tallow fries, desserts, drinks — close the loop hungry.",
    href: "#menu",
    accent: "from-emerald-700/10 to-amber-500/10",
  },
];

export type SignatureItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  badge: "Best Seller" | "Local Favorite" | "Fan Pick";
};

export const signatureItems: SignatureItem[] = [
  {
    id: "cheeseburger",
    name: "Cheeseburger",
    price: "$9.50",
    description:
      "American cheese, pickles, onion, classic sauce — char first, talk later.",
    badge: "Best Seller",
  },
  {
    id: "bacon-cheese",
    name: "Bacon Cheeseburger",
    price: "$11.50",
    description:
      "Smoked bacon, double melt, beef that tastes like the grill remembered you.",
    badge: "Fan Pick",
  },
  {
    id: "burger-bowl",
    name: "Smokin Burger Bowl",
    price: "$14.00",
    description:
      "Deconstructed swagger: beef, rice, sauces, crunch — fork it like you mean it.",
    badge: "Local Favorite",
  },
  {
    id: "tallow-fries",
    name: "Beef Tallow Fries",
    price: "$5.00",
    description:
      "Crisp outside, cloud inside — the side that steals the show.",
    badge: "Best Seller",
  },
];

export const menuThemes = [
  "Half pound chargrilled burgers",
  "Beef tallow fries",
  "Protein bowls",
  "Grilled chicken wings",
  "Chicken sandwiches",
  "Meals, sides, desserts, and drinks",
] as const;

export const moreMenuPrices = [
  { name: "Beef and Broccoli Bowl", price: "$13.50" },
  { name: "Smokin Chicken Bowl", price: "$15.00" },
] as const;
