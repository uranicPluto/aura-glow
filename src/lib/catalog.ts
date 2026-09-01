import heroCandle from "@/assets/hero-candle.jpg";
import flameMacro from "@/assets/flame-macro.jpg";
import productSignature from "@/assets/product-signature.jpg";
import productLuxury from "@/assets/product-luxury.jpg";
import giftSet from "@/assets/gift-set.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import craftAtelier from "@/assets/craft-atelier.jpg";
import ingredients from "@/assets/ingredients.jpg";
import giftingWrap from "@/assets/gifting-wrap.jpg";
import journalRoom from "@/assets/journal-room.jpg";
import journalRitual from "@/assets/journal-ritual.jpg";

export const IMAGES = {
  heroCandle,
  flameMacro,
  productSignature,
  productLuxury,
  giftSet,
  lifestyleInterior,
  craftAtelier,
  ingredients,
  giftingWrap,
  journalRoom,
  journalRitual,
};

export type Product = {
  slug: string;
  number: string;
  name: string;
  collection: string;
  price: number;
  rating: number;
  reviews: number;
  notes: string[];
  image: string;
  hoverImage: string;
  gallery: string[];
  description: string;
  journey: { top: string; heart: string; base: string };
  burnTime: string;
  wax: string;
  dimensions: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "santal-amber",
    number: "No. 01",
    name: "Santal & Amber",
    collection: "Signature",
    price: 96,
    rating: 4.9,
    reviews: 412,
    notes: ["Sandalwood", "Amber", "Vanilla", "Cedar"],
    image: productSignature,
    hoverImage: heroCandle,
    gallery: [productSignature, heroCandle, ingredients, giftSet, flameMacro],
    description:
      "A slow, resinous warmth built on Mysore sandalwood and amber, softened with vanilla absolute and dry cedar. The scent of a room that has been lived in beautifully.",
    journey: {
      top: "Bergamot · Pink Pepper",
      heart: "Sandalwood · Amber Resin",
      base: "Vanilla Absolute · Cedarwood",
    },
    burnTime: "60 hours",
    wax: "Coconut-soy blend, cotton wick",
    dimensions: "9.5 cm × 8 cm · 320 g",
  },
  {
    slug: "noir-oud",
    number: "No. 02",
    name: "Noir Oud",
    collection: "Luxury",
    price: 168,
    rating: 5.0,
    reviews: 188,
    notes: ["Oud", "Saffron", "Leather", "Incense"],
    image: productLuxury,
    hoverImage: flameMacro,
    gallery: [productLuxury, flameMacro, ingredients, lifestyleInterior],
    description:
      "Our most exclusive composition. Rare oud is layered with saffron and smoked leather, poured into hand-finished smoked glass with a gilded rim.",
    journey: {
      top: "Saffron · Black Plum",
      heart: "Oud · Smoked Leather",
      base: "Frankincense · Patchouli",
    },
    burnTime: "75 hours",
    wax: "Coconut-soy blend, double cotton wick",
    dimensions: "11 cm × 9 cm · 420 g",
  },
  {
    slug: "fig-cassis",
    number: "No. 03",
    name: "Fig & Cassis",
    collection: "Signature",
    price: 88,
    rating: 4.8,
    reviews: 306,
    notes: ["Black Fig", "Cassis", "Green Leaf", "Musk"],
    image: journalRoom,
    hoverImage: journalRitual,
    gallery: [journalRoom, journalRitual, ingredients, giftSet],
    description:
      "Sunlit and quietly green — ripe black fig and cassis over crushed leaves, finished with a clean white musk.",
    journey: {
      top: "Cassis · Citrus Leaf",
      heart: "Black Fig · Violet",
      base: "White Musk · Vetiver",
    },
    burnTime: "58 hours",
    wax: "Coconut-soy blend, cotton wick",
    dimensions: "9.5 cm × 8 cm · 320 g",
  },
  {
    slug: "maison-duo",
    number: "No. 04",
    name: "Maison Duo Coffret",
    collection: "Gift Sets",
    price: 210,
    rating: 4.9,
    reviews: 143,
    notes: ["Santal & Amber", "Fig & Cassis", "Gold Ribbon", "Hand-tied"],
    image: giftSet,
    hoverImage: giftingWrap,
    gallery: [giftSet, giftingWrap, productSignature, lifestyleInterior],
    description:
      "Two signature candles nested in an espresso lacquer coffret with cream tissue, a gilded ribbon and a hand-written card.",
    journey: {
      top: "Bergamot · Cassis",
      heart: "Sandalwood · Black Fig",
      base: "Vanilla · White Musk",
    },
    burnTime: "60 hours each",
    wax: "Coconut-soy blend, cotton wick",
    dimensions: "Coffret 26 cm × 14 cm",
  },
];

export const CATEGORIES = [
  {
    slug: "signature",
    title: "Signature Candles",
    copy: "Everyday luxury and signature fragrances.",
    image: productSignature,
  },
  {
    slug: "luxury",
    title: "Luxury Collection",
    copy: "Rare fragrances, premium vessels, elevated craftsmanship.",
    image: productLuxury,
  },
  {
    slug: "gift-sets",
    title: "Gift Sets",
    copy: "Curated collections designed for unforgettable gifting.",
    image: giftSet,
  },
  {
    slug: "limited-editions",
    title: "Limited Editions",
    copy: "Exclusive seasonal and limited-production creations.",
    image: flameMacro,
  },
  {
    slug: "personalised",
    title: "Personalised Gifts",
    copy: "Premium candles customised for special occasions.",
    image: giftingWrap,
  },
  {
    slug: "corporate",
    title: "Corporate Gifting",
    copy: "Luxury gifting for companies, events and important clients.",
    image: lifestyleInterior,
  },
];

export const BENEFITS = [
  {
    title: "Relaxation",
    copy: "Create a calming environment after a long day.",
  },
  {
    title: "Atmosphere",
    copy: "Transform an ordinary room into an intentional space.",
  },
  {
    title: "Fragrance",
    copy: "A signature scent that becomes part of your environment.",
  },
  {
    title: "Mindfulness",
    copy: "Slow down, disconnect, and enjoy the present moment.",
  },
  {
    title: "Gifting",
    copy: "Turn a simple gift into a memorable experience.",
  },
  {
    title: "Design",
    copy: "Premium vessels designed to complement sophisticated interiors.",
  },
];

export const STEPS = [
  {
    number: "01",
    title: "Choose",
    copy: "Discover a fragrance designed for your mood, space, or occasion.",
  },
  {
    number: "02",
    title: "Light",
    copy: "Light your candle and allow the fragrance to gradually transform the atmosphere.",
  },
  {
    number: "03",
    title: "Experience",
    copy: "Relax, reconnect, celebrate, or simply enjoy the moment.",
  },
];

export const TESTIMONIALS = [
  {
    name: "Aditi Raghunath",
    location: "Mumbai, India",
    product: "Santal & Amber",
    rating: 5,
    quote: "It has become the first thing I do when I come home. The room changes before I do.",
  },
  {
    name: "Léa Marchand",
    location: "Paris, France",
    product: "Noir Oud",
    rating: 5,
    quote: "Genuinely comparable to the fragrance houses I buy from. The vessel alone is worth it.",
  },
  {
    name: "James Okafor",
    location: "London, UK",
    product: "Maison Duo Coffret",
    rating: 5,
    quote:
      "I sent this to a client and got a phone call to say thank you. That has never happened before.",
  },
  {
    name: "Sofia Alvarez",
    location: "Madrid, Spain",
    product: "Fig & Cassis",
    rating: 5,
    quote:
      "Green, quiet and expensive-smelling without ever being loud. My whole flat smells considered.",
  },
  {
    name: "Yuki Tanabe",
    location: "Tokyo, Japan",
    product: "Santal & Amber",
    rating: 5,
    quote: "Sixty hours and the throw never faded. The burn is perfectly even.",
  },
  {
    name: "Hannah Weiss",
    location: "Berlin, Germany",
    product: "Noir Oud",
    rating: 5,
    quote: "The packaging made me pause before opening it. That is a rare feeling now.",
  },
];

export const VIDEO_TESTIMONIALS = [
  {
    name: "Priya Menon",
    location: "Bengaluru, India",
    product: "Maison Duo Coffret",
    quote: "I now gift nothing else.",
    poster: giftingWrap,
  },
  {
    name: "Marc Deveraux",
    location: "Geneva, Switzerland",
    product: "Noir Oud",
    quote: "It made my study feel like a hotel suite.",
    poster: lifestyleInterior,
  },
  {
    name: "Elena Rossi",
    location: "Milan, Italy",
    product: "Fig & Cassis",
    quote: "Every evening starts with lighting it.",
    poster: journalRitual,
  },
];

export const STATS: {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}[] = [
  { value: 10000, suffix: "+", label: "Happy Customers" },
  { value: 50, suffix: "+", label: "Premium Fragrances" },
  { value: 25, suffix: "+", label: "Countries Reached" },
  { value: 4.9, suffix: "/5", label: "Customer Rating", decimals: 1 },
];

export const GIFT_OCCASIONS = [
  "For Her",
  "For Him",
  "For Couples",
  "Birthdays",
  "Anniversaries",
  "Weddings",
  "Corporate",
  "Festive",
  "Just Because",
];

export const JOURNAL = [
  {
    slug: "how-scent-changes-a-room",
    category: "Fragrance",
    title: "How scent changes the feeling of a room",
    excerpt: "Light and fragrance do the same work as furniture — quietly, and much faster.",
    image: journalRoom,
    readingTime: "6 min",
  },
  {
    slug: "the-art-of-luxury-gifting",
    category: "Gifting",
    title: "The art of luxury gifting",
    excerpt: "Why the object matters less than the moment it creates when it is opened.",
    image: giftingWrap,
    readingTime: "5 min",
  },
  {
    slug: "your-perfect-evening-ritual",
    category: "Wellness",
    title: "Creating your perfect evening ritual",
    excerpt: "A short, repeatable sequence that tells your body the day is finished.",
    image: journalRitual,
    readingTime: "4 min",
  },
];

export const COMPARISON = {
  mass: [
    "Generic fragrances",
    "Mass production",
    "Ordinary packaging",
    "Forgettable gifting",
    "Short-term trends",
  ],
  ours: [
    "Curated fragrances",
    "Premium craftsmanship",
    "Luxury design",
    "Meaningful gifting",
    "Timeless experiences",
  ],
};
