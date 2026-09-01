import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import { BRAND, formatPrice } from "@/lib/brand";
import { useCart } from "@/lib/cart";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const cart = useCart();
  const remaining = Math.max(BRAND.freeShippingThreshold - cart.subtotal, 0);
  const progress = Math.min((cart.subtotal / BRAND.freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.div
            key="cart-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={cart.close}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-label="Shopping bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-[440px] flex-col bg-ivory"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="eyebrow text-muted-foreground">Your bag ({cart.count})</h2>
              <button type="button" onClick={cart.close} aria-label="Close bag">
                <X className="size-5" strokeWidth={1.25} />
              </button>
            </div>

            {cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <p className="font-serif text-2xl">Your bag is empty.</p>
                <p className="text-sm text-muted-foreground">Begin with a signature fragrance.</p>
                <Link
                  to="/shop"
                  onClick={cart.close}
                  className="border-b border-gold pb-1 text-[11px] tracking-[0.22em] uppercase"
                >
                  Explore collection
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-border px-6 py-4">
                  <p className="text-xs text-muted-foreground">
                    {remaining > 0
                      ? `You're ${formatPrice(remaining)} away from complimentary shipping.`
                      : "Complimentary shipping unlocked."}
                  </p>
                  <div className="mt-3 h-px w-full bg-border">
                    <motion.div
                      className="h-px bg-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: EASE }}
                    />
                  </div>
                </div>

                <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
                  {cart.lines.map((line) => (
                    <li key={line.slug} className="flex gap-4 py-5">
                      <img
                        src={line.image}
                        alt={line.name}
                        loading="lazy"
                        className="h-28 w-20 object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <p className="eyebrow text-muted-foreground">{line.number}</p>
                        <p className="mt-1 font-serif text-lg leading-tight">{line.name}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatPrice(line.price)}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-border px-3 py-1.5">
                            <button
                              type="button"
                              aria-label={`Decrease ${line.name}`}
                              onClick={() => cart.setQuantity(line.slug, line.quantity - 1)}
                            >
                              <Minus className="size-3.5" strokeWidth={1.25} />
                            </button>
                            <span className="w-4 text-center text-sm">{line.quantity}</span>
                            <button
                              type="button"
                              aria-label={`Increase ${line.name}`}
                              onClick={() => cart.setQuantity(line.slug, line.quantity + 1)}
                            >
                              <Plus className="size-3.5" strokeWidth={1.25} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => cart.remove(line.slug)}
                            className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase hover:text-espresso"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="eyebrow text-muted-foreground">Subtotal</span>
                    <span className="font-serif text-2xl">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Taxes and shipping calculated at checkout.
                  </p>
                  <Link
                    to="/checkout"
                    onClick={cart.close}
                    className="mt-5 block bg-espresso py-4 text-center text-[11px] tracking-[0.22em] text-ivory uppercase transition-colors hover:bg-ink"
                  >
                    Proceed to checkout
                  </Link>
                  <button
                    type="button"
                    onClick={cart.close}
                    className="mt-3 w-full border border-border py-4 text-[11px] tracking-[0.22em] uppercase"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
