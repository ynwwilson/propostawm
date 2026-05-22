import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE_WORDS = ["WM", "Noiva"];

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const scope = root.current!;
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      const eyebrow = scope.querySelector(".hero-eyebrow")!;
      const topLine = scope.querySelector(".hero-topline")!;
      const underline = scope.querySelector(".hero-underline")!;
      const subtitle = scope.querySelector(".hero-subtitle")!;
      const corner = scope.querySelector(".hero-corner")!;
      const hint = scrollHintRef.current!;
      const video = videoRef.current!;

      // estado inicial
      gsap.set(words, {
        yPercent: 110,
        opacity: 0,
        filter: "blur(14px)",
        letterSpacing: "0.18em",
      });
      gsap.set([eyebrow, subtitle, corner], { opacity: 0, y: 14, filter: "blur(8px)" });
      gsap.set(topLine, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(underline, { scaleX: 0, transformOrigin: "center" });
      gsap.set(hint, { opacity: 0, y: 8 });
      if (video) gsap.set(video, { scale: 1.08, filter: "brightness(0.85)" });

      if (reduce) {
        gsap.set([words, eyebrow, subtitle, corner, hint], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          filter: "none",
          letterSpacing: "normal",
        });
        gsap.set([topLine, underline], { scaleX: 1 });
        if (video) gsap.set(video, { scale: 1, filter: "none" });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Tensão — só vídeo respirando, tela limpa por ~2.4s
      tl.to(
        video,
        { scale: 1.02, filter: "brightness(1)", duration: 3.4, ease: "power2.out" },
        0,
      )
        // 2. Pausa silenciosa
        .addLabel("line", "+=1.4")
        // 3. Linha champagne expande lentamente do centro
        .to(
          underline,
          { scaleX: 1, duration: 1.8, ease: "power4.out" },
          "line",
        )
        .to(
          topLine,
          { scaleX: 1, duration: 1.8, ease: "power2.inOut" },
          "line+=0.2",
        )
        .to(
          eyebrow,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
          "line+=0.6",
        )
        // 4. Pausa antes do título
        .addLabel("title", "line+=1.5")
        // 5. "WM" → 6. "Noiva" — palavra por palavra, lentas
        .to(
          words,
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            letterSpacing: "normal",
            duration: 1.6,
            ease: "expo.out",
            stagger: 0.55,
          },
          "title",
        )
        // 7. Subtítulo
        .to(
          subtitle,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.4 },
          "title+=1.4",
        )
        .to(
          corner,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2 },
          "title+=1.7",
        )
        // 8. Scroll indicator por último
        .to(hint, { opacity: 1, y: 0, duration: 1.0 }, "title+=2.0");

      // hint flutuando sutil
      gsap.to(".hero-hint-line", {
        scaleY: 0.4,
        transformOrigin: "top",
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      });

      // hint some ao começar a rolar
      const onScroll = () => {
        if (window.scrollY > 40) {
          gsap.to(hint, { opacity: 0, y: 20, duration: 0.6, ease: "power2.out" });
        } else {
          gsap.to(hint, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // parallax + scale leve no vídeo ao rolar
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
      {/* Vídeo de fundo */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster=""
      >
        <source src="/wm-hero.mp4" type="video/mp4" />
      </video>

      {/* Overlays para legibilidade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/30 to-espresso/75" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,12,8,0.55)_100%)]" />

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Linha champagne no topo */}
        <div className="hero-topline mx-6 mt-28 h-px bg-gradient-to-r from-accent/0 via-accent/80 to-accent/0 md:mx-20" />

        <div className="flex flex-1 items-center justify-center px-6">
          <div className="max-w-4xl text-center text-warm-white">
            <p className="hero-eyebrow flex items-center justify-center gap-3 text-[11px] uppercase tracking-luxe text-warm-white/85">
              <span className="h-px w-8 bg-accent" />
              Proposta · ForYouCode
              <span className="h-px w-8 bg-accent" />
            </p>

            <h1 className="mt-10 font-display text-[clamp(4rem,12vw,10rem)] font-light leading-[0.95] tracking-tight text-warm-white">
              <span className="inline-flex flex-wrap items-baseline justify-center gap-x-6">
                {TITLE_WORDS.map((w, i) => (
                  <span
                    key={w}
                    className="relative inline-block overflow-hidden pb-2 align-baseline"
                    style={{ lineHeight: 1 }}
                  >
                    <span
                      className={`hero-word inline-block ${
                        i === 1 ? "font-display-italic text-accent" : ""
                      }`}
                    >
                      {w}
                    </span>
                  </span>
                ))}
              </span>
            </h1>

            <div className="hero-underline mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" />

            <p className="hero-subtitle mx-auto mt-8 max-w-2xl font-display text-xl leading-snug text-warm-white/90 md:text-2xl lg:text-3xl text-pretty">
              Uma nova experiência digital para uma marca feita de
              <span className="font-display-italic"> presença</span>,
              <span className="font-display-italic"> delicadeza</span> e
              <span className="font-display-italic"> desejo</span>.
            </p>
          </div>
        </div>

        {/* Canto inferior direito */}
        <div className="hero-corner pointer-events-none absolute bottom-8 right-8 text-right text-warm-white/90">
          <p className="text-[10px] uppercase tracking-luxe">Espaço WM</p>
          <p className="font-display-italic text-lg">est. matrimonial</p>
        </div>

        {/* Scroll indicator */}
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
