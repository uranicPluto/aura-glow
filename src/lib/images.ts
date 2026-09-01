import { IMAGES } from "@/lib/catalog";

export const IMAGE_LIBRARY = Object.entries(IMAGES).map(([key, src]) => ({
  key,
  src,
  label: key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim(),
}));

const FALLBACK = IMAGES.productSignature;

/**
 * Images are stored as either a library key ("heroCandle") or an absolute URL,
 * so admins can swap artwork without a code change.
 */
export function resolveImage(value: string | null | undefined): string {
  if (!value) return FALLBACK;
  if (/^(https?:|data:|\/)/.test(value)) return value;
  return (IMAGES as Record<string, string>)[value] ?? FALLBACK;
}

export function resolveGallery(values: string[] | null | undefined): string[] {
  const resolved = (values ?? []).map(resolveImage);
  return resolved.length > 0 ? resolved : [FALLBACK];
}
