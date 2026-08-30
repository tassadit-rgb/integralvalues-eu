import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const APPLICATION_STAGES = [
  "new",
  "in_review",
  "interview",
  "accepted",
  "declined",
] as const;

export type ApplicationStage = (typeof APPLICATION_STAGES)[number];

export type AdminApplication = {
  id: string;
  reference_code: string;
  full_name: string;
  email: string;
  phone: string | null;
  country: string;
  profession: string;
  credentials: string;
  fields: string;
  message: string | null;
  referral_code: string | null;
  status: string;
  status_note: string | null;
  created_at: string;
  updated_at: string;
};

const listSchema = z.object({
  status: z.enum(["all", ...APPLICATION_STAGES]).default("all"),
});

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(APPLICATION_STAGES),
  status_note: z.string().trim().max(1000).nullable(),
});

async function assertAdmin(context: { supabase: unknown; userId: string }) {
  const supabase = context.supabase as {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: unknown }>;
  };
  const { data, error } = await supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || data !== true) throw new Error("Forbidden");
}

export const listApplications = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => listSchema.parse(input))
  .handler(async ({ data, context }): Promise<AdminApplication[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    let query = supabaseAdmin
      .from("affiliate_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (data.status !== "all") query = query.eq("status", data.status);
    const { data: rows, error } = await query;
    if (error) throw new Error("Could not load applications");
    return (rows ?? []) as AdminApplication[];
  });

export const updateApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ data, context }): Promise<AdminApplication> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const { data: row, error } = await supabaseAdmin
      .from("affiliate_applications")
      .update({ status: data.status, status_note: data.status_note })
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error("Could not update the application");
    return row as AdminApplication;
  });

export const isCurrentUserAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<boolean> => {
    try {
      await assertAdmin(context);
      return true;
    } catch {
      return false;
    }
  });
