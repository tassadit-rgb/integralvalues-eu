import { Link } from "@tanstack/react-router";
import { BRAND } from "@/lib/brand";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-hero shadow-glow transition-transform duration-500 group-hover:scale-105">
        <span className="absolute inset-0 rounded-xl bg-hero blur-md opacity-60" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary-foreground)" }}>
          <path d="M12 21s-7-4.35-7-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 5.65-7 10-7 10z" opacity=".25" />
          <path d="M8 12c1.5 2 4.5 2 6 0" />
          <circle cx="9" cy="9.5" r=".8" fill="currentColor" />
          <circle cx="15" cy="9.5" r=".8" fill="currentColor" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-semibold tracking-tight">{BRAND.name}</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{BRAND.sub}</span>
        </span>
      )}
    </Link>
  );
}
