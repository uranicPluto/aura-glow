import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="bg-ivory pt-36 pb-16 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{eyebrow}</p>
        </Reveal>
        <h1 className="display mt-7 max-w-4xl text-[clamp(2.5rem,6vw,5rem)]">
          <TextReveal text={title} />
        </h1>
        {intro ? (
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-espresso-soft md:text-base">
              {intro}
            </p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
