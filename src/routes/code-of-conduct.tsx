import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section, SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/code-of-conduct")({
  head: () => ({
    meta: [
      { title: "Code of Conduct — Integral Values" },
      {
        name: "description",
        content:
          "The behavioural and ethical expectations that guide Integral Values professionals, partners and community interactions.",
      },
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: CodeOfConductPage,
});

function CodeOfConductPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Trust"
        title="Human first. Ethical by practice."
        lead="The Integral Values ecosystem is built around dignity, responsibility, cultural humility, clear boundaries and respect for the person in their full complexity."
      />

      <Section eyebrow="Conduct" title="What we expect">
        <div className="grid gap-8 md:grid-cols-2">
          {[
            [
              "Respect and dignity",
              "Treat people without humiliation, discrimination, coercion or reduction to a diagnosis, status, origin, identity or role.",
            ],
            [
              "Professional boundaries",
              "Maintain clear roles, informed consent, confidentiality and appropriate referral when a need falls outside a professional's competence or mandate.",
            ],
            [
              "Cultural humility",
              "Avoid imposing a single cultural model of health, family, identity or development. Seek context, language and lived meaning before drawing conclusions.",
            ],
            [
              "Evidence and honesty",
              "Do not promise cures, guaranteed outcomes or certainty where none exists. Distinguish assessment, clinical judgment, coaching, education and research claims.",
            ],
            [
              "Safety and safeguarding",
              "Take credible concerns about abuse, violence, exploitation, severe distress or immediate danger seriously and follow applicable professional and legal duties.",
            ],
            [
              "Conflicts of interest",
              "Disclose relevant conflicts, avoid exploitative financial or relational arrangements and keep commercial interests separate from professional judgment.",
            ],
          ].map(([title, body]) => (
            <article key={title} className="border-t border-border pt-5">
              <h2 className="font-serif text-2xl text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section muted eyebrow="Network" title="For affiliates, partners and contributors">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Participation in the Integral Values network does not remove a professional's
            responsibility to comply with the laws, ethical codes, licensing requirements and
            scope-of-practice rules that apply in their own jurisdiction.
          </p>
          <p>
            Affiliation should never be represented as a substitute for a regulated licence,
            professional registration or independent accreditation.
          </p>
        </div>
      </Section>

      <Section eyebrow="Concerns" title="Raise a concern">
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Concerns about conduct, safeguarding, misuse of the Integral Values name or conflicts
          of interest can be sent through the Contact page or to
          {" "}<span className="text-ink">hello@integralvalues.eu</span>. Reports should be
          factual, proportionate and limited to information relevant to the concern.
        </p>
      </Section>
    </SiteLayout>
  );
}
