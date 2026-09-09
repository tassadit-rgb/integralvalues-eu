import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Integral Values" },
      {
        name: "description",
        content:
          "How Integral Values approaches privacy, confidentiality, data minimisation and user rights across its digital services.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Trust"
        title="Privacy by design."
        lead="Integral Values treats privacy as part of the care relationship, not as an afterthought. We aim to collect only what is necessary, protect it appropriately and keep its use understandable."
      />

      <Section eyebrow="Principles" title="How we handle information">
        <div className="grid gap-8 md:grid-cols-2">
          {[
            [
              "Data minimisation",
              "We seek to collect only the information needed for the service, assessment, application or contact request you choose to use.",
            ],
            [
              "Purpose limitation",
              "Information is used for the purpose for which it was provided, such as delivering a service, managing an application or responding to a request.",
            ],
            [
              "Confidentiality",
              "Clinical, coaching and professional information is handled with particular care and access should remain limited to people who need it for a legitimate role.",
            ],
            [
              "Your rights",
              "Depending on the applicable law, you may request access, correction, restriction, portability or deletion of personal information, subject to legal and professional obligations.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="border-t border-border pt-5">
              <h2 className="font-serif text-2xl text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Digital services" title="Accounts, assessments and contact">
        <div className="max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Integral Values may use secure technical providers to operate authentication,
            assessment storage, booking and website infrastructure. Access is intended to be
            role-based and proportionate to the service being delivered.
          </p>
          <p>
            Self-assessment tools are not a substitute for diagnosis or emergency care. Where
            scores or responses are stored, they should remain connected to the user's account
            and protected by the access controls of the relevant service.
          </p>
          <p>
            For privacy requests, use the Contact page or write to
            {" "}<span className="text-ink">hello@integralvalues.eu</span>.
          </p>
        </div>
      </Section>

      <Section eyebrow="Scope" title="A living privacy framework">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          This page explains the current privacy principles of Integral Values. More detailed
          notices may apply to specific services, jurisdictions or professional relationships,
          and will take precedence where required.
        </p>
      </Section>
    </SiteLayout>
  );
}
