import { motion, useScroll, useTransform, useReducedMotion, useSpring } from "framer-motion";

/**
 * Véu de noiva — camada translúcida em branco/champagne que CRESCE
 * suavemente conforme o usuário rola a página. Fica fixa atrás do
 * conteúdo, sem capturar clique, sem atrapalhar a leitura.
 */
export function VeilOverlay() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  // Suaviza o scroll com spring para movimento elegante e contínuo
  const p = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    mass: 0.6,
  });

  // Cresce de 0 → 1 conforme rola
  const grow = useTransform(p, [0, 1], [0.15, 1]);

  // Véu 1 (principal) — branca, ocupa cada vez mais a tela
  const scale1 = useTransform(grow, [0, 1], [0.6, 1.8]);
  const opacity1 = useTransform(grow, [0, 0.2, 1], [0, 0.35, 0.75]);
  const y1 = useTransform(p, [0, 1], ["10vh", "-15vh"]);

  // Véu 2 — champagne, descendo lentamente
  const scale2 = useTransform(grow, [0, 1], [0.5, 1.6]);
  const opacity2 = useTransform(grow, [0, 0.3, 1], [0, 0.3, 0.6]);
  const y2 = useTransform(p, [0, 1], ["-5vh", "20vh"]);

  // Véu 3 — luz quente difusa
  const scale3 = useTransform(grow, [0, 1], [0.7, 2]);
  const opacity3 = useTransform(grow, [0, 0.5, 1], [0, 0.25, 0.5]);

  // Rotação muito sutil acompanhando o scroll
  const rot1 = useTransform(p, [0, 1], [-4, 6]);
  const rot2 = useTransform(p, [0, 1], [5, -8]);

  if (prefersReduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {/* Véu principal — branco translúcido */}
      <motion.div
        style={{
          scale: scale1,
          opacity: opacity1,
          y: y1,
          rotate: rot1,
        }}
        className="absolute left-1/2 top-1/2 h-[110vh] w-[140vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 50%, rgba(255,252,245,0.85) 0%, rgba(255,250,240,0.4) 45%, rgba(255,250,240,0) 75%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* Véu champagne */}
      <motion.div
        style={{
          scale: scale2,
          opacity: opacity2,
          y: y2,
          rotate: rot2,
        }}
        className="absolute left-1/2 top-1/2 h-[100vh] w-[120vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(55% 50% at 50% 50%, rgba(245,225,195,0.65) 0%, rgba(245,225,195,0.25) 50%, rgba(245,225,195,0) 80%)",
            filter: "blur(70px)",
          }}
        />
      </motion.div>

      {/* Luz quente difusa */}
      <motion.div
        style={{ scale: scale3, opacity: opacity3 }}
        className="absolute left-1/2 top-1/2 h-[120vh] w-[150vw] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, rgba(255,245,225,0.45) 0%, rgba(255,245,225,0) 70%)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Respiração lenta — sutil pulso de luz */}
      <motion.div
        initial={{ opacity: 0.15 }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 40% at 50% 30%, rgba(255,248,235,0.25) 0%, rgba(255,248,235,0) 65%)",
        }}
      />
    </div>
  );
}
