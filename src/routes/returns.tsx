import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

const TITLE = "Returns — Maison Lumière";
const DESCRIPTION =
  "Our 30-day returns policy for unused luxury candles, plus how damaged parcels and gift returns are handled.";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Returns,
});

function Returns() {
  return (
    <InfoPage
      eyebrow="Returns"
      title="If it isn't right, tell us."
      intro="We would rather fix it than have a candle sit unused. Most requests are resolved the same day."
      sections={[
        {
          heading: "30-day window",
          body: [
            "Unused candles in their original packaging can be returned within 30 days of delivery for a full refund.",
          ],
        },
        {
          heading: "Damaged in transit",
          body: [
            "Send a photograph of the parcel and vessel within 48 hours of delivery and a replacement ships immediately at no cost.",
          ],
        },
        {
          heading: "Gift returns",
          body: [
            "Recipients can exchange a gift for another fragrance of the same value without the purchaser being notified.",
          ],
        },
        {
          heading: "How to start",
          body: [
            "Email our care team with your order number and we will arrange a collection or prepaid label.",
          ],
        },
      ]}
    />
  );
}
