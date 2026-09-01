import { STATS } from "@/lib/catalog";
import { Counter, Reveal } from "@/components/motion/Reveal";

export function Stats() {
  return (
    <section aria-label="Brand milestones" className="bg-espresso py-20 text-ivory md:py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal as="li" key={stat.label} delay={index * 0.1}>
              <p className="font-serif text-5xl text-champagne md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="eyebrow mt-4 text-ivory/60">{stat.label}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
