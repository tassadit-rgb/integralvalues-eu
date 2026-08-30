import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  lookupApplicationStatus,
  type ApplicationStatus,
} from "@/lib/affiliate-status.functions";

export const Route = createFileRoute("/affiliate/status")({
  head: () => ({
    meta: [
      { title: "Application Status — Integral Values Affiliates" },
      {
        name: "description",
        content:
          "Track your Integral Values affiliate application: review progress, current stage and the next steps expected from you.",
      },
      {
        property: "og:title",
        content: "Application Status — Integral Values Affiliates",
      },
      {
        property: "og:description",
        content:
          "Enter your reference code and email to follow the progress of your affiliate application.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StatusPage,
});

const STAGES = [
  {
    key: "new",
    title: "Application received",
    body: "Your file is registered and queued for review by the clinical committee.",
    next: "Nothing to do — we reply within ten working days.",
  },
  {
    key: "in_review",
    title: "Under review",
    body: "Your qualifications, insurance and practice history are being verified.",
    next: "Keep an eye on your inbox: we may request a certificate or a reference.",
  },
  {
    key: "interview",
    title: "Intake interview",
    body: "A 45-minute conversation on your practice, ethics and the integrative charter.",
    next: "Confirm a slot in the invitation email and prepare a short case example.",
  },
  {
    key: "accepted",
    title: "Affiliation confirmed",
    body: "You have signed the charter and entered the supervision cycle.",
    next: "Book your first supervision session and complete your practitioner profile.",
  },
] as const;

const DECLINED = {
  title: "Not retained for now",
  body: "The committee could not confirm your affiliation at this stage.",
  next: "You may reapply after twelve months, or join the supervision path first.",
};

const lookupSchema = z.object({
  reference_code: z.string().trim().min(4, "Enter your reference code").max(40),
  email: z.string().trim().email("Enter a valid email address").max(255),
});

function stageIndex(status: string) {
  const i = STAGES.findIndex((s) => s.key === status);
  return i === -1 ? 0 : i;
}

function StatusPage() {
  const lookup = useServerFn(lookupApplicationStatus);
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ApplicationStatus | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = lookupSchema.safeParse({ reference_code: reference, email });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setBusy(true);
    setNotFound(false);
    try {
      const row = await lookup({ data: parsed.data });
      setResult(row);
      setNotFound(!row);
    } catch {
      setErrors({ reference_code: "We could not check your status. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  const declined = result?.status === "declined";
  const current = result ? stageIndex(result.status) : 0;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Affiliates"
        title="Follow your application."
        lead="Enter the reference code from your confirmation and the email you applied with to see where your file stands and what happens next."
        quote="You're not alone."
      />

      <Section eyebrow="Lookup" title="Check your application status">
        <form
          onSubmit={onSubmit}
          noValidate
          className="grid max-w-2xl gap-6 sm:grid-cols-2"
        >
          <div className="space-y-2">
            <Label
              htmlFor="reference_code"
              className="text-xs uppercase tracking-[0.14em]"
            >
              Reference code
            </Label>
            <Input
              id="reference_code"
              placeholder="IV-XXXXXXXX"
              value={reference}
              maxLength={40}
              onChange={(e) => setReference(e.target.value)}
            />
            {errors["reference_code"] && (
              <p className="text-xs text-primary">{errors["reference_code"]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-[0.14em]">
              Email used to apply
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors["email"] && (
              <p className="text-xs text-primary">{errors["email"]}</p>
            )}
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" disabled={busy}>
              {busy ? "Checking…" : "Check status"}
            </Button>
          </div>
        </form>

        {notFound && (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            No application matches that reference code and email. Check both
            entries, or{" "}
            <Link to="/affiliate" className="text-primary underline">
              submit a new application
            </Link>
            .
          </p>
        )}

        {result && (
          <div className="mt-10 space-y-8">
            <div className="border border-border bg-card p-8">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Reference {result.reference_code}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink">
                {result.full_name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Submitted{" "}
                {new Date(result.created_at).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                · last update{" "}
                {new Date(result.updated_at).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {result.status_note && (
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink">
                  {result.status_note}
                </p>
              )}
            </div>

            {declined ? (
              <div className="border border-border bg-card p-8">
                <h4 className="font-serif text-xl text-ink">{DECLINED.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {DECLINED.body}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  Next step — {DECLINED.next}
                </p>
              </div>
            ) : (
              <ol className="space-y-4">
                {STAGES.map((stage, i) => {
                  const done = i < current;
                  const active = i === current;
                  return (
                    <li
                      key={stage.key}
                      className={`border p-6 ${
                        active
                          ? "border-primary bg-card"
                          : "border-border bg-card/60"
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`text-xs uppercase tracking-[0.14em] ${
                            done || active
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {done ? "Completed" : active ? "In progress" : "Upcoming"}
                        </span>
                        <h4 className="font-serif text-xl text-ink">
                          {stage.title}
                        </h4>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {stage.body}
                      </p>
                      {active && (
                        <p className="mt-3 text-sm leading-relaxed text-ink">
                          Next step — {stage.next}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}
