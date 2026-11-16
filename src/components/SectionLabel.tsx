/** A section's small label: an accent dot, then "Facials" (or "01 Facials"). */
export function SectionLabel({ n, children, tone }: { n?: string; children: string; tone?: 'dark' | 'accent' }) {
  return (
    <p className={`label${tone ? ` label--${tone}` : ''}`}>
      <span className="label__dot" aria-hidden="true" />
      {n && <span className="label__n">{n}</span>}
      <span>{children}</span>
    </p>
  );
}
