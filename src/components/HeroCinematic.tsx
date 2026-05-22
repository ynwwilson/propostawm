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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/30 to-espresso/95" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-espresso/75 via-espresso/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_55%,transparent_15%,rgba(20,12,8,0.85)_95%)]" />
      {/* Champagne wash */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light bg-[radial-gradient(ellipse_at_75%_25%,rgba(216,199,168,0.45),transparent_55%)]" />
      {/* Top + bottom vignette bands */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-espresso to-transparent" />
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        }}
      />




      {/* Content */}
      <div className="hero-content relative z-10 h-full px-8 lg:px-24 xl:px-32 flex items-center">
        <div className="w-full max-w-[1100px]">
          {/* Eyebrow */}
          <div className="hero-eyebrow flex items-center gap-5 text-warm-white/80">
            <span className="hero-rule h-px w-20 bg-[#d8c7a8] block" />
            <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase font-light">
              Espaço WM · Proposta Visual
            </p>
          </div>

          {/* Logo */}
          <div className="hero-title-wrap mt-10 lg:mt-14">
            <img
              src={wmLogo}
              alt="WM Noivas"
              className="w-[clamp(16rem,38vw,32rem)] h-auto object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
            />
          </div>


          {/* Decorative line */}
          <div className="mt-10 lg:mt-12 flex items-center gap-5">
            <span className="hero-rule block h-px w-24 lg:w-40 bg-gradient-to-r from-[#d8c7a8] via-[#d8c7a8]/60 to-transparent" />
            <span className="hero-eyebrow text-xs tracking-luxe text-[#d8c7a8]/80">
              ✦
            </span>
            <span className="hero-eyebrow text-[10px] tracking-luxe uppercase text-warm-white/45 hidden md:inline">
              Uma abertura editorial
            </span>
          </div>

          {/* Subtitle */}
          <p className="hero-sub mt-8 lg:mt-10 max-w-[560px] text-lg lg:text-xl leading-[1.7] text-warm-white/85 font-light">
            Uma nova experiência digital para apresentar a marca com mais{" "}
            <span className="font-display-italic text-[#e8d5b5]">refinamento</span>
            {" "}— e dar mais autonomia na gestão do acervo.
          </p>

          {/* Chips */}
          <ul className="mt-12 lg:mt-16 flex flex-wrap gap-x-8 gap-y-3 items-center">
            {chips.map((c, i) => (
              <li key={c} className="hero-chip flex items-center gap-8">
                <span className="flex items-baseline gap-3 text-warm-white/85">
                  <span className="font-display-italic text-[#d8c7a8] text-sm">
                    0{i + 1}
                  </span>
                  <span className="text-[11px] tracking-[0.28em] uppercase font-light">
                    {c}
                  </span>
                </span>
                {i < chips.length - 1 && (
                  <span className="hidden md:block h-px w-8 bg-warm-white/20" />
                )}
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
