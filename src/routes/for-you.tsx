import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero, Section, CardTile } from "@/components/site/site-layout";
import { EmotiveImage } from "@/components/site/emotive-image";
import humanForYou from "@/assets/human-foryou.jpg";

export const Route = createFileRoute("/for-you")({
  head: () => ({
    meta: [
      { title: "For You — Membership, Resources & Store | Integral Values" },
      {
        name: "description",
        content:
          "Integral Development membership plans, free resources, articles and the book Rise Above — ways to stay close to the Integral Values practice between sessions.",
      },
      { property: "og:title", content: "For You — membership, resources, store" },
      {
        property: "og:description",
        content:
          "Choose an Integral Development path from discovery to professional partnership, with resources and support from Integral Values Psy & Co.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForYouPage,
});

type IndividualPlan = {
  name: string;
  stone: string;
  subtitle: string;
  price: string;
  bestFor: string;
  points: string[];
  cta: string;
  accent: string;
  accentSoft: string;
  button: string;
  ring: string;
  featured?: boolean;
};

const INDIVIDUAL_PLANS: IndividualPlan[] = [
  {
    name: "Discovery Plan",
    stone: "Jade",
    subtitle: "Pay-As-You-Wish",
    price: "Pay-As-You-Wish",
    bestFor: "Discovering your chemistry and clarifying your next step.",
    points: [
      "Values Ranking",
      "Meaningful goal-setting framework",
      "Core Quadrant",
      "Communication & influence insight",
      "One personalised resource",
      "The Jade Box",
    ],
    cta: "Start with Jade",
    accent: "text-[#3f9b88]",
    accentSoft: "bg-[#75E8D5]/12",
    button: "bg-[#75E8D5] text-[#104e45] hover:bg-[#67dcc9]",
    ring: "border-[#75E8D5]/45",
  },
  {
    name: "Friendly Plan",
    stone: "Turquoise",
    subtitle: "Your First Step",
    price: "€500",
    bestFor: "Gaining clarity, focus and momentum with structured support.",
    points: [
      "Two coaching sessions per month",
      "Personalised coaching plan",
      "Access to the online library",
      "One-to-one video coaching",
      "Empowerment & purpose discovery",
      "The Turquoise Box",
    ],
    cta: "Choose Turquoise",
    accent: "text-[#079eb3]",
    accentSoft: "bg-[#00CEE5]/10",
    button: "bg-[#00CEE5] text-[#063d46] hover:bg-[#00bdd2]",
    ring: "border-[#00CEE5]/40",
  },
  {
    name: "Premium Plan",
    stone: "Rubi",
    subtitle: "Transformational Growth",
    price: "€850",
    bestFor: "Breaking through barriers and strengthening leadership or relationships.",
    points: [
      "Four coaching sessions per month",
      "Assessment + coaching plan",
      "Access to internal resources",
      "One-to-one video sessions",
      "Open chat access — 24h response",
      "The Rubi Box",
    ],
    cta: "Choose Rubi",
    accent: "text-[#c91f84]",
    accentSoft: "bg-[#E5279A]/10",
    button: "bg-[#E5279A] text-white hover:bg-[#cf218a]",
    ring: "border-[#E5279A]/55",
    featured: true,
  },
  {
    name: "Elite Plan",
    stone: "Diamant",
    subtitle: "Integral Harmony",
    price: "€3,500",
    bestFor: "Life transitions, burnout recovery, purpose, wellbeing and long-term alignment.",
    points: [
      "Six coaching sessions across six months",
      "Personal assessment + coaching map",
      "Advanced internal resources",
      "Priority support chat — 6h response",
      "Long-term transition support",
      "The Diamond Box",
    ],
    cta: "Choose Diamant",
    accent: "text-[#687fbb]",
    accentSoft: "bg-[#AEB5E8]/18",
    button: "bg-[#AEB5E8] text-[#28345d] hover:bg-[#9fa8de]",
    ring: "border-[#AEB5E8]/55",
  },
];

const AMETHYST_POINTS = [
  "Full access to Library, Lab and blog editing",
  "Group of Practice",
  "Integral Practice onboarding training",
  "ICF Certification Path*",
  "Values Ranking Facilitator Certification",
  "Associate Partner Board access",
  "Referral + Integral Values Badge ID",
  "Coaching toolkits + the Purple Box",
];

function mailtoForPlan(plan: IndividualPlan) {
  const subject = `Integral Values — ${plan.name} “${plan.stone}”`;
  const body = [
    "Hello Integral Values,",
    "",
    `I would like to validate my interest in the ${plan.name} “${plan.stone}” — ${plan.subtitle}.`,
    `Pack: ${plan.price}`,
    "",
    "Name:",
    "Country:",
    "Phone:",
    plan.stone === "Jade" ? "Preferred contribution amount:" : "Preferred start date:",
    "",
    "Please send me the next steps and payment/invoice information.",
  ].join("\n");

  return `mailto:invoice@integralvalues.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function mailtoForAmethyst() {
  const subject = "Integral Values — Associate Partner Plan “Amethyst”";
  const body = [
    "Hello Integral Values,",
    "",
    "I would like to apply for the Associate Partner Plan “Amethyst” — Integral Polarity.",
    "Pack: €5,500 one-time",
    "",
    "Name:",
    "Country:",
    "Phone:",
    "Current professional role:",
    "Certification / professional background:",
    "Preferred start date:",
    "",
    "Please send me the eligibility criteria and next steps.",
  ].join("\n");

  return `mailto:invoice@integralvalues.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function IndividualPlanCard({ plan }: { plan: IndividualPlan }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[1.8rem] border bg-card px-6 pb-7 pt-8 shadow-[0_16px_45px_rgba(16,8,80,.055)] transition-transform duration-300 hover:-translate-y-1 ${plan.ring}`}
    >
      {plan.featured && (
        <span className="absolute right-5 top-5 rounded-full bg-primary px-3.5 py-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-primary-foreground">
          Most popular
        </span>
      )}

      <div className={`inline-flex w-fit rounded-full px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] ${plan.accentSoft} ${plan.accent}`}>
        {plan.name}
      </div>

      <h3 className="mt-6 font-serif text-3xl leading-none text-ink">{plan.stone}</h3>
      <p className={`mt-2 font-serif text-lg italic ${plan.accent}`}>{plan.subtitle}</p>

      <div className="mt-7 border-y border-border/70 py-5">
        <p className="font-serif text-3xl leading-none text-ink">{plan.price}</p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Best for: {plan.bestFor}
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">
        {plan.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span className={`mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full ${plan.accentSoft}`} aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <a
        href={mailtoForPlan(plan)}
        className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3.5 text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${plan.button}`}
      >
        {plan.cta} <span className="ml-2" aria-hidden>→</span>
      </a>
    </article>
  );
}

function ProfessionalPlan() {
  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-[#9C78D5]/45 bg-[linear-gradient(120deg,rgba(156,120,213,.10),rgba(253,252,250,.98)_42%,rgba(165,25,155,.07))] p-8 shadow-[0_20px_60px_rgba(16,8,80,.07)] sm:p-10 lg:p-12">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#9C78D5]/10 blur-3xl" aria-hidden />
      <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="inline-flex rounded-full bg-[#9C78D5]/14 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] text-[#7d53ad]">
            For professionals
          </div>
          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.22em] text-[#7d53ad]">Associate Partner Plan</p>
          <h3 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Amethyst</h3>
          <p className="mt-2 font-serif text-xl italic text-[#7d53ad]">Integral Polarity</p>

          <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-2">
            <span className="font-serif text-4xl text-ink">€5,500</span>
            <span className="pb-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">one-time</span>
          </div>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            For coaches and counsellors ready to deepen their expertise, strengthen their practice and enter the Integral Values professional ecosystem.
          </p>

          <a
            href={mailtoForAmethyst()}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[#8e5cc2] px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#7b4db0]"
          >
            Apply for Amethyst <span className="ml-2" aria-hidden>→</span>
          </a>
        </div>

        <div className="lg:border-l lg:border-[#9C78D5]/25 lg:pl-12">
          <p className="text-[0.68rem] uppercase tracking-[0.22em] text-[#7d53ad]">Included</p>
          <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {AMETHYST_POINTS.map((point) => (
              <div key={point} className="flex gap-3 border-b border-border/55 pb-4 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9C78D5]" aria-hidden />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ForYouPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For You"
        title="Stay with us, between sessions."
        lead="The work does not only happen in the room. Resources, reflections and an Integral Development membership designed to keep the practice present in ordinary weeks."
        quote="You're not alone."
      />

      <EmotiveImage
        src={humanForYou}
        alt="A person standing at a wide window at dawn, looking outward"
        caption="A quieter kind of belonging."
      />

      <Section eyebrow="Membership" title="Choose the level of support that fits your journey">
        <div className="mb-14 max-w-2xl">
          <p className="text-base leading-relaxed text-muted-foreground">
            From first exploration to deep transformation, each plan offers a different level of presence, structure and support — while keeping the same human, integral approach.
          </p>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">For individuals</p>
          <div className="h-px flex-1 bg-border/70" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {INDIVIDUAL_PLANS.map((plan) => (
            <IndividualPlanCard key={plan.stone} plan={plan} />
          ))}
        </div>

        <div className="mb-6 mt-16 flex items-center gap-4">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">For professionals</p>
          <div className="h-px flex-1 bg-border/70" />
        </div>

        <ProfessionalPlan />

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Each selection opens a pre-filled email to invoice@integralvalues.eu so the team can validate your chosen path and send the appropriate invoice or next steps.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          *Certification pathways are subject to eligibility, specific criteria and the requirements of the relevant certification body. Membership does not itself guarantee certification.
        </p>
      </Section>

      <Section muted eyebrow="Resources" title="A quieter kind of belonging">
        <div className="grid gap-8 md:grid-cols-3">
          <article className="flex h-full flex-col rounded-[2rem] border border-[#75E8D5]/40 bg-card p-8 shadow-[0_14px_45px_rgba(16,8,80,.045)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#2d8f7d]">Free</p>
            <h3 className="mt-4 font-serif text-2xl text-ink">Resources</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              Reflection, grounding and self-observation tools designed to help you check in with yourself between sessions.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link
                to="/who5"
                className="rounded-full border border-[#75E8D5]/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.15em] text-[#2d8f7d] transition-colors hover:bg-[#75E8D5]/15"
              >
                WHO-5
              </Link>
              <Link
                to="/wheel"
                className="rounded-full border border-[#75E8D5]/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.15em] text-[#2d8f7d] transition-colors hover:bg-[#75E8D5]/15"
              >
                Wheel of Life
              </Link>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-[2rem] border border-[#E5279A]/25 bg-card p-8 shadow-[0_14px_45px_rgba(16,8,80,.045)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c91f84]">Member</p>
            <h3 className="mt-4 font-serif text-2xl text-ink">Integral Circle</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              Monthly written reflections, a live group session, and priority access to seasonal workshops and retreats.
            </p>
            <a
              href={`mailto:invoice@integralvalues.eu?subject=${encodeURIComponent("Integral Values — Join the Integral Circle")}&body=${encodeURIComponent("Hello Integral Values,\n\nI would like to join the Integral Circle.\n\nName:\nCountry:\nPhone:\n\nPlease send me the next steps.")}`}
              className="mt-7 inline-flex w-fit rounded-full border border-[#E5279A]/55 px-4 py-2 text-[0.68rem] uppercase tracking-[0.15em] text-[#c91f84] transition-colors hover:bg-[#E5279A]/10"
            >
              Join the Circle
            </a>
          </article>

          <article className="flex h-full flex-col rounded-[2rem] border border-[#9C78D5]/35 bg-card p-8 shadow-[0_14px_45px_rgba(16,8,80,.045)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7d53ad]">Store</p>
            <h3 className="mt-4 font-serif text-2xl text-ink">Rise Above</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              The book — a companion for those rebuilding after change, written from clinical and executive practice.
            </p>
            <a
              href={`mailto:invoice@integralvalues.eu?subject=${encodeURIComponent("Integral Values — Rise Above book")}&body=${encodeURIComponent("Hello Integral Values,\n\nI would like more information about the Rise Above book.\n\nName:\nCountry:\n\nPlease send me availability and ordering information.")}`}
              className="mt-7 inline-flex w-fit rounded-full border border-[#9C78D5]/60 px-4 py-2 text-[0.68rem] uppercase tracking-[0.15em] text-[#7d53ad] transition-colors hover:bg-[#9C78D5]/10"
            >
              Ask about the book
            </a>
          </article>
        </div>
      </Section>

      <Section eyebrow="Articles" title="Reading room">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "Healing begins where judgment ends",
              d: "On why self-criticism slows recovery, and what replaces it.",
            },
            {
              t: "The quiet signals of burnout",
              d: "Exhaustion rarely announces itself. Five earlier signs worth naming.",
            },
            {
              t: "Belonging across cultures",
              d: "Why relocation is an identity task before it is a logistical one.",
            },
          ].map((a) => (
            <CardTile key={a.t} title={a.t} body={a.d} meta="Article" />
          ))}
        </div>
        <div className="mt-12">
          <Link
            to="/contact"
            className="border border-primary px-7 py-3 text-[0.75rem] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Join the circle
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
