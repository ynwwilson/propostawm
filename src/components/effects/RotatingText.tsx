import {
  AnimatePresence,
  motion,
  type Transition,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

interface RotatingTextProps {
  texts: string[];
  transition?: Transition;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  startDelay?: number; // ms before rotation begins
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const splitIntoCharacters = (text: string): string[] => {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    // @ts-expect-error Segmenter typing
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), (s: { segment: string }) => s.segment);
  }
  return Array.from(text);
};

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 28, stiffness: 320 },
      initial = { y: "100%", opacity: 0, filter: "blur(6px)" },
      animate = { y: 0, opacity: 1, filter: "blur(0px)" },
      exit = { y: "-100%", opacity: 0, filter: "blur(6px)" },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2400,
      staggerDuration = 0.035,
      staggerFrom = "last",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      startDelay = 0,
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [started, setStarted] = useState(startDelay === 0);

    const elements = useMemo(() => {
      const text = texts[currentIndex];
      if (splitBy === "characters") {
        const words = text.split(" ");
        return words.map((w, i) => ({
          characters: splitIntoCharacters(w),
          needsSpace: i !== words.length - 1,
        }));
      }
      if (splitBy === "words") {
        return text.split(" ").map((w, i, arr) => ({
          characters: [w],
          needsSpace: i !== arr.length - 1,
        }));
      }
      if (splitBy === "lines") {
        return text.split("\n").map((l, i, arr) => ({
          characters: [l],
          needsSpace: i !== arr.length - 1,
        }));
      }
      return text.split(splitBy).map((p, i, arr) => ({
        characters: [p],
        needsSpace: i !== arr.length - 1,
      }));
    }, [texts, currentIndex, splitBy]);

    const totalChars = useMemo(
      () => elements.reduce((sum, w) => sum + w.characters.length, 0),
      [elements],
    );

    const getStaggerDelay = useCallback(
      (i: number, total: number) => {
        if (staggerFrom === "first") return i * staggerDuration;
        if (staggerFrom === "last") return (total - 1 - i) * staggerDuration;
        if (staggerFrom === "center") {
          const c = Math.floor(total / 2);
          return Math.abs(c - i) * staggerDuration;
        }
        if (staggerFrom === "random") {
          return Math.floor(Math.random() * total) * staggerDuration;
        }
        return Math.abs((staggerFrom as number) - i) * staggerDuration;
      },
      [staggerFrom, staggerDuration],
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext],
    );

    const next = useCallback(() => {
      const nextIdx =
        currentIndex === texts.length - 1
          ? loop
            ? 0
            : currentIndex
          : currentIndex + 1;
      if (nextIdx !== currentIndex) handleIndexChange(nextIdx);
    }, [currentIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prev =
        currentIndex === 0 ? (loop ? texts.length - 1 : currentIndex) : currentIndex - 1;
      if (prev !== currentIndex) handleIndexChange(prev);
    }, [currentIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (i: number) => {
        const v = Math.max(0, Math.min(i, texts.length - 1));
        if (v !== currentIndex) handleIndexChange(v);
      },
      [texts.length, currentIndex, handleIndexChange],
    );

    const reset = useCallback(() => {
      if (currentIndex !== 0) handleIndexChange(0);
    }, [currentIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (startDelay === 0) return;
      const t = setTimeout(() => setStarted(true), startDelay);
      return () => clearTimeout(t);
    }, [startDelay]);

    useEffect(() => {
      if (!auto || !started) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto, started]);

    return (
      <motion.span
        className={mainClassName}
        layout
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "baseline" }}
      >
        <span className="sr-only">{texts[currentIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.span
            key={currentIndex}
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              whiteSpace: "nowrap",
            }}
            aria-hidden="true"
          >
            {(() => {
              let chIdx = 0;
              return elements.map((wordObj, wi) => (
                <span
                  key={wi}
                  className={splitLevelClassName}
                  style={{ display: "inline-flex" }}
                >
                  {wordObj.characters.map((c) => {
                    const localIdx = chIdx;
                    chIdx += 1;
                    return (
                      <motion.span
                        key={localIdx}
                        initial={initial}
                        animate={animate}
                        exit={exit}
                        transition={{
                          ...transition,
                          delay: getStaggerDelay(localIdx, totalChars),
                        }}
                        className={elementLevelClassName}
                        style={{ display: "inline-block" }}
                      >
                        {c}
                      </motion.span>
                    );
                  })}
                  {wordObj.needsSpace && <span style={{ whiteSpace: "pre" }}> </span>}
                </span>
              ));
            })()}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    );
  },
);

RotatingText.displayName = "RotatingText";

export default RotatingText;
