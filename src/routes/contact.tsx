import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanContact from "@/assets/human-contact.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & booking — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Request a chemistry call, a counselling session or an organisational conversation with Integral Values Psy & Co.",
      },
      { property: "og:title", content: "Contact — Integral Values Psy & Co" },
      {
        property: "og:description",
        content: "Book a first conversation, in confidence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ContactPage,
});

const INTERESTS = [
  "Coaching",
  "Counselling",
  "Cross-Culture",
  "Core (organisations)",
];

function ContactPage() {
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [sending, setSending] = useState(false);
  const send = useServerFn(submitContactRequest);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      await send({
        data: {
          first: String(fd.get("first") ?? ""),
          last: String(fd.get("last") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          country: String(fd.get("country") ?? ""),
          role: String(fd.get("role") ?? ""),
          interest,
          message: String(fd.get("message") ?? ""),
        },
      });
      toast.success("Thank you — we will come back to you within two working days.");
      form.reset();
      setInterest(INTERESTS[0]);
    } catch {
      toast.error("Sorry, your request could not be sent. Please try again or email hello@integralvalues.eu.");
    } finally {
      setSending(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Stay with us"
        title="Feel free to drop a line."
        lead="A first fifteen-minute call costs nothing. Tell us briefly where you are and what you are looking for, and we will propose the form of support that fits."
      />

      <EmotiveImage
        src={humanContact}
        alt="Two open hands meeting across a calm desk in soft light"
        caption="Reaching out is already the first step."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" name="first" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" name="last" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Job title</Label>
                <Input id="role" name="role" />
              </div>
            </div>

            <div className="space-y-3">
              <Label>What brings you here?</Label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setInterest(i)}
                    className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                      interest === i
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-gold"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your inquiry</Label>
              <Textarea id="message" name="message" rows={6} required />
            </div>

            <Button type="submit" size="lg" className="uppercase tracking-[0.18em]">
              Send
            </Button>
            <p className="text-xs text-muted-foreground">
              Your message is treated confidentially and stored in line with GDPR.
            </p>
          </form>

          <aside className="space-y-10">
            <div>
              <p className="eyebrow">Direct</p>
              <p className="mt-3 font-serif text-2xl text-ink">
                hello@integralvalues.eu
              </p>
            </div>
            <div>
              <p className="eyebrow">Pricing</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>First 15-minute call — free</li>
                <li>Coaching — from €75 / 30 min individual</li>
                <li>Coaching — €250 / hour corporate</li>
                <li>Counselling — €65 / 45 min individual</li>
                <li>Couples — €120 · Group — €55 per participant</li>
                <li>Teens under 18 — free</li>
              </ul>
            </div>
            <p className="border-l border-gold pl-5 text-sm leading-relaxed text-muted-foreground">
              Money should not prevent you from getting help. We can find a
              payment solution tailored to your situation.
            </p>
          </aside>
        </div>
      </Section>
    </SiteLayout>
  );
}
