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
  href: "/booking" | "/contact" | "/apply";
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
    cue: "Explore · Reflect · Begin",
    href: "/booking",
    cta: "Begin with Jade",
    visual:
      "bg-[radial-gradient(circle_at_70%_28%,rgba(255,255,255,.9),transparent_18%),linear-gradient(135deg,#e8fffb_0%,#75E8D5_52%,#bdf5e9_100%)]",
    accent: "text-[#2d8f7d]",
    bullet: "bg-[#75E8D5] text-[#104e45]",
    button: "bg-[#75E8D5] text-[#104e45] hover:bg-[#63ddc9]",
    border: "border-[#75E8D5]/60",
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
    href: "/contact",
    cta: "Choose Turquoise",
    visual:
      "bg-[radial-gradient(circle_at_26%_22%,rgba(255,255,255,.78),transparent_20%),linear-gradient(150deg,#b8fbf8_0%,#00CEE5_52%,#138da7_100%)]",
    accent: "text-[#069bb1]",
    bullet: "bg-[#00CEE5] text-[#063d46]",
    button: "bg-[#00CEE5] text-[#063d46] hover:bg-[#00bad0]",
    border: "border-[#00CEE5]/60",
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
    href: "/contact",
    cta: "Choose Rubi",
    visual:
      "bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,.62),transparent_20%),linear-gradient(145deg,#ffd9ef_0%,#E5279A_55%,#9e1c75_100%)]",
    accent: "text-[#c41f83]",
    bullet: "bg-[#E5279A] text-white",
    button: "bg-[#E5279A] text-white hover:bg-[#cc2088]",
    border: "border-[#E5279A]",
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
    href: "/contact",
    cta: "Choose Diamant",
    visual:
      "bg-[radial-gradient(circle_at_74%_20%,rgba(255,255,255,.98),transparent_22%),linear-gradient(145deg,#f9fdff_0%,#dceff8_36%,#AEB5E8_72%,#e5e9ff_100%)]",
    accent: "text-[#6485b8]",
    bullet: "bg-[#AEB5E8] text-[#28345d]",
    button: "bg-[#AEB5E8] text-[#28345d] hover:bg-[#9fa8de]",
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
    cue: "Collaborate · Certify · Create Impact",
    href: "/apply",
    cta: "Apply for Amethyst",
    visual:
      "bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,.36),transparent_18%),linear-gradient(145deg,#dcb9f4_0%,#A5199B_45%,#572062_100%)]",
    accent: "text-[#7e258f]",
    bullet: "bg-[#9C78D5] text-white",
    button: "bg-[#9C78D5] text-white hover:bg-[#8c67cb]",
    border: "border-[#9C78D5]/75",
    audience: "For coaches & counsellors",
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-card shadow-[0_18px_60px_rgba(16,8,80,.07)] ${plan.border}`}
    >
      {plan.featured && (
        <span className="absolute right-6 top-5 z-10 rounded-full bg-primary px-4 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-primary-foreground shadow-lg">
          Most popular
        </span>
      )}
      {plan.audience && (
        <span className="absolute right-6 top-5 z-10 rounded-full bg-[#9C78D5] px-4 py-2 text-[0.62rem] uppercase tracking-[0.18em] text-white shadow-lg">
          {plan.audience}
        </span>
      )}

      <div className={`relative h-44 overflow-hidden ${plan.visual}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-navy/10" />
        <p className="absolute bottom-6 left-7 max-w-[70%] text-[0.64rem] uppercase tracking-[0.24em] text-navy/75">
          {plan.cue}
        </p>
        <div className="absolute -right-8 -top-8 h-28 w-28 rotate-45 border border-white/45 bg-white/10" />
        <div className="absolute right-12 top-14 h-10 w-10 rotate-45 border border-white/60 bg-white/20" />
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
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

        <Link
          to={plan.href}
          className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-[0.7rem] uppercase tracking-[0.16em] transition-colors ${plan.button}`}
        >
          {plan.cta} <span className="ml-2" aria-hidden>→</span>
        </Link>
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
          *Certification pathways are subject to eligibility, specific criteria and the requirements of the relevant certification body. Membership does not itself guarantee certification.
        </p>
      </Section>

      <Section muted eyebrow="Resources" title="A quieter kind of belonging">
        <div className="grid gap-8 md:grid-cols-3">
          <CardTile
            meta="Free"
            title="Resources"
            body="Reflection sheets, breathing and grounding practices, and the WHO-5 and Wheel of Life self-checks — open to everyone."
          />
          <CardTile
            meta="Member"
            title="Integral Circle"
            body="Monthly written reflections, a live group session, and priority access to seasonal workshops and retreats."
          />
          <CardTile
            meta="Store"
            title="Rise Above"
            body="The book — a companion for those rebuilding after change, written from clinical and executive practice."
          />
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
