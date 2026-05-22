/**
 * BridalVeilBackground
 * Soft, light, bridal "veil of light" background.
 * Pure CSS — animated radial washes in champagne / rosé / nude / dourado discreto
 * with a subtle grain layer, blended via soft-light so it never darkens content.
 *
 * Usage: place inside a `relative isolate` wrapper, sibling to the content.
 */
import "./BridalVeilBackground.css";

export function BridalVeilBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`bridal-veil pointer-events-none absolute inset-0 z-[1] ${className}`}
    >
      <div className="bridal-veil__wash bridal-veil__wash--a" />
      <div className="bridal-veil__wash bridal-veil__wash--b" />
      <div className="bridal-veil__wash bridal-veil__wash--c" />
      <div className="bridal-veil__shimmer" />
      <div className="bridal-veil__grain" />
    </div>
  );
}

export default BridalVeilBackground;
