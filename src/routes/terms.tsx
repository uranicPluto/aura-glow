import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

const TITLE = "Terms of Service — Maison Lumière";
const DESCRIPTION =
  "The terms that apply to orders, pricing, gifting services and use of the Maison Lumière website.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <InfoPage
      eyebrow="Terms"
      title="Terms of service."
      intro="These terms cover orders placed through this website, including gifting and corporate services."
      sections={[
        {
          heading: "Orders",
          body: [
            "An order is confirmed once payment is authorised. We may cancel and refund an order where stock or delivery cannot be honoured.",
          ],
        },
        {
          heading: "Pricing",
          body: [
            "Prices are shown in the displayed currency and exclude duties unless stated. We may adjust pricing for future orders at any time.",
          ],
        },
        {
          heading: "Corporate orders",
          body: [
            "Custom-branded corporate orders are produced to specification and are non-returnable once production begins.",
          ],
        },
        {
          heading: "Safety",
          body: [
            "Candles must be burned according to the guidance on the base label and our candle care page. Never leave a lit candle unattended.",
          ],
        },
      ]}
    />
  );
}
