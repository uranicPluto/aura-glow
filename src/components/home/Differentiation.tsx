import { Check, Minus } from "lucide-react";
import { COMPARISON } from "@/lib/catalog";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function Differentiation() {
  return (
    <section aria-labelledby="difference" className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">The difference</p>
        </Reveal>
        <h2 id="difference" className="display mt-7 max-w-3xl text-[clamp(2.25rem,5vw,4.25rem)]">
          <TextReveal text="Not another candle brand." />
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden border border-border md:grid-cols-2">
          <Reveal className="bg-cream p-8 md:p-12">
            <p className="eyebrow text-muted-foreground">Ordinary candles</p>
            <ul className="mt-8 space-y-5">
              {COMPARISON.mass.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 text-sm text-muted-foreground line-through decoration-border"
                >
                  <Minus className="size-4 shrink-0" strokeWidth={1} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="bg-espresso p-8 text-ivory md:p-12">
            <p className="eyebrow text-champagne">Maison Lumière</p>
            <ul className="mt-8 space-y-5">
              {COMPARISON.ours.map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm">
                  <Check className="size-4 shrink-0 text-champagne" strokeWidth={1} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
