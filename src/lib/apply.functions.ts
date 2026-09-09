import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email().max(255),
});

const tokenSchema = z.object({
  token: z.string().trim().min(10).max(80),
});

const refereeSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  relationship: z.string().trim().min(2).max(120),
});

const submitSchema = z.object({
  token: z.string().trim().min(10).max(80),
  full_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(40).optional().nullable(),
  country: z.string().trim().min(2).max(80),
  profession: z.string().trim().min(2).max(120),
  credentials: z.string().trim().min(10).max(1000),
  fields: z.string().trim().min(3).max(300),
  message: z.string().trim().max(1500).optional().nullable(),
  referral_code: z.string().trim().max(80).optional().nullable(),
  screening: z.record(z.string(), z.unknown()).default({}),
  screening_outcome: z.enum(["eligible", "conditional", "not_eligible", "unknown"]),
  referees: z.array(refereeSchema).length(3),
});

const APPLICATION_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function randomToken() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function makeReference() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const rand = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
  return `IV-${rand}`;
}

function linkExpired(createdAt: string) {
  return Date.now() - new Date(createdAt).getTime() > APPLICATION_LINK_TTL_MS;
}

/** Step 1 — capture the email and issue a short-lived application token. */
export const startApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => emailSchema.parse(input))
  .handler(async ({ data }): Promise<{ token: string }> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const token = randomToken();
    const { error } = await supabaseAdmin
      .from("affiliate_apply_sessions")
      .insert({ email: data.email, token });
    if (error) throw new Error("Could not start the application");
    return { token };
  });

/** Step 2 — validate the secure application link and unlock the questionnaire. */
export const confirmApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => tokenSchema.parse(input))
  .handler(
    async ({
      data,
    }): Promise<{ email: string; submitted: boolean } | null> => {
      const { supabaseAdmin } = await import(
        "@/integrations/supabase/client.server"
      );
      const { data: row, error } = await supabaseAdmin
        .from("affiliate_apply_sessions")
        .select("id, email, submitted_at, created_at")
        .eq("token", data.token)
        .maybeSingle();
      if (error) throw new Error("Confirmation failed");
      if (!row || linkExpired(row.created_at)) return null;
      await supabaseAdmin
        .from("affiliate_apply_sessions")
        .update({ confirmed_at: new Date().toISOString() })
        .eq("id", row.id);
      return { email: row.email, submitted: Boolean(row.submitted_at) };
    },
  );

/** Step 3 — submit the answered questionnaire with three referees. */
export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }): Promise<{ reference_code: string }> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { data: session, error: sessionError } = await supabaseAdmin
      .from("affiliate_apply_sessions")
      .select("id, email, confirmed_at, submitted_at, created_at")
      .eq("token", data.token)
      .maybeSingle();
    if (sessionError) throw new Error("Submission failed");
    if (!session || linkExpired(session.created_at)) {
      throw new Error("This application link has expired. Please start again.");
    }
    if (!session.confirmed_at) {
      throw new Error("Please open your secure application link first");
    }
    if (session.submitted_at) {
      throw new Error("This application has already been submitted");
    }

    const reference_code = makeReference();
    const { error } = await supabaseAdmin
      .from("affiliate_applications")
      .insert({
        reference_code,
        email: session.email,
        full_name: data.full_name,
        phone: data.phone || null,
        country: data.country,
        profession: data.profession,
        credentials: data.credentials,
        fields: data.fields,
        message: data.message || null,
        referral_code: data.referral_code || null,
        screening: data.screening as never,
        screening_outcome: data.screening_outcome,
        referees: data.referees as never,
      });
    if (error) throw new Error("Submission failed");

    await supabaseAdmin
      .from("affiliate_apply_sessions")
      .update({ submitted_at: new Date().toISOString() })
      .eq("id", session.id);

    return { reference_code };
  });
