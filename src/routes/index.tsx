import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AnimatedImage } from "@/components/AnimatedImage";
import { HeroCinematic } from "@/components/HeroCinematic";
import { EssencePinSection } from "@/components/EssencePinSection";

import heroBridal from "@/assets/hero-bridal.jpg";
import detailLace from "@/assets/detail-lace.jpg";
import boutique from "@/assets/boutique.jpg";
import bouquet from "@/assets/bouquet.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WM Noiva — Uma nova experiência digital" },
      {
        name: "description",
        content:
          "Proposta editorial para o novo site da Espaço WM, com catálogo gerenciável e Portal Administrativo WM.",
      },
      { property: "og:title", content: "WM Noiva · Proposta" },
      {
        property: "og:description",
        content:
          "Uma nova experiência digital para uma marca feita de presença, delicadeza e desejo.",
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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const childFade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

const imgReveal: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: EASE } },
};

function GrowLine({ className = "" }: { className?: string }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: EASE }}
      style={{ transformOrigin: "left" }}
      className={`block h-px bg-accent/70 origin-left ${className}`}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] tracking-luxe uppercase text-cocoa/70 flex items-center gap-3">
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, ease: EASE }}
        style={{ transformOrigin: "left" }}
        className="h-px w-8 bg-accent block"
      />
      {children}
    </p>
  );
}

function Proposta() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      <SiteHeader />

      <main className="flex-1">
        {/* 1. HERO CINEMATOGRÁFICO — fullscreen com vídeo + GSAP */}
        <HeroCinematic />


        {/* 2. A ESSÊNCIA DA ENTREGA */}
        <section className="px-6 lg:px-20 py-32 lg:py-44 bg-background">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-[0.4fr_0.6fr] gap-16 lg:gap-24">
            <motion.div {...fadeUp}>
              <Eyebrow>I · A essência</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso">
                Mais do que um site.
                <br />
                <span className="font-display-italic text-cocoa">Uma forma de ser vista.</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-8 text-lg leading-9 text-cocoa/85 max-w-xl">
              <p>
                A entrega é uma plataforma onde a marca respira como na loja —
                com a mesma calma, o mesmo cuidado, a mesma atenção ao detalhe
                que toda noiva sente ao entrar pela primeira vez.
              </p>
              <p className="font-display-italic text-cocoa text-xl">
                Um espaço digital construído para acolher antes de vender.
              </p>
              <p>
                Cada coleção, cada vestido, cada unidade ganha um lugar próprio.
                E, por trás, a equipe Espaço WM ganha autonomia total para manter
                tudo vivo, sem depender de ninguém.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Faixa visual com renda */}
        <section className="relative h-[40vh] lg:h-[55vh] overflow-hidden">
          <AnimatedImage
            src={detailLace}
            alt="Detalhe de renda bridal"
            width={1200}
            height={1500}
            variant="floatParallax"
            hover={false}
            className="absolute inset-0 h-full w-full"
            imageClassName="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--warm-white)]/40 via-transparent to-[var(--warm-white)]/40" />
        </section>

        {/* 3. SEÇÃO DE ENTREGAS */}
        <section className="px-6 lg:px-20 py-32 lg:py-40 bg-[var(--warm-white)]">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Eyebrow>II · As entregas</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso text-balance">
                Quatro peças, costuradas <span className="font-display-italic">com intenção</span>.
              </h2>
            </motion.div>

            <div className="mt-20 space-y-px">
              {[
                {
                  n: "01",
                  t: "Novo site",
                  d: "Uma presença digital separada da atual, mais leve e mais refinada — feita para apresentar a marca à noiva antes do primeiro encontro.",
                },
                {
                  n: "02",
                  t: "Catálogo de vestidos",
                  d: "Acervo organizado por coleção, estilo, marca e unidade. Cada vestido com sua própria página, suas fotos, sua história.",
                },
                {
                  n: "03",
                  t: "Portal Administrativo WM",
                  d: "Área privada onde a equipe edita tudo: fotos, descrições, marca, estilo, coleção, unidade, status e disponibilidade — sem programador.",
                },
                {
                  n: "04",
                  t: "Destaques e dados do acervo",
                  d: "Definir vestidos em destaque na home e acompanhar dados simples: os mais acessados e os mais favoritados pelas noivas.",
                },
              ].map((item, i) => (
                <motion.article
                  key={item.n}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                  className="group grid grid-cols-[auto_1fr] md:grid-cols-[120px_1fr_1.4fr] gap-6 md:gap-12 items-baseline py-10 border-t border-cocoa/15 hover:bg-background/60 transition-colors duration-700 px-2"
                >
                  <span className="font-display-italic text-3xl text-accent">{item.n}</span>
                  <h3 className="font-display text-3xl md:text-4xl text-espresso tracking-tight">
                    {item.t}
                  </h3>
                  <p className="text-base leading-8 text-cocoa/80 max-w-xl col-span-2 md:col-span-1">
                    {item.d}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. O QUE MUDA NA PRÁTICA */}
        <section className="px-6 lg:px-20 py-32 lg:py-44 bg-background">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedImage
              src={bouquet}
              alt="Buquê de rosas em tons nude"
              width={1200}
              height={1500}
              variant="softSlideLeft"
              className="relative aspect-[4/5]"
              imageClassName="h-full w-full object-cover"
            />
            <motion.div {...fadeUp}>
              <Eyebrow>III · O que muda na prática</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso">
                Da loja <span className="font-display-italic">para a tela</span>, sem perder o toque.
              </h2>
              <div className="mt-12 space-y-8">
                {[
                  ["A noiva chega preparada.", "Antes mesmo da prova, ela conhece coleções, marcas e unidades."],
                  ["A equipe deixa de depender de programador.", "Cadastrar um vestido novo passa a ser tão simples quanto trocar uma vitrine."],
                  ["O acervo se torna vivo.", "Cada peça reflete a disponibilidade real, em qualquer unidade, em tempo real."],
                  ["A marca ganha presença digital.", "Um site que combina com a sofisticação que vocês entregam pessoalmente."],
                ].map(([t, d]) => (
                  <div key={t} className="border-l border-accent/60 pl-6">
                    <p className="font-display text-2xl text-espresso">{t}</p>
                    <p className="mt-2 text-base leading-8 text-cocoa/80">{d}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. SEÇÃO VISUAL DO PORTAL WM */}
        <section className="px-6 lg:px-20 py-32 lg:py-44 bg-[var(--champagne)] text-espresso">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <p className="text-[11px] tracking-luxe uppercase text-cocoa/70 flex items-center gap-3">
                <span className="h-px w-8 bg-accent" /> IV · Portal WM
              </p>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso text-balance">
                A sala dos bastidores, <span className="font-display-italic">desenhada com calma</span>.
              </h2>
              <p className="mt-8 text-lg leading-9 text-cocoa/80 max-w-xl">
                Uma ferramenta privada e silenciosa, feita só para editar o que aparece
                no site. Sem painéis cheios de gráficos — apenas o acervo, organizado
                com o mesmo cuidado da vitrine.
              </p>
            </motion.div>

            {/* Mock do portal — superfície clara, editorial */}
            <motion.div
              {...fadeUp}
              className="mt-20 rounded-sm border border-accent/25 bg-warm-white shadow-elegant overflow-hidden"
            >
              {/* Cabeçalho */}
              <div className="flex flex-wrap items-end justify-between gap-6 px-8 md:px-12 py-8 border-b border-accent/15">
                <div>
                  <p className="text-[10px] tracking-luxe uppercase text-cocoa/60">Portal WM · Acervo</p>
                  <p className="mt-3 font-display text-3xl text-espresso">
                    Coleção Atelier <span className="font-display-italic text-cocoa/80">2026</span>
                  </p>
                </div>
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 border border-espresso/80 text-espresso px-6 py-3 text-[11px] tracking-luxe uppercase hover:bg-espresso hover:text-warm-white transition-colors"
                >
                  <span className="h-px w-4 bg-accent group-hover:bg-warm-white transition-colors" />
                  Cadastrar vestido
                </button>
              </div>

              {/* Indicadores editoriais */}
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-accent/15 border-b border-accent/15">
                {[
                  ["248", "vestidos cadastrados"],
                  ["173", "peças publicadas"],
                  ["Aurora", "mais favoritado", "1.284 favoritos"],
                  ["Veneza", "mais acessado", "3.902 visitas"],
                ].map(([v, l, sub]) => (
                  <div key={l} className="p-8">
                    <p className="font-display text-3xl md:text-4xl text-espresso leading-none">{v}</p>
                    <p className="mt-4 text-[10px] tracking-luxe uppercase text-cocoa/60">{l}</p>
                    {sub && (
                      <p className="mt-1 font-display-italic text-cocoa/55 text-xs">{sub}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Lista de produtos */}
              <div className="px-8 md:px-12 py-4">
                {[
                  ["Berta Bridal · 20-113", "Renda · Princesa", "São Paulo", "Publicado", true],
                  ["Milla Nova · Aurora", "Sereia · Bordado", "Brasília", "Em destaque", true],
                  ["Atelier WM · Veneza", "Reto · Cetim", "Patos de Minas", "Rascunho", false],
                  ["Pronovias · Etoile", "Evasê · Tule", "São Paulo", "Oculto", false],
                ].map(([n, est, un, st, on]) => (
                  <div
                    key={n as string}
                    className="grid grid-cols-[1.5fr_1fr_0.9fr_0.9fr_auto] gap-6 items-center py-6 border-b border-accent/10 last:border-b-0 hover:bg-[var(--cream)]/60 transition-colors"
                  >
                    <div>
                      <p className="font-display text-xl text-espresso">{n}</p>
                      <p className="text-[10px] tracking-luxe uppercase text-cocoa/55 mt-1">{est}</p>
                    </div>
                    <p className="text-sm text-cocoa/75">{un}</p>
                    <p className="text-sm font-display-italic text-cocoa/85">{st}</p>
                    <span
                      className={[
                        "inline-block h-1.5 w-1.5 rounded-full",
                        on ? "bg-accent" : "bg-cocoa/25",
                      ].join(" ")}
                    />
                    <div className="flex items-center gap-5 text-[10px] tracking-luxe uppercase text-cocoa/65">
                      <button type="button" className="hover:text-espresso transition-colors">editar</button>
                      <button type="button" className="hover:text-accent transition-colors">destacar</button>
                      <button type="button" className="hover:text-espresso transition-colors">ocultar</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p
              {...fadeUp}
              className="mt-8 text-xs tracking-luxe uppercase text-cocoa/55 text-right"
            >
              Pré-visualização · não é o painel final
            </motion.p>
          </div>
        </section>

        {/* 6. SEÇÃO VISUAL DO CATÁLOGO */}
        <section className="px-6 lg:px-20 py-32 lg:py-44 bg-[var(--cream)]">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Eyebrow>V · Catálogo</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso text-balance">
                Cada vestido, <span className="font-display-italic">uma vitrine só dele</span>.
              </h2>
            </motion.div>

            {/* Filtros editoriais */}
            <motion.div
              {...fadeUp}
              className="mt-16 border-y border-accent/25 py-6 flex flex-wrap items-center gap-x-10 gap-y-4"
            >
              <p className="text-[10px] tracking-luxe uppercase text-cocoa/55">Filtrar por</p>
              {[
                ["Estilo", "Todos"],
                ["Marca", "Todas"],
                ["Unidade", "Todas"],
                ["Status", "Disponível"],
              ].map(([label, value]) => (
                <button
                  key={label}
                  type="button"
                  className="group flex items-baseline gap-2 text-sm text-espresso hover:text-accent transition-colors"
                >
                  <span className="text-[10px] tracking-luxe uppercase text-cocoa/55">{label}</span>
                  <span className="font-display-italic">{value}</span>
                  <span className="text-cocoa/40 group-hover:text-accent transition-colors">↓</span>
                </button>
              ))}
            </motion.div>

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-16 grid md:grid-cols-3 gap-x-8 gap-y-16"
            >
              {[
                { img: heroBridal, n: "Aurora", est: "Renda · Princesa", un: "São Paulo", featured: true },
                { img: detailLace, n: "Veneza", est: "Bordado · Sereia", un: "Brasília", featured: false },
                { img: boutique, n: "Atelier", est: "Cetim · Reto", un: "Patos de Minas", featured: false },
              ].map((v) => (
                <motion.article
                  key={v.n}
                  variants={childFade}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[var(--nude)] border border-accent/20">
                    <AnimatedImage
                      src={v.img}
                      alt={v.n}
                      variant="veilReveal"
                      hover={false}
                      className="absolute inset-0 h-full w-full"
                      imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.06]"
                    />
                    {/* Hover wash dourado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {v.featured && (
                      <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-warm-white/90 backdrop-blur-sm px-3 py-1.5 text-[9px] tracking-luxe uppercase text-espresso border border-accent/40">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        Destaque
                      </span>
                    )}

                    {/* Botão discreto no hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-block bg-warm-white text-espresso text-[10px] tracking-luxe uppercase px-4 py-2 border border-accent/30">
                        Ver detalhes →
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <div>
                      <p className="font-display text-2xl text-espresso">{v.n}</p>
                      <p className="text-[11px] tracking-luxe uppercase text-cocoa/60 mt-1">{v.est}</p>
                    </div>
                    <p className="font-display-italic text-cocoa/70 text-sm whitespace-nowrap">{v.un}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div {...fadeUp} className="mt-16 flex justify-center">
              <Link
                to="/catalogo"
                className="text-xs tracking-luxe uppercase text-espresso border-b border-accent pb-1 hover:border-espresso transition-colors"
              >
                Ver prévia do catálogo →
              </Link>
            </motion.div>
          </div>
        </section>


        {/* 7. ESCOPO INCLUSO */}
        <section className="px-6 lg:px-20 py-32 lg:py-44 bg-background">
          <div className="mx-auto max-w-6xl grid lg:grid-cols-[0.45fr_0.55fr] gap-16 lg:gap-24">
            <motion.div {...fadeUp}>
              <Eyebrow>VI · Escopo incluso</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso">
                O que está <span className="font-display-italic">dentro</span>.
              </h2>
              <p className="mt-8 text-base leading-8 text-cocoa/80 max-w-md">
                Tudo o que faz parte desta primeira entrega — sem letras miúdas,
                sem promessas que não cabem nesse momento.
              </p>
            </motion.div>
            <motion.ul {...fadeUp} className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
              {[
                "Novo site separado do atual",
                "Home institucional editorial",
                "Página de coleções",
                "Catálogo de vestidos",
                "Página individual por vestido",
                "Páginas de unidades",
                "Contato e WhatsApp simples",
                "Portal Administrativo WM",
                "Cadastro e edição de vestidos",
                "Upload e organização de fotos",
                "Marca · Estilo · Coleção · Unidade",
                "Status e disponibilidade",
                "Destaques na home e catálogo",
                "Dados: mais acessados e favoritos",
                "Responsivo (celular e desktop)",
                "Base técnica preparada para evoluir",
              ].map((i) => (
                <li key={i} className="flex items-baseline gap-3 text-cocoa border-b border-cocoa/10 pb-4">
                  <span className="text-accent text-xs">◆</span>
                  <span className="text-base leading-7">{i}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* 8. SEGUNDA ETAPA */}
        <section className="px-6 lg:px-20 py-32 lg:py-40 bg-[var(--warm-white)]">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Eyebrow>VII · Segunda etapa</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso text-balance">
                O que pode <span className="font-display-italic">florescer depois</span>.
              </h2>
              <p className="mt-8 text-base leading-8 text-cocoa/80 max-w-xl">
                Não entra agora — mas fica desenhado, para quando o site e o portal
                já estiverem no ar e a operação pedir o próximo capítulo.
              </p>
            </motion.div>

            <div className="mt-16 grid md:grid-cols-2 gap-px bg-cocoa/15">
              {[
                ["Integração com WhatsApp Business", "Mensagens enviadas direto para o número da unidade."],
                ["Agendamento online de prova", "A noiva escolhe horário diretamente pelo site."],
                ["Área da noiva", "Espaço privado com favoritos e histórico de visitas."],
                ["Relatórios e métricas", "Painel com performance por unidade e estilos buscados."],
              ].map(([t, d]) => (
                <div key={t} className="bg-[var(--warm-white)] p-10">
                  <p className="font-display text-2xl text-espresso">{t}</p>
                  <p className="mt-3 text-base leading-7 text-cocoa/75">{d}</p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-xs tracking-luxe uppercase text-cocoa/55 text-center">
              fora do escopo desta proposta — registrado para o futuro
            </p>
          </div>
        </section>

        {/* 9. TIMELINE */}
        <section className="px-6 lg:px-20 py-32 lg:py-44 bg-background">
          <div className="mx-auto max-w-6xl">
            <motion.div {...fadeUp} className="max-w-2xl">
              <Eyebrow>VIII · Etapas</Eyebrow>
              <h2 className="mt-8 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-espresso">
                Um caminho <span className="font-display-italic">sem pressa</span>.
              </h2>
            </motion.div>

            <div className="mt-20 relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 1.4, ease: EASE }}
                style={{ transformOrigin: "left" }}
                className="absolute left-0 right-0 top-[14px] h-px bg-cocoa/15 hidden md:block"
              />
              <div className="grid md:grid-cols-5 gap-12 md:gap-6 relative">
                {[
                  ["01", "Diagnóstico", "Entender o acervo, unidades e o jeito da equipe trabalhar."],
                  ["02", "Direção visual", "Refinar a identidade aplicada a cada tela do projeto."],
                  ["03", "Site", "Construir home, coleções, catálogo e páginas de vestidos."],
                  ["04", "Portal WM", "Desenvolver a área privada de gestão do acervo."],
                  ["05", "Publicação", "Treinamento da equipe, ajustes finais e go-live."],
                ].map(([n, t, d], i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.08 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-accent border-2 border-background ring-1 ring-cocoa/20" />
                      <span className="md:hidden h-px flex-1 bg-cocoa/15" />
                    </div>
                    <p className="mt-6 text-[11px] tracking-luxe uppercase text-cocoa/60">Etapa {n}</p>
                    <p className="mt-3 font-display text-2xl text-espresso">{t}</p>
                    <p className="mt-3 text-sm leading-7 text-cocoa/75">{d}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. FECHAMENTO */}
        <section className="relative overflow-hidden bg-espresso text-warm-white">
          <div className="absolute inset-0 opacity-30">
            <AnimatedImage
              src={detailLace}
              alt=""
              variant="floatParallax"
              hover={false}
              className="h-full w-full"
              imageClassName="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-espresso/85 via-espresso/95 to-espresso" />
          <div className="relative mx-auto max-w-4xl px-6 lg:px-20 py-40 lg:py-52 text-center">
            <motion.div {...fadeUp}>
              <p className="text-[11px] tracking-luxe uppercase text-accent">Capítulo final</p>
              <h2 className="mt-10 font-display text-5xl md:text-7xl leading-[1.05] tracking-tight text-warm-white text-balance">
                Se isso <span className="font-display-italic">tocar</span>,
                <br />
                seguimos juntos.
              </h2>
              <div className="mt-12 mx-auto h-px w-24 bg-accent" />
              <p className="mt-12 max-w-xl mx-auto text-lg leading-9 text-warm-white/75">
                Esta proposta é um convite — para apresentar a ideia, ouvir o que faz
                sentido para a rotina da Espaço WM e ajustar o protótipo antes de
                fechar o escopo final.
              </p>
              <div className="mt-16 flex flex-wrap justify-center gap-10">
                <Link
                  to="/escopo"
                  className="text-xs tracking-luxe uppercase text-warm-white border-b border-accent pb-1 hover:border-warm-white transition-colors"
                >
                  Ver escopo detalhado →
                </Link>
                <Link
                  to="/portal"
                  className="text-xs tracking-luxe uppercase text-warm-white/70 border-b border-warm-white/20 pb-1 hover:text-warm-white hover:border-warm-white transition-colors"
                >
                  Prévia do Portal WM
                </Link>
              </div>
              <p className="mt-20 font-display-italic text-accent text-xl">ForYouCode · para Espaço WM</p>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
