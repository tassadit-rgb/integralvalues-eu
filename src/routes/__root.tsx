import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-md">
        <p className="font-display text-7xl text-gradient">404</p>
        <h1 className="mt-4 text-xl font-semibold">Cette page n'existe pas</h1>
        <p className="mt-2 text-sm text-muted-foreground">Le lien est peut-être ancien ou incorrect.</p>
        <Link to="/" className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-pill px-6 text-sm font-medium text-primary-foreground shadow-glow">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-2xl font-semibold">Quelque chose s'est passé</h1>
        <p className="mt-2 text-sm text-muted-foreground">Réessayez dans un instant.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-pill px-6 text-sm font-medium text-primary-foreground shadow-glow"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Integral Value · Psy & Co — You're Not Alone" },
      { name: "description", content: "Un espace bienveillant pour votre santé mentale : thérapie, coaching et conseil juridique, en toute confidentialité." },
      { name: "author", content: "Integral Value" },
      { name: "theme-color", content: "#1a0a2e" },
      { property: "og:title", content: "Integral Value · Psy & Co" },
      { property: "og:description", content: "Vous n'êtes pas seul·e. Trouvez le bon accompagnement, à votre rythme." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: "oklch(0.21 0.05 295 / 0.95)", color: "white", border: "1px solid oklch(1 0 0 / 0.1)" } }} />
    </QueryClientProvider>
  );
}
