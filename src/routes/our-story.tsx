import { createFileRoute } from "@tanstack/react-router";
import { IMAGES } from "@/lib/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";

const TITLE = "Our Story — Maison Lumière";
const DESCRIPTION =
  "How Maison Lumière composes candles like perfume: small-batch pouring, hand-finished vessels and a standard that never moves.";

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: OurStory,
});

const CHAPTERS = [
  {
    title: "A feeling, first",
    copy: "Every composition begins with a room and a moment — not a formula. Only then do we build the fragrance to match it.",
    image: IMAGES.ingredients,
  },
  {
    title: "Poured by hand",
    copy: "Small batches, low-temperature pours and coconut-soy wax. Each vessel is checked, trimmed and finished individually.",
    image: IMAGES.craftAtelier,
  },
  {
    title: "Made to be kept",
    copy: "Glass and ceramic designed to outlive the wax, packaged so the opening feels like part of the fragrance.",
    image: IMAGES.giftingWrap,
  },
];

function OurStory() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title={"Fragrance as\narchitecture."}
        intro="Maison Lumière was founded on a simple belief: the atmosphere of a room deserves the same care as everything inside it."
      />

      <div className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10 md:pb-40">
        <MaskReveal>
          <img
            src={IMAGES.lifestyleInterior}
            alt="A warm minimalist interior with a lit candle on a marble console"
            loading="lazy"
            width={1600}
            height={900}
            className="h-[50vh] w-full object-cover md:h-[70vh]"
          />
        </MaskReveal>

        <div className="mt-24 space-y-24 md:space-y-36">
          {CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.title}
              className={`grid gap-12 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <MaskReveal>
                <img
                  src={chapter.image}
                  alt={chapter.title}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover"
                />
              </MaskReveal>
              <Reveal delay={0.1}>
                <p className="eyebrow text-muted-foreground">0{index + 1}</p>
                <h2 className="display mt-6 text-[clamp(2rem,4vw,3.25rem)]">{chapter.title}</h2>
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-espresso-soft md:text-base">
                  {chapter.copy}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
