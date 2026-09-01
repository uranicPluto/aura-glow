import { createFileRoute } from "@tanstack/react-router";
import { getStorefront } from "@/lib/storefront.functions";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Benefits } from "@/components/home/Benefits";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Storytelling } from "@/components/home/Storytelling";
import { VideoTestimonials } from "@/components/home/VideoTestimonials";
import { Differentiation } from "@/components/home/Differentiation";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/home/Stats";
import { GiftingSection } from "@/components/home/GiftingSection";
import { JournalSection } from "@/components/home/JournalSection";
import { FinalCta } from "@/components/home/FinalCta";

const TITLE = "Maison Lumière — Luxury Candles & Gifting";
const DESCRIPTION =
  "Hand-poured luxury candles and gifting, composed like perfume. Light the moment and elevate the experience.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  loader: () => getStorefront(),
  component: Home,
});

function Home() {
  const { products, collections, journal, content } = Route.useLoaderData();

  return (
    <>
      <Hero content={content} />
      <WhatWeDo />
      <HowItWorks />
      <CategoryGrid collections={collections} />
      <Benefits />
      <FeaturedProducts products={products} />
      <Storytelling />
      <VideoTestimonials />
      <Differentiation />
      <Testimonials />
      <Stats />
      <GiftingSection />
      <JournalSection posts={journal} />
      <FinalCta />
    </>
  );
}
