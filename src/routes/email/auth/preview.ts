import * as React from "react";
import { render } from "@react-email/render";
import { createFileRoute } from "@tanstack/react-router";

import { EmailChangeEmail } from "@/lib/email-templates/email-change";
import { InviteEmail } from "@/lib/email-templates/invite";
import { MagicLinkEmail } from "@/lib/email-templates/magic-link";
import { ReauthenticationEmail } from "@/lib/email-templates/reauthentication";
import { RecoveryEmail } from "@/lib/email-templates/recovery";
import { SignupEmail } from "@/lib/email-templates/signup";

const EMAIL_TEMPLATES: Record<string, React.ComponentType<any>> = {
  signup: SignupEmail,
  invite: InviteEmail,
  magiclink: MagicLinkEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
};

const SAMPLE_URL = "https://integralvalues.eu";
const SAMPLE_DATA: Record<string, object> = {
  signup: { siteName: "Integral Values Psy & Co", siteUrl: SAMPLE_URL, recipient: "user@example.test", confirmationUrl: SAMPLE_URL },
  invite: { siteName: "Integral Values Psy & Co", siteUrl: SAMPLE_URL, confirmationUrl: SAMPLE_URL },
  magiclink: { siteName: "Integral Values Psy & Co", confirmationUrl: SAMPLE_URL },
  recovery: { siteName: "Integral Values Psy & Co", confirmationUrl: SAMPLE_URL },
  email_change: { siteName: "Integral Values Psy & Co", oldEmail: "old@example.test", email: "user@example.test", newEmail: "new@example.test", confirmationUrl: SAMPLE_URL },
  reauthentication: { token: "123456" },
};

export const Route = createFileRoute("/email/auth/preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = process.env.EMAIL_PREVIEW_TOKEN;
        if (!token || request.headers.get("authorization") !== `Bearer ${token}`) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json().catch(() => null) as { type?: string } | null;
        const EmailTemplate = body?.type ? EMAIL_TEMPLATES[body.type] : undefined;
        if (!EmailTemplate) {
          return Response.json({ error: "Unknown email type" }, { status: 400 });
        }

        const html = await render(
          React.createElement(EmailTemplate, SAMPLE_DATA[body!.type!] ?? {}),
        );
        return new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      },
    },
  },
});
