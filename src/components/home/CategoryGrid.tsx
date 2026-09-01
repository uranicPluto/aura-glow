import { Link } from "@tanstack/react-router";
import type { StoreCollection } from "@/lib/store-types";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function CategoryGrid({ collections }: { collections: StoreCollection[] }) {
  return (
    <section aria-labelledby="what-we-sell" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="eyebrow text-muted-foreground">What we sell</p>
            </Reveal>
            <h2 id="what-we-sell" className="display mt-7 text-[clamp(2.25rem,5vw,4.25rem)]">
              <TextReveal text="Find your perfect ritual." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/collections"
              className="border-b border-gold pb-1 text-[11px] tracking-[0.22em] uppercase"
            >
              All collections
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((category, index) => (
            <Reveal key={category.slug} delay={(index % 3) * 0.1}>
              <Link
                to="/collections/$slug"
                params={{ slug: category.slug }}
                className="group block"
              >
                <div className="overflow-hidden bg-cream">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="aspect-4/5 w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.07]"
                  />
                </div>
                <h3 className="mt-6 font-serif text-2xl">{category.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-espresso-soft">
                  {category.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] uppercase">
                  Explore
                  <span className="block h-px w-8 bg-gold transition-all duration-700 ease-[var(--ease-luxe)] group-hover:w-16" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
