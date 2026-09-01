import { Link } from "@tanstack/react-router";
import type { StoreProduct } from "@/lib/store-types";
import { ProductCard } from "@/components/site/ProductCard";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function FeaturedProducts({ products }: { products: StoreProduct[] }) {
  return (
    <section aria-labelledby="the-collection" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="eyebrow text-muted-foreground">Featured</p>
            </Reveal>
            <h2 id="the-collection" className="display mt-7 text-[clamp(2.25rem,5vw,4.25rem)]">
              <TextReveal text="The collection" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/shop"
              className="border-b border-gold pb-1 text-[11px] tracking-[0.22em] uppercase"
            >
              Discover
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <Reveal key={product.slug} delay={(index % 4) * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
