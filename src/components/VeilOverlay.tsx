import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Camada decorativa de "véu" — formas orgânicas translúcidas em
 * tons de branco / champagne, com blur suave, deslizando lentamente
 * conforme o scroll. Fica fixa atrás do conteúdo, sem capturar clique.
 */
export function VeilOverlay() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  // Movimentos verticais sutis ao longo do scroll
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.85, 0.5]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      style={{ mixBlendMode: "screen" }}
    >
      {/* Véu 1 — branca, larga, atravessando diagonalmente */}
      <motion.div
        style={{ y: y1, rotate: rot, opacity }}
        className="absolute -top-[20%] -left-[10%] h-[120vh] w-[140vw]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(60% 40% at 50% 50%, rgba(255,250,240,0.55) 0%, rgba(255,250,240,0.18) 40%, rgba(255,250,240,0) 70%)",
            filter: "blur(40px)",
            transform: "rotate(-8deg)",
          }}
        />
      </motion.div>

      {/* Véu 2 — champagne, descendo devagar */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[30%] -right-[15%] h-[90vh] w-[110vw]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 50%, rgba(241,224,200,0.35) 0%, rgba(241,224,200,0.12) 45%, rgba(241,224,200,0) 75%)",
            filter: "blur(60px)",
            transform: "rotate(6deg)",
          }}
        />
      </motion.div>

      {/* Véu 3 — fina camada de luz, mais alto */}
      <motion.div
        style={{ y: y3 }}
        className="absolute top-[60%] left-[5%] h-[70vh] w-[80vw]"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 80%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* Respiração lenta — onda de luz pulsando */}
      <motion.div
        initial={{ opacity: 0.25 }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 50% at 50% 30%, rgba(255,248,235,0.18) 0%, rgba(255,248,235,0) 60%)",
        }}
      />
    </div>
  );
}
