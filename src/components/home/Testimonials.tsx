import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/catalog";
import { Reveal } from "@/components/motion/Reveal";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials" className="bg-ivory pb-28 md:pb-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <h2 id="testimonials" className="eyebrow text-muted-foreground">
          Reviews from 25+ countries
        </h2>
        <ul className="mt-12 grid gap-px border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal
              as="li"
              key={item.name}
              delay={(index % 3) * 0.08}
              className="border-b border-border py-10 md:border-r md:px-8 lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex gap-1" aria-label={`${item.rating} out of 5`}>
                {Array.from({ length: item.rating }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-3 fill-gold text-gold" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-6 font-serif text-xl leading-snug">"{item.quote}"</p>
              <p className="mt-6 text-[11px] tracking-[0.18em] uppercase">{item.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.location} · {item.product}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
