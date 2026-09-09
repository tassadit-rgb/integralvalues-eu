import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardTile,
  PageHero,
  Section,
  SiteLayout,
} from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanLeader from "@/assets/human-leader.jpg";

export const Route = createFileRoute("/coaching")({
  head: () => ({
    meta: [
      { title: "Coaching — Integral Values Psy & Co" },
      {
        name: "description",
        content:
          "Integrative coaching for individuals, organisations and coaches: emotions, thought, body and spirit across the eight vital areas of life.",
      },
      { property: "og:title", content: "Coaching — Integral Values Psy & Co" },
      {
        property: "og:description",
        content:
          "One-to-one, corporate and mentor coaching guided by the Integrative Coaching Mindset.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CoachingPage,
});

const ENERGIES = ["Emotions", "Thought", "Body", "Spirit"];
const AREAS = [
  "Body",
  "Sexuality",
  "Emotions",
  "Shadow",
  "Mind",
  "Spirit",
  "Power",
  "Relationships",
];

const PLANS = [
  {
    name: "Jade — Discovery",
    price: "Pay as you wish",
    points: [
      "15-minute chemistry session",
      "Values ranking, first read",
      "One resource personalised to your goal",
    ],
  },
  {
    name: "Turquoise — First step",
    price: "€300 / month",
    points: [
      "Two coaching sessions per month",
      "Personalised coaching plan",
      "Access to the online library",
    ],
  },
  {
    name: "Rubi — Transformational",
    price: "€500 / month",
    points: [
      "Four sessions per month",
      "Personal assessment and coaching map",
      "Open chat, 24-hour response",
    ],
  },
  {
    name: "Diamant — Integral harmony",
    price: "On request",
    points: [
      "Unlimited sessions",
      "Advanced materials and resources",
      "Priority support, 6-hour response",
    ],
  },
];

function CoachingPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="4C Framework — Coaching"
        title="So important you are. Then tap into your full potential."
        lead="Our coaching helps individuals, teams and organisations move through difficult passages, raise their performance and reach what is already theirs. Each journey is built with The Integrative Coaching Mindset, adapted to you as a unique person."
        quote="“Between life’s stimuli and our habitual responses exists choice.” — Ken Wilber"
      />

      <EmotiveImage
        src={humanLeader}
        alt="A leader standing at a window at dusk, city lights in violet and pink"
        caption="Potential is not given. It is remembered."
      />

      <Section eyebrow="The mindset" title="Four energies, four dynamics, eight vital areas">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="border border-border bg-card p-8">
            <p className="eyebrow">Energies</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {ENERGIES.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="border border-border bg-card p-8">
            <p className="eyebrow">Dynamics</p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>You / your inner self</li>
              <li>You / your outer self</li>
              <li>You / we</li>
              <li>You / others</li>
            </ul>
          </div>
          <div className="border border-border bg-card p-8">
            <p className="eyebrow">Vital areas</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {AREAS.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section muted eyebrow="Practices" title="Three ways to work together">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Individual"
            title="One-to-one coaching"
            body="Confidential reflection, goal setting and accountability across career, leadership, communication, self-awareness and the balance between work and life."
          />
          <CardTile
            meta="Corporate"
            title="Teams & organisations"
            body="Leadership development, team collaboration and the building of a coaching culture — through change management, alignment and strategic clarity."
          />
          <CardTile
            meta="Mentoring"
            title="Coaches’ coaching"
            body="Supervision and mentoring for practising coaches: refine your methodology, review your recordings and follow a certification path."
          />
        </div>
      </Section>

      <Section eyebrow="Plans" title="Integral development plans">
        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p) => (
            <div key={p.name} className="bg-card p-8">
              <h3 className="text-lg text-ink">{p.name}</h3>
              <p className="mt-2 text-sm text-gold">{p.price}</p>
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Money should not prevent you from getting help. We can find a payment
          arrangement suited to your situation.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-block border border-primary px-6 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Request a chemistry session
        </Link>
      </Section>
    </SiteLayout>
  );
}
