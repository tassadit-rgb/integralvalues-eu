import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ContactSchema = z.object({
  first: z.string().trim().min(1).max(80),
  last: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(40).optional().default(""),
  country: z.string().trim().max(80).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  interest: z.string().trim().min(1).max(80),
  message: z.string().trim().min(5).max(4000),
});

export const submitContactRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_requests").insert({
      first_name: data.first,
      last_name: data.last,
      email: data.email,
      phone: data.phone || null,
      country: data.country || null,
      role: data.role || null,
      interest: data.interest,
      message: data.message,
    });

    if (error) {
      console.error("[contact] insert failed", error);
      throw new Error("Could not save your request. Please try again.");
    }

    return { ok: true as const };
  });
