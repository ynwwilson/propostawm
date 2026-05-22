import { useRef, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";

export type AnimatedImageVariant =
  | "veilReveal"
  | "softSlideLeft"
  | "softSlideRight"
  | "editorialZoom"
  | "floatParallax";

const EASE = [0.22, 1, 0.36, 1] as const;

const variantMap: Record<AnimatedImageVariant, Variants> = {
  // 1. Véu: clip-path desce + blur some + scale 1.06 → 1
  veilReveal: {
    hidden: {
      opacity: 0,
      scale: 1.06,
      y: 18,
      filter: "blur(14px)",
      clipPath: "inset(8% 6% 18% 6%)",
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1.4, ease: EASE },
    },
    exit: {
      opacity: 0,
      scale: 1.03,
      y: -12,
      filter: "blur(8px)",
      clipPath: "inset(4% 4% 4% 4%)",
      transition: { duration: 0.9, ease: EASE },
    },
  },
  // 2. Slide leve da esquerda
  softSlideLeft: {
    hidden: { opacity: 0, x: -40, scale: 1.04, filter: "blur(10px)" },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: EASE },
    },
    exit: {
      opacity: 0,
      x: -20,
      scale: 1.02,
      filter: "blur(6px)",
      transition: { duration: 0.8, ease: EASE },
    },
  },
  // 3. Slide leve da direita
  softSlideRight: {
    hidden: { opacity: 0, x: 40, scale: 1.04, filter: "blur(10px)" },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: EASE },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 1.02,
      filter: "blur(6px)",
      transition: { duration: 0.8, ease: EASE },
    },
  },
  // 4. Zoom editorial — começa maior, desacelera
  editorialZoom: {
    hidden: { opacity: 0, scale: 1.12, filter: "blur(12px)" },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: EASE },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(6px)",
      transition: { duration: 0.9, ease: EASE },
    },
  },
  // 5. Float — entrada suave + parallax contínuo no scroll
  floatParallax: {
    hidden: { opacity: 0, y: 24, scale: 1.05, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 1.2, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: -16,
      scale: 1.02,
      filter: "blur(4px)",
      transition: { duration: 0.8, ease: EASE },
    },
  },
};

type CommonProps = {
  src: string;
  alt: string;
  className?: string;
  /** Classe aplicada na <img> interna (object-fit, etc). */
  imageClassName?: string;
  variant?: AnimatedImageVariant;
  delay?: number;
  /** Re-anima sempre que entra no viewport (default true). */
  rerun?: boolean;
  /** Hover premium (default true). */
  hover?: boolean;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  style?: CSSProperties;
};

export function AnimatedImage({
  src,
  alt,
  className = "",
  imageClassName = "h-full w-full object-cover",
  variant = "veilReveal",
  delay = 0,
  rerun = true,
  hover = true,
  loading = "lazy",
  width,
  height,
  style,
}: CommonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const isParallax = variant === "floatParallax";

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    isParallax && !prefersReduced ? ["-4%", "4%"] : ["0%", "0%"],
  );

  const variants = variantMap[variant];

  if (prefersReduced) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
        <img
          src={src}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          className={imageClassName}
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ amount: 0.2, once: !rerun, margin: "-5% 0px -5% 0px" }}
      variants={{
        hidden: variants.hidden,
        show: {
          ...(variants.show as object),
          transition: {
            ...((variants.show as { transition?: object }).transition ?? {}),
            delay,
          },
        },
        exit: variants.exit,
      }}
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.012,
              boxShadow: "0 30px 60px -30px rgba(40, 24, 16, 0.35)",
              transition: { duration: 0.9, ease: EASE },
            }
          : undefined
      }
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        width={width}
        height={height}
        className={imageClassName}
        style={{ y: parallaxY, willChange: "transform" }}
      />
    </motion.div>
  );
}
