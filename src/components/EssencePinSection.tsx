import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOCKS = [
  {
    n: "01",
    title: "Novo site",
    text: "Uma presença digital mais refinada para apresentar a marca, as coleções, os vestidos e as unidades — com a delicadeza que a WM merece.",
  },
  {
    n: "02",
    title: "Catálogo editável",
    text: "Todos os vestidos conectados ao Portal WM. A equipe atualiza fotos, descrições e destaques diretamente, sem depender de programador.",
  },
  {
    n: "03",
    title: "Portal WM",
    text: "Área administrativa para cadastrar, editar, destacar, ocultar e organizar vestidos. Simples, premium e pensada para o dia a dia da loja.",
  },
];

export function EssencePinSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      const scope = root.current!;
      const stage = scope.querySelector<HTMLElement>(".essence-stage")!;
      const eyebrow = scope.querySelector(".essence-eyebrow");
      const line = scope.querySelector(".essence-line");
      const title = gsap.utils.toArray<HTMLElement>(".essence-title-word");
      const blocks = gsap.utils.toArray<HTMLElement>(".essence-block");
      const halo = scope.querySelector(".essence-halo");

      if (reduce) {
        gsap.set([eyebrow, line, title, blocks, halo], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          filter: "none",
          scale: 1,
          scaleX: 1,
        });
        return;
      }

      gsap.set(eyebrow, { opacity: 0, y: 18, filter: "blur(8px)" });
      gsap.set(line, { scaleX: 0, transformOrigin: "center" });
      gsap.set(title, {
        yPercent: 110,
        opacity: 0,
        filter: "blur(14px)",
      });
      gsap.set(blocks, {
        opacity: 0,
        y: 60,
        scale: 0.96,
        filter: "blur(14px)",
      });
      gsap.set(stage, { scale: 0.985 });
      gsap.set(halo, { opacity: 0.0, scale: 1.05 });

      const endDistance = isMobile ? "+=180%" : "+=320%";

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: endDistance,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. respiro inicial
      tl.to({}, { duration: 0.6 })
        // 2. eyebrow + linha
        .to(eyebrow, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 })
        .to(line, { scaleX: 1, duration: 1.0, ease: "power4.out" }, "<0.1")
        // 3. título palavra por palavra
        .to(
          title,
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.18,
          },
          "+=0.2",
        )
        // 4. halo aproxima
        .to(halo, { opacity: 1, scale: 1, duration: 1.4 }, "<")
        // 5. blocos em cascata
        .to(
          blocks,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.0,
            stagger: 0.2,
          },
          "+=0.3",
        )
        // 6. câmera continua aproximando sutilmente
        .to(stage, { scale: 1.02, duration: 1.6, ease: "sine.inOut" }, "+=0.2")
        .to(halo, { scale: 1.04, duration: 1.6, ease: "sine.inOut" }, "<")
        // 7. respiro final
        .to({}, { duration: 0.6 });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-screen w-full overflow-hidden bg-[var(--warm-white)] text-espresso"
    >
      {/* halo de fundo */}
      <div
        className="essence-halo pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(216,183,143,0.22), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="essence-stage relative z-10 flex h-full flex-col items-center justify-center px-6 lg:px-20">
        <p className="essence-eyebrow flex items-center justify-center gap-3 text-[11px] uppercase tracking-luxe text-espresso/70">
          <span className="h-px w-8 bg-accent" />
          A entrega
          <span className="h-px w-8 bg-accent" />
        </p>

        <h2 className="mt-8 text-center font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[0.95] tracking-tight">
          <span className="inline-flex flex-wrap items-baseline justify-center gap-x-5">
            {["A", "essência", "da", "entrega"].map((w, i) => (
              <span
                key={w + i}
                className="relative inline-block overflow-hidden pb-2 align-baseline"
                style={{ lineHeight: 1 }}
              >
                <span
                  className={`essence-title-word inline-block ${
                    i === 1 || i === 3 ? "font-display-italic text-accent" : ""
                  }`}
                >
                  {w}
                </span>
              </span>
            ))}
          </span>
        </h2>

        <div className="essence-line mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="mt-16 grid w-full max-w-6xl gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {BLOCKS.map((b) => (
            <article
              key={b.n}
              className="essence-block group relative flex flex-col gap-4 rounded-sm border border-espresso/10 bg-background/60 p-8 backdrop-blur-sm"
            >
              <span className="font-display-italic text-sm tracking-wide text-accent">
                {b.n}
              </span>
              <h3 className="font-display text-2xl leading-tight md:text-3xl">
                {b.title}
              </h3>
              <span className="h-px w-10 bg-accent/70" />
              <p className="text-sm leading-relaxed text-espresso/75 md:text-[15px]">
                {b.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
