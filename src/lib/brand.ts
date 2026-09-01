export const BRAND = {
  name: "Maison Lumière",
  shortName: "LUMIÈRE",
  tagline: "Light the moment.",
  freeShippingThreshold: 150,
  currency: "$",
} as const;

export function formatPrice(amount: number) {
  return `${BRAND.currency}${amount.toFixed(0)}`;
}
