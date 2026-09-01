import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

export type InfoSection = { heading: string; body: string[] };

export function InfoPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: InfoSection[];
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      <div className="mx-auto max-w-3xl px-5 pb-28 md:px-10 md:pb-40">
        <div className="divide-y divide-border border-y border-border">
          {sections.map((section, index) => (
            <Reveal key={section.heading} delay={index * 0.06}>
              <section className="py-10">
                <h2 className="font-serif text-2xl">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="text-sm leading-relaxed text-espresso-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
