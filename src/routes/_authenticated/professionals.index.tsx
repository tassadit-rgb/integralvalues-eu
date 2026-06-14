import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { KIND_LABEL, KIND_DESCRIPTION } from "@/lib/brand";
import { MapPin, Languages, HandHeart, ArrowRight } from "lucide-react";

type Kind = "all" | "therapy" | "coaching" | "legal";

export const Route = createFileRoute("/_authenticated/professionals/")({
  component: ProsList,
});

function ProsList() {
  const [kind, setKind] = useState<Kind>("all");

  const pros = useQuery({
    queryKey: ["professionals"],
    queryFn: async () => {
      const { data, error } = await supabase.from("professionals").select("*").eq("is_available", true).order("created_at");
      if (error) throw error;
      return data;
    },
  });

  const filtered = pros.data?.filter((p) => kind === "all" || p.kind === kind) ?? [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold md:text-4xl">Trouvez le bon professionnel</h1>
        <p className="mt-2 text-sm text-muted-foreground">Thérapeutes, coachs et avocats — sélectionnés et disponibles.</p>
      </header>

      <div className="glass inline-flex flex-wrap gap-1 rounded-full p-1">
        {(["all", "therapy", "coaching", "legal"] as const).map((k) => (
          <button key={k} onClick={() => setKind(k)}
            className={`rounded-full px-4 py-2 text-sm transition ${kind === k ? "bg-pill text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`}>
            {k === "all" ? "Tous" : KIND_LABEL[k]}
          </button>
        ))}
      </div>

      {kind !== "all" && <p className="text-sm text-muted-foreground">{KIND_DESCRIPTION[kind]}</p>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <Link key={p.id} to="/professionals/$id" params={{ id: p.id }}
            className="glass group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-glow">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-accent">{KIND_LABEL[p.kind]}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{p.full_name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.headline}</p>
              </div>
              {p.is_solidarity && (
                <span title="Tarif solidaire disponible" className="grid h-8 w-8 place-items-center rounded-full bg-turq text-accent-foreground">
                  <HandHeart className="h-4 w-4" />
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.specialties.slice(0, 3).map((s) => (
                <span key={s} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-foreground/80">{s}</span>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{p.city ?? "En ligne"}</span>
              <span className="inline-flex items-center gap-1"><Languages className="h-3 w-3" />{p.languages.join(", ")}</span>
              <span className="font-medium text-foreground">{p.hourly_rate_eur}€/h</span>
            </div>
            <ArrowRight className="absolute right-5 top-5 h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
        {filtered.length === 0 && !pros.isLoading && (
          <p className="col-span-full text-sm text-muted-foreground">Aucun professionnel ne correspond à ce filtre.</p>
        )}
      </div>
    </div>
  );
}
