import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

export type AnimatedImageVariant =
  | "veilReveal"
  | "softSlideLeft"
  | "softSlideRight"
  | "editorialZoom"
  | "floatParallax"
  | "softFadeLift";

const EASE = [0.22, 1, 0.36, 1] as const;

type VariantConfig = {
  // Progresso: 0 = topo da imagem entrando pelo bottom · 0.5 = centralizada · 1 = saindo pelo top
  opacity: [number[], number[]];
  y: [number[], string[]]; // valores em %
  scale: [number[], number[]];
  blur: [number[], number[]]; // px
  clip: [number[], string[]] | null;
  parallax?: boolean;
};

// Janelas: entrada 0→0.28 · permanência 0.28→0.72 · saída 0.72→1
const inOut = (a: number, b: number, c: number): [number[], number[]] => [
  [0, 0.28, 0.72, 1],
  [a, b, b, c],
];

const variants: Record<AnimatedImageVariant, VariantConfig> = {
  veilReveal: {
    opacity: [[0, 0.28, 0.72, 1], [0, 1, 1, 0]],
    y: [[0, 0.28, 0.72, 1], ["40px", "0px", "0px", "-30px"]],
    scale: [[0, 0.28, 0.72, 1], [1.06, 1, 1, 0.985]],
    blur: [[0, 0.28, 0.72, 1], [12, 0, 0, 8]],
    clip: [
      [0, 0.28, 0.72, 1],
      [
        "inset(8% 6% 18% 6%)",
        "inset(0% 0% 0% 0%)",
        "inset(0% 0% 0% 0%)",
        "inset(6% 4% 10% 4%)",
      ],
    ],
  },
  editorialZoom: {
    opacity: [[0, 0.28, 0.72, 1], [0, 1, 1, 0.05]],
    y: [[0, 0.28, 0.72, 1], ["20px", "0px", "0px", "-20px"]],
    scale: [[0, 0.28, 0.72, 1], [1.12, 1, 1, 1.05]],
    blur: [[0, 0.28, 0.72, 1], [12, 0, 0, 8]],
    clip: null,
  },
  softSlideLeft: {
    opacity: [[0, 0.28, 0.72, 1], [0, 1, 1, 0]],
    y: [[0, 1], ["0px", "0px"]],
    scale: [[0, 0.28, 0.72, 1], [1.04, 1, 1, 1.02]],
    blur: [[0, 0.28, 0.72, 1], [10, 0, 0, 8]],
    clip: null,
  },
  softSlideRight: {
    opacity: [[0, 0.28, 0.72, 1], [0, 1, 1, 0]],
    y: [[0, 1], ["0px", "0px"]],
    scale: [[0, 0.28, 0.72, 1], [1.04, 1, 1, 1.02]],
    blur: [[0, 0.28, 0.72, 1], [10, 0, 0, 8]],
    clip: null,
  },
  floatParallax: {
    opacity: [[0, 0.28, 0.72, 1], [0, 1, 1, 0.15]],
    y: [[0, 0.28, 0.72, 1], ["24px", "0px", "0px", "-24px"]],
    scale: [[0, 0.28, 0.72, 1], [1.05, 1, 1, 1.02]],
    blur: [[0, 0.28, 0.72, 1], [8, 0, 0, 6]],
    clip: null,
    parallax: true,
  },
  softFadeLift: {
    opacity: inOut(0, 1, 0),
    y: [[0, 0.28, 0.72, 1], ["28px", "0px", "0px", "-40px"]],
    scale: [[0, 0.28, 0.72, 1], [1.03, 1, 1, 0.98]],
    blur: [[0, 0.28, 0.72, 1], [10, 0, 0, 8]],
    clip: null,
  },
};

// Deslocamento horizontal — usado em softSlide* (e reduzido no mobile)
function useSlide(progress: MotionValue<number>, dir: -1 | 1, mobile: boolean) {
  const amount = mobile ? 22 : 48;
  return useTransform(
    progress,
    [0, 0.28, 0.72, 1],
    [`${dir * amount}px`, "0px", "0px", `${dir * (amount * 0.45)}px`],
  );
}

type Props = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  variant?: AnimatedImageVariant;
  delay?: number; // segundos — pequeno atraso no easing de entrada
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
  hover = true,
  loading = "lazy",
  width,
  height,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const cfg = variants[variant];

  // Offset cobre da entrada à saída completa
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Suaviza para evitar piscadas
  const ease = useTransform(scrollYProgress, (v) => {
    // delay sutil: empurra o ponto de “show” para frente
    const d = Math.min(0.12, Math.max(0, delay * 0.18));
    return Math.min(1, Math.max(0, v - d));
  });

  const opacity = useTransform(ease, cfg.opacity[0], cfg.opacity[1] as number[], {
    ease: (t) => t, // a curva já está nos keypoints
  });
  const yRaw = useTransform(ease, cfg.y[0], cfg.y[1] as string[]);
  const scale = useTransform(ease, cfg.scale[0], cfg.scale[1] as number[]);
  const blurPx = useTransform(ease, cfg.blur[0], cfg.blur[1] as number[]);
  const filter = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);
  const clipPath = useTransform(
    ease,
    cfg.clip ? cfg.clip[0] : [0, 1],
    cfg.clip ? (cfg.clip[1] as string[]) : ["inset(0%)", "inset(0%)"],
  );

  // Slide horizontal (suave, com redução no mobile)
  const xLeft = useSlide(ease, -1, isMobile);
  const xRight = useSlide(ease, 1, isMobile);
  const x =
    variant === "softSlideLeft" ? xLeft : variant === "softSlideRight" ? xRight : undefined;

  // Parallax interno na imagem
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    cfg.parallax && !prefersReduced ? (isMobile ? ["-2%", "2%"] : ["-5%", "5%"]) : ["0%", "0%"],
  );

  // Reduce motion → estático
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

  // No mobile reduzimos os deslocamentos verticais
  const yMobileScale = isMobile ? 0.55 : 1;
  const y = useTransform(yRaw, (raw) => {
    const n = parseFloat(raw);
    if (Number.isNaN(n)) return raw;
    return `${(n * yMobileScale).toFixed(2)}px`;
  });

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        opacity,
        y,
        x,
        scale,
        filter,
        clipPath,
        WebkitClipPath: clipPath,
        willChange: "transform, opacity, filter, clip-path",
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
