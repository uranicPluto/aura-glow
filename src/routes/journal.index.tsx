import { createFileRoute, Link } from "@tanstack/react-router";
import { getStorefront } from "@/lib/storefront.functions";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/motion/Reveal";

const TITLE = "The Journal — Maison Lumière";
const DESCRIPTION =
  "Notes on fragrance, light and living well: how scent changes a room, the art of gifting and building an evening ritual.";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  loader: () => getStorefront(),
  component: Journal,
});

function Journal() {
  const { journal: JOURNAL } = Route.useLoaderData();
  return (
    <>
      <PageHeader
        eyebrow="The journal"
        title="Notes on scent & living."
        intro="Short essays on fragrance, atmosphere and the rituals that make a home feel considered."
      />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 md:px-10">
        <ul className="divide-y divide-border border-y border-border">
          {JOURNAL.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={index * 0.08}>
              <Link
                to="/journal/$slug"
                params={{ slug: post.slug }}
                className="group grid gap-8 py-10 md:grid-cols-[280px_1fr] md:items-center"
              >
                <div className="overflow-hidden bg-cream">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="aspect-3/2 w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-105"
                  />
                </div>
                <div>
                  <p className="eyebrow text-muted-foreground">
                    {post.category} · {post.readingTime}
                  </p>
                  <h2 className="mt-4 font-serif text-3xl leading-snug">{post.title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-espresso-soft">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
