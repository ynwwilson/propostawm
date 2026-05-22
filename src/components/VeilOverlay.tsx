import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";

/**
 * Véu de noiva — nasce do topo (onde está a noiva no hero), desce e
 * se expande suavemente conforme o usuário rola, atravessando toda a
 * proposta e se dissolvendo no fim. Camada fixa, translúcida, sem
 * interferir na leitura.
 */
export function VeilOverlay() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const p = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.7,
  });

  // O véu nasce pequeno, cresce até dominar a tela, e se dissolve no fim
  const scaleY = useTransform(p, [0, 0.5, 1], [0.35, 1.15, 1.35]);
  const scaleX = useTransform(p, [0, 0.5, 1], [0.55, 1.1, 1.3]);
  // Opacidade: invisível no início (sobreposta à noiva), cresce no miolo,
  // se dissipa suavemente no fim
  const opacity = useTransform(p, [0, 0.08, 0.55, 0.9, 1], [0, 0.35, 0.75, 0.55, 0.15]);
  // Movimento vertical sutil — como tecido caindo
  const sway = useTransform(p, [0, 1], [-2, 3]);

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
        // Ancora o véu no topo, centro — onde está a noiva no hero
        className="absolute left-1/2 top-0 h-screen w-[120vw] -translate-x-1/2"
      >
        <svg
          viewBox="0 0 1200 1000"
          preserveAspectRatio="none"
          className="h-full w-full"
          style={{ filter: "blur(28px)" }}
        >
          <defs>
            {/* Gradiente vertical — denso no topo, dissolvendo embaixo */}
            <linearGradient id="veil-fade" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,253,247,0.95)" />
              <stop offset="25%" stopColor="rgba(255,250,238,0.75)" />
              <stop offset="55%" stopColor="rgba(248,232,208,0.45)" />
              <stop offset="85%" stopColor="rgba(248,232,208,0.12)" />
              <stop offset="100%" stopColor="rgba(248,232,208,0)" />
            </linearGradient>
            {/* Gradiente radial — concentra brilho no centro/topo (a cabeça) */}
            <radialGradient id="veil-core" cx="50%" cy="5%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="40%" stopColor="rgba(255,250,235,0.35)" />
              <stop offset="100%" stopColor="rgba(255,250,235,0)" />
            </radialGradient>
          </defs>

          {/* Silhueta do véu — afunila no topo, abre para baixo como tecido fluindo */}
          <path
            d="M 600 0
               C 540 80, 480 200, 420 360
               C 360 520, 300 700, 240 1000
               L 960 1000
               C 900 700, 840 520, 780 360
               C 720 200, 660 80, 600 0 Z"
            fill="url(#veil-fade)"
          />

          {/* Camada externa mais ampla, suave */}
          <path
            d="M 600 0
               C 500 120, 380 280, 260 480
               C 180 640, 100 820, 40 1000
               L 1160 1000
               C 1100 820, 1020 640, 940 480
               C 820 280, 700 120, 600 0 Z"
            fill="url(#veil-fade)"
            opacity="0.55"
          />

          {/* Brilho central na origem */}
          <ellipse cx="600" cy="20" rx="280" ry="180" fill="url(#veil-core)" />
        </svg>
      </motion.div>

      {/* Respiração de luz — quase imperceptível */}
      <motion.div
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 35% at 50% 15%, rgba(255,248,235,0.25) 0%, rgba(255,248,235,0) 70%)",
        }}
      />
    </div>
  );
}
