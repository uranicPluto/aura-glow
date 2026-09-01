import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import { getProduct } from "@/lib/storefront.functions";
import { useCart } from "@/lib/cart";
import { ProductCard } from "@/components/site/ProductCard";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/shop/$slug")({
  loader: async ({ params }) => {
    const data = await getProduct({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Candle unavailable — Maison Lumière" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Maison Lumière`;
    const description = product.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="display text-4xl">This candle has been retired</h1>
      <Link to="/shop" className="eyebrow mt-8 inline-block border-b border-gold pb-1">
        Back to the collection
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="display text-4xl">This page didn't load</h1>
      <Link to="/shop" className="eyebrow mt-8 inline-block border-b border-gold pb-1">
        Back to the collection
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product, related } = Route.useLoaderData();
  const { add, open } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pt-32 md:px-10 md:pt-40">
        <nav aria-label="Breadcrumb" className="eyebrow text-muted-foreground">
          <Link to="/shop" className="hover:text-espresso">
            Shop
          </Link>
          <span className="mx-3">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            <MaskReveal>
              <img
                src={product.gallery[activeImage] ?? product.image}
                alt={`${product.name} luxury candle`}
                width={1280}
                height={1600}
                className="aspect-4/5 w-full bg-cream object-cover"
              />
            </MaskReveal>
            <ul className="mt-4 flex gap-3">
              {product.gallery.map((image, index) => (
                <li key={image}>
                  <button
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`block size-20 overflow-hidden border transition-colors duration-500 ${
                      activeImage === index ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="eyebrow text-muted-foreground">
                {product.number} · {product.collection}
              </p>
              <h1 className="display mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)]">{product.name}</h1>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-3 ${
                        index < Math.round(product.rating)
                          ? "fill-gold text-gold"
                          : "fill-border text-border"
                      }`}
                      strokeWidth={0}
                    />
                  ))}
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.rating.toFixed(1)} · {product.reviews} reviews
                </span>
              </div>
              <p className="mt-8 font-serif text-3xl">${product.price}</p>
              <p className="mt-6 text-sm leading-relaxed text-espresso-soft">
                {product.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                    aria-label="Decrease quantity"
                    className="px-4 py-4"
                  >
                    <Minus className="size-3" strokeWidth={1.5} />
                  </button>
                  <span className="min-w-8 text-center text-sm">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((value) => value + 1)}
                    aria-label="Increase quantity"
                    className="px-4 py-4"
                  >
                    <Plus className="size-3" strokeWidth={1.5} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    add(
                      {
                        slug: product.slug,
                        name: product.name,
                        number: product.number,
                        price: product.price,
                        image: product.image,
                      },
                      quantity,
                    );
                    open();
                  }}
                  className="grow bg-espresso px-10 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:bg-ink"
                >
                  Add to cart
                </button>
              </div>

              <dl className="mt-14 divide-y divide-border border-y border-border">
                {[
                  ["Top notes", product.journey.top],
                  ["Heart notes", product.journey.heart],
                  ["Base notes", product.journey.base],
                  ["Burn time", product.burnTime],
                  ["Wax & wick", product.wax],
                  ["Dimensions", product.dimensions],
                ].map(([label, value]) => (
                  <div key={label} className="grid gap-1 py-4 md:grid-cols-[150px_1fr] md:gap-8">
                    <dt className="eyebrow text-muted-foreground">{label}</dt>
                    <dd className="text-sm text-espresso-soft">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      <section aria-labelledby="related" className="py-28 md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <h2 id="related" className="eyebrow text-muted-foreground">
            You may also like
          </h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.08}>
                <ProductCard product={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
