import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KIND_LABEL } from "@/lib/brand";
import { toast } from "sonner";
import { Calendar, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/bookings")({
  head: () => ({ meta: [{ title: "Mes demandes · Integral Value" }] }),
  component: Bookings,
});

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-accent/20 text-accent",
  accepted: "bg-emerald-500/20 text-emerald-300",
  declined: "bg-destructive/20 text-destructive",
  cancelled: "bg-white/10 text-muted-foreground",
};
const STATUS_LABEL: Record<string, string> = {
  pending: "En attente",
  accepted: "Acceptée",
  declined: "Déclinée",
  cancelled: "Annulée",
};

function Bookings() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();

  const list = useQuery({
    queryKey: ["bookings", user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*, professionals(full_name, kind, headline, city)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const cancel = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("booking_requests").update({ status: "cancelled" }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Demande annulée");
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["bookings-pending"] });
    },
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">Mes demandes</h1>
        <p className="mt-2 text-sm text-muted-foreground">Suivez l'état de vos rendez-vous avec les professionnels.</p>
      </header>

      <div className="space-y-3">
        {list.data?.length ? list.data.map((b) => {
          const p = b.professionals;
          return (
            <div key={b.id} className="glass flex flex-wrap items-start justify-between gap-4 rounded-2xl p-5">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{p?.full_name}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${STATUS_COLOR[b.status]}`}>{STATUS_LABEL[b.status]}</span>
                  {p && <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-muted-foreground">{KIND_LABEL[p.kind]}</span>}
                </div>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {new Date(b.preferred_at).toLocaleString("fr", { dateStyle: "full", timeStyle: "short" })}
                </p>
                {b.message && <p className="mt-2 text-sm text-foreground/80">{b.message}</p>}
              </div>
              {b.status === "pending" && (
                <button onClick={() => cancel.mutate(b.id)} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-white/5 px-3 text-xs text-muted-foreground transition hover:bg-destructive/20 hover:text-destructive">
                  <X className="h-3.5 w-3.5" /> Annuler
                </button>
              )}
            </div>
          );
        }) : (
          <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
            Aucune demande pour l'instant. <Link to="/professionals" className="text-accent hover:underline">Explorer les professionnels →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
