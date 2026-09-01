import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES } from "@/lib/catalog";
import { MaskReveal, Reveal, TextReveal } from "@/components/motion/Reveal";

const CHAPTERS = [
  {
    word: "Scent",
    copy: "Fragrance composed like perfume — top, heart and base notes that unfold over hours.",
    image: IMAGES.ingredients,
  },
  {
    word: "Light",
    copy: "A single flame changes the temperature of a room before anything else does.",
    image: IMAGES.flameMacro,
  },
  {
    word: "Mood",
    copy: "Design, warmth and quiet: an atmosphere you choose rather than inherit.",
    image: IMAGES.lifestyleInterior,
  },
  {
    word: "Memory",
    copy: "Scent is the sense closest to memory. This is how a moment becomes permanent.",
    image: IMAGES.journalRitual,
  },
];

export function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section aria-labelledby="what-we-do" className="bg-ivory">
      <div className="mx-auto max-w-[1600px] px-5 pt-28 md:px-10 md:pt-40">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow text-muted-foreground">What we do</p>
            </Reveal>
            <h2 id="what-we-do" className="display mt-7 text-[clamp(2.25rem,5.5vw,4.75rem)]">
              <TextReveal text={"More than a candle.\nA feeling."} />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <div className="space-y-5 text-sm leading-relaxed text-espresso-soft md:text-base">
              <p>
                We create premium sensory experiences — fragrance, light, design, craftsmanship and
                gifting held to a single standard.
              </p>
              <p>
                Every composition begins with a feeling, not a formula. Wax is poured by hand in
                small batches, vessels are finished individually, and nothing leaves the atelier
                until it belongs in a beautiful room.
              </p>
            </div>
          </Reveal>
        </div>

        <MaskReveal className="mt-16">
          <img
            src={IMAGES.craftAtelier}
            alt="Molten cream wax being poured by hand into a glass vessel in a warm atelier"
            loading="lazy"
            width={1600}
            height={1008}
            className="h-[46vh] w-full object-cover md:h-[62vh]"
          />
        </MaskReveal>
      </div>

      {/* Horizontal storytelling: SCENT → LIGHT → MOOD → MEMORY */}
      <div ref={ref} className="relative mt-24 h-[340vh] md:mt-32">
        <div className="sticky top-0 flex h-svh items-center overflow-hidden">
          <motion.ul
            className="flex gap-6 px-5 md:gap-10 md:px-10"
            {...(reduced ? {} : { style: { x } })}
          >
            {CHAPTERS.map((chapter, index) => (
              <li
                key={chapter.word}
                className="relative w-[82vw] shrink-0 overflow-hidden bg-cream md:w-[46vw]"
              >
                <img
                  src={chapter.image}
                  alt={`${chapter.word} — ${chapter.copy}`}
                  loading="lazy"
                  className="h-[58vh] w-full object-cover md:h-[66vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute inset-x-7 bottom-8">
                  <p className="eyebrow text-champagne">
                    0{index + 1} — {chapter.word}
                  </p>
                  <p className="display mt-3 text-4xl text-ivory md:text-5xl">{chapter.word}</p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/75">
                    {chapter.copy}
                  </p>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
