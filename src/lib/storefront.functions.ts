import { createServerFn } from "@tanstack/react-start";
import { slugSchema } from "@/lib/store-schemas";
import { mapCollection, mapJournalPost, mapProduct } from "@/lib/store-mappers";
import { CATEGORIES, JOURNAL, PRODUCTS } from "@/lib/catalog";
import type { SiteContent, StoreCollection, StoreJournalPost, StoreProduct } from "@/lib/store-types";

function fallbackProducts(): StoreProduct[] {
  return PRODUCTS.map((p, idx) => ({
    id: `static-${idx + 1}`,
    slug: p.slug,
    number: p.number,
    name: p.name,
    collection: p.collection,
    price: p.price,
    comparePrice: null,
    rating: p.rating,
    reviews: p.reviews,
    notes: p.notes,
    description: p.description,
    journey: p.journey,
    burnTime: p.burnTime,
    wax: p.wax,
    dimensions: p.dimensions,
    image: p.image,
    hoverImage: p.hoverImage,
    gallery: p.gallery,
    stock: 25,
    isFeatured: idx < 4,
  }));
}

function fallbackCollections(): StoreCollection[] {
  return CATEGORIES.map((c, idx) => ({
    id: `static-col-${idx + 1}`,
    slug: c.slug,
    title: c.title,
    copy: c.copy,
    image: c.image,
  }));
}

function fallbackJournal(): StoreJournalPost[] {
  return JOURNAL.map((j, idx) => ({
    id: `static-j-${idx + 1}`,
    slug: j.slug,
    category: j.category,
    title: j.title,
    excerpt: j.excerpt,
    body: j.excerpt,
    image: j.image,
    readingTime: j.readingTime,
  }));
}

export const getStorefront = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { createPublicClient } = await import("./supabase-public.server");
    const supabase = createPublicClient();

    if (!supabase) {
      return {
        products: fallbackProducts(),
        collections: fallbackCollections(),
        journal: fallbackJournal(),
        content: {},
      };
    }

    const [products, collections, journal, content] = await Promise.all([
      supabase.from("products").select("*").order("sort_order"),
      supabase.from("collections").select("*").order("sort_order"),
      supabase.from("journal_posts").select("*").order("sort_order"),
      supabase.from("site_content").select("key, value"),
    ]);

    const mappedProducts = (products.data ?? []).map(mapProduct);
    const mappedCollections = (collections.data ?? []).map(mapCollection);
    const mappedJournal = (journal.data ?? []).map(mapJournalPost);

    const siteContent: SiteContent = {};
    for (const row of content.data ?? []) siteContent[row.key] = row.value;

    return {
      products: mappedProducts.length > 0 ? mappedProducts : fallbackProducts(),
      collections: mappedCollections.length > 0 ? mappedCollections : fallbackCollections(),
      journal: mappedJournal.length > 0 ? mappedJournal : fallbackJournal(),
      content: siteContent,
    };
  } catch (error) {
    console.error("[getStorefront] Error loading from Supabase, using fallback:", error);
    return {
      products: fallbackProducts(),
      collections: fallbackCollections(),
      journal: fallbackJournal(),
      content: {},
    };
  }
});

export const getProduct = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => slugSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { createPublicClient } = await import("./supabase-public.server");
      const supabase = createPublicClient();

      if (supabase) {
        const { data: row } = await supabase
          .from("products")
          .select("*")
          .eq("slug", data.slug)
          .maybeSingle();

        if (row) {
          const { data: related } = await supabase
            .from("products")
            .select("*")
            .neq("slug", data.slug)
            .order("sort_order")
            .limit(3);

          return {
            product: mapProduct(row),
            related: (related ?? []).map(mapProduct),
          };
        }
      }
    } catch (error) {
      console.error("[getProduct] Error loading from Supabase:", error);
    }

    const staticList = fallbackProducts();
    const product = staticList.find((p) => p.slug === data.slug);
    if (!product) return null;

    const related = staticList.filter((p) => p.slug !== data.slug).slice(0, 3);
    return { product, related };
  });

export const getJournalPost = createServerFn({ method: "GET" })
  .validator((input: { slug: string }) => slugSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const { createPublicClient } = await import("./supabase-public.server");
      const supabase = createPublicClient();

      if (supabase) {
        const { data: row } = await supabase
          .from("journal_posts")
          .select("*")
          .eq("slug", data.slug)
          .maybeSingle();

        if (row) return mapJournalPost(row);
      }
    } catch (error) {
      console.error("[getJournalPost] Error loading from Supabase:", error);
    }

    const staticList = fallbackJournal();
    return staticList.find((j) => j.slug === data.slug) ?? null;
  });

