import { Link } from "@tanstack/react-router";
import { IMAGES } from "@/lib/catalog";
import { Magnetic, Reveal, TextReveal } from "@/components/motion/Reveal";
import { NewsletterForm } from "@/components/site/NewsletterForm";

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden bg-ink">
      <img
        src={IMAGES.lifestyleInterior}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-32 text-center md:px-10 md:py-44">
        <Reveal>
          <p className="eyebrow text-champagne">Begin the ritual</p>
        </Reveal>
        <h2
          id="final-cta"
          className="display mx-auto mt-8 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] text-ivory"
        >
          <TextReveal text="Create moments worth remembering." />
        </h2>
        <Reveal delay={0.14}>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Magnetic>
              <Link
                to="/shop"
                className="inline-block bg-ivory px-10 py-4 text-[11px] tracking-[0.24em] text-ink uppercase transition-colors duration-500 hover:bg-champagne"
              >
                Shop the collection
              </Link>
            </Magnetic>
            <Magnetic strength={6}>
              <Link
                to="/gifting"
                className="inline-block border border-ivory/40 px-10 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:border-gold hover:text-champagne"
              >
                Build a gift
              </Link>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mx-auto mt-20 max-w-md text-left">
            <p className="eyebrow text-center text-ivory/55">Private list — new releases first</p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
