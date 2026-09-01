import { z } from "zod";

export const slugSchema = z.object({ slug: z.string().min(1).max(120) });
