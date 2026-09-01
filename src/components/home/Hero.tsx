import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES } from "@/lib/catalog";
import { resolveImage } from "@/lib/images";
import type { SiteContent } from "@/lib/store-types";
import { Magnetic } from "@/components/motion/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero({ content }: { content?: SiteContent }) {
  const text = (key: string, fallback: string) => content?.[key]?.trim() || fallback;
  const eyebrow = text("hero.eyebrow", "Luxury candles & gifting");
  const headline = text("hero.title", "Light the moment.|Elevate the experience.")
    .split("|")
    .map((line) => line.trim())
    .filter(Boolean);
  const subtitle = text(
    "hero.subtitle",
    "Luxury candles crafted to transform spaces, create memories, and make every moment feel extraordinary.",
  );
  const heroImage = content?.["hero.image"]
    ? resolveImage(content["hero.image"])
    : IMAGES.heroCandle;
  const primaryCta = text("hero.cta_primary", "Explore collection");
  const secondaryCta = text("hero.cta_secondary", "Discover our story");
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, delay, ease: EASE },
        };

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[640px] items-end overflow-hidden bg-ink"
    >
      <motion.div
        className="absolute inset-0"
        {...(reduced
          ? {}
          : {
              style: { y: imageY },
              initial: { scale: 1.14, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 2.4, ease: EASE },
            })}
      >
        <img
          src={heroImage}
          alt="A lit ribbed amber glass candle on cream marble in warm ambient light"
          width={1920}
          height={1280}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/50" />
      </motion.div>

      <motion.div
        className="relative mx-auto w-full max-w-[1600px] px-5 pb-24 md:px-10 md:pb-28"
        {...(reduced ? {} : { style: { y: contentY, opacity: contentOpacity } })}
      >
        <motion.p className="eyebrow text-champagne" {...fadeUp(0.5)}>
          {eyebrow}
        </motion.p>

        <h1 className="display mt-6 max-w-4xl text-[clamp(2.75rem,7.5vw,6.5rem)] text-ivory">
          {headline.map((line, index) => (
            <span key={line} className="block overflow-hidden py-[0.03em]">
              <motion.span
                className="block"
                {...(reduced
                  ? {}
                  : {
                      initial: { y: "110%" },
                      animate: { y: "0%" },
                      transition: {
                        duration: 1.5,
                        delay: 0.65 + index * 0.16,
                        ease: EASE,
                      },
                    })}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-sm leading-relaxed text-ivory/75 md:text-base"
          {...fadeUp(1.1)}
        >
          {subtitle}
        </motion.p>

        <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...fadeUp(1.28)}>
          <Magnetic>
            <Link
              to="/shop"
              className="inline-block bg-ivory px-9 py-4 text-[11px] tracking-[0.24em] text-ink uppercase transition-colors duration-500 hover:bg-champagne"
            >
              {primaryCta}
            </Link>
          </Magnetic>
          <Magnetic strength={6}>
            <Link
              to="/our-story"
              className="inline-block border border-ivory/40 px-9 py-4 text-[11px] tracking-[0.24em] text-ivory uppercase transition-colors duration-500 hover:border-gold hover:text-champagne"
            >
              {secondaryCta}
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-7 flex justify-center"
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1.2, delay: 1.8 },
            })}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow text-ivory/55">Scroll to discover</span>
          <motion.span
            className="block h-10 w-px bg-gradient-to-b from-champagne to-transparent"
            style={{ transformOrigin: "top" }}
            {...(reduced
              ? {}
              : {
                  animate: { scaleY: [0.3, 1, 0.3] },
                  transition: {
                    duration: 2.6,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  },
                })}
          />
        </div>
      </motion.div>
    </section>
  );
}
