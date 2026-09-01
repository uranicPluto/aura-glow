import { BRAND } from "@/lib/brand";
import { NavLink } from "@/components/site/NavLink";
import { NewsletterForm } from "@/components/site/NewsletterForm";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Candles", to: "/shop" },
      { label: "Collections", to: "/collections" },
      { label: "Gift Sets", to: "/collections/gift-sets" },
      { label: "Best Sellers", to: "/collections/best-sellers" },
      { label: "New Arrivals", to: "/collections/new-arrivals" },
    ],
  },
  {
    title: "Gifting",
    links: [
      { label: "Personal Gifting", to: "/gifting" },
      { label: "Corporate Gifting", to: "/gifting/corporate" },
      { label: "Weddings", to: "/gifting" },
      { label: "Personalized Gifts", to: "/gifting" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/our-story" },
      { label: "Journal", to: "/journal" },
      { label: "Contact", to: "/contact" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "Candle Care", to: "/candle-care" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
] as const;

const SOCIAL = ["Instagram", "Pinterest", "Facebook", "YouTube"];

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-serif text-2xl tracking-[0.3em]">{BRAND.shortName}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Luxury candles composed in small batches and poured by hand for the moments worth
              remembering.
            </p>
            <div className="mt-8 max-w-sm">
              <NewsletterForm compact />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow text-muted-foreground">{column.title}</h3>
                <ul className="mt-5 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        href={link.to}
                        className="text-sm text-espresso transition-colors hover:text-gold-deep"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 hairline" />

        <div className="mt-8 flex flex-col gap-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {SOCIAL.map((item) => (
              <li key={item}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="tracking-[0.14em] uppercase transition-colors hover:text-gold-deep"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-3">
            {["Visa", "Mastercard", "Amex", "UPI", "Apple Pay", "G Pay"].map((method) => (
              <li
                key={method}
                className="border border-border px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase"
              >
                {method}
              </li>
            ))}
            <li className="text-[10px] tracking-[0.12em] uppercase">Secure checkout</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
