import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { KIND_LABEL } from "@/lib/brand";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Languages, HandHeart, Loader2, CalendarPlus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/professionals/$id")({
  component: ProDetail,
});

function ProDetail() {
  const { id } = Route.useParams();
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [when, setWhen] = useState("");
  const [message, setMessage] = useState("");

  const pro = useQuery({
    queryKey: ["professional", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("professionals").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const book = useMutation({
    mutationFn: async () => {
      if (!when) throw new Error("Choisissez une date et une heure");
      const { error } = await supabase.from("booking_requests").insert({
        user_id: user.id, professional_id: id,
        preferred_at: new Date(when).toISOString(),
        message: message || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Demande envoyée");
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["bookings-pending"] });
      navigate({ to: "/bookings" });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Erreur"),
  });

  if (pro.isLoading) return <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">Chargement…</div>;
  if (!pro.data) return <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">Professionnel introuvable.</div>;

  const p = pro.data;
  const minDateTime = new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16);

  return (
    <div className="space-y-6">
      <Link to="/professionals" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Retour aux professionnels
      </Link>

      <div className="glass rounded-3xl p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-accent">{KIND_LABEL[p.kind]}</span>
            <h1 className="mt-3 font-display text-3xl font-semibold md:text-4xl">{p.full_name}</h1>
            <p className="mt-2 text-base text-muted-foreground">{p.headline}</p>
          </div>
          {p.is_solidarity && (
            <span className="inline-flex items-center gap-2 rounded-full bg-turq px-3 py-1.5 text-xs font-medium text-accent-foreground">
              <HandHeart className="h-3.5 w-3.5" /> Tarif solidaire
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{p.city ?? "En ligne"}</span>
          <span className="inline-flex items-center gap-1.5"><Languages className="h-4 w-4" />{p.languages.join(", ")}</span>
          <span className="font-medium text-foreground">{p.hourly_rate_eur}€/heure</span>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-foreground/85">{p.bio}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.specialties.map((s) => <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs">{s}</span>)}
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-8">
        <h2 className="font-display text-xl font-semibold">Demander un créneau</h2>
        <p className="mt-1 text-sm text-muted-foreground">Vous recevrez une confirmation après validation par le professionnel.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-xs text-muted-foreground">Date et heure souhaitées</span>
            <input type="datetime-local" min={minDateTime} value={when} onChange={(e) => setWhen(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none focus:border-primary" />
          </label>
        </div>
        <label className="mt-4 block">
          <span className="text-xs text-muted-foreground">Message (optionnel)</span>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Quelques mots pour présenter votre demande…"
            className="mt-1 h-28 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm outline-none focus:border-primary" />
        </label>

        <button onClick={() => book.mutate()} disabled={book.isPending}
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-pill px-6 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50">
          {book.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarPlus className="h-4 w-4" />}
          Envoyer la demande
        </button>
      </div>
    </div>
  );
}
