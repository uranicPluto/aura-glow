import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Contact — Maison Lumière";
const DESCRIPTION =
  "Reach the Maison Lumière care team about orders, fragrance advice, gifting or wholesale enquiries.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the atelier."
        intro="Fragrance advice, order questions, gifting or wholesale — we reply within one business day."
      />
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-32 md:px-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <dl className="divide-y divide-border border-y border-border">
            {[
              ["Customer care", "care@maisonlumiere.com"],
              ["Gifting & corporate", "gifting@maisonlumiere.com"],
              ["Press", "press@maisonlumiere.com"],
              ["Hours", "Monday–Saturday, 9am–7pm IST"],
            ].map(([label, value]) => (
              <div key={label} className="py-6">
                <dt className="eyebrow text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-sm text-espresso">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

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
                toast.success("Message sent", {
                  description: "Our care team will be in touch shortly.",
                });
              }, 700);
            }}
          >
            <label className="block">
              <span className="eyebrow text-muted-foreground">Name</span>
              <input
                name="name"
                required
                className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Message</span>
              <textarea
                name="message"
                rows={5}
                required
                className="mt-3 w-full border-b border-border bg-transparent pb-3 text-sm focus:border-gold focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:bg-ink disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </Reveal>
      </div>
    </>
  );
}
