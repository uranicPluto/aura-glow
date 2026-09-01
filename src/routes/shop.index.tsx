import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getStorefront } from "@/lib/storefront.functions";
import { ProductCard } from "@/components/site/ProductCard";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Shop All Candles — Maison Lumière";
const DESCRIPTION =
  "Browse every hand-poured Maison Lumière candle, gift set and limited edition, with fragrance notes and burn times.";

export const Route = createFileRoute("/shop/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  loader: () => getStorefront(),
  component: Shop,
});

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price · low" },
  { id: "price-desc", label: "Price · high" },
  { id: "rating", label: "Top rated" },
] as const;

function Shop() {
  const { products: PRODUCTS, collections: CATEGORIES } = Route.useLoaderData();
  const [collection, setCollection] = useState<string>("all");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");

  const products = useMemo(() => {
    const filtered =
      collection === "all"
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.collection.toLowerCase() === collection);
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [collection, sort, PRODUCTS]);

  const collections = [
    { slug: "all", title: "All" },
    ...CATEGORIES.filter((category) =>
      PRODUCTS.some((product) => product.collection.toLowerCase() === category.slug),
    ).map((category) => ({ slug: category.slug, title: category.title })),
  ];

  return (
    <>
      <PageHeader
        eyebrow="The collection"
        title="Every fragrance, in one place."
        intro="Composed like perfume, poured by hand in small batches. Filter by collection to find the mood you are after."
      />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-border py-5">
          <ul className="flex flex-wrap gap-2">
            {collections.map((item) => (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => setCollection(item.slug)}
                  aria-pressed={collection === item.slug}
                  className={`border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors duration-500 ${
                    collection === item.slug
                      ? "border-espresso bg-espresso text-ivory"
                      : "border-border hover:border-gold"
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
          <label className="flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as (typeof SORTS)[number]["id"])}
              className="border border-border bg-transparent px-3 py-2 text-[11px] tracking-[0.16em] uppercase focus:border-gold focus:outline-none"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-x-8 gap-y-16 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
