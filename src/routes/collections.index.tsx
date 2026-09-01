import { createFileRoute, Link } from "@tanstack/react-router";
import { getStorefront } from "@/lib/storefront.functions";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Collections — Maison Lumière";
const DESCRIPTION =
  "Signature candles, the Luxury Collection, gift sets, limited editions, personalised and corporate gifting.";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  loader: () => getStorefront(),
  component: Collections,
});

function Collections() {
  const { collections: CATEGORIES } = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="Collections"
        title="Six ways to light a room."
        intro="Each collection is built around a different intention — everyday ritual, rare fragrance, or a gift that must land perfectly."
      />
      <div className="mx-auto grid max-w-[1600px] gap-x-8 gap-y-14 px-5 pb-28 md:grid-cols-2 md:px-10 lg:grid-cols-3">
        {CATEGORIES.map((category, index) => (
          <Reveal key={category.slug} delay={(index % 3) * 0.08}>
            <Link to="/collections/$slug" params={{ slug: category.slug }} className="group block">
              <div className="overflow-hidden bg-cream">
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.07]"
                />
              </div>
              <h2 className="mt-6 font-serif text-2xl">{category.title}</h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-espresso-soft">
                {category.copy}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
