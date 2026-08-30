import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  SiteLayout,
  PageHero,
  Section,
} from "@/components/site/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AffiliateScreening,
  type ScreeningAnswers,
  type ScreeningOutcome,
} from "@/components/site/affiliate-screening";
import {
  startApplication,
  confirmApplication,
  submitApplication,
} from "@/lib/apply.functions";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Apply — Integral Values Associate Network" },
      {
        name: "description",
        content:
          "Apply to the Integral Values Associate Network: confirm your email, answer the screening questions and submit your application with three referees.",
      },
      { property: "og:title", content: "Apply — Integral Values" },
      {
        property: "og:description",
        content:
          "Confirm your email, answer the screening questions and submit your application with three referees.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyPage,
});

const REF_STORAGE_KEY = "iv_referral_code";

const detailsSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().min(2, "Please enter your country").max(80),
  profession: z.string().trim().min(2, "Please enter your profession").max(120),
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

const refereeSchema = z.object({
  name: z.string().trim().min(2, "Referee name is required").max(100),
  email: z.string().trim().email("Enter a valid referee email").max(255),
  relationship: z
    .string()
    .trim()
    .min(2, "Describe how they know your practice")
    .max(120),
});

type Details = z.infer<typeof detailsSchema>;
type Referee = z.infer<typeof refereeSchema>;

const EMPTY_DETAILS: Details = {
  full_name: "",
  phone: "",
  country: "",
  profession: "",
  credentials: "",
  fields: "",
  message: "",
};

const EMPTY_REFEREES: Referee[] = [
  { name: "", email: "", relationship: "" },
  { name: "", email: "", relationship: "" },
  { name: "", email: "", relationship: "" },
];

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

function Steps({ current }: { current: number }) {
  const labels = ["Your email", "Confirm link", "Questions", "Referees"];
  return (
    <ol className="mb-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em]">
      {labels.map((l, i) => (
        <li
          key={l}
          className={`border px-4 py-2 ${
            i === current
              ? "border-primary text-primary"
              : i < current
                ? "border-border text-muted-foreground"
                : "border-border/60 text-muted-foreground/60"
          }`}
        >
          {i + 1}. {l}
        </li>
      ))}
    </ol>
  );
}

function ApplyPage() {
  const start = useServerFn(startApplication);
  const confirm = useServerFn(confirmApplication);
  const submit = useServerFn(submitApplication);

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [referral, setReferral] = useState<string | null>(null);
  const [screening, setScreening] = useState<{
    answers: ScreeningAnswers;
    outcome: ScreeningOutcome;
  } | null>(null);
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [referees, setReferees] = useState<Referee[]>(EMPTY_REFEREES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);

  const confirmLink = useMemo(
    () =>
      token && typeof window !== "undefined"
        ? `${window.location.origin}/apply?token=${token}`
        : null,
    [token],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get("ref");
    if (fromUrl) {
      window.localStorage.setItem(REF_STORAGE_KEY, fromUrl);
      setReferral(fromUrl);
    } else {
      setReferral(window.localStorage.getItem(REF_STORAGE_KEY));
    }

    const urlToken = url.searchParams.get("token");
    if (!urlToken) return;
    setBusy(true);
    confirm({ data: { token: urlToken } })
      .then((res) => {
        if (!res) {
          toast.error("This confirmation link is not valid.");
          return;
        }
        if (res.submitted) {
          toast.error("This application has already been submitted.");
          return;
        }
        setEmail(res.email);
        setToken(urlToken);
        setStep(2);
        toast.success("Email confirmed — you can answer the questions now.");
      })
      .catch(() => toast.error("We could not confirm this link."))
      .finally(() => setBusy(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onStart(e: React.FormEvent) {
    e.preventDefault();
    const parsed = z.string().trim().email().max(255).safeParse(email);
    if (!parsed.success) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError(null);
    setBusy(true);
    try {
      const res = await start({ data: { email: parsed.data } });
      setToken(res.token);
      setStep(1);
    } catch {
      toast.error("We could not start your application. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmitAll(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    const parsedDetails = detailsSchema.safeParse(details);
    if (!parsedDetails.success) {
      for (const issue of parsedDetails.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
    }
    referees.forEach((r, i) => {
      const parsed = refereeSchema.safeParse(r);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const key = `referee_${i}_${String(issue.path[0])}`;
          if (!next[key]) next[key] = issue.message;
        }
      }
    });
    setErrors(next);
    if (Object.keys(next).length > 0 || !parsedDetails.success) {
      toast.error("Please correct the highlighted fields.");
      return;
    }
    if (!token || !screening) return;

    setBusy(true);
    try {
      const res = await submit({
        data: {
          token,
          ...parsedDetails.data,
          phone: parsedDetails.data.phone || null,
          message: parsedDetails.data.message || null,
          referral_code: referral,
          screening: screening.answers as Record<string, unknown>,
          screening_outcome: screening.outcome,
          referees: referees.map((r) => ({
            name: r.name.trim(),
            email: r.email.trim(),
            relationship: r.relationship.trim(),
          })),
        },
      });
      setReference(res.reference_code);
      setStep(4);
      toast.success("Application received — we reply within ten working days.");
    } catch {
      toast.error("We could not send your application. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const setDetail = (k: keyof Details) => (v: string) =>
    setDetails((prev) => ({ ...prev, [k]: v }));

  const setReferee = (i: number, k: keyof Referee) => (v: string) =>
    setReferees((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, [k]: v } : r)),
    );

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Associate Network"
        title="Apply"
        lead="Four steps: confirm your email, answer the screening questions, complete your profile and name three referees for review."
      />

      <Section muted eyebrow="Application" title="Your application">
        {step < 4 && <Steps current={Math.min(step, 3)} />}

        {step === 0 && (
          <form onSubmit={onStart} noValidate className="max-w-xl space-y-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with your email ID. We create a private confirmation link so
              only you can complete this application.
            </p>
            <Field id="apply_email" label="Email ID" error={emailError ?? undefined}>
              <Input
                id="apply_email"
                type="email"
                value={email}
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Preparing…" : "Get my confirmation link"}
            </Button>
          </form>
        )}

        {step === 1 && confirmLink && (
          <div className="max-w-2xl border border-border bg-card p-8">
            <h3 className="font-serif text-2xl text-ink">
              Confirm your email
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A confirmation link has been created for{" "}
              <span className="text-primary">{email}</span>. Open it to unlock
              the questionnaire — keep it private, it is unique to you.
            </p>
            <p className="mt-4 break-all rounded-sm bg-background p-4 text-sm text-muted-foreground">
              {confirmLink}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button
                onClick={() => {
                  navigator.clipboard?.writeText(confirmLink);
                  toast.success("Confirmation link copied.");
                }}
              >
                Copy link
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setStep(2);
                  toast.success("Email confirmed — continue your application.");
                }}
              >
                Continue now
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <p className="text-sm text-muted-foreground">
              Applying as <span className="text-primary">{email}</span>
            </p>
            {screening ? (
              <div className="flex flex-wrap items-center justify-between gap-4 border border-border bg-card px-5 py-4">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Screening{" "}
                  <span className="text-primary">
                    {screening.outcome === "eligible"
                      ? "passed"
                      : "passed with notes"}
                  </span>
                </p>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setScreening(null)}
                    className="text-xs text-primary underline"
                  >
                    Retake screening
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs text-primary underline"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              <AffiliateScreening
                onComplete={(answers, outcome) => {
                  setScreening({ answers, outcome });
                  setStep(3);
                }}
              />
            )}
          </div>
        )}

        {step === 3 && (
          <form onSubmit={onSubmitAll} noValidate className="space-y-10">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Applying as <span className="text-primary">{email}</span>
                {referral && (
                  <>
                    {" "}
                    · referred by code{" "}
                    <span className="text-primary">{referral}</span>
                  </>
                )}
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="full_name" label="Full name" error={errors["full_name"]}>
                  <Input
                    id="full_name"
                    value={details.full_name}
                    maxLength={100}
                    onChange={(e) => setDetail("full_name")(e.target.value)}
                  />
                </Field>
                <Field id="phone" label="Phone (optional)" error={errors["phone"]}>
                  <Input
                    id="phone"
                    value={details.phone}
                    maxLength={40}
                    onChange={(e) => setDetail("phone")(e.target.value)}
                  />
                </Field>
                <Field id="country" label="Country" error={errors["country"]}>
                  <Input
                    id="country"
                    value={details.country}
                    maxLength={80}
                    onChange={(e) => setDetail("country")(e.target.value)}
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
                    value={details.profession}
                    maxLength={120}
                    onChange={(e) => setDetail("profession")(e.target.value)}
                  />
                </Field>
              </div>

              <Field id="fields" label="Fields of practice" error={errors["fields"]}>
                <Input
                  id="fields"
                  placeholder="Counselling, coaching, cross-culture, CORE"
                  value={details.fields}
                  maxLength={300}
                  onChange={(e) => setDetail("fields")(e.target.value)}
                />
              </Field>

              <Field
                id="credentials"
                label="Qualifications & experience"
                error={errors["credentials"]}
              >
                <Textarea
                  id="credentials"
                  rows={4}
                  maxLength={1000}
                  value={details.credentials}
                  onChange={(e) => setDetail("credentials")(e.target.value)}
                />
              </Field>

              <Field
                id="message"
                label="Anything else (optional)"
                error={errors["message"]}
              >
                <Textarea
                  id="message"
                  rows={3}
                  maxLength={1500}
                  value={details.message}
                  onChange={(e) => setDetail("message")(e.target.value)}
                />
              </Field>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl text-ink">
                  Three referees for review
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Name three professional referees who can speak to your
                  clinical practice, ethics and supervision history. We contact
                  them only if your application moves to review.
                </p>
              </div>
              {referees.map((r, i) => (
                <div
                  key={i}
                  className="grid gap-6 border border-border bg-card p-6 sm:grid-cols-3"
                >
                  <Field
                    id={`referee_${i}_name`}
                    label={`Referee ${i + 1} — name`}
                    error={errors[`referee_${i}_name`]}
                  >
                    <Input
                      id={`referee_${i}_name`}
                      value={r.name}
                      maxLength={100}
                      onChange={(e) => setReferee(i, "name")(e.target.value)}
                    />
                  </Field>
                  <Field
                    id={`referee_${i}_email`}
                    label="Email"
                    error={errors[`referee_${i}_email`]}
                  >
                    <Input
                      id={`referee_${i}_email`}
                      type="email"
                      value={r.email}
                      maxLength={255}
                      onChange={(e) => setReferee(i, "email")(e.target.value)}
                    />
                  </Field>
                  <Field
                    id={`referee_${i}_relationship`}
                    label="Relationship"
                    error={errors[`referee_${i}_relationship`]}
                  >
                    <Input
                      id={`referee_${i}_relationship`}
                      placeholder="Supervisor, colleague, training director…"
                      value={r.relationship}
                      maxLength={120}
                      onChange={(e) =>
                        setReferee(i, "relationship")(e.target.value)
                      }
                    />
                  </Field>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg" disabled={busy}>
                {busy ? "Sending…" : "Submit application"}
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Your data is processed under GDPR solely to review your
                application.
              </p>
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="max-w-2xl border border-border bg-card p-8">
            <h3 className="font-serif text-2xl text-ink">Thank you.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your application and three referees have been received. We review
              each profile individually and reply within ten working days.
            </p>
            {reference && (
              <div className="mt-6 border border-border bg-background p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Your reference code
                </p>
                <p className="mt-2 font-serif text-3xl text-primary">
                  {reference}
                </p>
                <Link
                  to="/affiliate/status"
                  className="mt-4 inline-block text-sm text-primary underline"
                >
                  Track my application
                </Link>
              </div>
            )}
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
