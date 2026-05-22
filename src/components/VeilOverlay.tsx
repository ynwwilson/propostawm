import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";

/**
 * Véu de noiva — nasce no topo (cabeça da noiva no hero) e desce
 * estreito por toda a proposta. Só se abre amplo, como cauda
 * espalhada no chão, no final do scroll.
 */
export function VeilOverlay() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const p = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 26,
    mass: 0.7,
  });

  // Largura: estreita o caminho todo, abre só no fim
  const scaleX = useTransform(p, [0, 0.6, 0.85, 1], [0.45, 0.6, 1.2, 1.8]);
  // Altura: cresce gradual para acompanhar o tecido fluindo
  const scaleY = useTransform(p, [0, 1], [0.7, 1.1]);
  // Opacidade: aparece logo após o hero, mantém presença, intensifica no fim
  const opacity = useTransform(
    p,
    [0, 0.08, 0.3, 0.85, 1],
    [0, 0.45, 0.7, 0.85, 0.9],
  );
  const sway = useTransform(p, [0, 1], [-1.5, 2]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      <motion.div
        style={{
          scaleX,
          scaleY,
          opacity,
          rotate: sway,
          transformOrigin: "50% 0%",
        }}
        className="absolute left-1/2 top-0 h-screen w-[60vw] -translate-x-1/2"
      >
        <svg
          viewBox="0 0 600 1000"
          preserveAspectRatio="none"
          className="h-full w-full"
          style={{ filter: "blur(6px)" }}
        >
          <defs>
            {/* Tecido translúcido — denso no topo, suave embaixo */}
            <linearGradient id="veil-fabric" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,253,247,0.85)" />
              <stop offset="30%" stopColor="rgba(255,250,240,0.6)" />
              <stop offset="70%" stopColor="rgba(250,240,222,0.45)" />
              <stop offset="100%" stopColor="rgba(248,232,208,0.35)" />
            </linearGradient>
            {/* Borda em renda — mais opaca */}
            <linearGradient id="veil-lace" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="60%" stopColor="rgba(255,253,247,0.4)" />
              <stop offset="100%" stopColor="rgba(255,253,247,0.85)" />
            </linearGradient>
            {/* Brilho na origem (cabeça) */}
            <radialGradient id="veil-crown" cx="50%" cy="2%" r="35%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Pregas verticais — listras suaves para sugerir tecido */}
            <linearGradient id="pleat" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>

          {/* Silhueta principal do véu — afunila no topo, abre embaixo */}
          <path
            d="M 280 0
               C 260 150, 230 350, 180 600
               C 140 800, 80 920, 30 1000
               L 570 1000
               C 520 920, 460 800, 420 600
               C 370 350, 340 150, 320 0 Z"
            fill="url(#veil-fabric)"
          />

          {/* Pregas verticais sutis */}
          <g opacity="0.5">
            <rect x="200" y="0" width="2" height="1000" fill="url(#pleat)" />
            <rect x="260" y="0" width="2" height="1000" fill="url(#pleat)" />
            <rect x="300" y="0" width="2" height="1000" fill="url(#pleat)" />
            <rect x="340" y="0" width="2" height="1000" fill="url(#pleat)" />
            <rect x="400" y="0" width="2" height="1000" fill="url(#pleat)" />
          </g>

          {/* Faixa de renda — base do véu */}
          <path
            d="M 30 1000
               C 80 920, 140 800, 180 600
               L 200 620
               C 160 810, 110 930, 70 1000 Z"
            fill="url(#veil-lace)"
          />
          <path
            d="M 570 1000
               C 520 920, 460 800, 420 600
               L 400 620
               C 440 810, 490 930, 530 1000 Z"
            fill="url(#veil-lace)"
          />

          {/* Festões de renda na borda inferior */}
          <g fill="rgba(255,253,247,0.55)">
            {Array.from({ length: 14 }).map((_, i) => {
              const cx = 50 + i * 36;
              return <circle key={i} cx={cx} cy={990} r={10} />;
            })}
          </g>

          {/* Coroa de luz no topo */}
          <ellipse cx="300" cy="10" rx="120" ry="60" fill="url(#veil-crown)" />
        </svg>
      </motion.div>

      {/* Brilho ambiente muito sutil */}
      <motion.div
        initial={{ opacity: 0.08 }}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 30% at 50% 10%, rgba(255,248,235,0.2) 0%, rgba(255,248,235,0) 70%)",
        }}
      />
    </div>
  );
}
