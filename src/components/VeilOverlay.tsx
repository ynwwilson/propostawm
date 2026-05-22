import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";

/**
 * Véu de noiva — tecido vivo e realista que percorre toda a proposta.
 *
 * Comportamento:
 * - Nasce na cabeça da noiva no hero (topo-centro).
 * - Mantém o MESMO tamanho do início ao fim, apenas se aproxima da tela
 *   (z translate sutil + leve aumento perceptivo).
 * - Atravessa a proposta inteira, mas a peça visível desliza
 *   horizontalmente: centro → direita → esquerda → centro → esquerda → direita.
 * - Renderiza duas camadas: uma ATRÁS do conteúdo (z-[1]) e outra
 *   muito translúcida À FRENTE (z-[40]) — o texto fica entre as duas,
 *   criando a sensação de letras passando por dentro do tecido.
 * - Pregas, renda e ondulação animadas para parecer tecido real.
 */

function VeilFabric({ side = "back" }: { side?: "back" | "front" }) {
  // turbulência só na camada de trás, para performance
  const showTurbulence = side === "back";
  return (
    <svg
      viewBox="0 0 600 1100"
      preserveAspectRatio="xMidYMin meet"
      className="h-full w-full"
      style={{
        filter: side === "back" ? "blur(2.5px)" : "blur(5px)",
      }}
    >
      <defs>
        {/* Tecido principal — branco champagne translúcido */}
        <linearGradient id={`fabric-${side}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,253,247,0.95)" />
          <stop offset="25%" stopColor="rgba(253,247,235,0.85)" />
          <stop offset="55%" stopColor="rgba(248,238,218,0.7)" />
          <stop offset="85%" stopColor="rgba(240,224,196,0.5)" />
          <stop offset="100%" stopColor="rgba(230,210,180,0.25)" />
        </linearGradient>

        {/* Pregas — listras verticais que sugerem dobras de seda */}
        <linearGradient id={`pleat-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,250,235,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Sombras de prega — escuros muito sutis */}
        <linearGradient id={`pleat-shadow-${side}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(120,90,60,0)" />
          <stop offset="50%" stopColor="rgba(120,90,60,0.18)" />
          <stop offset="100%" stopColor="rgba(120,90,60,0)" />
        </linearGradient>

        {/* Coroa de luz no topo (origem do véu) */}
        <radialGradient id={`crown-${side}`} cx="50%" cy="0%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="60%" stopColor="rgba(255,250,235,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Borda de renda */}
        <linearGradient id={`lace-${side}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="70%" stopColor="rgba(255,253,247,0.5)" />
          <stop offset="100%" stopColor="rgba(255,253,247,0.95)" />
        </linearGradient>

        {showTurbulence && (
          <filter id="silk" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.04"
              numOctaves="2"
              seed="3"
            >
              <animate
                attributeName="baseFrequency"
                dur="22s"
                values="0.012 0.04; 0.014 0.045; 0.012 0.04"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="14" />
          </filter>
        )}
      </defs>

      {/* Silhueta do tecido — afunila no topo, abre suavemente embaixo */}
      <g filter={showTurbulence ? "url(#silk)" : undefined}>
        <path
          d="M 260 0
             C 240 180, 210 380, 175 600
             C 145 800, 90 970, 30 1100
             L 570 1100
             C 510 970, 455 800, 425 600
             C 390 380, 360 180, 340 0 Z"
          fill={`url(#fabric-${side})`}
        />

        {/* Pregas verticais — luzes */}
        <g opacity="0.85">
          <rect x="195" y="0" width="3" height="1100" fill={`url(#pleat-${side})`} />
          <rect x="245" y="0" width="2.5" height="1100" fill={`url(#pleat-${side})`} />
          <rect x="290" y="0" width="2" height="1100" fill={`url(#pleat-${side})`} />
          <rect x="320" y="0" width="2" height="1100" fill={`url(#pleat-${side})`} />
          <rect x="360" y="0" width="2.5" height="1100" fill={`url(#pleat-${side})`} />
          <rect x="405" y="0" width="3" height="1100" fill={`url(#pleat-${side})`} />
        </g>
        {/* Pregas — sombras */}
        <g opacity="0.4">
          <rect x="220" y="0" width="6" height="1100" fill={`url(#pleat-shadow-${side})`} />
          <rect x="270" y="0" width="5" height="1100" fill={`url(#pleat-shadow-${side})`} />
          <rect x="335" y="0" width="6" height="1100" fill={`url(#pleat-shadow-${side})`} />
          <rect x="380" y="0" width="5" height="1100" fill={`url(#pleat-shadow-${side})`} />
        </g>

        {/* Reflexos suaves nas laterais */}
        <path
          d="M 30 1100 C 90 970, 145 800, 175 600 L 200 620 C 165 810, 110 975, 70 1100 Z"
          fill={`url(#lace-${side})`}
          opacity="0.7"
        />
        <path
          d="M 570 1100 C 510 970, 455 800, 425 600 L 400 620 C 435 810, 490 975, 530 1100 Z"
          fill={`url(#lace-${side})`}
          opacity="0.7"
        />

        {/* Festões de renda na barra */}
        <g fill="rgba(255,253,247,0.7)">
          {Array.from({ length: 16 }).map((_, i) => {
            const cx = 40 + i * 33;
            return <circle key={i} cx={cx} cy={1088} r={9} />;
          })}
        </g>
        {/* Pontos de bordado */}
        <g fill="rgba(255,253,247,0.5)">
          {Array.from({ length: 24 }).map((_, i) => {
            const cx = 30 + i * 23;
            return <circle key={i} cx={cx} cy={1060} r={1.6} />;
          })}
        </g>

        {/* Coroa de luz na origem */}
        <ellipse cx="300" cy="0" rx="140" ry="70" fill={`url(#crown-${side})`} />
      </g>
    </svg>
  );
}

export function VeilOverlay() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const p = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 24,
    mass: 0.7,
  });

  // Posição horizontal — passeia entre lados ao longo da proposta
  // centro → direita → esquerda → centro → esquerda → direita
  const x = useTransform(
    p,
    [0, 0.18, 0.36, 0.54, 0.72, 0.88, 1],
    ["0vw", "18vw", "-20vw", "6vw", "-16vw", "14vw", "-4vw"],
  );

  // Inclinação leve acompanhando o movimento (como tecido balançando)
  const rotate = useTransform(
    p,
    [0, 0.18, 0.36, 0.54, 0.72, 0.88, 1],
    [0, 3, -3.5, 1, -2.5, 2.5, -1],
  );

  // Profundidade: tamanho constante, mas se aproxima da tela
  const scale = useTransform(p, [0, 1], [1, 1.18]);

  // Opacidade: aparece logo após o hero e mantém presença forte
  const opacityBack = useTransform(
    p,
    [0, 0.06, 0.15, 0.9, 1],
    [0, 0.55, 0.85, 0.9, 0.95],
  );
  const opacityFront = useTransform(
    p,
    [0, 0.08, 0.2, 0.9, 1],
    [0, 0.15, 0.32, 0.4, 0.45],
  );

  // Ondulação contínua suave (independe do scroll) — tecido vivo
  const wave = useTransform(p, [0, 1], [0, 360]);

  if (prefersReduced) return null;

  return (
    <>
      {/* CAMADA TRASEIRA — atrás do conteúdo, mais opaca, define o tecido */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        <motion.div
          style={{
            x,
            rotate,
            scale,
            opacity: opacityBack,
            transformOrigin: "50% 0%",
          }}
          className="absolute left-1/2 top-[-4vh] h-[110vh] w-[55vw] -translate-x-1/2"
        >
          <motion.div
            animate={{ skewX: [0, 1.2, -1, 0.6, 0], scaleX: [1, 1.01, 0.99, 1.005, 1] }}
            transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
            style={{ rotate: wave.get() ? 0 : 0 }}
            className="h-full w-full"
          >
            <VeilFabric side="back" />
          </motion.div>
        </motion.div>

        {/* Halo de luz ambiente no topo — origem do véu */}
        <motion.div
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-x-0 top-0 h-[60vh]"
          style={{
            background:
              "radial-gradient(45% 50% at 50% 8%, rgba(255,248,235,0.35) 0%, rgba(255,248,235,0) 70%)",
          }}
        />
      </div>

      {/* CAMADA FRONTAL — passa por cima do texto, mais sutil.
          Junto com a traseira, faz as letras parecerem entrelaçadas pelo tecido. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[40] overflow-hidden mix-blend-screen"
      >
        <motion.div
          style={{
            x,
            rotate,
            scale,
            opacity: opacityFront,
            transformOrigin: "50% 0%",
          }}
          className="absolute left-1/2 top-[-4vh] h-[110vh] w-[55vw] -translate-x-1/2"
        >
          <motion.div
            animate={{ skewX: [0, -1.4, 0.8, -0.5, 0], scaleX: [1, 0.99, 1.01, 0.995, 1] }}
            transition={{ duration: 13, ease: "easeInOut", repeat: Infinity }}
            className="h-full w-full"
          >
            <VeilFabric side="front" />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
