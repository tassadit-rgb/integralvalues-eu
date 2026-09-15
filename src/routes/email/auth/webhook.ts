import { createFileRoute } from "@tanstack/react-router";

import { resolveEmailProvider, sendAuthEmail, type AuthEmailPayload } from "@/lib/email/provider";

const AUTH_EMAIL_TYPES = new Set([
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "reauthentication",
]);

export const Route = createFileRoute("/email/auth/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const provider = resolveEmailProvider();
        if (!provider.enabled) {
          return Response.json({ delivered: false, error: provider.reason }, { status: 503 });
        }

        const incomingSecret = process.env.AUTH_EMAIL_WEBHOOK_SECRET;
        if (
          !incomingSecret ||
          request.headers.get("authorization") !== `Bearer ${incomingSecret}`
        ) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        let payload: AuthEmailPayload;
        try {
          payload = (await request.json()) as AuthEmailPayload;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        if (!AUTH_EMAIL_TYPES.has(payload.type)) {
          return Response.json({ error: "Unknown email type" }, { status: 400 });
        }

        try {
          return Response.json(await sendAuthEmail(payload, provider));
        } catch {
          return Response.json(
            { delivered: false, error: "Email delivery failed" },
            { status: 502 },
          );
        }
      },
    },
  },
});
