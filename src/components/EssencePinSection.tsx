import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    n: "01",
    title: "Novo site",
    text: "Uma presença digital mais refinada para apresentar a marca, coleções, vestidos e unidades.",
  },
  {
    n: "02",
    title: "Catálogo editável",
    text: "Todos os vestidos conectados ao Portal WM, permitindo atualização direta pela equipe.",
  },
  {
    n: "03",
    title: "Portal WM",
    text: "Área administrativa para cadastrar, editar, destacar, ocultar e organizar vestidos.",
  },
];

export function EssencePinSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cameraRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([titleRef.current, ...cardsRef.current], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "none",
        });
        return;
      }

      gsap.set(titleRef.current, {
        autoAlpha: 0,
        y: 80,
        filter: "blur(16px)",
      });
      gsap.set(cardsRef.current, {
        autoAlpha: 0,
        y: 70,
        scale: 0.96,
        filter: "blur(14px)",
      });
      gsap.set(cameraRef.current, {
        scale: 1,
        yPercent: 0,
        xPercent: 0,
      });
      gsap.set(haloRef.current, { opacity: 0.4, scale: 1.05 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=220%" : "+=350%",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. câmera começa aproximando lentamente
      tl.to(cameraRef.current, {
        scale: 1.035,
        yPercent: -2,
        duration: 1.2,
        ease: "power2.out",
      })
        .to(haloRef.current, { opacity: 1, scale: 1, duration: 1.2 }, "<")

        // 2. título revela
        .to(
          titleRef.current,
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
          },
          "-=0.6",
        )

        // 3. cards entram em cascata
        .to(
          cardsRef.current,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.2,
          },
          "+=0.15",
        )

        // 4. permanência — câmera continua deslizando
        .to(
          cameraRef.current,
          {
            scale: isMobile ? 1.05 : 1.08,
            yPercent: -5,
            xPercent: 1.2,
            duration: 1.6,
            ease: "none",
          },
          "+=0.1",
        )
        .to(
          haloRef.current,
          { scale: 1.06, xPercent: -1.5, duration: 1.6, ease: "none" },
          "<",
        )

        // 5. micro-lift nos cards
        .to(
          cardsRef.current,
          {
            y: -18,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        )

        // 6. saída suave para a próxima seção
        .to(
          cameraRef.current,
          {
            yPercent: -10,
            scale: isMobile ? 1.04 : 1.06,
            autoAlpha: 0.92,
            duration: 1.2,
            ease: "power2.inOut",
          },
          "+=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--warm-white)] text-espresso"
    >
      <div
        ref={haloRef}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(216,183,143,0.22), transparent 36%), radial-gradient(circle at 75% 70%, rgba(217,193,186,0.30), transparent 34%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div
        ref={cameraRef}
        className="relative z-10 flex h-full items-center justify-center px-6 lg:px-20"
        style={{ willChange: "transform" }}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div ref={titleRef}>
            <p className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-luxe text-espresso/70">
              <span className="h-px w-8 bg-accent" />
              A essência da entrega
            </p>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-light leading-[0.95] tracking-tight">
              Um novo <span className="font-display-italic text-accent">site</span>.
              <br />
              Um acervo <span className="font-display-italic text-accent">editável</span>.
              <br />
              Um portal <span className="font-display-italic text-accent">próprio</span>.
            </h2>
            <div className="mt-8 h-px w-32 bg-accent" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-espresso/70 md:text-[15px]">
              Uma cena guiada — onde marca, catálogo e portal se conectam em uma única experiência.
            </p>
          </div>

          <div className="grid gap-5">
            {CARDS.map((card, index) => (
              <article
                key={card.n}
                ref={(el: HTMLDivElement | null) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className="rounded-sm border border-espresso/10 bg-background/75 p-7 shadow-[0_24px_70px_rgba(62,46,42,0.08)] backdrop-blur-sm"
                style={{ willChange: "transform, opacity, filter" }}
              >
                <p className="font-display-italic text-2xl text-accent">{card.n}</p>
                <h3 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
                  {card.title}
                </h3>
                <span className="mt-4 block h-px w-10 bg-accent/70" />
                <p className="mt-3 text-sm leading-relaxed text-espresso/75 md:text-[15px]">
                  {card.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
