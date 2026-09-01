import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Wishlist — Maison Lumière";
const DESCRIPTION =
  "Save Maison Lumière candles and gift sets to your wishlist and return to them any time.";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  return (
    <>
      <PageHeader
        eyebrow="Wishlist"
        title="Saved for later."
        intro="Wishlists sync to your account in the next release, so a fragrance you loved is never lost."
      />
      <div className="mx-auto max-w-[1600px] px-5 pb-40 md:px-10">
        <Reveal>
          <div className="border-y border-border py-16">
            <p className="max-w-lg text-sm leading-relaxed text-espresso-soft">
              Nothing saved yet. Browse the collection and save the fragrances you want to come back
              to.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-block bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase"
            >
              Shop candles
            </Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
