import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue } from "motion/react";
import "./Carousel.css";

export type CarouselSlide = {
  id: string | number;
  content: ReactNode;
};

type CarouselProps = {
  items: CarouselSlide[];
  baseWidth?: number;
  itemHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  className?: string;
};

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 } as const;

export default function Carousel({
  items,
  baseWidth = 320,
  itemHeight,
  autoplay = false,
  autoplayDelay = 4500,
  pauseOnHover = false,
  loop = false,
  className = "",
}: CarouselProps) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const c = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    c.addEventListener("mouseenter", enter);
    c.addEventListener("mouseleave", leave);
    return () => {
      c.removeEventListener("mouseenter", enter);
      c.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const t = setInterval(() => {
      setPosition((p) => Math.min(p + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(t);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const start = loop ? 1 : 0;
    setPosition(start);
    x.set(-start * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => setIsAnimating(true);
  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastClone = itemsForRender.length - 1;
    if (position === lastClone) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (direction === 0) return;
    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`wm-carousel-container ${className}`}
      style={{ width: `${baseWidth}px` }}
    >
      <motion.div
        className="wm-carousel-track"
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{ width: itemWidth, gap: `${GAP}px`, x }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <motion.div
            key={`${item?.id ?? index}-${index}`}
            className="wm-carousel-item"
            style={{ width: itemWidth, height: itemHeight ?? "auto" }}
            transition={effectiveTransition}
          >
            {item.content}
          </motion.div>
        ))}
      </motion.div>

      <div className="wm-carousel-indicators-container">
        <div className="wm-carousel-indicators">
          {items.map((_, index) => (
            <motion.button
              key={index}
              type="button"
              aria-label={`Ir para slide ${index + 1}`}
              className={`wm-carousel-indicator ${activeIndex === index ? "active" : "inactive"}`}
              animate={{ scale: activeIndex === index ? 1.25 : 1 }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
