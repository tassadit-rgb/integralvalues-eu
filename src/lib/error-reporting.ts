export type ClientErrorContext = Record<string, unknown>;

/**
 * Provider-neutral client error hook.
 *
 * Keep this function independent from any hosting or app-builder vendor.
 * A future observability provider can be added here without changing route code.
 */
export function reportClientError(
  error: unknown,
  context: ClientErrorContext = {},
) {
  if (typeof window === "undefined") return;

  console.error("[client-error]", {
    error,
    route: window.location.pathname,
    ...context,
  });
}
