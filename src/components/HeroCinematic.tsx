import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShinyText from "./effects/ShinyText";

gsap.registerPlugin(ScrollTrigger);

const chips = ["Novo site premium", "Catálogo gerenciável", "Portal WM"];

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const video = videoRef.current;
      if (video) gsap.set(video, { scale: 1.08, filter: "brightness(0.78)" });

      if (reduce) {
        if (video) gsap.set(video, { scale: 1, filter: "none" });
        gsap.set(
          [
            ".hero-eyebrow",
            ".hero-rule",
            ".hero-title-wrap",
            ".hero-sub",
            ".hero-chip",
            ".hero-meta",
            ".hero-scroll",
          ],
          { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }
        );
        return;
      }

      // Video reveal
      gsap.to(video, {
        scale: 1.02,
        filter: "brightness(1)",
        duration: 4,
        ease: "power2.out",
      });

      // Parallax + scrub
      if (video) {
        gsap.to(video, {
          yPercent: 18,
          scale: 1.14,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Choreographed entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.9, delay: 0.2 })
        .from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 0.9 }, "-=0.4")
        .from(
          ".hero-title-wrap",
          {
            opacity: 0,
            y: 60,
            clipPath: "inset(100% 0 0 0)",
            duration: 1.4,
            ease: "expo.out",
          },
          "-=0.3"
        )
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.7")
        .from(
          ".hero-chip",
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.12 },
          "-=0.5"
        )
        .from(".hero-meta", { opacity: 0, y: 14, duration: 0.7 }, "-=0.3")
        .from(".hero-scroll", { opacity: 0, y: 10, duration: 0.8 }, "-=0.3");

      // Parallax exit on scroll
      gsap.to(".hero-content", {
        yPercent: -40,
        opacity: 0,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-scroll", {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-espresso"
    >
      {/* Background video */}
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

      {/* Layered overlays for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/35 to-espresso/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso/55 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,transparent_20%,rgba(20,12,8,0.7)_100%)]" />
      {/* Champagne wash */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-[radial-gradient(ellipse_at_70%_30%,rgba(216,199,168,0.35),transparent_60%)]" />
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />

      {/* Corner editorial marks */}
      <div className="pointer-events-none absolute top-6 right-6 lg:top-10 lg:right-12 text-[10px] tracking-luxe uppercase text-warm-white/60 hidden sm:flex items-center gap-3">
        <span className="h-px w-8 bg-warm-white/40 block" />
        MMXXV · ForYouCode
      </div>
      <div className="pointer-events-none absolute top-6 left-6 lg:top-10 lg:left-12 text-[10px] tracking-luxe uppercase text-warm-white/60 hidden sm:block">
        N°01 — Proposta
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 h-full px-6 lg:px-16 flex items-center">
        <div className="w-full max-w-5xl lg:ml-[6%] xl:ml-[8%]">
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-4 text-warm-white/75">
            <span className="hero-rule h-px w-14 bg-[#d8c7a8] block" />
            <p className="text-[11px] sm:text-xs tracking-luxe uppercase">
              Espaço WM · Proposta Visual
            </p>
          </div>

          {/* Title */}
          <h1 className="hero-title-wrap mt-6 font-display font-light leading-[0.92] tracking-tight text-[clamp(4rem,13vw,11rem)]">
            <ShinyText
              text="WM Noivas"
              speed={4}
              delay={1.2}
              color="#d8c7a8"
              shineColor="#fff4d6"
              spread={110}
            />
          </h1>

          {/* Decorative line */}
          <div className="mt-8 flex items-center gap-4">
            <span className="hero-rule block h-px w-20 lg:w-28 bg-gradient-to-r from-[#d8c7a8] via-[#d8c7a8]/60 to-transparent" />
            <span className="hero-eyebrow text-[10px] tracking-luxe uppercase text-warm-white/55">
              ✦
            </span>
          </div>

          {/* Subtitle */}
          <p className="hero-sub mt-6 max-w-xl text-base sm:text-lg leading-8 text-warm-white/85 font-light">
            Uma nova experiência digital para apresentar a marca com mais
            refinamento — e dar mais autonomia na gestão do acervo.
          </p>

          {/* Chips */}
          <ul className="mt-10 flex flex-wrap gap-3">
            {chips.map((c) => (
              <li
                key={c}
                className="hero-chip text-[11px] tracking-luxe uppercase text-warm-white/80 border border-warm-white/25 backdrop-blur-sm bg-warm-white/[0.04] px-4 py-2"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom meta line */}
      <div className="hero-meta absolute bottom-10 lg:bottom-12 left-6 lg:left-16 right-6 lg:right-16 z-10 flex items-end justify-between gap-6 text-warm-white/65">
        <p className="text-[10px] sm:text-[11px] tracking-luxe uppercase">
          03 entregas principais
          <span className="mx-3 text-[#d8c7a8]/70">·</span>
          03 possibilidades de investimento
        </p>

        {/* Scroll indicator */}
        <div className="hero-scroll hidden sm:flex flex-col items-center gap-3 text-[10px] tracking-luxe uppercase text-warm-white/55">
          <span>Role para descobrir</span>
          <span className="relative block h-10 w-px overflow-hidden bg-warm-white/15">
            <span className="absolute left-0 top-0 block h-1/2 w-px bg-[#d8c7a8] animate-[heroScroll_2.4s_ease-in-out_infinite]" />
          </span>
        </div>
      </div>
    </section>
  );
}
