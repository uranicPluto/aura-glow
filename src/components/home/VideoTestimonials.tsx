import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Play, X } from "lucide-react";
import { VIDEO_TESTIMONIALS } from "@/lib/catalog";
import { Reveal, TextReveal } from "@/components/motion/Reveal";

export function VideoTestimonials() {
  const [active, setActive] = useState<number | null>(null);
  const story = active === null ? null : VIDEO_TESTIMONIALS[active];

  return (
    <section aria-labelledby="video-love" className="bg-ivory py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-muted-foreground">In their words</p>
        </Reveal>
        <h2 id="video-love" className="display mt-7 max-w-3xl text-[clamp(2rem,4.6vw,4rem)]">
          <TextReveal text={"Loved by those who believe\nin beautiful moments."} />
        </h2>

        <ul className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:gap-8">
          {VIDEO_TESTIMONIALS.map((item, index) => (
            <Reveal
              as="li"
              key={item.name}
              delay={index * 0.08}
              className="w-[80vw] shrink-0 snap-start md:w-[calc((100%-4rem)/3)]"
            >
              <button
                type="button"
                onClick={() => setActive(index)}
                className="group block w-full text-left"
                aria-label={`Play video testimonial from ${item.name}`}
              >
                <div className="relative overflow-hidden bg-cream">
                  <img
                    src={item.poster}
                    alt={`${item.name} in her home with ${item.product}`}
                    loading="lazy"
                    className="aspect-3/4 w-full object-cover transition-transform duration-[1600ms] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex size-16 items-center justify-center rounded-full border border-ivory/50 text-ivory backdrop-blur-sm transition-colors duration-700 group-hover:border-gold group-hover:text-champagne">
                      <Play className="size-4" strokeWidth={1.5} />
                      <motion.span
                        className="absolute inset-0 rounded-full border border-ivory/30"
                        animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                        transition={{ duration: 2.6, repeat: Infinity }}
                      />
                    </span>
                  </span>
                  <div className="absolute inset-x-6 bottom-6 text-ivory">
                    <p className="font-serif text-xl">"{item.quote}"</p>
                    <p className="mt-2 text-xs tracking-[0.16em] uppercase">
                      {item.name} · {item.location}
                    </p>
                    <p className="mt-1 text-xs text-ivory/70">{item.product}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {story && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            role="dialog"
            aria-label={`Video testimonial from ${story.name}`}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close video"
              className="absolute top-6 right-6 text-ivory"
            >
              <X className="size-6" strokeWidth={1.25} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-ink">
                <img
                  src={story.poster}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-ivory">
                  <p className="font-serif text-3xl md:text-4xl">"{story.quote}"</p>
                  <p className="text-xs tracking-[0.2em] uppercase">
                    {story.name} · {story.location}
                  </p>
                  <p className="text-xs text-ivory/60">Video story · {story.product}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
