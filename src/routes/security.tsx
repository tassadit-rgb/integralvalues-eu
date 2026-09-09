import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — Integral Values" },
      {
        name: "description",
        content:
          "Security principles for Integral Values digital services, including access control, data separation and responsible disclosure.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Trust"
        title="Security without spectacle."
        lead="The objective is simple: reduce unnecessary exposure, separate access by role and keep sensitive workflows out of the public layer whenever possible."
      />

      <Section eyebrow="Approach" title="Core security principles">
        <div className="grid gap-8 md:grid-cols-2">
          {[
            [
              "Least privilege",
              "Access should be limited to the minimum permissions needed for a legitimate task, especially for administrative, clinical and professional workflows.",
            ],
            [
              "Separation of concerns",
              "Public website content, user accounts, assessment data, professional applications and administrative functions are designed as distinct layers rather than one unrestricted system.",
            ],
            [
              "Server-side secrets",
              "Private credentials and service-role keys must remain server-side. Client applications should only receive publishable credentials intended for browser use.",
            ],
            [
              "Controlled change",
              "Technical changes should be tested before production deployment, with production kept on a stable source branch and high-risk integrations introduced progressively.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="border-t border-border pt-5">
              <h2 className="font-serif text-2xl text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Responsible disclosure" title="If you discover a security issue">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Please report suspected security issues privately to
            {" "}<span className="text-ink">hello@integralvalues.eu</span>. Do not include
            unnecessary personal, clinical or third-party data in the report.
          </p>
          <p>
            We ask researchers and users not to exploit vulnerabilities, disrupt services,
            access data that is not theirs or publish sensitive details before there has been
            a reasonable opportunity to assess and correct the issue.
          </p>
        </div>
      </Section>

      <Section eyebrow="Boundaries" title="Security is continuous">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          No digital system can be described as risk-free. Integral Values therefore treats
          security as an ongoing process of minimisation, review, access control and careful
          deployment rather than as a one-time certification claim.
        </p>
      </Section>
    </SiteLayout>
  );
}
