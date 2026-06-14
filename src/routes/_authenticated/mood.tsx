import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MOOD_EMOJI, MOOD_LABELS } from "@/lib/brand";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/mood")({
  head: () => ({ meta: [{ title: "Humeur · Integral Value" }] }),
  component: MoodPage,
});

function MoodPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const [score, setScore] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const entries = useQuery({
    queryKey: ["moods", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("mood_entries").select("*").order("created_at", { ascending: false }).limit(30);
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!score) throw new Error("Choisissez une humeur");
      const { error } = await supabase.from("mood_entries").insert({ user_id: user.id, score, note: note || null });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Humeur enregistrée");
      setScore(null); setNote("");
      qc.invalidateQueries({ queryKey: ["moods", user.id] });
      qc.invalidateQueries({ queryKey: ["mood-recent", user.id] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erreur"),
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">Comment vous sentez-vous ?</h1>
        <p className="mt-2 text-sm text-muted-foreground">Aucune réponse n'est mauvaise. C'est juste une photo de l'instant.</p>
      </header>

      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-wrap justify-between gap-3">
          {MOOD_LABELS.map((label, i) => {
            const v = i + 1;
            const active = score === v;
            return (
              <button key={v} onClick={() => setScore(v)} className={`flex flex-1 min-w-[80px] flex-col items-center gap-2 rounded-2xl p-4 transition ${active ? "bg-pill text-primary-foreground shadow-glow" : "bg-white/5 hover:bg-white/10"}`}>
                <span className="text-3xl">{MOOD_EMOJI[i]}</span>
                <span className="text-xs">{label}</span>
              </button>
            );
          })}
        </div>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Une note pour vous souvenir (optionnel)…"
          className="mt-5 h-24 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition focus:border-primary focus:bg-white/10" />
        <button onClick={() => create.mutate()} disabled={!score || create.isPending}
          className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-pill px-6 text-sm font-medium text-primary-foreground shadow-glow transition disabled:opacity-50">
          {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer
        </button>
      </div>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold">Historique</h2>
        <div className="space-y-2">
          {entries.data?.length ? entries.data.map((e) => (
            <div key={e.id} className="glass flex items-start gap-4 rounded-2xl p-4">
              <span className="text-2xl">{MOOD_EMOJI[e.score - 1]}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{MOOD_LABELS[e.score - 1]}</p>
                {e.note && <p className="mt-1 text-sm text-muted-foreground">{e.note}</p>}
              </div>
              <span className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString("fr", { day: "numeric", month: "short" })}</span>
            </div>
          )) : <p className="text-sm text-muted-foreground">Aucune entrée pour l'instant.</p>}
        </div>
      </section>
    </div>
  );
}
