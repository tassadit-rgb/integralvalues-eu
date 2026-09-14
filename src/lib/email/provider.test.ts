import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveEmailProvider, sendAuthEmail } from "./provider";

afterEach(() => vi.unstubAllGlobals());

describe("neutral email provider", () => {
  it("is disabled by default", () => {
    expect(resolveEmailProvider({})).toEqual({
      enabled: false,
      reason: "Email provider is disabled",
    });
  });

  it("stays disabled when webhook configuration is incomplete", () => {
    expect(resolveEmailProvider({ EMAIL_PROVIDER: "webhook" }).enabled).toBe(false);
  });

  it("does not make a network call while disabled", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendAuthEmail(
        { type: "signup", email: "user@example.test" },
        { enabled: false, reason: "disabled for test" },
      ),
    ).resolves.toEqual({ delivered: false, reason: "disabled for test" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("uses only the configured server-side webhook when enabled", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendAuthEmail(
        { type: "recovery", email: "user@example.test" },
        {
          enabled: true,
          endpoint: "https://mail.example.test/auth",
          token: "server-token",
        },
      ),
    ).resolves.toEqual({ delivered: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://mail.example.test/auth");
  });
});
