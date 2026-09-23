export type ClientErrorContext = Record<string, unknown>;

/**
 * Point d’extension neutre pour l’observabilité côté navigateur.
 * Aucun fournisseur externe n’est activé par défaut.
 */
export function reportClientError(error: unknown, context: ClientErrorContext = {}) {
  if (typeof window === "undefined") return;

  console.error("[client-error]", {
    error,
    route: window.location.pathname,
    ...context,
  });
}
