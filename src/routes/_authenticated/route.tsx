import { createFileRoute, Outlet, redirect, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Home, Heart, BookText, Users, CalendarCheck, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthedLayout,
});

const NAV = [
  { to: "/dashboard", label: "Accueil", icon: Home },
  { to: "/mood", label: "Humeur", icon: Heart },
  { to: "/journal", label: "Journal", icon: BookText },
  { to: "/professionals", label: "Professionnels", icon: Users },
  { to: "/bookings", label: "Mes demandes", icon: CalendarCheck },
] as const;

function AuthedLayout() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { data: profile } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("display_name, avatar_url").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("À bientôt");
    navigate({ to: "/auth", replace: true });
  }

  const displayName = profile?.display_name ?? user.email?.split("@")[0] ?? "vous";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-dvh">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-background/70 px-4 py-3 backdrop-blur-xl md:hidden">
        <Logo />
        <button onClick={() => setOpen((v) => !v)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-6">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-6 hidden h-[calc(100dvh-3rem)] w-64 shrink-0 flex-col rounded-3xl glass p-5 md:flex">
          <div className="px-2 pb-6"><Logo /></div>
          <nav className="flex-1 space-y-1">
            {NAV.map((n) => {
              const active = pathname === n.to || (n.to !== "/dashboard" && pathname.startsWith(n.to));
              const Icon = n.icon;
              return (
                <Link key={n.to} to={n.to} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-pill text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}>
                  <Icon className="h-4 w-4" />{n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-hero text-sm font-medium text-primary-foreground">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{displayName}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <button onClick={signOut} aria-label="Déconnexion" className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-white/10 hover:text-foreground">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setOpen(false)} />
            <div className="absolute inset-x-4 top-20 rounded-3xl glass-strong p-4">
              <nav className="space-y-1">
                {NAV.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-white/5">
                      <Icon className="h-4 w-4" /> {n.label}
                    </Link>
                  );
                })}
                <button onClick={signOut} className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-white/5">
                  <LogOut className="h-4 w-4" /> Déconnexion
                </button>
              </nav>
            </div>
          </div>
        )}

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
