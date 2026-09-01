import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

const TITLE = "Privacy Policy — Maison Lumière";
const DESCRIPTION =
  "How Maison Lumière collects, uses and protects customer data across orders, accounts and marketing.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Your data, handled carefully."
      intro="We collect only what is needed to fulfil an order and improve the experience, and we never sell customer data."
      sections={[
        {
          heading: "What we collect",
          body: [
            "Contact and delivery details, order history, and — if you create an account — saved wishlists and preferences.",
          ],
        },
        {
          heading: "Payments",
          body: [
            "Card, UPI and wallet details are processed by our payment provider. We never see or store full payment credentials.",
          ],
        },
        {
          heading: "Marketing",
          body: [
            "Newsletter emails are sent only with consent, and every email includes a one-click unsubscribe link.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You can request a copy of your data or ask us to delete your account at any time by contacting our care team.",
          ],
        },
      ]}
    />
  );
}
