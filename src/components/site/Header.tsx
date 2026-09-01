import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { NavLink } from "@/components/site/NavLink";
import { cn } from "@/lib/utils";

const SHOP_MENU = [
  { label: "All Candles", to: "/shop" },
  { label: "Signature Collection", to: "/collections/signature" },
  { label: "Luxury Collection", to: "/collections/luxury" },
  { label: "Gift Sets", to: "/collections/gift-sets" },
  { label: "Limited Editions", to: "/collections/limited-editions" },
  { label: "Best Sellers", to: "/collections/best-sellers" },
  { label: "New Arrivals", to: "/collections/new-arrivals" },
] as const;

const GIFTING_MENU = [
  { label: "Birthday", to: "/gifting" },
  { label: "Anniversary", to: "/gifting" },
  { label: "Wedding", to: "/gifting" },
  { label: "Corporate Gifts", to: "/gifting/corporate" },
  { label: "Festive Gifts", to: "/gifting" },
  { label: "Personalized Gifts", to: "/gifting" },
] as const;

const NAV: { label: string; to: string; menu?: string }[] = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop", menu: "shop" },
  { label: "Collections", to: "/collections" },
  { label: "Gifting", to: "/gifting", menu: "gifting" },
  { label: "Our Story", to: "/our-story" },
  { label: "Journal", to: "/journal" },
];

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !overlay || openMenu !== null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-700",
        solid
          ? "bg-ivory/85 shadow-[0_1px_0_0_var(--color-border)] backdrop-blur-xl"
          : "bg-transparent",
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-all duration-700 md:px-10",
          solid ? "h-16" : "h-24",
        )}
      >
        <Link
          to="/"
          className={cn(
            "font-serif text-lg tracking-[0.35em] transition-colors duration-500",
            solid ? "text-ink" : "text-ivory",
          )}
          aria-label={`${BRAND.name} home`}
        >
          {BRAND.shortName}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {NAV.map((item) => (
            <div key={item.label} onMouseEnter={() => setOpenMenu(item.menu ?? null)}>
              <NavLink
                href={item.to}
                className={cn(
                  "text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-500",
                  solid ? "text-espresso hover:text-gold-deep" : "text-ivory/90 hover:text-ivory",
                )}
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <IconLink
            to="/shop"
            label="Search"
            solid={solid}
            icon={<Search className="size-[18px]" strokeWidth={1.25} />}
          />
          <IconLink
            to="/auth"
            label="Account"
            solid={solid}
            icon={<User className="size-[18px]" strokeWidth={1.25} />}
          />
          <IconLink
            to="/wishlist"
            label="Wishlist"
            solid={solid}
            icon={<Heart className="size-[18px]" strokeWidth={1.25} />}
          />
          <button
            type="button"
            onClick={cart.open}
            aria-label={`Cart, ${cart.count} items`}
            className={cn(
              "relative rounded-full p-2.5 transition-colors duration-500",
              solid ? "text-espresso hover:text-gold-deep" : "text-ivory/90 hover:text-ivory",
            )}
          >
            <ShoppingBag className="size-[18px]" strokeWidth={1.25} />
            {cart.count > 0 && (
              <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-semibold text-ink">
                {cart.count}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={cn("rounded-full p-2.5 lg:hidden", solid ? "text-espresso" : "text-ivory")}
          >
            <Menu className="size-[19px]" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            key={openMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hidden border-t border-border bg-ivory/95 backdrop-blur-xl lg:block"
          >
            <div className="mx-auto grid max-w-[1600px] gap-16 px-10 py-12 md:grid-cols-[1fr_1fr_1.1fr]">
              <div>
                <p className="eyebrow text-muted-foreground">
                  {openMenu === "shop" ? "Shop" : "Gifting"}
                </p>
                <p className="mt-5 max-w-xs font-serif text-2xl leading-snug text-ink">
                  {openMenu === "shop"
                    ? "Fragrances composed in small batches, poured by hand."
                    : "Gifts that are remembered long after they are opened."}
                </p>
              </div>
              <ul className="space-y-3">
                {(openMenu === "shop" ? SHOP_MENU : GIFTING_MENU).map((entry) => (
                  <li key={entry.label}>
                    <NavLink
                      href={entry.to}
                      onClick={() => setOpenMenu(null)}
                      className="text-sm text-espresso transition-colors hover:text-gold-deep"
                    >
                      {entry.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="border-l border-border pl-10">
                <p className="eyebrow text-muted-foreground">Featured</p>
                <p className="mt-5 font-serif text-xl text-ink">
                  {openMenu === "shop" ? "No. 02 Noir Oud" : "Maison Duo Coffret"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {openMenu === "shop"
                    ? "Rare oud, saffron and smoked leather in gilded smoked glass."
                    : "Two signature candles in an espresso lacquer coffret."}
                </p>
                <Link
                  to="/shop/$slug"
                  params={{
                    slug: openMenu === "shop" ? "noir-oud" : "maison-duo",
                  }}
                  onClick={() => setOpenMenu(null)}
                  className="mt-5 inline-block border-b border-gold pb-1 text-[11px] font-medium tracking-[0.22em] text-espresso uppercase"
                >
                  Discover
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function IconLink({
  to,
  label,
  icon,
  solid,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  solid: boolean;
}) {
  return (
    <NavLink
      href={to}
      aria-label={label}
      className={cn(
        "hidden rounded-full p-2.5 transition-colors duration-500 sm:block",
        solid ? "text-espresso hover:text-gold-deep" : "text-ivory/90 hover:text-ivory",
      )}
    >
      {icon}
    </NavLink>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col bg-ivory lg:hidden"
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-serif text-lg tracking-[0.35em]">{BRAND.shortName}</span>
            <button type="button" onClick={onClose} aria-label="Close menu">
              <X className="size-5" strokeWidth={1.25} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-8">
            <ul className="space-y-1">
              {NAV.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.05,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <NavLink
                    href={item.to}
                    onClick={onClose}
                    className="block border-b border-border py-4 font-serif text-3xl text-ink"
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-2 gap-3">
              <Link
                to="/auth"
                onClick={onClose}
                className="border border-espresso py-3 text-center text-[11px] tracking-[0.22em] uppercase"
              >
                Account
              </Link>
              <Link
                to="/wishlist"
                onClick={onClose}
                className="border border-border py-3 text-center text-[11px] tracking-[0.22em] uppercase"
              >
                Wishlist
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
