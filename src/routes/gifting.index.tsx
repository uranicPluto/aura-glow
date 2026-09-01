import { createFileRoute, Link } from "@tanstack/react-router";
import { GIFT_OCCASIONS, IMAGES, PRODUCTS } from "@/lib/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";

const TITLE = "Luxury Gifting — Maison Lumière";
const DESCRIPTION =
  "Hand-wrapped luxury candle gifts for every occasion, with handwritten notes, gift sets and worldwide delivery.";

export const Route = createFileRoute("/gifting/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Gifting,
});

function Gifting() {
  const giftSets = PRODUCTS.filter((product) => product.collection.toLowerCase() === "gift sets");
  const featured = giftSets.length > 0 ? giftSets : PRODUCTS.slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Gifting"
        title={"Gifts that are\nnever forgotten."}
        intro="Rigid lacquer boxes, cream tissue, gilded ribbon and a handwritten note — wrapped before it leaves the atelier."
      />

      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <MaskReveal>
          <img
            src={IMAGES.giftSet}
            alt="A two-candle gift coffret with gilded ribbon on cream linen"
            loading="lazy"
            width={1600}
            height={900}
            className="h-[46vh] w-full object-cover md:h-[64vh]"
          />
        </MaskReveal>

        <ul className="mt-16 flex flex-wrap gap-2">
          {GIFT_OCCASIONS.map((occasion, index) => (
            <Reveal as="li" key={occasion} delay={index * 0.04}>
              <span className="block border border-border px-4 py-2 text-[11px] tracking-[0.16em] uppercase">
                {occasion}
              </span>
            </Reveal>
          ))}
        </ul>

        <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 mb-28 flex flex-wrap items-center justify-between gap-8 border-y border-border py-12">
            <div>
              <h2 className="display text-[clamp(1.75rem,3.5vw,2.75rem)]">Corporate gifting</h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-espresso-soft">
                Custom branding, bulk pricing and dedicated account management for clients, events
                and employee gifting.
              </p>
            </div>
            <Link
              to="/gifting/corporate"
              className="bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:bg-ink"
            >
              Make an enquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
