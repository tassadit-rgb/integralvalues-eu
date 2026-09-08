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

type Plan = {
  name: string;
  stone: string;
  subtitle: string;
  price: string;
  intro: string;
  points: string[];
  cue: string;
  cta: string;
  visual: string;
  accent: string;
  bullet: string;
  button: string;
  border: string;
  featured?: boolean;
  audience?: string;
};

const PLANS: Plan[] = [
  {
    name: "Discovery Plan",
    stone: "Jade",
    subtitle: "Pay-As-You-Wish",
    price: "Pay-As-You-Wish",
    intro:
      "Explore a coaching journey. Pay any value you feel is appropriate for your chemistry session.",
    points: [
      "Try-Values Ranking",
      "Meaningful goal-setting framework",
      "Core Quadrant",
      "Effective communication & influence",
      "One resource personalized to your goal",
      "The ‘Jade-Box’",
    ],
    cue: "Know yourself · Live more fully",
    cta: "Begin with Jade",
    visual:
      "bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,.96)_0_5%,transparent_6%),radial-gradient(circle_at_50%_55%,rgba(255,255,255,.42)_0_2%,transparent_3%),linear-gradient(180deg,#dffff8_0%,#8fe8df_46%,#6bcfca_100%)]",
    accent: "text-[#2d8f7d]",
    bullet: "bg-[#75E8D5] text-[#104e45]",
    button: "bg-[#59cdbd] text-white hover:bg-[#49bcae]",
    border: "border-[#75E8D5]/55",
  },
  {
    name: "Friendly Plan",
    stone: "Turquoise",
    subtitle: "Your First Step",
    price: "€500",
    intro:
      "Unlock your potential with affordable coaching. Get clear and focused on life-changing goals.",
    points: [
      "Two coaching sessions per month",
      "Personalized coaching plan",
      "Access to online library",
      "One-on-one coaching via video call",
      "Empowerment and purpose discovery",
      "The ‘Turquoise-Box’",
    ],
    cue: "Grow · Align · Flow",
    cta: "Choose Turquoise",
    visual:
      "bg-[radial-gradient(ellipse_at_25%_72%,rgba(255,255,255,.45),transparent_24%),radial-gradient(ellipse_at_78%_35%,rgba(255,255,255,.3),transparent_20%),linear-gradient(160deg,#d9ffff_0%,#61dce8_38%,#0ea9bd_66%,#08778e_100%)]",
    accent: "text-[#069bb1]",
    bullet: "bg-[#00CEE5] text-[#063d46]",
    button: "bg-[#00b7cd] text-white hover:bg-[#009eb1]",
    border: "border-[#00CEE5]/55",
  },
  {
    name: "Premium Plan",
    stone: "Rubi",
    subtitle: "Transformational Growth",
    price: "€850",
    intro:
      "Gain integrative top skills and confidence to break through barriers. Master your emotions, harness your strengths and ignite your passion.",
    points: [
      "Four coaching sessions per month",
      "Personal assessment and coaching plan",
      "Access to internal resources",
      "One-on-one video sessions + open chat access (24-hour response)",
      "Development into effective leadership or revitalizing relationships",
      "The ‘Rubi-Box’",
    ],
    cue: "Transform · Lead · Thrive",
    cta: "Choose Rubi",
    visual:
      "bg-[radial-gradient(ellipse_at_20%_75%,rgba(255,255,255,.58),transparent_24%),radial-gradient(ellipse_at_72%_35%,rgba(255,242,249,.5),transparent_28%),linear-gradient(160deg,#ffdff0_0%,#f5a6d6_34%,#E5279A_72%,#b01c78_100%)]",
    accent: "text-[#c41f83]",
    bullet: "bg-[#E5279A] text-white",
    button: "bg-[#E5279A] text-white hover:bg-[#cc2088]",
    border: "border-[#E5279A]/65",
    featured: true,
  },
  {
    name: "Elite Plan",
    stone: "Diamant",
    subtitle: "Integral Harmony",
    price: "€3,500",
    intro:
      "Experience personalized coaching for life purpose and meaning, physical and mental well-being fulfillment.",
    points: [
      "Six coaching sessions over 6 months",
      "Personal assessment and personalized coaching map",
      "Access to internal resources and advanced materials",
      "Priority live support chat (6-hour response)",
      "Support for long-term goals, life & career transitions, burnout and mental well-being",
      "The ‘Diamond-Box’",
    ],
    cue: "Integrate · Balance · Expand",
    cta: "Choose Diamant",
    visual:
      "bg-[linear-gradient(135deg,rgba(255,255,255,.92)_0_18%,transparent_19%),linear-gradient(42deg,transparent_0_38%,rgba(255,255,255,.5)_39_52%,transparent_53%),linear-gradient(155deg,#f8fdff_0%,#dff4ff_32%,#b9d9ef_58%,#AEB5E8_100%)]",
    accent: "text-[#6485b8]",
    bullet: "bg-[#AEB5E8] text-[#28345d]",
    button: "bg-[#8da9d7] text-white hover:bg-[#7a98cb]",
    border: "border-[#AEB5E8]/70",
  },
  {
    name: "Associate Partner Plan",
    stone: "Amethyst",
    subtitle: "Integral Polarity",
    price: "€5,500",
    intro:
      "For professional coaches and counsellors who want to enhance their expertise and turn their practice into a successful story.",
    points: [
      "Full online access to Lib, Lab and blog editing",
      "Group of Practice",
      "Integral Practice Onboarding Training",
      "ICF Certification Path*",
      "Values Ranking Facilitator Certification",
      "Join the Integral Values Board of Associate Partners",
      "Referral and Integral Values Badge ID",
      "Coaching toolkits + the ‘Purple-Box’",
    ],
    cue: "Collaborate · Certify · Create impact",
    cta: "Apply for Amethyst",
    visual:
      "bg-[linear-gradient(135deg,rgba(255,255,255,.22)_0_16%,transparent_17%),linear-gradient(42deg,transparent_0_38%,rgba(255,255,255,.18)_39_50%,transparent_51%),radial-gradient(circle_at_70%_30%,#d5a9ef_0%,#A5199B_42%,#572062_78%,#33143d_100%)]",
    accent: "text-[#7e258f]",
    bullet: "bg-[#9C78D5] text-white",
    button: "bg-[#8e5cc2] text-white hover:bg-[#7b4db0]",
    border: "border-[#9C78D5]/75",
    audience: "For coaches & counsellors",
  },
];

function mailtoFor(plan: Plan) {
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

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-card shadow-[0_18px_60px_rgba(16,8,80,.08)] ${plan.border}`}
    >
      {plan.featured && (
        <span className="absolute right-6 top-5 z-20 rounded-full bg-primary px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
          Most popular
        </span>
      )}
      {plan.audience && (
        <span className="absolute right-6 top-5 z-20 rounded-full bg-[#8e5cc2] px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white shadow-lg">
          {plan.audience}
        </span>
      )}

      <div className={`relative h-52 overflow-hidden ${plan.visual}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-navy/12" />
        <p className="absolute left-7 top-7 max-w-[72%] text-[0.62rem] uppercase tracking-[0.24em] text-navy/70">
          {plan.cue}
        </p>
        <div className="absolute bottom-[-1px] left-0 right-0 h-12 rounded-t-[2rem] bg-card" />
      </div>

      <div className="relative -mt-10 flex flex-1 flex-col rounded-t-[2rem] bg-card p-7 pt-8 sm:p-8 sm:pt-9">
        <p className={`text-[0.68rem] uppercase tracking-[0.22em] ${plan.accent}`}>
          {plan.name}
        </p>
        <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">{plan.stone}</h3>
        <p className={`mt-2 font-serif text-xl italic ${plan.accent}`}>{plan.subtitle}</p>
        <p className="mt-5 font-serif text-3xl text-ink">{plan.price}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{plan.intro}</p>

        <div className="my-6 h-px bg-border/70" />

        <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          {plan.points.map((point) => (
            <li key={point} className="flex gap-3">
              <span
                className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold ${plan.bullet}`}
                aria-hidden
              >
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <a
          href={mailtoFor(plan)}
          className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${plan.button}`}
        >
          {plan.cta} <span className="ml-2" aria-hidden>→</span>
        </a>
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

      <Section eyebrow="Membership" title="Get started on your Integral Development journey">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-base leading-relaxed text-muted-foreground">
            Choose the path that meets you where you are — from discovery and focused growth to integral harmony and professional partnership.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {PLANS.slice(0, 3).map((plan) => (
            <PlanCard key={plan.stone} plan={plan} />
          ))}
        </div>

        <div className="mx-auto mt-7 grid max-w-4xl gap-7 lg:grid-cols-2">
          {PLANS.slice(3).map((plan) => (
            <PlanCard key={plan.stone} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          Each selection opens a pre-filled email to invoice@integralvalues.eu so the team can validate your chosen path and send the appropriate invoice or next steps.
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
          *Certification pathways are subject to eligibility, specific criteria and the requirements of the relevant certification body. Membership does not itself guarantee certification.
        </p>
      </Section>

      <Section muted eyebrow="Resources" title="A quieter kind of belonging">
        <div className="grid gap-8 md:grid-cols-3">
          <article className="flex h-full flex-col rounded-[2rem] border border-[#75E8D5]/45 bg-card p-8 shadow-[0_14px_45px_rgba(16,8,80,.05)]">
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

          <article className="flex h-full flex-col rounded-[2rem] border border-[#E5279A]/35 bg-card p-8 shadow-[0_14px_45px_rgba(16,8,80,.05)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#c41f83]">Member</p>
            <h3 className="mt-4 font-serif text-2xl text-ink">Integral Circle</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              Monthly written reflections, a live group session and priority access to selected workshops, retreats and new resources.
            </p>
            <a
              href={`mailto:invoice@integralvalues.eu?subject=${encodeURIComponent("Integral Values — Integral Circle membership")}&body=${encodeURIComponent("Hello Integral Values,\n\nI would like to join the Integral Circle.\n\nName:\nCountry:\nPhone:\n\nPlease send me the membership details and next steps.")}`}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#E5279A] px-5 py-3 text-[0.68rem] uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
            >
              Join the Circle <span className="ml-2" aria-hidden>→</span>
            </a>
          </article>

          <article className="flex h-full flex-col rounded-[2rem] border border-[#9C78D5]/45 bg-card p-8 shadow-[0_14px_45px_rgba(16,8,80,.05)]">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[#7e5bb7]">Store</p>
            <h3 className="mt-4 font-serif text-2xl text-ink">Rise Above</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
              A companion for those rebuilding after change — reflections and practices shaped by clinical, coaching and executive experience.
            </p>
            <a
              href={`mailto:invoice@integralvalues.eu?subject=${encodeURIComponent("Integral Values — Rise Above")}&body=${encodeURIComponent("Hello Integral Values,\n\nI would like information about Rise Above.\n\nName:\nCountry:\nPreferred format (print / digital):\n\nPlease send me availability and ordering information.")}`}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#9C78D5] px-5 py-3 text-[0.68rem] uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
            >
              Ask about the book <span className="ml-2" aria-hidden>→</span>
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
