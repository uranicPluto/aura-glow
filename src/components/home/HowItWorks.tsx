import { STEPS } from "@/lib/catalog";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="bg-cream py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">How it works</p>
        </Reveal>
        <h2 id="how-it-works" className="display mt-7 max-w-2xl text-[clamp(2.25rem,5vw,4.25rem)]">
          <TextReveal text="From flame to feeling." />
        </h2>

        <ol className="mt-16 grid gap-px border-t border-border md:grid-cols-3">
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 0.12}
              className="group relative border-b border-border bg-cream px-0 py-10 md:border-r md:px-9 md:last:border-r-0"
            >
              <span className="font-serif text-6xl text-champagne transition-colors duration-700 group-hover:text-gold md:text-7xl">
                {step.number}
              </span>
              <h3 className="mt-6 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-espresso-soft">
                {step.copy}
              </p>
              <span className="mt-8 block h-px w-0 bg-gold transition-all duration-1000 ease-[var(--ease-luxe)] group-hover:w-24" />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
