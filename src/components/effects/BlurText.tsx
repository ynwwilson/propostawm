import { motion, type Transition } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type Direction = "top" | "bottom";

interface BlurTextProps {
  text: string;
  delay?: number; // ms between elements
  className?: string;
  animateBy?: "words" | "letters";
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  stepDuration?: number;
  onAnimationComplete?: () => void;
  startDelay?: number; // seconds before first element
}

const buildKeyframes = (from: Record<string, string | number>, steps: Record<string, string | number>[]) => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const out: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    out[k] = [from[k], ...steps.map((s) => s[k])] as Array<string | number>;
  });
  return out;
};

export function BlurText({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  stepDuration = 0.55,
  onAnimationComplete,
  startDelay = 0,
}: BlurTextProps) {
  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : text.split("")),
    [text, animateBy],
  );
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(14px)", opacity: 0, y: -28 }
      : { filter: "blur(14px)", opacity: 0, y: 28 };

  const defaultTo = [
    {
      filter: "blur(6px)",
      opacity: 0.6,
      y: direction === "top" ? 6 : -6,
    },
    { filter: "blur(0px)", opacity: 1, y: 0 },
  ];

  return (
    <p ref={ref} className={className} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const keyframes = buildKeyframes(defaultFrom, defaultTo);
        const spanTransition: Transition = {
          duration: stepDuration,
          times: [0, 0.55, 1],
          delay: startDelay + (index * delay) / 1000,
          ease: [0.22, 1, 0.36, 1],
        };

        return (
          <motion.span
            key={index}
            initial={defaultFrom}
            animate={inView ? keyframes : defaultFrom}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}

export default BlurText;
