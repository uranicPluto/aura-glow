import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

const TITLE = "Shipping — Maison Lumière";
const DESCRIPTION =
  "Insured worldwide delivery for luxury candles: domestic and international timelines, gift wrapping and order tracking.";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <InfoPage
      eyebrow="Shipping"
      title="Delivered as it left us."
      intro="Every order is packed in protective rigid boxes, fully insured and tracked from the atelier to the door."
      sections={[
        {
          heading: "Domestic delivery",
          body: [
            "Dispatched within 24 hours and delivered in 2–4 business days. Complimentary on orders above $150.",
          ],
        },
        {
          heading: "International delivery",
          body: [
            "5–9 business days to 25+ countries, tracked and insured. Duties and taxes are calculated at checkout where applicable.",
          ],
        },
        {
          heading: "Gift orders",
          body: [
            "Gift orders ship without pricing on any paperwork, hand-wrapped with a handwritten note card in the box.",
          ],
        },
        {
          heading: "Tracking",
          body: [
            "A tracking link is emailed as soon as the parcel leaves the atelier, with delivery updates until it arrives.",
          ],
        },
      ]}
    />
  );
}
