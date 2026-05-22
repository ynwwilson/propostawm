import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroCinematic } from "@/components/HeroCinematic";
import Carousel from "@/components/Carousel";




import heroBridal from "@/assets/hero-bridal.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WM Noiva — Uma nova experiência digital" },
      {
        name: "description",
        content:
          "Proposta enxuta para o novo site da Espaço WM, com catálogo gerenciável e Portal WM.",
      },
      { property: "og:title", content: "WM Noiva · Proposta" },
      {
        property: "og:description",
        content:
          "Novo site premium, catálogo gerenciável e Portal WM — uma proposta direta e visual.",
      },
      { property: "og:image", content: heroBridal },
    ],
  }),
  component: Proposta,
});

// Cinematic easing — power3/expo feel
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_DEEP = [0.16, 1, 0.3, 1] as [number, number, number, number];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: VIEWPORT,
  transition: { duration: 1.2, ease: EASE },
} as const;

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.28, delayChildren: 0.35 } },
};

const childFade: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.985, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.3, ease: EASE_DEEP },
  },
};

// Stagger for list items (escopo, plan items) — slow, cascading reveal
const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE },
  },
};


function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-luxe uppercase text-cocoa/70 flex items-center gap-3">
      <span className="h-px w-8 bg-accent block" />
      {children}
    </p>
  );
}

const entregas = [
  {
    n: "01",
    titulo: "Novo Site Premium",
    descricao:
      "Um novo site separado do atual, com visual mais sofisticado, responsivo e alinhado à experiência da Espaço WM.",
    itens: [
      "Home premium",
      "Página de coleções",
      "Página de unidades",
      "Página individual dos vestidos",
      "Contato / WhatsApp simples",
      "Design responsivo",
    ],
  },
  {
    n: "02",
    titulo: "Catálogo Gerenciável",
    descricao:
      "Um catálogo conectado ao Portal WM, permitindo que o acervo seja organizado, filtrado e atualizado com mais facilidade.",
    itens: [
      "Filtros por estilo, marca, coleção e unidade",
      "Status / disponibilidade da peça",
      "Destaques no site",
      "Favoritos",
      "Vestidos mais acessados",
      "Vestidos mais favoritados",
    ],
  },
  {
    n: "03",
    titulo: "Portal WM",
    descricao:
      "Uma área administrativa para a equipe cadastrar, editar, ocultar, destacar e organizar os produtos exibidos no site.",
    itens: [
      "Cadastro de vestidos",
      "Edição de fotos",
      "Edição de descrição, marca, estilo, coleção e unidade",
      "Publicar / ocultar produto",
      "Definir destaques",
      "Controle básico do acervo",
    ],
  },
];

const escopo = [
  "Novo site separado para a Espaço WM",
  "Home premium e páginas institucionais",
  "Catálogo de vestidos gerenciável",
  "Página individual por vestido",
  "Portal WM para edição dos produtos",
  "Filtros, destaques e disponibilidade",
  "Favoritos e dados de acesso",
  "Responsivo em celular e desktop",
];

const WA_PHONE = "5534992761076";
const waHref = (msg: string) =>
  `https://web.whatsapp.com/send?phone=${WA_PHONE}&text=${encodeURIComponent(msg)}`;

const planos = [
  {
    nome: "Essencial",
    valor: "R$ 7.000",
    sugerida: false,
    cta: "Entre em contato",
    ctaHref: waHref(
      "Olá! Tenho interesse na proposta Essencial da nova plataforma digital da Espaço WM e gostaria de conversar."
    ),
    descricao:
      "Uma versão mais enxuta para criar o novo site e iniciar a estrutura com um painel básico.",
    itens: [
      "Novo site separado",
      "Home premium",
      "Página de coleções",
      "Página individual dos vestidos",
      "Catálogo inicial",
      "WhatsApp simples",
      "Portal WM básico",
      "Edição de produtos",
    ],
  },
  {
    nome: "Completa",
    valor: "R$ 10.000",
    sugerida: true,
    cta: "Fale com a gente",
    ctaHref: waHref(
      "Olá! Quero seguir com a proposta Completa da Espaço WM. Podemos conversar sobre os próximos passos?"
    ),
    descricao:
      "A estrutura ideal para unir novo site, catálogo gerenciável e Portal WM mais completo.",
    itens: [
      "Tudo da Essencial",
      "Upload e troca de imagens",
      "Gestão de status / disponibilidade",
      "Destaques no site",
      "Publicar ou ocultar vestidos",
      "Organização por coleção, marca, estilo e unidade",
      "Vestidos mais acessados",
      "Vestidos mais favoritados",
    ],
  },
  {
    nome: "Premium",
    valor: "R$ 14.000",
    sugerida: false,
    cta: "Vamos conversar",
    ctaHref: waHref(
      "Olá! Gostaria de entender melhor a proposta Premium da Espaço WM e alinhar os detalhes do projeto."
    ),
    descricao:
      "Uma versão mais refinada, com maior nível de personalização visual e suporte inicial ampliado.",
    itens: [
      "Tudo da Completa",
      "Refinamento visual adicional",
      "Animações premium",
      "Mais seções personalizadas",
      "Dashboard visual mais completo",
      "SEO inicial mais estruturado",
      "Treinamento gravado",
      "Suporte inicial estendido",
    ],
  },
];



function Proposta() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* 1. HERO */}
        <HeroCinematic />

        {/* 2. RESUMO CURTO - EDITORIAL */}
        <section className="relative px-6 lg:px-20 py-28 lg:py-40 bg-background overflow-hidden">

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(216,199,168,0.10),transparent_70%)]" />

          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div {...fadeUp}>
                <Eyebrow>
                  <span className="mx-auto">A essência da proposta</span>
                </Eyebrow>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VIEWPORT}
                transition={{ duration: 1.6, ease: EASE_DEEP, delay: 0.2 }}
                className="mt-10 font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-espresso text-balance"
              >
                Um novo site, um <span className="font-display-italic text-accent">catálogo vivo</span>
                <br className="hidden md:block" />
                {" "}e um portal para cuidar do acervo.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.3, ease: EASE, delay: 0.55 }}
                className="mt-10 flex items-center justify-center gap-4"
              >
                <span className="h-px w-12 bg-cocoa/25" />
                <span className="text-accent font-display-italic text-lg">◆</span>
                <span className="h-px w-12 bg-cocoa/25" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={VIEWPORT}
                transition={{ duration: 1.1, ease: EASE, delay: 0.75 }}
                className="mt-8 text-base md:text-lg leading-8 text-cocoa/80 max-w-xl mx-auto"
              >
                Três entregas conectadas para apresentar melhor a Espaço WM
                e dar autonomia para manter tudo sempre atualizado.
              </motion.p>

            </div>

            {(() => {
              const blocos = [
                { n: "01", titulo: "Novo site", texto: "Uma presença digital mais refinada para a marca." },
                { n: "02", titulo: "Catálogo gerenciável", texto: "Vestidos organizados, filtrados e fáceis de atualizar." },
                { n: "03", titulo: "Portal WM", texto: "Uma área interna para editar o acervo sem depender de programador." },
              ];
              const renderBloco = (b: typeof blocos[number]) => (
                <div className="group relative bg-background p-10 lg:p-12 flex flex-col h-full w-full transition-colors duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--warm-white)]">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display-italic text-accent text-3xl">{b.n}</span>
                    <span className="text-accent text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]">◆</span>
                  </div>
                  <div className="mt-6 h-px w-10 bg-accent/60 group-hover:w-16 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  <h3 className="mt-6 font-display text-2xl md:text-[1.65rem] leading-tight text-espresso tracking-tight">
                    {b.titulo}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-cocoa/75">{b.texto}</p>
                </div>
              );
              return (
                <>
                  {/* Desktop / tablet grid */}
                  <motion.div
                    variants={staggerParent}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className="hidden md:grid mt-20 lg:mt-24 md:grid-cols-3 gap-px bg-cocoa/15 border border-cocoa/15"
                  >
                    {blocos.map((b) => (
                      <motion.div key={b.n} variants={childFade}>
                        {renderBloco(b)}
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Mobile carousel */}
                  <motion.div {...fadeUp} className="md:hidden mt-16 flex justify-center">
                    <Carousel
                      baseWidth={320}
                      itemHeight={260}
                      loop
                      autoplay
                      autoplayDelay={5000}
                      items={blocos.map((b) => ({
                        id: b.n,
                        content: (
                          <div className="border border-cocoa/15 bg-background h-full w-full">
                            {renderBloco(b)}
                          </div>
                        ),
                      }))}
                    />
                  </motion.div>
                </>
              );
            })()}

          </div>
        </section>

        {/* 3. TRÊS ENTREGAS */}
        <section className="px-6 lg:px-20 py-28 lg:py-36 bg-[var(--warm-white)]">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Eyebrow>As três entregas</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-espresso text-balance">
                Tudo o que entra, <span className="font-display-italic">sem rodeios</span>.
              </h2>
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-16 grid md:grid-cols-3 gap-6"
            >
              {entregas.map((e) => (
                <motion.article
                  key={e.n}
                  variants={childFade}
                  className="border border-cocoa/15 bg-background p-8 lg:p-10 flex flex-col"
                >
                  <p className="font-display-italic text-accent text-2xl">{e.n}</p>
                  <h3 className="mt-3 font-display text-2xl md:text-3xl text-espresso tracking-tight">
                    {e.titulo}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-cocoa/80">{e.descricao}</p>
                  <ul className="mt-6 space-y-2 border-t border-cocoa/10 pt-5">
                    {e.itens.map((i) => (
                      <li key={i} className="flex items-baseline gap-3 text-sm text-cocoa/85">
                        <span className="text-accent text-[10px]">◆</span>
                        <span className="leading-6">{i}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. ESCOPO INCLUSO */}
        <section className="px-6 lg:px-20 py-28 lg:py-36 bg-background">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-20">
            <motion.div {...fadeUp}>
              <Eyebrow>Escopo incluso</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-espresso">
                O que está <span className="font-display-italic">dentro</span>.
              </h2>
              <p className="mt-6 text-base leading-8 text-cocoa/75 max-w-md">
                Sem letras miúdas: tudo o que faz parte desta entrega.
              </p>
            </motion.div>
            <motion.ul
              variants={listStagger}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="grid sm:grid-cols-2 gap-x-10 gap-y-4"
            >
              {escopo.map((i) => (
                <motion.li
                  key={i}
                  variants={listItem}
                  className="flex items-baseline gap-3 text-cocoa border-b border-cocoa/10 pb-4"
                >
                  <span className="text-accent text-xs">◆</span>
                  <span className="text-base leading-7">{i}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* 5. INVESTIMENTO */}
        <section className="relative px-6 lg:px-20 py-32 lg:py-44 bg-[var(--champagne)] overflow-hidden">
          {/* Decorative top hairline */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          {/* Soft radial wash */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,199,168,0.35),transparent_60%)]" />

          <div className="relative mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl mx-auto text-center">
              <Eyebrow>
                <span className="mx-auto">Investimento</span>
              </Eyebrow>
              <h2 className="mt-8 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-espresso text-balance">
                Possibilidades de{" "}
                <span className="font-display-italic">investimento</span>.
              </h2>
              <p className="mt-8 text-base md:text-lg leading-8 text-cocoa/75 max-w-2xl mx-auto">
                Três caminhos possíveis para estruturar a nova presença digital
                da Espaço WM, de forma mais enxuta ou mais completa, conforme a
                necessidade.
              </p>
            </motion.div>

            {(() => {
              const renderPlano = (p: typeof planos[number], opts?: { inCarousel?: boolean }) => (
                <div
                  className={[
                    "group relative flex flex-col p-9 lg:p-11 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] h-full w-full",
                    opts?.inCarousel ? "" : "hover:-translate-y-1",
                    p.sugerida
                      ? `bg-warm-white border border-accent/40 shadow-elegant ring-1 ring-accent/15 ${opts?.inCarousel ? "" : "md:-translate-y-4"}`
                      : "bg-warm-white/70 border border-cocoa/15 hover:bg-warm-white hover:shadow-elegant",
                  ].join(" ")}
                >
                  {p.sugerida && (
                    <div className="pointer-events-none absolute -inset-px bg-gradient-to-b from-accent/15 via-transparent to-transparent" />
                  )}
                  {p.sugerida && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-espresso text-warm-white text-[10px] tracking-luxe uppercase px-5 py-2 shadow-sm">
                      Mais indicada
                    </span>
                  )}
                  <div className="relative">
                    <div className="flex items-baseline justify-between">
                      <p className="font-display text-2xl md:text-3xl text-espresso tracking-tight">
                        {p.nome}
                      </p>
                      <span className="font-display-italic text-accent text-sm">◆</span>
                    </div>
                    <p className="mt-8 font-display text-5xl md:text-[3.25rem] text-espresso leading-none">
                      {p.valor}
                    </p>
                    <p className="mt-3 text-[10px] tracking-luxe uppercase text-cocoa/55">
                      Projeto completo
                    </p>
                    <div className="mt-8 h-px w-full bg-gradient-to-r from-accent/40 via-cocoa/15 to-transparent" />
                    <p className="mt-7 text-sm leading-7 text-cocoa/85 min-h-[5.5rem]">
                      {p.descricao}
                    </p>
                    <ul className="mt-7 space-y-3">
                      {p.itens.map((i) => (
                        <li key={i} className="flex items-baseline gap-3 text-sm text-cocoa/85">
                          <span className="text-accent text-[9px] translate-y-[-1px]">◆</span>
                          <span className="leading-6">{i}</span>
                        </li>
                      ))}
                    </ul>


                  </div>
                </div>
              );
              return (
                <>
                  {/* Desktop / tablet grid */}
                  <motion.div
                    variants={staggerParent}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className="hidden md:grid mt-20 md:grid-cols-3 gap-6 lg:gap-7 items-stretch"
                  >
                    {planos.map((p) => (
                      <motion.article key={p.nome} variants={childFade} className="h-full">
                        {renderPlano(p)}
                      </motion.article>
                    ))}
                  </motion.div>

                  {/* Mobile carousel */}
                  <motion.div {...fadeUp} className="md:hidden mt-16 flex justify-center">
                    <Carousel
                      baseWidth={330}
                      itemHeight={640}
                      loop
                      items={planos.map((p) => ({
                        id: p.nome,
                        content: <div className="h-full w-full pt-3">{renderPlano(p, { inCarousel: true })}</div>,
                      }))}
                    />
                  </motion.div>
                </>
              );
            })()}


            <motion.p
              {...fadeUp}
              className="mt-12 text-xs tracking-luxe uppercase text-cocoa/55 text-center"
            >
              Valores referentes ao projeto completo · condições de pagamento ajustadas em conversa
            </motion.p>
          </div>
        </section>


        {/* 6. PRÓXIMO PASSO LEVE */}
        <section className="px-6 lg:px-20 py-32 lg:py-40 bg-background">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Eyebrow>
              <span className="mx-auto">Próximo passo</span>
            </Eyebrow>
            <h2 className="mt-8 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-espresso text-balance">
              Se fizer sentido, <span className="font-display-italic">seguimos juntos</span>.
            </h2>
            <p className="mt-8 text-base leading-8 text-cocoa/75">
              Sem pressa. A proposta fica aqui para vocês revisitarem com calma —
              quando quiserem conversar, é só responder.
            </p>
            <div className="mt-12 flex justify-center">
              <Link
                to="/escopo"
                className="text-xs tracking-luxe uppercase text-espresso border-b border-accent pb-1 hover:border-espresso transition-colors duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                Ver escopo completo →
              </Link>
            </div>

            <p className="mt-16 font-display-italic text-accent text-lg">
              ForYouCode · para Espaço WM
            </p>
          </motion.div>
        </section>
      </main>



      <SiteFooter />
    </div>
  );
}
