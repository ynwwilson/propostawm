import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroCinematic } from "@/components/HeroCinematic";

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

const EASE = [0.2, 0.7, 0.2, 1] as [number, number, number, number];
const VIEWPORT = { once: true, margin: "-80px" } as const;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.9, ease: EASE },
} as const;

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const childFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
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

const planos = [
  {
    nome: "Essencial",
    valor: "R$ 7.000",
    sugerida: false,
    cta: "Ver escopo",
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
    cta: "Opção sugerida",
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
    cta: "Ver detalhes",
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

        {/* 2. RESUMO CURTO */}
        <section className="px-6 lg:px-20 py-28 lg:py-40 bg-background">
          <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
            <Eyebrow>
              <span className="mx-auto">A proposta, em poucas linhas</span>
            </Eyebrow>
            <h2 className="mt-8 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-espresso text-balance">
              Um novo site, um catálogo vivo e uma{" "}
              <span className="font-display-italic">área para vocês cuidarem do acervo</span>.
            </h2>
            <p className="mt-8 text-lg leading-9 text-cocoa/80 max-w-2xl mx-auto">
              Três peças conectadas, feitas para a Espaço WM ter presença digital à
              altura da experiência que entrega pessoalmente — e autonomia total
              para manter tudo atualizado, sem depender de programador.
            </p>
          </motion.div>
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
            <motion.ul {...fadeUp} className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {escopo.map((i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 text-cocoa border-b border-cocoa/10 pb-4"
                >
                  <span className="text-accent text-xs">◆</span>
                  <span className="text-base leading-7">{i}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* 5. INVESTIMENTO */}
        <section className="px-6 lg:px-20 py-28 lg:py-40 bg-[var(--champagne)]">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Eyebrow>Investimento</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight text-espresso text-balance">
                Três caminhos possíveis, <span className="font-display-italic">no seu tempo</span>.
              </h2>
              <p className="mt-6 text-base leading-8 text-cocoa/75 max-w-xl">
                Cada opção entrega uma versão completa da proposta — muda apenas
                a profundidade do refinamento e dos recursos.
              </p>
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-16 grid md:grid-cols-3 gap-6 items-stretch"
            >
              {planos.map((p) => (
                <motion.article
                  key={p.nome}
                  variants={childFade}
                  className={[
                    "relative flex flex-col p-8 lg:p-10 transition-all duration-700",
                    p.sugerida
                      ? "bg-warm-white border border-accent/50 shadow-elegant md:-translate-y-3"
                      : "bg-warm-white/60 border border-cocoa/15",
                  ].join(" ")}
                >
                  {p.sugerida && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-espresso text-warm-white text-[10px] tracking-luxe uppercase px-4 py-1.5">
                      Opção sugerida
                    </span>
                  )}

                  <p className="text-[11px] tracking-luxe uppercase text-cocoa/65">
                    Opção · {p.nome}
                  </p>
                  <p className="mt-5 font-display text-4xl md:text-5xl text-espresso">
                    {p.valor}
                  </p>
                  <p className="mt-5 text-sm leading-7 text-cocoa/80 min-h-[5rem]">
                    {p.descricao}
                  </p>

                  <ul className="mt-6 space-y-2 border-t border-cocoa/10 pt-6">
                    {p.itens.map((i) => (
                      <li
                        key={i}
                        className="flex items-baseline gap-3 text-sm text-cocoa/85"
                      >
                        <span className="text-accent text-[10px]">◆</span>
                        <span className="leading-6">{i}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>

            <motion.p
              {...fadeUp}
              className="mt-10 text-xs tracking-luxe uppercase text-cocoa/55 text-center"
            >
              Valores referentes ao projeto completo — condições de pagamento ajustadas em conversa.
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
            <div className="mt-12 flex flex-wrap justify-center gap-8">
              <Link
                to="/catalogo"
                className="text-xs tracking-luxe uppercase text-espresso border-b border-accent pb-1 hover:border-espresso transition-colors"
              >
                Ver prévia do catálogo →
              </Link>
              <Link
                to="/portal"
                className="text-xs tracking-luxe uppercase text-cocoa/70 border-b border-cocoa/30 pb-1 hover:text-espresso hover:border-espresso transition-colors"
              >
                Prévia do Portal WM →
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
