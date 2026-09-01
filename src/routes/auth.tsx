import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { IMAGES } from "@/lib/catalog";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "Sign In — Maison Lumière";
const DESCRIPTION =
  "Sign in to your Maison Lumière account to track orders, save wishlists and access private releases.";

const searchSchema = z.object({
  redirect: z.string().startsWith("/").max(300).optional().catch(undefined),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Auth,
});

const INPUT =
  "mt-2 w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors duration-500 focus:border-gold";

function Auth() {
  const navigate = useNavigate();
  const router = useRouter();
  const { redirect } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const destination = redirect ?? "/account";

  const finish = async () => {
    await router.invalidate();
    navigate({ to: destination, replace: true });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${destination}`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your inbox to confirm your email address.");
          return;
        }
        toast.success("Welcome to Maison Lumière.");
        await finish();
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back.");
      await finish();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const onGoogle = async () => {
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${destination}`,
        },
      });
      if (error) throw error;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Google sign-in is unavailable right now.",
      );
    } finally {
      setBusy(false);
    }
  };

  const onReset = async () => {
    if (!email) {
      toast.error("Enter your email address first.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent.");
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src={IMAGES.flameMacro}
          alt="Macro photograph of a candle flame"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
      </div>
      <div className="flex items-center px-5 py-36 md:px-16">
        <Reveal className="w-full max-w-sm">
          <p className="eyebrow text-muted-foreground">Account</p>
          <h1 className="display mt-6 text-[clamp(2rem,4vw,3rem)]">
            {mode === "signin" ? "The private list" : "Join the maison"}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-espresso-soft">
            Track orders, save wishlists and receive first access to limited pours.
          </p>

          <button
            type="button"
            onClick={onGoogle}
            disabled={busy}
            className="mt-10 w-full border border-border px-6 py-3.5 text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 hover:border-gold disabled:opacity-50"
          >
            Continue with Google
          </button>

          <div className="my-8 flex items-center gap-4 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {mode === "signup" ? (
              <label className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Full name
                <input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  autoComplete="name"
                  className={INPUT}
                />
              </label>
            ) : null}
            <label className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className={INPUT}
              />
            </label>
            <label className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                className={INPUT}
              />
            </label>
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-espresso px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:bg-gold-deep disabled:opacity-50"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="border-b border-gold pb-0.5"
            >
              {mode === "signin" ? "Create an account" : "I already have an account"}
            </button>
            {mode === "signin" ? (
              <button type="button" onClick={onReset} className="hover:text-espresso">
                Forgot password?
              </button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
