import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/site-layout";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Editions & Books™ — Integral Values" },
      {
        name: "description",
        content:
          "Integral Values Editions™ — guided workbooks, practical reflection kits and forthcoming books for personal growth, relationships, leadership and life transitions.",
      },
      { property: "og:title", content: "Editions & Books™ — Integral Values" },
      {
        property: "og:description",
        content:
          "Read. Reflect. Apply. Flourish. Guided tools and forthcoming books for the next step of your journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BooksPage,
});

type Collection = {
  key: "SELF" | "RELATIONSHIPS" | "LEADERSHIP" | "TRANSITIONS";
  title: string;
  body: string;
  accent: string;
  soft: string;
  border: string;
};

const COLLECTIONS: Collection[] = [
  {
    key: "SELF",
    title: "Know yourself. Choose consciously.",
    body: "Personal development, values, priorities, self-awareness, emotional growth and life direction.",
    accent: "#8A5FD0",
    soft: "rgba(156,120,213,.12)",
    border: "rgba(156,120,213,.28)",
  },
  {
    key: "RELATIONSHIPS",
    title: "Repair connection. Protect the bond.",
    body: "Couple, attachment, communication, intimacy, conflict and relational repair.",
    accent: "#E5279A",
    soft: "rgba(229,39,154,.10)",
    border: "rgba(229,39,154,.26)",
  },
  {
    key: "LEADERSHIP",
    title: "Lead with clarity and responsibility.",
    body: "Time, priorities, decision-making, management, executive reflection and conscious leadership.",
    accent: "#008FA0",
    soft: "rgba(117,232,213,.16)",
    border: "rgba(0,206,229,.28)",
  },
  {
    key: "TRANSITIONS",
    title: "Move through change without losing yourself.",
    body: "Grief, rupture, migration, identity, rebuilding, belonging and major life transitions.",
    accent: "#6F67BA",
    soft: "rgba(174,181,232,.18)",
    border: "rgba(174,181,232,.34)",
  },
];

type Edition = {
  title: string;
  subtitle: string;
  collection: Collection["key"];
  promise: string;
  format: string;
  edition: string;
};

const EDITIONS: Edition[] = [
  {
    title: "Personal Development Toolkit",
    subtitle: "A guided return to what matters",
    collection: "SELF",
    promise: "Clarify your values, patterns, priorities and next aligned step.",
    format: "Guided workbook · PDF",
    edition: "Edition 01",
  },
  {
    title: "Time & Priorities",
    subtitle: "Make space for what deserves your life",
    collection: "SELF",
    promise: "Move from overload to deliberate choices, realistic priorities and protected attention.",
    format: "Reflection kit · PDF",
    edition: "Edition 01",
  },
  {
    title: "Couple Crisis Emergency Kit",
    subtitle: "Slow the conflict before deciding the future",
    collection: "RELATIONSHIPS",
    promise: "A structured pause for couples facing escalation, rupture, distance or repeated conflict.",
    format: "Guided crisis workbook · PDF",
    edition: "Edition 01",
  },
  {
    title: "Leadership Essentials",
    subtitle: "Think clearly. Decide responsibly. Lead consciously.",
    collection: "LEADERSHIP",
    promise: "Reflect on posture, priorities, influence, boundaries and the impact of your decisions.",
    format: "Leadership workbook · PDF",
    edition: "Edition 01",
  },
  {
    title: "Grief Path to Thriving",
    subtitle: "A gentle structure for life after loss",
    collection: "TRANSITIONS",
    promise: "Name what has changed, honour what remains and rebuild movement without forcing recovery.",
    format: "Transition workbook · PDF",
    edition: "Edition 01",
  },
];

type BookProject = {
  title: string;
  kicker: string;
  body: string;
  accent: string;
  soft: string;
  border: string;
};

const BOOK_PROJECTS: BookProject[] = [
  {
    title: "You're Not Alone;",
    kicker: "Book project · In development",
    body: "A deeply personal narrative about rupture, survival, belonging and transformation — where lived experience meets psychology, meaning and the long movement back toward life.",
    accent: "#A5199B",
    soft: "rgba(156,120,213,.14)",
    border: "rgba(165,25,155,.28)",
  },
  {
    title: "Psy or Co — Point Virgule",
    kicker: "Book project · In development",
    body: "A reflective project at the frontier of psychology, coaching and lived reality — exploring the moments when a point could have been an ending, but becomes a semicolon instead.",
    accent: "#00AFC4",
    soft: "rgba(117,232,213,.16)",
    border: "rgba(0,206,229,.28)",
  },
];

const JOURNEY = [
  {
    stage: "Psyché™",
    line: "Discover Yourself",
    note: "Values, self-awareness and reflection editions can extend what assessment makes visible.",
  },
  {
    stage: "Care",
    line: "Heal Deeply",
    note: "Relationship, grief and emotional-support workbooks can accompany — never replace — professional care.",
  },
  {
    stage: "Coaching",
    line: "Unlock Your Potential",
    note: "Time, priorities, personal development and leadership editions turn insight into practice between sessions.",
  },
  {
    stage: "Cross-Culture",
    line: "Thrive Together",
    note: "Identity, belonging, migration and values tools help make several frames of reference visible.",
  },
  {
    stage: "CORE™",
    line: "Lead & Work Consciously",
    note: "Leadership and organisational editions support teams, managers and executive development programmes.",
  },
];

function collectionFor(key: Edition["collection"]) {
  return COLLECTIONS.find((collection) => collection.key === key)!;
}

function requestHref(edition: Edition) {
  const subject = `Integral Values Editions — ${edition.title}`;
  const body = [
    "Hello Integral Values,",
    "",
    `I am interested in: ${edition.title}.`,
    `Collection: ${edition.collection}`,
    "",
    "Name:",
    "Country:",
    "",
    "Please let me know when this edition is available and how I can access it.",
  ].join("\n");

  return `mailto:hello@integralvalues.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function bookInterestHref(book: BookProject) {
  const subject = `Integral Values Books — ${book.title}`;
  const body = [
    "Hello Integral Values,",
    "",
    `I would like to follow the book project: ${book.title}.`,
    "",
    "Name:",
    "Country:",
    "",
    "Please let me know when there is news about publication, excerpts or pre-orders.",
  ].join("\n");

  return `mailto:hello@integralvalues.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function AbstractMark({ collection }: { collection: Collection }) {
  return (
    <div className="relative mx-auto h-36 w-36" aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: collection.border }}
      />
      <div
        className="absolute left-3 top-5 h-24 w-24 rounded-full blur-[1px]"
        style={{ backgroundColor: collection.soft }}
      />
      <div
        className="absolute bottom-2 right-0 h-20 w-20 rounded-[55%_45%_62%_38%/47%_56%_44%_53%]"
        style={{ backgroundColor: collection.soft }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 -translate-y-1/2 -rotate-12"
        style={{ backgroundColor: collection.border }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: collection.accent }}
      />
    </div>
  );
}

function EditionCard({ edition }: { edition: Edition }) {
  const collection = collectionFor(edition.collection);

  return (
    <article className="group grid overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-[0_18px_55px_rgba(16,8,80,.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(16,8,80,.09)] sm:grid-cols-[0.8fr_1.2fr]">
      <div
        className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-7"
        style={{ background: `linear-gradient(145deg, #FDFCFA 15%, ${collection.soft} 100%)` }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border"
          style={{ borderColor: collection.border }}
          aria-hidden="true"
        />
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.28em] text-[#68769A]">
            Integral Values Editions™
          </p>
          <p
            className="mt-3 text-[0.58rem] uppercase tracking-[0.22em]"
            style={{ color: collection.accent }}
          >
            {edition.collection}
          </p>
        </div>
        <AbstractMark collection={collection} />
        <div>
          <h3 className="font-serif text-3xl leading-[1.02] text-[#100850]">
            {edition.title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {edition.subtitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col p-7 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <span
            className="rounded-full px-3 py-1.5 text-[0.58rem] uppercase tracking-[0.18em]"
            style={{ backgroundColor: collection.soft, color: collection.accent }}
          >
            {edition.collection}
          </span>
          <span className="text-[0.58rem] uppercase tracking-[0.18em] text-muted-foreground">
            {edition.edition}
          </span>
        </div>

        <p className="mt-8 font-serif text-2xl leading-snug text-[#100850]">
          {edition.promise}
        </p>
        <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {edition.format}
        </p>

        <div className="mt-auto flex flex-wrap gap-3 pt-9">
          <span className="inline-flex items-center rounded-full border border-border px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.15em] text-muted-foreground">
            Preview coming soon
          </span>
          <a
            href={requestHref(edition)}
            className="inline-flex items-center rounded-full px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.15em] text-white transition hover:opacity-90"
            style={{ backgroundColor: collection.accent }}
          >
            Get the Kit →
          </a>
        </div>
      </div>
    </article>
  );
}

function BookProjectCard({ book }: { book: BookProject }) {
  return (
    <article
      className="relative overflow-hidden rounded-[2rem] border bg-white p-8 shadow-[0_18px_55px_rgba(16,8,80,.055)] sm:p-10"
      style={{ borderColor: book.border }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-2xl"
        style={{ backgroundColor: book.soft }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.58rem] uppercase tracking-[0.24em] text-[#68769A]">
            Integral Values Books
          </p>
          <span
            className="rounded-full px-3 py-1.5 text-[0.56rem] uppercase tracking-[0.16em]"
            style={{ backgroundColor: book.soft, color: book.accent }}
          >
            Coming soon
          </span>
        </div>
        <p className="mt-10 text-[0.58rem] uppercase tracking-[0.2em]" style={{ color: book.accent }}>
          {book.kicker}
        </p>
        <h3 className="mt-3 max-w-xl font-serif text-4xl leading-[1.02] text-[#100850] sm:text-5xl">
          {book.title}
        </h3>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {book.body}
        </p>
        <a
          href={bookInterestHref(book)}
          className="mt-8 inline-flex items-center rounded-full border px-5 py-3 text-[0.64rem] uppercase tracking-[0.15em] transition hover:bg-[#FDFCFA]"
          style={{ borderColor: book.border, color: book.accent }}
        >
          Follow the project →
        </a>
      </div>
    </article>
  );
}

function BooksPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-[#FDFCFA]">
        <div className="pointer-events-none absolute -left-20 top-8 h-80 w-80 rounded-full bg-[#9C78D5]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#75E8D5]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E5279A]/[0.055] blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-10 lg:py-32">
          <div>
            <p className="text-[0.64rem] uppercase tracking-[0.30em] text-[#68769A]">
              Integral Values Editions™
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] text-[#100850] sm:text-6xl lg:text-7xl">
              Tools for the next step of your journey.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Guided workbooks designed to help you pause, think, write and apply what matters — between sessions, during transitions, or whenever reflection needs structure.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#featured-editions"
                className="rounded-full bg-[#100850] px-6 py-3 text-[0.68rem] uppercase tracking-[0.18em] text-white transition hover:opacity-90"
              >
                Explore the Editions
              </a>
              <span className="font-serif text-lg italic text-[#100850]/65">
                Read. Reflect. Apply. Flourish.
              </span>
            </div>
          </div>

          <div className="relative mx-auto h-[28rem] w-full max-w-md" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9C78D5]/25" />
            <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00CEE5]/25" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E5279A]/20" />
            <div className="absolute left-[11%] top-[20%] h-32 w-24 rotate-[-9deg] rounded-[1.2rem] border border-[#9C78D5]/30 bg-white/80 shadow-[0_18px_50px_rgba(16,8,80,.08)]" />
            <div className="absolute right-[10%] top-[27%] h-36 w-28 rotate-[8deg] rounded-[1.2rem] border border-[#75E8D5]/45 bg-white/85 shadow-[0_18px_50px_rgba(16,8,80,.08)]" />
            <div className="absolute bottom-[13%] left-1/2 h-40 w-32 -translate-x-1/2 rounded-[1.2rem] border border-[#E5279A]/25 bg-white/90 shadow-[0_18px_50px_rgba(16,8,80,.08)]" />
            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#100850] text-center text-[0.54rem] uppercase tracking-[0.22em] text-white shadow-[0_20px_55px_rgba(16,8,80,.20)]">
              Read<br />Reflect<br />Apply
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#68769A]">Four collections</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#100850] sm:text-5xl">
              One editorial family. Different moments of life.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COLLECTIONS.map((collection) => (
              <article
                key={collection.key}
                className="rounded-[1.8rem] border bg-[#FDFCFA] p-6"
                style={{ borderColor: collection.border }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-[0.64rem] font-medium tracking-[0.08em]"
                  style={{ backgroundColor: collection.soft, color: collection.accent }}
                >
                  {collection.key.slice(0, 2)}
                </div>
                <p
                  className="mt-5 text-[0.58rem] uppercase tracking-[0.22em]"
                  style={{ color: collection.accent }}
                >
                  {collection.key}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-tight text-[#100850]">
                  {collection.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {collection.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured-editions" className="bg-[#FDFCFA]">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#68769A]">Featured editions</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-[#100850] sm:text-5xl">
                Open a page. Start somewhere real.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:justify-self-end">
              Each edition is built as a guided working space — concise insight, strong questions, generous writing room and one practical next step. Not a PDF to collect. A tool to use.
            </p>
          </div>

          <div className="mt-14 grid gap-7 lg:grid-cols-2">
            {EDITIONS.map((edition) => (
              <EditionCard key={edition.title} edition={edition} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-[#E5279A]/[0.04] blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#75E8D5]/[0.07] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#68769A]">Books in development</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#100850] sm:text-5xl">
              Stories and ideas that need more room than a workbook.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Alongside the practical editions, longer-form book projects are being developed within the Integral Values universe. Publication details, excerpts and release dates will be shared as the manuscripts evolve.
            </p>
          </div>

          <div className="mt-12 grid gap-7 lg:grid-cols-2">
            {BOOK_PROJECTS.map((book) => (
              <BookProjectCard key={book.title} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[#68769A]">Your journey</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-[#100850] sm:text-5xl">
              Editions travel with you — they do not sit outside the work.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              The right guide can appear before a conversation, between sessions, inside a programme, or as a quiet way to continue independently.
            </p>
          </div>

          <div className="relative mt-14 grid gap-4 lg:grid-cols-5">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden h-px bg-[linear-gradient(90deg,#E5279A,#9C78D5,#00CEE5,#100850)] opacity-30 lg:block" aria-hidden="true" />
            {JOURNEY.map((item, index) => (
              <article key={item.stage} className="relative rounded-[1.5rem] border border-border/70 bg-[#FDFCFA] p-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#100850] text-[0.58rem] text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="mt-5 text-[0.58rem] uppercase tracking-[0.2em] text-[#68769A]">{item.line}</p>
                <h3 className="mt-2 font-serif text-2xl text-[#100850]">{item.stage}</h3>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#100850] text-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#9C78D5]/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#00CEE5]/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.28em] text-white/50">Continue the journey</p>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-5xl">
                Read. Reflect. Apply. Flourish.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65">
                Some editions will be available individually, others through Integral Circle™, membership plans or guided programmes. We will always show clearly what is included and what kind of support a resource is designed for.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:flex-col">
              <Link
                to="/for-you"
                className="rounded-full bg-white px-6 py-3 text-[0.66rem] uppercase tracking-[0.18em] text-[#100850]"
              >
                Explore For You
              </Link>
              <Link
                to="/circle"
                className="rounded-full border border-white/30 px-6 py-3 text-[0.66rem] uppercase tracking-[0.18em] text-white"
              >
                Integral Circle™
              </Link>
            </div>
          </div>

          <p className="mt-10 max-w-3xl border-t border-white/15 pt-6 text-[0.68rem] leading-relaxed text-white/45">
            Integral Values Editions™ are educational and reflective resources. They do not replace medical, psychological or emergency care. When a situation involves immediate danger, violence or acute distress, contact the appropriate local emergency or crisis service.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
