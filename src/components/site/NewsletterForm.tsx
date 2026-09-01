import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");

  return (
    <form
      className={cn("flex items-end gap-3", compact ? "" : "max-w-md")}
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.includes("@")) {
          toast.error("Please enter a valid email address.");
          return;
        }
        setEmail("");
        toast.success("Welcome. Your first letter is on its way.");
      }}
    >
      <div className="flex-1">
        <label
          htmlFor={compact ? "newsletter-footer" : "newsletter-main"}
          className="eyebrow text-muted-foreground"
        >
          Your email address
        </label>
        <input
          id={compact ? "newsletter-footer" : "newsletter-main"}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="name@example.com"
          className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-gold"
        />
      </div>
      <button
        type="submit"
        className="border-b border-gold pb-2 text-[11px] font-medium tracking-[0.22em] text-espresso uppercase transition-colors hover:text-gold-deep"
      >
        Subscribe
      </button>
    </form>
  );
}
