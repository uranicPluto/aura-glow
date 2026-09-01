import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { checkoutSchema } from "@/lib/checkout-schema";
import { resolveImage } from "@/lib/images";
import type { CustomerOrder } from "@/lib/store-types";

export const placeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => checkoutSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Prices, names and availability always come from the database — never the client.
    const { data: rows, error } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, price, image, stock, is_active")
      .in(
        "slug",
        data.items.map((item) => item.slug),
      );
    if (error) throw new Error("Could not load your items. Please try again.");

    const lines = data.items.map((item) => {
      const product = (rows ?? []).find((row) => row.slug === item.slug);
      if (!product || !product.is_active) {
        throw new Error(`${item.slug} is no longer available.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Only ${product.stock} of ${product.name} remain in stock.`);
      }
      return {
        product_id: product.id,
        product_slug: product.slug,
        name: product.name,
        image: product.image,
        unit_price: Number(product.price),
        quantity: item.quantity,
      };
    });

    const { data: settings } = await supabaseAdmin
      .from("site_content")
      .select("key, value")
      .in("key", ["shipping.free_threshold", "shipping.flat_rate"]);
    const setting = (key: string, fallback: number) => {
      const raw = (settings ?? []).find((row) => row.key === key)?.value;
      const parsed = Number(raw);
      return Number.isFinite(parsed) ? parsed : fallback;
    };

    const subtotal = lines.reduce((sum, line) => sum + line.unit_price * line.quantity, 0);
    const shipping =
      subtotal >= setting("shipping.free_threshold", 150) ? 0 : setting("shipping.flat_rate", 12);
    const orderNumber = `ML-${Date.now().toString(36).toUpperCase()}`;

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: context.userId,
        email: data.email,
        full_name: data.fullName,
        phone: data.phone,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2,
        city: data.city,
        state: data.state,
        postal_code: data.postalCode,
        country: data.country,
        gift_note: data.giftNote,
        subtotal,
        shipping,
        total: subtotal + shipping,
        payment_method: data.paymentMethod,
        payment_status: data.paymentMethod === "cod" ? "pending" : "awaiting_payment",
        status: "placed",
      })
      .select("id, order_number, total")
      .single();
    if (orderError || !order) throw new Error("We could not place your order.");

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(lines.map((line) => ({ ...line, order_id: order.id })));
    if (itemsError) {
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error("We could not place your order.");
    }

    for (const line of lines) {
      const product = (rows ?? []).find((row) => row.id === line.product_id);
      if (!product) continue;
      await supabaseAdmin
        .from("products")
        .update({ stock: Math.max(0, product.stock - line.quantity) })
        .eq("id", product.id);
    }

    return {
      orderNumber: order.order_number,
      total: Number(order.total),
    };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CustomerOrder[]> => {
    const { data } = await context.supabase
      .from("orders")
      .select(
        "id, order_number, status, payment_status, payment_method, total, created_at, order_items(name, quantity, unit_price, image)",
      )
      .order("created_at", { ascending: false });

    return (data ?? []).map((order) => ({
      id: order.id,
      orderNumber: order.order_number,
      status: order.status,
      paymentStatus: order.payment_status,
      paymentMethod: order.payment_method,
      total: Number(order.total),
      createdAt: order.created_at,
      items: (order.order_items ?? []).map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: Number(item.unit_price),
        image: resolveImage(item.image),
      })),
    }));
  });
