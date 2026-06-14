import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MOOD_EMOJI, MOOD_LABELS } from "@/lib/brand";
import { Brain, BookText, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord · Integral Value" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();

  const moods = useQuery({
    queryKey: ["mood-recent", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("mood_entries").select("score, note, entry_date, created_at").order("created_at", { ascending: false }).limit(7);
      return data ?? [];
    },
  });

  const journals = useQuery({
    queryKey: ["journal-count", user.id],
    queryFn: async () => {
      const { count } = await supabase.from("journal_entries").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const bookings = useQuery({
    queryKey: ["bookings-pending", user.id],
    queryFn: async () => {
      const { count } = await supabase.from("booking_requests").select("*", { count: "exact", head: true }).eq("status", "pending");
      return count ?? 0;
    },
  });

  const last = moods.data?.[0];
  const avg = moods.data && moods.data.length > 0 ? moods.data.reduce((s, m) => s + m.score, 0) / moods.data.length : null;

  const hour = new Date().getHours();
  const greet = hour < 6 ? "Bonne nuit" : hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">{greet}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">
          Comment vous sentez-vous <span className="text-gradient">aujourd'hui</span> ?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Un geste suffit. Notez votre humeur, ouvrez votre journal, ou explorez les professionnels disponibles.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        <StatCard
          title="Humeur récente"
          value={last ? `${MOOD_EMOJI[last.score - 1]} ${MOOD_LABELS[last.score - 1]}` : "—"}
          hint={avg !== null ? `Moyenne 7 jours : ${avg.toFixed(1)}/5` : "Aucune note encore"}
          to="/mood" icon={<Brain className="h-5 w-5" />}
        />
        <StatCard title="Entrées de journal" value={journals.data?.toString() ?? "0"} hint="Confidentiel, à vous seul·e" to="/journal" icon={<BookText className="h-5 w-5" />} />
        <StatCard title="Demandes en attente" value={bookings.data?.toString() ?? "0"} hint="Suivez vos rendez-vous" to="/bookings" icon={<Users className="h-5 w-5" />} />
      </div>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Vos 7 derniers jours</h2>
            <Link to="/mood" className="text-xs text-accent hover:underline">Voir tout</Link>
          </div>
          {moods.data && moods.data.length > 0 ? (
            <div className="mt-6 flex items-end justify-between gap-2 h-40">
              {[...moods.data].reverse().map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-pill transition-all" style={{ height: `${(m.score / 5) * 100}%`, minHeight: "8%" }} />
                  <span className="text-[10px] text-muted-foreground">{new Date(m.entry_date).toLocaleDateString("fr", { weekday: "short" })}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-muted-foreground">Aucune entrée encore. <Link to="/mood" className="text-accent hover:underline">Commencer →</Link></p>
          )}
        </div>

        <div className="glass rounded-3xl bg-card-gradient p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Aujourd'hui</p>
          <h2 className="mt-2 font-display text-xl font-semibold">Une intention douce</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            « Reconnaître ce que je ressens, sans avoir à le résoudre tout de suite. »
          </p>
          <Link to="/journal" className="mt-6 inline-flex items-center gap-2 text-sm text-foreground">
            Écrire dans mon journal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, hint, to, icon }: { title: string; value: string; hint: string; to: "/mood" | "/journal" | "/bookings"; icon: React.ReactNode }) {
  return (
    <Link to={to} className="glass group rounded-2xl p-5 transition hover:-translate-y-0.5 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{title}</span>
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-accent">{icon}</span>
      </div>
      <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </Link>
  );
}
