import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getStorefront } from "@/lib/storefront.functions";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal } from "@/components/motion/Reveal";

const VIRTUAL: Record<string, { title: string; copy: string }> = {
  "best-sellers": {
    title: "Best Sellers",
    copy: "The fragrances our customers return to most, ranked by rating and reorders.",
  },
  "new-arrivals": {
    title: "New Arrivals",
    copy: "The most recent additions to the atelier, in small first-run batches.",
  },
};

export const Route = createFileRoute("/collections/$slug")({
  loader: async ({ params }) => {
    const { products: all, collections } = await getStorefront();
    const virtual = VIRTUAL[params.slug];
    if (virtual) {
      const products =
        params.slug === "best-sellers"
          ? [...all].sort((a, b) => b.rating - a.rating)
          : [...all].reverse();
      return { category: { ...virtual, slug: params.slug }, products };
    }
    const category = collections.find((item) => item.slug === params.slug);
    if (!category) throw notFound();
    const products = all.filter((product) => product.collection.toLowerCase() === category.slug);
    return { category, products };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Collection unavailable — Maison Lumière" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.category.title} — Maison Lumière`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.copy },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.copy },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="display text-4xl">Collection not found</h1>
      <Link to="/collections" className="eyebrow mt-8 inline-block border-b border-gold pb-1">
        All collections
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="display text-4xl">This page didn't load</h1>
      <Link to="/collections" className="eyebrow mt-8 inline-block border-b border-gold pb-1">
        All collections
      </Link>
    </div>
  ),
  component: CollectionDetail,
});

function CollectionDetail() {
  const { category, products } = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow="Collection" title={category.title} intro={category.copy} />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        {products.length > 0 ? (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 4) * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="border-y border-border py-16">
            <p className="max-w-lg text-sm leading-relaxed text-espresso-soft">
              This collection is being prepared. In the meantime, the full catalogue is available in
              the shop.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-block bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase"
            >
              Shop all candles
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
