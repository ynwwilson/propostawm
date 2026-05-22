import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurText } from "./effects/BlurText";
import { RotatingText } from "./effects/RotatingText";

gsap.registerPlugin(ScrollTrigger);

// Timings (segundos) sincronizam GSAP (vídeo/linha/eyebrow/scroll) com BlurText/RotatingText (motion).
const T_LINE = 2.4;        // linha champagne começa a expandir
const T_EYEBROW = 3.0;     // eyebrow aparece
const T_TITLE = 4.4;       // BlurText "WM Noiva" inicia
const T_SUBTITLE = 6.8;    // subtítulo aparece
const T_ROTATING_MS = 7600; // RotatingText começa a girar (ms)
const T_CORNER = 7.4;
const T_HINT = 8.0;

const ROTATING_WORDS = ["presença", "delicadeza", "desejo", "elegância"];

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const scope = root.current!;
      const eyebrow = scope.querySelector(".hero-eyebrow")!;
      const topLine = scope.querySelector(".hero-topline")!;
      const underline = scope.querySelector(".hero-underline")!;
      const subtitle = scope.querySelector(".hero-subtitle")!;
      const corner = scope.querySelector(".hero-corner")!;
      const hint = scrollHintRef.current!;
      const video = videoRef.current!;

      gsap.set([eyebrow, subtitle, corner], { opacity: 0, y: 14, filter: "blur(8px)" });
      gsap.set(topLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(underline, { scaleX: 0, transformOrigin: "center" });
      gsap.set(hint, { opacity: 0, y: 8 });
      if (video) gsap.set(video, { scale: 1.08, filter: "brightness(0.85)" });

      if (reduce) {
        gsap.set([eyebrow, subtitle, corner, hint], {
          opacity: 1,
          y: 0,
          filter: "none",
        });
        gsap.set([topLine, underline], { scaleX: 1 });
        if (video) gsap.set(video, { scale: 1, filter: "none" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(
        video,
        { scale: 1.02, filter: "brightness(1)", duration: 3.8, ease: "power2.out" },
        0,
      )
        .to(underline, { scaleX: 1, duration: 1.8, ease: "power4.out" }, T_LINE)
        .to(topLine, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, T_LINE + 0.2)
        .to(
          eyebrow,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
          T_EYEBROW,
        )
        .to(
          subtitle,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4 },
          T_SUBTITLE,
        )
        .to(
          corner,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
          T_CORNER,
        )
        .to(hint, { opacity: 1, y: 0, duration: 1.0 }, T_HINT);

      gsap.to(".hero-hint-line", {
        scaleY: 0.4,
        transformOrigin: "top",
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      });

      const onScroll = () => {
        if (window.scrollY > 40) {
          gsap.to(hint, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
        } else {
          gsap.to(hint, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      if (video) {
        gsap.to(video, {
          yPercent: 12,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => window.removeEventListener("scroll", onScroll);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-espresso"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/wm-hero.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/30 to-espresso/75" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,12,8,0.55)_100%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="hero-topline mx-6 mt-28 h-px bg-gradient-to-r from-accent/0 via-accent/80 to-accent/0 md:mx-20" />

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-4xl text-center text-warm-white">
            <p className="hero-eyebrow flex items-center justify-center gap-3 text-[11px] uppercase tracking-luxe text-warm-white/85">
              <span className="h-px w-8 bg-accent" />
              Proposta · ForYouCode
              <span className="h-px w-8 bg-accent" />
            </p>

            <h1 className="mt-10 font-display text-[clamp(4rem,12vw,10rem)] font-light leading-[0.95] tracking-tight text-warm-white">
              <BlurText
                text="WM Noiva"
                animateBy="words"
                direction="top"
                delay={210}
                stepDuration={0.55}
                startDelay={T_TITLE}
                className="justify-center gap-x-6"
              />
            </h1>

            <div className="hero-underline mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" />

            <p className="hero-subtitle mx-auto mt-8 flex max-w-2xl flex-wrap items-baseline justify-center gap-x-2 font-display text-xl leading-snug text-warm-white/90 md:text-2xl lg:text-3xl">
              <span>Uma nova experiência digital para uma marca feita de</span>
              <RotatingText
                texts={ROTATING_WORDS}
                splitBy="characters"
                staggerFrom="last"
                staggerDuration={0.035}
                rotationInterval={2400}
                startDelay={T_ROTATING_MS}
                transition={{ type: "spring", damping: 30, stiffness: 280 }}
                initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
                mainClassName="font-display-italic text-accent"
              />
            </p>
          </div>
        </div>

        <div className="hero-corner pointer-events-none absolute bottom-8 right-8 text-right text-warm-white/90">
          <p className="text-[10px] uppercase tracking-luxe">Espaço WM</p>
          <p className="font-display-italic text-lg">est. matrimonial</p>
        </div>

        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-warm-white/80"
        >
          <span className="text-[10px] uppercase tracking-luxe">role para ver</span>
          <span className="hero-hint-line block h-10 w-px bg-gradient-to-b from-accent/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
