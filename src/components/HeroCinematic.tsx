import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroCinematic() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const video = videoRef.current;

      if (video) gsap.set(video, { scale: 1.08, filter: "brightness(0.85)" });

      if (reduce) {
        if (video) gsap.set(video, { scale: 1, filter: "none" });
        return;
      }

      gsap.to(video, {
        scale: 1.02,
        filter: "brightness(1)",
        duration: 3.8,
        ease: "power2.out",
      });

      if (video) {
        gsap.to(video, {
          yPercent: 18,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Parallax de saída do título
      gsap.to(".hero-title-wrap", {
        yPercent: -55,
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

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <h1 className="hero-title-wrap hero-shine font-display text-[clamp(4rem,12vw,10rem)] font-light leading-[0.95] tracking-tight text-center">
          WM Noivas
        </h1>
      </div>
    </section>
  );
}
