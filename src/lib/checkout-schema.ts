import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().min(6).max(30),
  addressLine1: z.string().min(4).max(200),
  addressLine2: z.string().max(200).default(""),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(80),
  postalCode: z.string().min(3).max(20),
  country: z.string().min(2).max(80).default("India"),
  giftNote: z.string().max(500).default(""),
  paymentMethod: z.enum(["upi", "card", "netbanking", "cod"]),
  items: z
    .array(
      z.object({
        slug: z.string().min(1).max(120),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(30),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
