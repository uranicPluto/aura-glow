import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { IMAGES } from "@/lib/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";

const TITLE = "Corporate Gifting — Maison Lumière";
const DESCRIPTION =
  "Luxury corporate candle gifting with custom branding, bulk pricing, dedicated account management and worldwide delivery.";

export const Route = createFileRoute("/gifting/corporate")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Corporate,
});

const FIELDS = [
  { name: "name", label: "Full name", type: "text", required: true },
  { name: "company", label: "Company", type: "text", required: true },
  { name: "email", label: "Work email", type: "email", required: true },
  { name: "quantity", label: "Estimated quantity", type: "text", required: false },
] as const;

function Corporate() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Corporate gifting"
        title={"Gifting at scale,\nwithout compromise."}
        intro="From twenty client gifts to two thousand, with custom branding, bespoke fragrance selection and a single point of contact."
      />

      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-28 md:px-10 lg:grid-cols-2 lg:gap-24">
        <MaskReveal>
          <img
            src={IMAGES.giftingWrap}
            alt="Branded lacquer gift boxes being finished with gilded ribbon"
            loading="lazy"
            width={1280}
            height={1600}
            className="aspect-4/5 w-full object-cover"
          />
        </MaskReveal>

        <Reveal delay={0.1}>
          <form
            className="space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              setSubmitting(true);
              window.setTimeout(() => {
                setSubmitting(false);
                form.reset();
                toast.success("Enquiry received", {
                  description: "Our gifting team will reply within one business day.",
                });
              }, 700);
            }}
          >
            {FIELDS.map((field) => (
              <label key={field.name} className="block">
                <span className="eyebrow text-muted-foreground">{field.label}</span>
                <input
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm focus:border-gold focus:outline-none"
                />
              </label>
            ))}
            <label className="block">
              <span className="eyebrow text-muted-foreground">Tell us about the occasion</span>
              <textarea
                name="brief"
                rows={4}
                className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:bg-ink disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit enquiry"}
            </button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              We reply to every enquiry within one business day. Minimum order quantity for custom
              branding is 25 units.
            </p>
          </form>
        </Reveal>
      </div>
    </>
  );
}
