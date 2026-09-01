import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  assertAdmin,
  collectionSchema,
  idSchema,
  journalSchema,
  orderStatusSchema,
  productSchema,
  siteContentSchema,
} from "@/lib/admin-schemas";

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);

    const [products, collections, journal, content, orders] = await Promise.all([
      context.supabase.from("products").select("*").order("sort_order"),
      context.supabase.from("collections").select("*").order("sort_order"),
      context.supabase.from("journal_posts").select("*").order("sort_order"),
      context.supabase.from("site_content").select("*").order("group_name"),
      context.supabase
        .from("orders")
        .select(
          "id, order_number, full_name, email, total, status, payment_status, payment_method, created_at, order_items(name, quantity, unit_price)",
        )
        .order("created_at", { ascending: false })
        .limit(200),
    ]);

    return {
      products: products.data ?? [],
      collections: collections.data ?? [],
      journal: journal.data ?? [],
      content: content.data ?? [],
      orders: (orders.data ?? []).map((order) => ({
        ...order,
        total: Number(order.total),
        items: (order.order_items ?? []).map((item) => ({
          name: item.name,
          quantity: item.quantity,
          unitPrice: Number(item.unit_price),
        })),
      })),
      revenue: (orders.data ?? []).reduce((sum, order) => sum + Number(order.total), 0),
    };
  });

export const saveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => productSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("products").update(values).eq("id", id)
      : context.supabase.from("products").insert(values);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => idSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveCollection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => collectionSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("collections").update(values).eq("id", id)
      : context.supabase.from("collections").insert(values);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveJournalPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => journalSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...values } = data;
    const query = id
      ? context.supabase.from("journal_posts").update(values).eq("id", id)
      : context.supabase.from("journal_posts").insert(values);
    const { error } = await query;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const saveSiteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => siteContentSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    for (const entry of data.entries) {
      const { error } = await context.supabase
        .from("site_content")
        .update({ value: entry.value })
        .eq("key", entry.key);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => orderStatusSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("orders")
      .update({ status: data.status, payment_status: data.payment_status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
