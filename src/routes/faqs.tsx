import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

const TITLE = "FAQs — Maison Lumière";
const DESCRIPTION =
  "Answers on burn times, wax and wicks, shipping, gifting, personalisation and caring for your Maison Lumière candle.";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Faqs,
});

function Faqs() {
  return (
    <InfoPage
      eyebrow="FAQs"
      title="Questions, answered."
      intro="Everything about our wax, burn times, gifting and delivery. If something is missing, our team replies within one business day."
      sections={[
        {
          heading: "How long does each candle burn?",
          body: [
            "Signature candles burn for approximately 60 hours and the Luxury Collection for up to 75 hours, based on four-hour sessions with the wick trimmed to 5 mm.",
          ],
        },
        {
          heading: "What wax and wicks do you use?",
          body: [
            "A coconut-soy blend with cotton wicks, poured at low temperature. No paraffin, no dyes, and fragrance loads kept within IFRA guidance.",
          ],
        },
        {
          heading: "Can I personalise a gift?",
          body: [
            "Yes. Handwritten notes are included with every gift order, and engraved lids and custom branding are available for corporate orders of 25 units or more.",
          ],
        },
        {
          heading: "Do you ship worldwide?",
          body: [
            "We ship to 25+ countries. Domestic orders arrive in 2–4 business days and international orders in 5–9 business days, fully insured.",
          ],
        },
        {
          heading: "Can I reuse the vessel?",
          body: [
            "The glass and ceramic vessels are designed to be kept. Once the wax is finished, wash with warm soapy water and use it as a holder or tumbler.",
          ],
        },
      ]}
    />
  );
}
