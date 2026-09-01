import { Link } from "@tanstack/react-router";
import { GIFT_OCCASIONS, IMAGES } from "@/lib/catalog";
import { MaskReveal, Reveal, TextReveal } from "@/components/motion/Reveal";

export function GiftingSection() {
  return (
    <section aria-labelledby="gifting" className="bg-cream py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-muted-foreground">Gifting</p>
          </Reveal>
          <h2 id="gifting" className="display mt-7 text-[clamp(2.25rem,5vw,4.25rem)]">
            <TextReveal text={"A gift that is\nnever forgotten."} />
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-espresso-soft md:text-base">
              Hand-wrapped in rigid lacquer boxes with gilded ribbon and a handwritten note.
              Corporate gifting available with custom branding, bulk pricing and worldwide delivery.
            </p>
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-2">
            {GIFT_OCCASIONS.map((occasion, index) => (
              <Reveal as="li" key={occasion} delay={index * 0.04}>
                <span className="block border border-border px-4 py-2 text-[11px] tracking-[0.16em] uppercase transition-colors duration-500 hover:border-gold">
                  {occasion}
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/gifting"
                className="bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:bg-ink"
              >
                Explore gifting
              </Link>
              <Link
                to="/gifting/corporate"
                className="border border-espresso/25 px-9 py-4 text-[11px] tracking-[0.24em] uppercase transition-colors duration-500 hover:border-gold"
              >
                Corporate enquiry
              </Link>
            </div>
          </Reveal>
        </div>
        <MaskReveal delay={0.1}>
          <img
            src={IMAGES.giftingWrap}
            alt="A cream lacquer gift box with gilded ribbon and a handwritten note card"
            loading="lazy"
            width={1280}
            height={1600}
            className="aspect-4/5 w-full object-cover"
          />
        </MaskReveal>
      </div>
    </section>
  );
}
