import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout, PageHero, Section } from "@/components/site/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  APPLICATION_STAGES,
  listApplications,
  updateApplication,
  isCurrentUserAdmin,
  type AdminApplication,
  type ApplicationStage,
} from "@/lib/admin-applications.functions";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [
      { title: "Applications Dashboard — Integral Values Admin" },
      {
        name: "description",
        content:
          "Internal dashboard to review affiliate applications, filter them by stage and record next steps.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Applications Dashboard — Integral Values" },
      {
        property: "og:description",
        content: "Internal review dashboard for affiliate applications.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminApplicationsPage,
});

const STAGE_LABEL: Record<ApplicationStage, string> = {
  new: "Application received",
  in_review: "Under review",
  interview: "Intake interview",
  accepted: "Affiliation confirmed",
  declined: "Not retained",
};

function AdminApplicationsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) =>
      setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Internal"
        title="Applications dashboard."
        lead="Review affiliate applications, filter them by stage and record the next step for each applicant."
      />
      <Section eyebrow="Review" title="Affiliate applications">
        {!checked ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : !session ? (
          <SignInCard />
        ) : (
          <Dashboard />
        )}
      </Section>
    </SiteLayout>
  );
}

function SignInCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (err) setError(err.message);
  }

  return (
    <form
      onSubmit={submit}
      className="max-w-md space-y-5 border border-border bg-card p-8"
    >
      <h3 className="font-serif text-2xl text-ink">Administrator sign in</h3>
      <div className="space-y-2">
        <Label htmlFor="admin-email" className="text-xs uppercase tracking-[0.14em]">
          Email
        </Label>
        <Input
          id="admin-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="admin-password"
          className="text-xs uppercase tracking-[0.14em]"
        >
          Password
        </Label>
        <Input
          id="admin-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-xs text-primary">{error}</p>}
      <Button type="submit" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function Dashboard() {
  const load = useServerFn(listApplications);
  const checkAdmin = useServerFn(isCurrentUserAdmin);
  const [admin, setAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState<"all" | ApplicationStage>("all");
  const [rows, setRows] = useState<AdminApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdmin({}).then(setAdmin).catch(() => setAdmin(false));
  }, [checkAdmin]);

  const refresh = useCallback(
    async (status: "all" | ApplicationStage) => {
      setLoading(true);
      try {
        setRows(await load({ data: { status } }));
      } catch {
        toast.error("Could not load applications.");
      } finally {
        setLoading(false);
      }
    },
    [load],
  );

  useEffect(() => {
    if (admin) void refresh(filter);
  }, [admin, filter, refresh]);

  if (admin === null) return <p className="text-sm text-muted-foreground">Checking access…</p>;

  if (!admin) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          This account does not have administrator access.
        </p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {(["all", ...APPLICATION_STAGES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
              filter === s
                ? "border-primary text-primary"
                : "border-border text-muted-foreground hover:text-ink"
            }`}
          >
            {s === "all" ? "All" : STAGE_LABEL[s]}
          </button>
        ))}
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => supabase.auth.signOut()}
        >
          Sign out
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading applications…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No applications at this stage.
        </p>
      ) : (
        <div className="space-y-6">
          {rows.map((row) => (
            <ApplicationCard
              key={row.id}
              row={row}
              onSaved={(next) =>
                setRows((prev) =>
                  prev.map((r) => (r.id === next.id ? next : r)),
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ApplicationCard({
  row,
  onSaved,
}: {
  row: AdminApplication;
  onSaved: (next: AdminApplication) => void;
}) {
  const save = useServerFn(updateApplication);
  const [status, setStatus] = useState<ApplicationStage>(
    (APPLICATION_STAGES as readonly string[]).includes(row.status)
      ? (row.status as ApplicationStage)
      : "new",
  );
  const [note, setNote] = useState(row.status_note ?? "");
  const [busy, setBusy] = useState(false);

  async function onSave() {
    setBusy(true);
    try {
      const next = await save({
        data: { id: row.id, status, status_note: note.trim() || null },
      });
      onSaved(next);
      toast.success("Application updated.");
    } catch {
      toast.error("Could not save the update.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="border border-border bg-card p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {row.reference_code} · {row.country}
          </p>
          <h4 className="mt-1 font-serif text-2xl text-ink">{row.full_name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {row.email}
            {row.phone ? ` · ${row.phone}` : ""}
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-primary">
          {STAGE_LABEL[status]}
        </p>
      </div>

      <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Profession
          </dt>
          <dd className="text-ink">{row.profession}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Fields
          </dt>
          <dd className="text-ink">{row.fields}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Qualifications
          </dt>
          <dd className="leading-relaxed text-muted-foreground">
            {row.credentials}
          </dd>
        </div>
        {row.message && (
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              Message
            </dt>
            <dd className="leading-relaxed text-muted-foreground">
              {row.message}
            </dd>
          </div>
        )}
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Referral
          </dt>
          <dd className="text-ink">{row.referral_code ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Submitted
          </dt>
          <dd className="text-ink">
            {new Date(row.created_at).toLocaleDateString()}
          </dd>
        </div>
      </dl>

      <div className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-[220px_1fr]">
        <div className="space-y-2">
          <Label
            htmlFor={`stage-${row.id}`}
            className="text-xs uppercase tracking-[0.14em]"
          >
            Stage
          </Label>
          <select
            id={`stage-${row.id}`}
            value={status}
            onChange={(e) => setStatus(e.target.value as ApplicationStage)}
            className="h-10 w-full border border-border bg-card px-3 text-sm text-ink"
          >
            {APPLICATION_STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_LABEL[s]}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor={`note-${row.id}`}
            className="text-xs uppercase tracking-[0.14em]"
          >
            Next step note (visible to the applicant)
          </Label>
          <Textarea
            id={`note-${row.id}`}
            rows={3}
            maxLength={1000}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Button onClick={onSave} disabled={busy}>
            {busy ? "Saving…" : "Save update"}
          </Button>
        </div>
      </div>
    </article>
  );
}
