import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getJournalPost } from "@/lib/storefront.functions";
import { MaskReveal, Reveal } from "@/components/motion/Reveal";

export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params }) => {
    const post = await getJournalPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article unavailable — Maison Lumière" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.post.title} — Maison Lumière`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="display text-4xl">Article not found</h1>
      <Link to="/journal" className="eyebrow mt-8 inline-block border-b border-gold pb-1">
        Back to the journal
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-48 text-center">
      <h1 className="display text-4xl">This page didn't load</h1>
      <Link to="/journal" className="eyebrow mt-8 inline-block border-b border-gold pb-1">
        Back to the journal
      </Link>
    </div>
  ),
  component: Article,
});

const BODY = [
  "A room announces itself before you have looked at anything in it. Temperature, light and scent arrive first, and they decide how you will feel long before the furniture does.",
  "This is why we compose fragrance the way a perfumer would: a bright opening that meets you at the door, a heart that settles as the wax pools, and a base that stays in the room after the flame is out.",
  "Light does the second half of the work. A single flame lowers the visual noise of a space, softens edges, and gives a room a centre. It is the cheapest and fastest piece of interior design available to anyone.",
  "Use it deliberately. One candle, lit at the same time each evening, becomes a signal rather than a decoration — and the moment stops being ordinary.",
];

function Article() {
  const { post } = Route.useLoaderData();

  return (
    <article className="pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">
            {post.category} · {post.readingTime}
          </p>
          <h1 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">{post.title}</h1>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-[1200px] px-5 md:px-10">
        <MaskReveal>
          <img
            src={post.image}
            alt={post.title}
            width={1600}
            height={900}
            className="aspect-3/2 w-full object-cover"
          />
        </MaskReveal>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-28 md:px-10 md:pb-40">
        <div className="mt-14 space-y-7">
          <p className="font-serif text-2xl leading-snug">{post.excerpt}</p>
          {BODY.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)}>
              <p className="text-sm leading-relaxed text-espresso-soft md:text-base">{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Link to="/journal" className="eyebrow mt-16 inline-block border-b border-gold pb-1">
          Back to the journal
        </Link>
      </div>
    </article>
  );
}
