import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/wheel")({
  head: () => ({
    meta: [
      { title: "Wheel of Life — Balance check across 8 life areas" },
      {
        name: "description",
        content:
          "Rate eight life areas from 1 to 10 to visualize your balance, save your wheel, and track how it shifts over time.",
      },
      { property: "og:title", content: "Wheel of Life tracker" },
      {
        property: "og:description",
        content: "Visualize and track your balance across eight key life areas.",
      },
    ],
  }),
  component: WheelPage,
});

type AreaKey =
  | "career"
  | "finances"
  | "health"
  | "family_friends"
  | "romance"
  | "personal_growth"
  | "fun_recreation"
  | "physical_environment";

const AREAS: { key: AreaKey; label: string; hint: string }[] = [
  { key: "career", label: "Career", hint: "Work, purpose, contribution" },
  { key: "finances", label: "Finances", hint: "Income, savings, security" },
  { key: "health", label: "Health", hint: "Body, sleep, energy" },
  { key: "family_friends", label: "Family & Friends", hint: "Close relationships" },
  { key: "romance", label: "Romance", hint: "Love & intimacy" },
  { key: "personal_growth", label: "Personal Growth", hint: "Learning, self-awareness" },
  { key: "fun_recreation", label: "Fun & Recreation", hint: "Play, hobbies, rest" },
  { key: "physical_environment", label: "Environment", hint: "Home, space, surroundings" },
];

type Entry = {
  id: string;
  entry_date: string;
  created_at: string;
  note: string | null;
} & Record<AreaKey, number>;

function emptyScores(): Record<AreaKey, number> {
  return AREAS.reduce(
    (acc, a) => ({ ...acc, [a.key]: 5 }),
    {} as Record<AreaKey, number>,
  );
}

function WheelPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground/80">Self check-in</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Wheel of Life
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Rate each area from 1 to 10 based on how satisfied you feel right now. The wheel
              shows you, at a glance, where life feels full and where it could use attention.
            </p>
          </div>
          <Link
            to="/"
            className="shrink-0 text-xs text-muted-foreground hover:text-ink"
          >
            ← Home
          </Link>
        </div>

        {!authChecked ? (
          <Card className="border-border bg-card p-6 text-muted-foreground">Loading…</Card>
        ) : !session ? (
          <AuthCard />
        ) : (
          <WheelTracker userId={session.user.id} />
        )}
      </div>
    </div>
  );
}

function AuthCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/wheel` },
        });
        if (error) throw error;
        setInfo("Check your email to confirm your account, then sign in.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card className="border-border bg-card p-6 text-ink backdrop-blur-sm">
      <h2 className="text-lg font-semibold">
        {mode === "signup" ? "Create your account" : "Sign in"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Save your wheel and track how it shifts over time.
      </p>
      <form onSubmit={submit} className="mt-5 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-muted-foreground">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border bg-card text-ink placeholder:text-muted-foreground"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-muted-foreground">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-border bg-card text-ink placeholder:text-muted-foreground"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        {info && <p className="text-xs text-muted-foreground">{info}</p>}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="text-xs text-muted-foreground underline-offset-2 hover:text-ink hover:underline"
          >
            {mode === "signup" ? "Have an account? Sign in" : "New here? Create account"}
          </button>
          <Button
            type="submit"
            disabled={busy}
            className="bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "…" : mode === "signup" ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function WheelTracker({ userId }: { userId: string }) {
  const [scores, setScores] = useState<Record<AreaKey, number>>(emptyScores());
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadEntries() {
    setLoading(true);
    const { data, error } = await supabase
      .from("wheel_of_life")
      .select(
        "id, entry_date, created_at, note, career, finances, health, family_friends, romance, personal_growth, fun_recreation, physical_environment",
      )
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) setError(error.message);
    setEntries((data ?? []) as Entry[]);
    setLoading(false);
  }

  useEffect(() => {
    loadEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const average = useMemo(() => {
    const sum = AREAS.reduce((s, a) => s + scores[a.key], 0);
    return (sum / AREAS.length).toFixed(1);
  }, [scores]);

  const chartData = useMemo(
    () => AREAS.map((a) => ({ area: a.label, value: scores[a.key] })),
    [scores],
  );

  async function save() {
    setSaving(true);
    setError(null);
    const payload = {
      user_id: userId,
      note: note.trim() || null,
      ...scores,
    };
    const { error } = await supabase.from("wheel_of_life").insert(payload);
    if (error) {
      setError(error.message);
    } else {
      setNote("");
      await loadEntries();
    }
    setSaving(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card p-6 text-ink backdrop-blur-sm">
        <div className="grid gap-6 sm:grid-cols-[1fr_minmax(0,260px)]">
          <div>
            <h2 className="text-lg font-semibold">Today's wheel</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Average <span className="text-ink">{average}</span> / 10
            </p>
            <div className="mt-5 space-y-4">
              {AREAS.map((a) => (
                <div key={a.key}>
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <Label className="text-sm text-ink">{a.label}</Label>
                      <p className="text-[11px] text-muted-foreground">{a.hint}</p>
                    </div>
                    <span className="bg-clip-border text-base font-semibold text-ink tabular-nums">
                      {scores[a.key]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={scores[a.key]}
                    onChange={(e) =>
                      setScores((s) => ({ ...s, [a.key]: Number(e.target.value) }))
                    }
                    className="mt-1.5 w-full accent-primary"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="75%">
                  <PolarGrid stroke="rgba(255,255,255,0.18)" />
                  <PolarAngleAxis
                    dataKey="area"
                    tick={{ fill: "rgba(237,233,254,0.8)", fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 10]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    dataKey="value"
                    stroke="#e879f9"
                    fill="#e879f9"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="note" className="text-xs text-muted-foreground">
                Note (optional)
              </Label>
              <Textarea
                id="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's showing up for you?"
                className="border-border bg-card text-sm text-ink placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-xs text-destructive">{error}</p>}

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={signOut}
            className="text-xs text-muted-foreground hover:text-ink"
          >
            Sign out
          </button>
          <Button
            onClick={save}
            disabled={saving}
            className="bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save today's wheel"}
          </Button>
        </div>
      </Card>

      <Card className="border-border bg-card p-6 text-ink backdrop-blur-sm">
        <h2 className="text-lg font-semibold">History</h2>
        {loading ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : entries.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No entries yet. Save your first wheel above to start tracking.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {entries.map((e) => {
              const avg = (
                AREAS.reduce((s, a) => s + (e[a.key] as number), 0) / AREAS.length
              ).toFixed(1);
              const date = new Date(e.created_at).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              return (
                <li key={e.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{date}</p>
                    {e.note && (
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">{e.note}</p>
                    )}
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="bg-clip-border text-lg font-semibold text-ink tabular-nums">
                      {avg}
                    </span>
                    <span className="ml-1 text-xs text-muted-foreground">/ 10</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
