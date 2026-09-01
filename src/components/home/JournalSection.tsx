import { Link } from "@tanstack/react-router";
import type { StoreJournalPost } from "@/lib/store-types";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function JournalSection({ posts }: { posts: StoreJournalPost[] }) {
  return (
    <section aria-labelledby="journal" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <p className="eyebrow text-muted-foreground">The journal</p>
            </Reveal>
            <h2 id="journal" className="display mt-7 text-[clamp(2.25rem,5vw,4.25rem)]">
              <TextReveal text="Notes on scent & living." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/journal"
              className="border-b border-gold pb-1 text-[11px] tracking-[0.22em] uppercase"
            >
              Read all
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.1}>
              <Link to="/journal/$slug" params={{ slug: post.slug }} className="group block">
                <div className="overflow-hidden bg-cream">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="aspect-3/2 w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
                  />
                </div>
                <p className="eyebrow mt-6 text-muted-foreground">
                  {post.category} · {post.readingTime}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso-soft">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
