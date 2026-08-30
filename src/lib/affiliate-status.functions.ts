import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const lookupSchema = z.object({
  reference_code: z.string().trim().min(4).max(40),
  email: z.string().trim().email().max(255),
});

export type ApplicationStatus = {
  reference_code: string;
  full_name: string;
  status: string;
  status_note: string | null;
  created_at: string;
  updated_at: string;
};

export const lookupApplicationStatus = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => lookupSchema.parse(input))
  .handler(async ({ data }): Promise<ApplicationStatus | null> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { data: row, error } = await supabaseAdmin
      .from("affiliate_applications")
      .select("reference_code, full_name, status, status_note, created_at, updated_at")
      .eq("reference_code", data.reference_code.toUpperCase())
      .ilike("email", data.email)
      .maybeSingle();

    if (error) throw new Error("Lookup failed");
    return row ?? null;
  });
