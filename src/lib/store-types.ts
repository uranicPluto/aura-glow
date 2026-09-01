export type StoreProduct = {
  id: string;
  slug: string;
  number: string;
  name: string;
  collection: string;
  price: number;
  comparePrice: number | null;
  rating: number;
  reviews: number;
  notes: string[];
  description: string;
  journey: { top: string; heart: string; base: string };
  burnTime: string;
  wax: string;
  dimensions: string;
  image: string;
  hoverImage: string;
  gallery: string[];
  stock: number;
  isFeatured: boolean;
};

export type StoreCollection = {
  id: string;
  slug: string;
  title: string;
  copy: string;
  image: string;
};

export type StoreJournalPost = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  readingTime: string;
};

export type SiteContent = Record<string, string>;

export type OrderLineInput = { slug: string; quantity: number };

export type CustomerOrder = {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number; unitPrice: number; image: string }[];
};
