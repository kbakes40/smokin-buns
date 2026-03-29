export const business = {
  name: "Smokin Buns",
  tagline: "Chargrilled Burgers and Bowls",
  description:
    "Half-pound chargrilled burgers, beef tallow fries, protein bowls, and wings — bold Belleville flavor, built for people who eat hungry.",
  address: {
    street: "10816 Belleville Rd",
    city: "Belleville",
    state: "MI",
    zip: "",
    full: "10816 Belleville Rd, Belleville, MI",
  },
  phone: "(734) 555-0142",
  phoneTel: "+17345550142",
  orderUrl: "https://www.smokinbuns.com/order",
  email: "hello@smokinbuns.com",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
  ],
} as const;

export const hours = {
  summary: "Open daily",
  lines: ["11 AM – 10 PM", "Every day"],
} as const;

export type NavItem = { label: string; href: string };

export const navLinks: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Order Online", href: business.orderUrl },
];

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The patties taste like they actually hit charcoal — not that flat-top steam thing. Fries in tallow are ridiculous. Worth the drive from Canton.",
    name: "Marcus T.",
    detail: "Regular · picked up twice last month",
  },
  {
    quote:
      "Portions don’t play. Bacon cheeseburger was stacked, pickles still crunchy, cheese actually melted. This is what I want when I’m starving.",
    name: "Janelle R.",
    detail: "Belleville local",
  },
  {
    quote:
      "Smokin bowl hits when I’m trying to eat cleaner but still want smoke and char. Chicken was juicy, rice wasn’t dry — rare combo.",
    name: "Devon K.",
    detail: "Works nearby · lunch spot",
  },
];

export const whyUs = [
  {
    title: "Half pound chargrilled burgers",
    body: "Serious weight, real char, built for the first bite to matter.",
  },
  {
    title: "Beef tallow fries",
    body: "Crisp outside, potato inside, finish you’ll think about tomorrow.",
  },
  {
    title: "Protein packed bowls",
    body: "Bowls with smoke, savor, and balance — not a sad desk lunch.",
  },
  {
    title: "Made to order",
    body: "Your food hits the grill when you order — not when we guess.",
  },
  {
    title: "Fast pickup",
    body: "In and out without the chaos — hot timing, clean handoff.",
  },
  {
    title: "Bold local flavor",
    body: "Belleville energy: confident, loud on flavor, never apologetic.",
  },
] as const;
