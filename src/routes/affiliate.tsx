import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";
import { AffiliateForm, ReferralCapture } from "@/components/site/affiliate-form";
import {
import { EmotiveImage } from "@/components/site/emotive-image";
import humanAffiliate from "@/assets/human-affiliate.jpg";
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQ = [
  {
    q: "Who is eligible to become an affiliate?",
    a: "Licensed clinical psychologists, psychotherapists, certified coaches (ICF or equivalent), supervisors and intercultural specialists with recognised qualifications, professional liability insurance and at least three years of independent practice. Practitioners in training may join the supervision path first and apply for affiliation once certified.",
  },
  {
    q: "How long does the supervision timeline take?",
    a: "Affiliation begins with an intake interview and a charter review, followed by a supervision cycle of ten 1:1 sessions (ICF standard) spread over six to nine months. Sessions are booked at your rhythm, with a minimum of one per month to keep continuity.",
  },
  {
    q: "What is required for certification?",
    a: "Completion of the supervision cycle, two recorded sessions submitted for review, a written case reflection, and a final certification review with the founder. The full path is €2,500 (supervision at €250 per session, recorded review at €200 per record) and ends with entry to the Integral Values Associate Network.",
  },
  {
    q: "What does the solidarity clause commit me to?",
    a: "An indicative 5 to 10 % of your declared annual time, spread across supervision, transmission and supervised solidarity sessions. It never reduces your standard remuneration and grants priority access to B2B and institutional missions.",
  },
  {
    q: "Do I keep my own clients and methods?",
    a: "Yes. You retain full clinical sovereignty, your own practice and your own clients. The charter frames ethics, confidentiality and quality standards — not your therapeutic or coaching method.",
  },
];

function AffiliatePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Practitioners"
        title="Become an Integral Values affiliate."
        lead="A network of psychologists, coaches, supervisors and intercultural experts practising under one integrative charter — with full clinical sovereignty and shared standards."
        quote="You're not alone."
      />

      <EmotiveImage
        src={humanAffiliate}
        alt="Practitioners standing together in a bright modern atrium"
        caption="A network held by shared standards."
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

      <Section muted eyebrow="Apply" title="Affiliate application form">
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Send us your profile, credentials and the fields you practise in. We
          review applications individually and reply within ten working days.
          Affiliation is confirmed once the charter, the affiliate contract and
          the solidarity addendum are signed.
        </p>
        <AffiliateForm />
        <p className="mt-8 text-sm text-muted-foreground">
          Already applied?{" "}
          <Link to="/affiliate/status" className="text-primary underline">
            Track your application status
          </Link>
          .
        </p>
      </Section>


      <Section eyebrow="Referral" title="Refer a practitioner">
        <div className="grid gap-10 md:grid-cols-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Already part of the network, or know a practitioner who belongs
            here? Generate a unique referral code, share the link, and every
            application opened through it is attributed to you automatically.
          </p>
          <ReferralCapture />
        </div>
      </Section>

      <Section muted eyebrow="FAQ" title="Affiliate questions">
        <Accordion type="single" collapsible className="max-w-3xl">
          {FAQ.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-serif text-lg text-ink">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

    </SiteLayout>
  );
}
