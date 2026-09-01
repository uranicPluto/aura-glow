import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Checkout — Maison Lumière";
const DESCRIPTION =
  "Review your Maison Lumière order and complete secure checkout with UPI, cards and net banking.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal } = useCart();

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Review your order."
        intro="Secure payment with UPI, cards, net banking and wallets is being connected in the next release."
      />
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-28 md:px-10 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {lines.length === 0 ? (
              <li className="py-10 text-sm text-espresso-soft">
                Your cart is empty.
                <Link to="/shop" className="eyebrow ml-4 border-b border-gold pb-0.5">
                  Shop candles
                </Link>
              </li>
            ) : (
              lines.map((line) => (
                <li key={line.slug} className="flex gap-6 py-6">
                  <img src={line.image} alt={line.name} className="size-24 object-cover" />
                  <div className="flex-1">
                    <p className="font-serif text-xl">{line.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {line.number} · Qty {line.quantity}
                    </p>
                  </div>
                  <p className="text-sm">${line.price * line.quantity}</p>
                </li>
              ))
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="border border-border p-8">
            <p className="eyebrow text-muted-foreground">Order summary</p>
            <dl className="mt-8 space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>${subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>Calculated at payment</dd>
              </div>
            </dl>
            <button
              type="button"
              disabled
              className="mt-10 w-full bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase disabled:opacity-50"
            >
              Payment coming soon
            </button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              UPI, cards, net banking and wallets will be enabled with the payments release.
            </p>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
