import { createServerFn } from "@tanstack/react-start";
import { slugSchema } from "@/lib/store-schemas";
import { mapCollection, mapJournalPost, mapProduct } from "@/lib/store-mappers";
import type { SiteContent } from "@/lib/store-types";

export const getStorefront = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicClient } = await import("./supabase-public.server");
  const supabase = createPublicClient();

  const [products, collections, journal, content] = await Promise.all([
    supabase.from("products").select("*").order("sort_order"),
    supabase.from("collections").select("*").order("sort_order"),
    supabase.from("journal_posts").select("*").order("sort_order"),
    supabase.from("site_content").select("key, value"),
  ]);

  const siteContent: SiteContent = {};
  for (const row of content.data ?? []) siteContent[row.key] = row.value;

  return {
    products: (products.data ?? []).map(mapProduct),
    collections: (collections.data ?? []).map(mapCollection),
    journal: (journal.data ?? []).map(mapJournalPost),
    content: siteContent,
  };
});

export const getProduct = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => slugSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicClient } = await import("./supabase-public.server");
    const supabase = createPublicClient();

    const { data: row } = await supabase
      .from("products")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();

    if (!row) return null;

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
  });

export const getJournalPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => slugSchema.parse(input))
  .handler(async ({ data }) => {
    const { createPublicClient } = await import("./supabase-public.server");
    const supabase = createPublicClient();

    const { data: row } = await supabase
      .from("journal_posts")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();

    return row ? mapJournalPost(row) : null;
  });
