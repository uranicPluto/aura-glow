import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Reset Password — Maison Lumière";
const DESCRIPTION = "Choose a new password for your Maison Lumière account.";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated.");
    navigate({ to: "/", replace: true });
  };

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Set a new password."
        intro="Choose a password of at least eight characters. You will stay signed in on this device."
      />
      <div className="mx-auto max-w-md px-5 pb-32 md:px-10">
        <Reveal>
          <form onSubmit={onSubmit} className="space-y-6">
            <label className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              New password
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase disabled:opacity-50"
            >
              Update password
            </button>
          </form>
        </Reveal>
      </div>
    </>
  );
}
