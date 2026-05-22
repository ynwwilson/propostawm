/**
 * BridalVeilBackground
 * Wraps the DarkVeil WebGL shader with light filters + champagne/rosé/nude overlays
 * so the result reads as a bright, soft "veil of light" — never dark.
 */
import DarkVeil from "./DarkVeil";

export function BridalVeilBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#FAF7F3] ${className}`}
    >
      <div className="absolute inset-0 opacity-[0.08] mix-blend-screen filter brightness-[1.8] contrast-[0.55] sepia">
        <DarkVeil
          hueShift={22}
          noiseIntensity={0.025}
          scanlineIntensity={0}
          scanlineFrequency={0}
          speed={0.18}
          warpAmount={0.06}
          resolutionScale={0.7}
        />
      </div>
      <div className="absolute inset-0 bg-[#FAF7F3]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,126,0.12),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(217,193,186,0.16),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(246,241,235,0.9),transparent_45%)]" />
    </div>
  );
}

export default BridalVeilBackground;
