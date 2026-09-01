import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";
import { QuickView } from "@/components/site/QuickView";

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [quickView, setQuickView] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-cream">
        <Link to="/shop/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img
            src={product.image}
            alt={`${product.name} candle`}
            loading="lazy"
            className="aspect-4/5 w-full object-cover transition-all duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06] group-hover:opacity-0"
          />
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 aspect-4/5 w-full scale-[1.06] object-cover opacity-0 transition-all duration-[1400ms] ease-[var(--ease-luxe)] group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        <button
          type="button"
          aria-label={`${wishlisted ? "Remove from" : "Add to"} wishlist: ${product.name}`}
          aria-pressed={wishlisted}
          onClick={() => {
            setWishlisted((value) => !value);
            toast.success(wishlisted ? "Removed from wishlist." : "Saved to your wishlist.");
          }}
          className="absolute top-4 right-4 rounded-full bg-ivory/85 p-2.5 backdrop-blur transition-colors hover:text-gold-deep"
        >
          <Heart
            className="size-4"
            strokeWidth={1.25}
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        <div className="absolute inset-x-4 bottom-4 flex translate-y-3 gap-2 opacity-0 transition-all duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() =>
              cart.add({
                slug: product.slug,
                name: product.name,
                number: product.number,
                price: product.price,
                image: product.image,
              })
            }
            className="flex-1 bg-espresso py-3 text-[10px] tracking-[0.22em] text-ivory uppercase transition-colors hover:bg-ink"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => setQuickView(true)}
            className="bg-ivory/90 px-4 py-3 text-[10px] tracking-[0.22em] uppercase backdrop-blur"
          >
            Quick view
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted-foreground">{product.number}</p>
          <h3 className="mt-1.5 font-serif text-xl leading-tight">
            <Link to="/shop/$slug" params={{ slug: product.slug }}>
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {product.notes.join(" · ")}
          </p>
        </div>
        <div className="text-right">
          <p className="font-serif text-lg">{formatPrice(product.price)}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">★ {product.rating.toFixed(1)}</p>
        </div>
      </div>

      <QuickView product={product} open={quickView} onClose={() => setQuickView(false)} />
    </article>
  );
}
