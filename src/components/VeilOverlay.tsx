import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";
import tulleTexture from "@/assets/veil-tulle.png";

/**
 * Véu de noiva — um único tecido de tule real que percorre toda a proposta.
 *
 * - Usa a textura fotográfica de tule (src/assets/veil-tulle.png).
 * - O formato/silhueta é constante do início ao fim (mesmo pedaço de tecido).
 * - O movimento é orgânico: deriva horizontal + vertical, rotação,
 *   leve perspectiva e ondulação por feTurbulence/feDisplacementMap.
 * - Em cada trecho da proposta o tecido ganha um TRATAMENTO de textura
 *   diferente (saturação, brilho, contraste, hue) — como se a mesma peça
 *   passasse por luzes diferentes do ambiente.
 * - Duas camadas: uma atrás do conteúdo, outra à frente (mix-blend-screen),
 *   para o texto ficar entrelaçado pelo tule.
 */

function Ripple() {
  // Filtro SVG global — ondulação contínua de tecido
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      style={{ position: "absolute", pointerEvents: "none" }}
    >
      <defs>
        <filter id="veil-ripple" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.018"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.008 0.018; 0.011 0.022; 0.008 0.018"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" />
        </filter>
        {/* Máscara orgânica — silhueta do véu (constante, não muda) */}
        <radialGradient id="veil-mask" cx="50%" cy="0%" r="85%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="55%" stopColor="white" stopOpacity="0.92" />
          <stop offset="85%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="veil-silhouette">
          <rect width="100%" height="100%" fill="url(#veil-mask)" />
        </mask>
      </defs>
    </svg>
  );
}

function Fabric({ blur, opacity }: { blur: string; opacity: number }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${tulleTexture})`,
        backgroundSize: "100% 55%",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center top",
        filter: `${blur} saturate(0.85) brightness(1.08)`,
        opacity,
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 95% at 50% 5%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.35) 85%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 70% 95% at 50% 5%, #000 35%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.35) 85%, transparent 100%)",
      }}
    />
  );
}

export function VeilOverlay() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const p = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    mass: 0.8,
  });

  // Trajetória horizontal — passeio orgânico (não apenas vai-e-vem reto)
  const x = useTransform(
    p,
    [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    ["0vw", "14vw", "-18vw", "22vw", "-12vw", "18vw", "-20vw", "6vw"],
  );

  // Deriva vertical sutil — tecido sobe/desce como se fluísse
  const y = useTransform(
    p,
    [0, 0.2, 0.45, 0.7, 1],
    ["0vh", "-2vh", "1.5vh", "-1vh", "2vh"],
  );

  // Rotação acompanhando a deriva (como pano levado pelo vento)
  const rotate = useTransform(
    p,
    [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
    [0, 4, -5, 6, -3, 5, -6, 2],
  );

  // Perspectiva — leve skew, sugere tecido virando de lado
  const skewX = useTransform(
    p,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -4, 3, -2, 1],
  );
  const skewY = useTransform(
    p,
    [0, 0.3, 0.6, 1],
    [0, 1.5, -1.2, 0.5],
  );

  // Profundidade — sempre o mesmo tecido, só se aproxima/afasta de leve
  const scale = useTransform(p, [0, 0.5, 1], [1, 1.08, 1.15]);

  // Diferentes "texturas/luzes" ao longo da proposta — mesmo tule, ambientes distintos
  const hue = useTransform(
    p,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, -8, 6, -4, 10, -2],
  );
  const sat = useTransform(
    p,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.85, 1, 0.7, 1.1, 0.8, 0.95],
  );
  const bright = useTransform(
    p,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1.05, 1.15, 0.95, 1.12, 1, 1.08],
  );
  const contrast = useTransform(
    p,
    [0, 0.3, 0.6, 1],
    [1, 1.1, 0.92, 1.05],
  );

  const filterBack = useTransform(
    [hue, sat, bright, contrast] as never,
    ([h, s, b, c]: number[]) =>
      `url(#veil-ripple) hue-rotate(${h}deg) saturate(${s}) brightness(${b}) contrast(${c})`,
  );
  const filterFront = useTransform(
    [hue, sat, bright, contrast] as never,
    ([h, s, b, c]: number[]) =>
      `url(#veil-ripple) hue-rotate(${h}deg) saturate(${s * 0.9}) brightness(${b * 1.05}) contrast(${c}) blur(1px)`,
  );

  // Opacidades
  const opacityBack = useTransform(p, [0, 0.04, 0.12, 0.9, 1], [0, 0.5, 0.82, 0.88, 0.92]);
  const opacityFront = useTransform(p, [0, 0.05, 0.15, 0.9, 1], [0, 0.18, 0.35, 0.42, 0.48]);

  if (prefersReduced) return null;

  // Mesma silhueta/dimensão para as duas camadas — o tecido NÃO muda de forma
  const sheetClass =
    "absolute left-1/2 top-[-6vh] h-[120vh] w-[60vw] -translate-x-1/2";

  return (
    <>
      <Ripple />

      {/* CAMADA TRASEIRA — atrás do conteúdo */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      >
        <motion.div
          style={{
            x,
            y,
            rotate,
            skewX,
            skewY,
            scale,
            opacity: opacityBack,
            filter: filterBack,
            transformOrigin: "50% 0%",
            willChange: "transform, filter, opacity",
          }}
          className={sheetClass}
        >
          {/* respiração lenta do tecido (independe do scroll) */}
          <motion.div
            animate={{
              scaleX: [1, 1.015, 0.992, 1.008, 1],
              scaleY: [1, 0.995, 1.01, 0.998, 1],
            }}
            transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0"
          >
            <Fabric blur="blur(1px)" opacity={0.95} />
          </motion.div>
        </motion.div>

        {/* halo de luz na origem (cabeça da noiva) */}
        <motion.div
          initial={{ opacity: 0.08 }}
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-x-0 top-0 h-[55vh]"
          style={{
            background:
              "radial-gradient(40% 45% at 50% 6%, rgba(255,248,235,0.4) 0%, rgba(255,248,235,0) 70%)",
          }}
        />
      </div>

      {/* CAMADA FRONTAL — passa por cima do texto */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[40] overflow-hidden mix-blend-screen"
      >
        <motion.div
          style={{
            x,
            y,
            rotate,
            skewX,
            skewY,
            scale,
            opacity: opacityFront,
            filter: filterFront,
            transformOrigin: "50% 0%",
            willChange: "transform, filter, opacity",
          }}
          className={sheetClass}
        >
          <motion.div
            animate={{
              scaleX: [1, 0.99, 1.012, 0.996, 1],
              scaleY: [1, 1.008, 0.994, 1.004, 1],
            }}
            transition={{ duration: 19, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-0"
          >
            <Fabric blur="blur(2px)" opacity={0.7} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
