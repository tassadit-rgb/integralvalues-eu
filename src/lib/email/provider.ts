export type AuthEmailType =
  | "signup"
  | "invite"
  | "magiclink"
  | "recovery"
  | "email_change"
  | "reauthentication";

export type AuthEmailPayload = {
  type: AuthEmailType;
  email?: string;
  url?: string;
  token?: string;
  old_email?: string;
  new_email?: string;
};

export type EmailProviderStatus =
  | { enabled: false; reason: string }
  | { enabled: true; endpoint: string; token: string };

export function resolveEmailProvider(
  environment: Record<string, string | undefined> = process.env,
): EmailProviderStatus {
  if (environment.EMAIL_PROVIDER !== "webhook") {
    return { enabled: false, reason: "Email provider is disabled" };
  }

  const endpoint = environment.EMAIL_WEBHOOK_URL?.trim();
  const token = environment.EMAIL_WEBHOOK_TOKEN?.trim();
  if (!endpoint || !token) {
    return { enabled: false, reason: "Email webhook configuration is incomplete" };
  }

  return { enabled: true, endpoint, token };
}

export async function sendAuthEmail(
  payload: AuthEmailPayload,
  status = resolveEmailProvider(),
) {
  if (!status.enabled) {
    return { delivered: false as const, reason: status.reason };
  }

  const response = await fetch(status.endpoint, {
    method: "POST",
    headers: {
      authorization: `Bearer ${status.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Email provider returned HTTP ${response.status}`);
  }

  return { delivered: true as const };
}
