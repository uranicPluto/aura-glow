import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/catalog";

export function QuickView({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const cart = useCart();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-label={`${product.name} quick view`}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid w-full max-w-3xl gap-0 bg-ivory md:grid-cols-2"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full max-h-[460px] w-full object-cover"
            />
            <div className="p-8">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quick view"
                className="absolute top-4 right-4 text-espresso"
              >
                <X className="size-5" strokeWidth={1.25} />
              </button>
              <p className="eyebrow text-muted-foreground">{product.number}</p>
              <h3 className="mt-2 font-serif text-3xl">{product.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                ★ {product.rating.toFixed(1)} · {product.reviews} reviews
              </p>
              <p className="mt-5 text-sm leading-relaxed text-espresso-soft">
                {product.description}
              </p>
              <p className="mt-5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {product.notes.join(" · ")}
              </p>
              <p className="mt-6 font-serif text-2xl">{formatPrice(product.price)}</p>
              <button
                type="button"
                onClick={() => {
                  cart.add({
                    slug: product.slug,
                    name: product.name,
                    number: product.number,
                    price: product.price,
                    image: product.image,
                  });
                  onClose();
                }}
                className="mt-6 w-full bg-espresso py-4 text-[11px] tracking-[0.22em] text-ivory uppercase"
              >
                Add to cart
              </button>
              <Link
                to="/shop/$slug"
                params={{ slug: product.slug }}
                onClick={onClose}
                className="mt-4 block text-center text-[11px] tracking-[0.22em] uppercase underline decoration-gold underline-offset-4"
              >
                View full details
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
