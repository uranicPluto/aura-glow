import { createFileRoute } from "@tanstack/react-router";
import { InfoPage } from "@/components/site/InfoPage";

const TITLE = "Candle Care — Maison Lumière";
const DESCRIPTION =
  "How to get a clean, even burn from a hand-poured luxury candle: first burn, wick trimming, burn sessions and vessel care.";

export const Route = createFileRoute("/candle-care")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: CandleCare,
});

function CandleCare() {
  return (
    <InfoPage
      eyebrow="Candle care"
      title="Burn it beautifully."
      intro="A few small habits keep the pool even, the throw strong and the vessel clean for its full sixty hours."
      sections={[
        {
          heading: "The first burn",
          body: [
            "Burn for two to three hours the first time so the wax melts to the edge of the vessel. This sets the memory of the pool and prevents tunnelling.",
          ],
        },
        {
          heading: "Trim before every light",
          body: [
            "Trim the wick to 5 mm before each use. An untrimmed wick produces soot, a high flame and an uneven pool.",
          ],
        },
        {
          heading: "Four hours, then rest",
          body: [
            "Never burn for more than four hours at a time. Let the wax set fully before relighting so the fragrance stays balanced.",
          ],
        },
        {
          heading: "Keep the last centimetre",
          body: [
            "Stop burning when 1 cm of wax remains to protect the vessel, then wash it with warm soapy water and keep it.",
          ],
        },
      ]}
    />
  );
}
