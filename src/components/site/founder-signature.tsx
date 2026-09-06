export function FounderSignature({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="signature">Dr. Tassadit Cherfaoui</p>
      <p className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
        Founder | Clinical Psychologist | Psychoanalyst | Executive Coach
      </p>
    </div>
  );
}
