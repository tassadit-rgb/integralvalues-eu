import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Lock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/journal")({
  head: () => ({ meta: [{ title: "Journal · Integral Value" }] }),
  component: JournalPage,
});

function JournalPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  const entries = useQuery({
    queryKey: ["journal", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from("journal_entries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!body.trim()) throw new Error("Écrivez quelque chose");
      const { error } = await supabase.from("journal_entries").insert({ user_id: user.id, title: title || "Sans titre", body });
      if (error) throw error;
    },
    onSuccess: () => {
      setTitle(""); setBody(""); setOpen(false);
      toast.success("Entrée enregistrée");
      qc.invalidateQueries({ queryKey: ["journal", user.id] });
      qc.invalidateQueries({ queryKey: ["journal-count", user.id] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erreur"),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("journal_entries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["journal", user.id] });
      qc.invalidateQueries({ queryKey: ["journal-count", user.id] });
    },
  });

  return (
    <div className="space-y-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">Mon journal</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Vous seul·e y avez accès.
          </p>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="inline-flex h-11 items-center gap-2 rounded-full bg-pill px-5 text-sm font-medium text-primary-foreground shadow-glow">
          <Plus className="h-4 w-4" /> Nouvelle entrée
        </button>
      </header>

      {open && (
        <div className="glass-strong rounded-3xl p-6">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titre (optionnel)"
            className="w-full bg-transparent font-display text-xl font-semibold outline-none placeholder:text-muted-foreground" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Ce qui me traverse aujourd'hui…" autoFocus
            className="mt-3 h-48 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-4 text-sm outline-none transition focus:border-primary" />
          <div className="mt-3 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="h-10 rounded-full px-4 text-sm text-muted-foreground hover:text-foreground">Annuler</button>
            <button onClick={() => create.mutate()} disabled={create.isPending} className="inline-flex h-10 items-center gap-2 rounded-full bg-pill px-5 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50">
              {create.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {entries.data?.length ? entries.data.map((e) => (
          <article key={e.id} className="glass group rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold">{e.title || "Sans titre"}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{new Date(e.created_at).toLocaleString("fr", { dateStyle: "long", timeStyle: "short" })}</p>
              </div>
              <button onClick={() => remove.mutate(e.id)} aria-label="Supprimer" className="opacity-0 transition group-hover:opacity-100 grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/20 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/85">{e.body}</p>
          </article>
        )) : (
          <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
            Aucune entrée encore. Ouvrez une page blanche quand vous le sentez.
          </div>
        )}
      </div>
    </div>
  );
}
