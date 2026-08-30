import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const REF_STORAGE_KEY = "iv_referral_code";

const applicationSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().min(2, "Please enter your country").max(80),
  profession: z
    .string()
    .trim()
    .min(2, "Please enter your profession")
    .max(120),
  credentials: z
    .string()
    .trim()
    .min(10, "Please describe your qualifications (at least 10 characters)")
    .max(1000),
  fields: z
    .string()
    .trim()
    .min(3, "Please list the fields you practise in")
    .max(300),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

type FormState = z.infer<typeof applicationSchema>;

const EMPTY: FormState = {
  full_name: "",
  email: "",
  phone: "",
  country: "",
  profession: "",
  credentials: "",
  fields: "",
  message: "",
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs uppercase tracking-[0.14em]">
        {label}
      </Label>
      {children}
      {error && <p className="text-xs text-primary">{error}</p>}
    </div>
  );
}

export function AffiliateForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [referral, setReferral] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get("ref");
    if (fromUrl) {
      window.localStorage.setItem(REF_STORAGE_KEY, fromUrl);
      setReferral(fromUrl);
    } else {
      setReferral(window.localStorage.getItem(REF_STORAGE_KEY));
    }
  }, []);

  const set = (k: keyof FormState) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = applicationSchema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please correct the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    const { error } = await supabase.from("affiliate_applications").insert({
      ...parsed.data,
      phone: parsed.data.phone || null,
      message: parsed.data.message || null,
      referral_code: referral,
    });
    setSubmitting(false);
    if (error) {
      toast.error("We could not send your application. Please try again.");
      return;
    }
    setDone(true);
    setValues(EMPTY);
    toast.success("Application received — we reply within ten working days.");
  }

  if (done) {
    return (
      <div className="border border-border bg-card p-8">
        <h3 className="font-serif text-2xl text-ink">Thank you.</h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Your application has been received. We review each profile
          individually and reply within ten working days
          {referral ? ` — your referral code ${referral} was recorded.` : "."}
        </p>
        <Button className="mt-6" onClick={() => setDone(false)}>
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {referral && (
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Referred by code{" "}
          <span className="text-primary">{referral}</span>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="full_name" label="Full name" error={errors["full_name"]}>
          <Input
            id="full_name"
            value={values.full_name}
            maxLength={100}
            onChange={(e) => set("full_name")(e.target.value)}
          />
        </Field>
        <Field id="email" label="Email" error={errors["email"]}>
          <Input
            id="email"
            type="email"
            value={values.email}
            maxLength={255}
            onChange={(e) => set("email")(e.target.value)}
          />
        </Field>
        <Field id="phone" label="Phone (optional)" error={errors["phone"]}>
          <Input
            id="phone"
            value={values.phone}
            maxLength={40}
            onChange={(e) => set("phone")(e.target.value)}
          />
        </Field>
        <Field id="country" label="Country" error={errors["country"]}>
          <Input
            id="country"
            value={values.country}
            maxLength={80}
            onChange={(e) => set("country")(e.target.value)}
          />
        </Field>
        <Field
          id="profession"
          label="Profession"
          error={errors["profession"]}
        >
          <Input
            id="profession"
            placeholder="Clinical psychologist, coach, supervisor…"
            value={values.profession}
            maxLength={120}
            onChange={(e) => set("profession")(e.target.value)}
          />
        </Field>
        <Field id="fields" label="Fields of practice" error={errors["fields"]}>
          <Input
            id="fields"
            placeholder="Counselling, coaching, cross-culture, CORE"
            value={values.fields}
            maxLength={300}
            onChange={(e) => set("fields")(e.target.value)}
          />
        </Field>
      </div>

      <Field
        id="credentials"
        label="Qualifications & experience"
        error={errors["credentials"]}
      >
        <Textarea
          id="credentials"
          rows={4}
          maxLength={1000}
          value={values.credentials}
          onChange={(e) => set("credentials")(e.target.value)}
        />
      </Field>

      <Field id="message" label="Anything else (optional)" error={errors["message"]}>
        <Textarea
          id="message"
          rows={3}
          maxLength={1500}
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Submit application"}
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Your data is processed under GDPR solely to review your application.
        </p>
      </div>
    </form>
  );
}

function makeCode(email: string) {
  const base = email.split("@")[0]?.replace(/[^a-zA-Z0-9]/g, "") ?? "iv";
  const rand = Math.random().toString(36).slice(2, 7);
  return `${base.slice(0, 8) || "iv"}-${rand}`.toUpperCase();
}

const referrerSchema = z.object({
  name: z.string().trim().max(100).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address").max(255),
});

export function ReferralCapture() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const link = useMemo(
    () =>
      code && typeof window !== "undefined"
        ? `${window.location.origin}/affiliate?ref=${code}`
        : null,
    [code],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = referrerSchema.safeParse({ name, email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setError(null);
    setBusy(true);
    const generated = makeCode(parsed.data.email);
    const { error: err } = await supabase.from("affiliate_referrers").insert({
      name: parsed.data.name || null,
      email: parsed.data.email,
      code: generated,
    });
    setBusy(false);
    if (err) {
      toast.error("We could not create your referral code. Please try again.");
      return;
    }
    setCode(generated);
    toast.success("Your referral code is ready.");
  }

  if (code && link) {
    return (
      <div className="border border-border bg-card p-8">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Your referral code
        </p>
        <p className="mt-2 font-serif text-3xl text-primary">{code}</p>
        <p className="mt-4 break-all text-sm text-muted-foreground">{link}</p>
        <Button
          className="mt-6"
          onClick={() => {
            navigator.clipboard?.writeText(link);
            toast.success("Referral link copied.");
          }}
        >
          Copy referral link
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ref_name" className="text-xs uppercase tracking-[0.14em]">
            Name (optional)
          </Label>
          <Input
            id="ref_name"
            value={name}
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ref_email" className="text-xs uppercase tracking-[0.14em]">
            Email
          </Label>
          <Input
            id="ref_email"
            type="email"
            value={email}
            maxLength={255}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      {error && <p className="text-xs text-primary">{error}</p>}
      <Button type="submit" size="lg" disabled={busy}>
        {busy ? "Creating…" : "Get my referral code"}
      </Button>
    </form>
  );
}
