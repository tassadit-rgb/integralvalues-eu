import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";

export const Route = createFileRoute("/affiliate")({
  head: () => ({
    meta: [
      {
        title: "Affiliate Network — Join Integral Values Psy & Co",
      },
      {
        name: "description",
        content:
          "Join the Integral Values affiliate network: psychologists, coaches and supervisors working under a shared integrative charter, with a solidarity commitment and B2B mission access.",
      },
      { property: "og:title", content: "Affiliate Network — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "Practitioner affiliation: clinical sovereignty, supervision, certification path and a structured solidarity clause.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliatePage,
});

const APPLICATION_FORM_URL = "mailto:hello@integralvalues.eu?subject=Affiliate%20application";

function AffiliatePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Practitioners"
        title="Become an Integral Values affiliate."
        lead="A network of psychologists, coaches, supervisors and intercultural experts practising under one integrative charter — with full clinical sovereignty and shared standards."
        quote="You're not alone."
      />

      <Section eyebrow="Why affiliate" title="What the network offers">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Practice"
            title="Clinical sovereignty"
            body="You keep full responsibility for your clinical and coaching decisions. The charter frames ethics and quality, never your method."
          />
          <CardTile
            meta="Missions"
            title="B2B & institutional access"
            body="Priority access to corporate, institutional and cross-cultural missions sourced through CORE and our partner organisations."
          />
          <CardTile
            meta="Growth"
            title="Supervision & certification"
            body="ICF-standard supervision, recorded session review and a structured certification path inside the Associate Network."
          />
        </div>
      </Section>

      <Section muted eyebrow="Solidarity clause" title="A capped, protected commitment">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
            <p>
              Every affiliate commits a capped share of their declared annual
              time to solidarity work — an indicative 5 to 10 %, spread across
              supervision, teaching and transmission, and supervised solidarity
              sessions.
            </p>
            <p>
              The clause is protective by design: it has no negative impact on
              standard remuneration, it grants priority access to B2B and
              institutional missions, and it carries internal statutory
              recognition within the network.
            </p>
          </div>
          <dl className="space-y-5 border-t border-border pt-6 text-sm leading-relaxed md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <div>
              <dt className="font-serif text-base text-cyan">Supervision</dt>
              <dd className="text-muted-foreground">
                Supporting peers and newer practitioners under ICF standards.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-base text-purple">Transmission</dt>
              <dd className="text-muted-foreground">
                Teaching, training and contributing to shared clinical practice.
              </dd>
            </div>
            <div>
              <dt className="font-serif text-base text-pink">
                Solidarity sessions
              </dt>
              <dd className="text-muted-foreground">
                Supervised sessions for people who could not otherwise access
                care.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section eyebrow="Path" title="Supervision & certification">
        <div className="grid gap-8 md:grid-cols-2">
          <CardTile
            meta="€250 / session"
            title="1:1 supervision"
            body="ICF-standard supervision sessions to refine presence, posture and clinical judgement."
          />
          <CardTile
            meta="€2 500 full path"
            title="Certification path"
            body="Supervision cycle, recorded session review (€200 per record) and final certification review, then entry to the Associate Network."
          />
        </div>
      </Section>

      <Section muted eyebrow="Apply" title="Join the Associate Network">
        <div className="space-y-6">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Send us your profile, credentials and the fields you practise in.
            We review applications individually and reply within ten working
            days. Affiliation is confirmed once the charter, the affiliate
            contract and the solidarity addendum are signed.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={APPLICATION_FORM_URL}
              className="inline-flex items-center rounded-full bg-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Affiliate application form
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full border border-border px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Ask a question first
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
