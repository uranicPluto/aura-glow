import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export async function assertAdmin(context: { supabase: SupabaseClient<Database>; userId: string }) {
  const { data } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!data) throw new Error("Forbidden: admin access required");
}

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only"),
  number: z.string().max(20).default(""),
  name: z.string().min(2).max(120),
  collection: z.string().min(2).max(80),
  price: z.number().min(0).max(1000000),
  compare_price: z.number().min(0).max(1000000).nullable().default(null),
  rating: z.number().min(0).max(5).default(5),
  reviews: z.number().int().min(0).max(1000000).default(0),
  notes: z.array(z.string().max(60)).max(12).default([]),
  description: z.string().max(4000).default(""),
  journey_top: z.string().max(200).default(""),
  journey_heart: z.string().max(200).default(""),
  journey_base: z.string().max(200).default(""),
  burn_time: z.string().max(80).default(""),
  wax: z.string().max(160).default(""),
  dimensions: z.string().max(120).default(""),
  image: z.string().max(500).default(""),
  hover_image: z.string().max(500).default(""),
  gallery: z.array(z.string().max(500)).max(10).default([]),
  stock: z.number().int().min(0).max(100000).default(100),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().min(0).max(9999).default(0),
});

export const journalSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/),
  category: z.string().min(2).max(60),
  title: z.string().min(2).max(200),
  excerpt: z.string().max(600).default(""),
  body: z.string().max(20000).default(""),
  image: z.string().max(500).default(""),
  reading_time: z.string().max(20).default("5 min"),
  sort_order: z.number().int().min(0).max(9999).default(0),
  is_active: z.boolean().default(true),
});

export const collectionSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(2).max(120),
  copy: z.string().max(600).default(""),
  image: z.string().max(500).default(""),
  sort_order: z.number().int().min(0).max(9999).default(0),
  is_active: z.boolean().default(true),
});

export const orderStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["placed", "packed", "shipped", "delivered", "cancelled"]),
  payment_status: z.enum(["pending", "awaiting_payment", "paid", "refunded"]),
});

export const siteContentSchema = z.object({
  entries: z
    .array(z.object({ key: z.string().min(1).max(120), value: z.string().max(4000) }))
    .min(1)
    .max(100),
});

export const idSchema = z.object({ id: z.string().uuid() });
