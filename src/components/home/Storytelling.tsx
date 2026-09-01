import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES } from "@/lib/catalog";
import { MaskReveal, Reveal, TextReveal } from "@/components/motion/Reveal";

const DETAILS = [
  { label: "Wax", copy: "Coconut-soy blend, poured at low temperature for a clean, even burn." },
  { label: "Flame", copy: "Cotton wicks trimmed and tested batch by batch." },
  { label: "Vessel", copy: "Hand-finished glass and ceramic designed to be kept." },
  { label: "Packaging", copy: "Rigid lacquer boxes, cream tissue, gilded ribbon." },
];

export function Storytelling() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} aria-labelledby="craft" className="relative bg-cream">
      <div className="relative h-[80vh] overflow-hidden md:h-screen">
        <motion.img
          src={IMAGES.flameMacro}
          alt="Macro photograph of a candle flame above a molten wax pool"
          loading="lazy"
          width={1280}
          height={1600}
          className="absolute inset-0 size-full scale-110 object-cover"
          {...(reduced ? {} : { style: { y } })}
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10">
            <h2
              id="craft"
              className="display max-w-3xl text-[clamp(2.25rem,6vw,5.5rem)] text-ivory"
            >
              <TextReveal text={"Made to be noticed.\nDesigned to be remembered."} />
            </h2>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <MaskReveal>
            <img
              src={IMAGES.ingredients}
              alt="Sandalwood, amber resin, vanilla pods and wax flakes arranged on marble"
              loading="lazy"
              width={1280}
              height={1280}
              className="aspect-square w-full object-cover"
            />
          </MaskReveal>
          <div>
            <Reveal>
              <p className="eyebrow text-muted-foreground">Craftsmanship</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 font-serif text-2xl leading-snug md:text-3xl">
                Fragrance is composed like perfume, then built to live in a room for sixty hours.
              </p>
            </Reveal>
            <dl className="mt-12 divide-y divide-border border-y border-border">
              {DETAILS.map((detail, index) => (
                <Reveal key={detail.label} delay={index * 0.08}>
                  <div className="grid gap-2 py-5 md:grid-cols-[130px_1fr] md:gap-8">
                    <dt className="eyebrow text-muted-foreground">{detail.label}</dt>
                    <dd className="text-sm leading-relaxed text-espresso-soft">{detail.copy}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
