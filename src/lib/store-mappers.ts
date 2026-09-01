import type { Database } from "@/integrations/supabase/types";
import { resolveGallery, resolveImage } from "@/lib/images";
import type { StoreCollection, StoreJournalPost, StoreProduct } from "@/lib/store-types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type CollectionRow = Database["public"]["Tables"]["collections"]["Row"];
type JournalRow = Database["public"]["Tables"]["journal_posts"]["Row"];

export function mapProduct(row: ProductRow): StoreProduct {
  return {
    id: row.id,
    slug: row.slug,
    number: row.number,
    name: row.name,
    collection: row.collection,
    price: Number(row.price),
    comparePrice: row.compare_price === null ? null : Number(row.compare_price),
    rating: Number(row.rating),
    reviews: row.reviews,
    notes: row.notes ?? [],
    description: row.description,
    journey: {
      top: row.journey_top,
      heart: row.journey_heart,
      base: row.journey_base,
    },
    burnTime: row.burn_time,
    wax: row.wax,
    dimensions: row.dimensions,
    image: resolveImage(row.image),
    hoverImage: resolveImage(row.hover_image || row.image),
    gallery: resolveGallery(row.gallery.length > 0 ? row.gallery : [row.image]),
    stock: row.stock,
    isFeatured: row.is_featured,
  };
}

export function mapCollection(row: CollectionRow): StoreCollection {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    copy: row.copy,
    image: resolveImage(row.image),
  };
}

export function mapJournalPost(row: JournalRow): StoreJournalPost {
  return {
    id: row.id,
    slug: row.slug,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    image: resolveImage(row.image),
    readingTime: row.reading_time,
  };
}
