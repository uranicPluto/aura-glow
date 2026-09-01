import { Flame, Gift, Home, Leaf, Sparkles, Wind } from "lucide-react";
import { BENEFITS } from "@/lib/catalog";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

const ICONS = [Leaf, Home, Wind, Sparkles, Gift, Flame];

export function Benefits() {
  return (
    <section aria-labelledby="why-it-matters" className="bg-espresso py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-champagne">Why it matters</p>
            </Reveal>
            <h2 id="why-it-matters" className="display mt-7 text-[clamp(2.25rem,5vw,4.25rem)]">
              <TextReveal text={"A candle is small.\nWhat it changes is not."} />
            </h2>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base">
              The difference is not the wax. It is what happens in the room afterwards — how you
              sit, how you speak, how the evening slows down and how a gift is remembered years
              later.
            </p>
          </Reveal>
        </div>

        <ul className="mt-20 grid gap-px border-t border-ivory/15 md:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit, index) => {
            const Icon = ICONS[index % ICONS.length]!;
            return (
              <Reveal
                as="li"
                key={benefit.title}
                delay={(index % 3) * 0.1}
                className="group border-b border-ivory/15 py-10 md:border-r md:px-8 lg:[&:nth-child(3n)]:border-r-0"
              >
                <Icon
                  className="size-6 text-champagne transition-colors duration-700 group-hover:text-gold"
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <h3 className="mt-7 font-serif text-2xl">{benefit.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/65">
                  {benefit.copy}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
