import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  LayoutDashboard,
  Heart,
  Wand2,
  Store,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroBride from "@/assets/hero-bride.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Proposta · Espaço WM — Novo site + Portal WM" },
      {
        name: "description",
        content:
          "Proposta navegável: novo site institucional, catálogo gerenciável, Portal Administrativo WM, gestão de vestidos, leads e escopo de entrega.",
      },
      { property: "og:title", content: "Proposta · Espaço WM" },
      {
        property: "og:description",
        content: "Uma proposta interativa para a nova presença digital da Espaço WM.",
      },
    ],
  }),
  component: Proposta,
});

const deliverables = [
  {
    n: "01",
    icon: Store,
    titulo: "Novo site institucional",
    resumo:
      "Site separado, com identidade própria, focado em apresentar coleções, unidades e atendimento consultivo.",
    bullets: ["Home premium", "Página de coleções", "Detalhe de vestido", "SEO básico e responsivo"],
    to: "/catalogo" as const,
    cta: "Abrir prévia do site",
  },
  {
    n: "02",
    icon: Heart,
    titulo: "Catálogo gerenciável",
    resumo:
      "Vitrine de vestidos com filtros por estilo, marca e unidade. Cada peça é cadastrada e publicada pela equipe WM, sem depender de programador.",
    bullets: ["Filtros combinados", "Favoritos da noiva", "Páginas de detalhe"],
    to: "/catalogo" as const,
    cta: "Ver catálogo navegável",
  },
  {
    n: "03",
    icon: Wand2,
    titulo: "Jornada da Noiva",
    resumo:
      "Fluxo guiado em etapas que ajuda a noiva a se encontrar — e entrega leads qualificados para a equipe.",
    bullets: ["5 etapas", "Captação de favoritos", "Lead enviado ao Portal"],
    to: "/jornada" as const,
    cta: "Experimentar a jornada",
  },
  {
    n: "04",
    icon: LayoutDashboard,
    titulo: "Portal Administrativo WM",
    resumo:
      "Painel privado para a equipe: visão dos leads, vestidos mais favoritados e gestão completa do acervo.",
    bullets: ["KPIs e leads", "Cadastro de vestidos", "Publicação direta no site"],
    to: "/portal" as const,
    cta: "Abrir prévia do Portal",
  },
];

const fase2 = [
  "Integração com WhatsApp Business para envio automático de leads",
  "Agendamento online de provas vinculado a cada unidade",
  "Área da noiva com favoritos salvos e histórico de visitas",
  "Relatórios mensais de performance por unidade e por estilo",
];

function Proposta() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO — CAPA DA PROPOSTA */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
          <div className="lg:col-span-7 flex items-center px-6 lg:px-16 py-20 relative">
            <div className="max-w-2xl fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-[11px] tracking-luxe uppercase text-foreground">
                <Sparkles className="h-3 w-3 text-accent" /> Proposta interativa · 2026
              </div>
              <h1 className="mt-8 font-display text-5xl md:text-6xl lg:text-[5rem] leading-[1.04] tracking-tight text-balance">
                Uma nova presença <span className="font-display-italic text-cocoa">digital</span> para a Espaço WM.
              </h1>
              <p className="mt-8 text-base text-muted-foreground max-w-xl leading-relaxed">
                Esta não é a versão final do site — é uma proposta navegável. Aqui você pode percorrer cada
                entrega: o novo site, o catálogo gerenciável, a jornada da noiva e o Portal Administrativo WM.
                A ideia é sentir a experiência antes de decidir.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#entregas"
                  className="group inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors rounded-2xl"
                >
                  O que será entregue
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </a>
                <Link
                  to="/escopo"
                  className="text-xs tracking-luxe uppercase border-b border-accent pb-1 hover:border-foreground transition-colors"
                >
                  Ver escopo completo
                </Link>
              </div>
              <div className="mt-16 grid grid-cols-3 gap-6 text-xs tracking-luxe uppercase text-muted-foreground max-w-lg">
                <div>
                  <p className="font-display text-3xl text-foreground normal-case tracking-tight">4</p>
                  <p className="mt-1">Entregas principais</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-foreground normal-case tracking-tight">2</p>
                  <p className="mt-1">Ambientes (site + portal)</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-foreground normal-case tracking-tight">3</p>
                  <p className="mt-1">Unidades atendidas</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative bg-champagne/50 overflow-hidden hidden lg:block">
            <img
              src={heroBride}
              alt="Noiva com vestido em tule champagne"
              className="absolute inset-0 h-full w-full object-cover reveal-img"
              width={1080}
              height={1920}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-background fade-in">
              <div className="gold-line w-16 mb-4 opacity-80" />
              <p className="font-display text-2xl max-w-sm">
                "Uma proposta pensada com calma, para algo que merece tempo."
              </p>
              <p className="text-xs tracking-luxe uppercase mt-2 opacity-80">Para a equipe WM</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESUMO EXECUTIVO */}
      <section className="px-6 lg:px-16 py-24 bg-champagne/40">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Resumo da proposta</p>
          <h2 className="font-display text-3xl md:text-5xl mt-4 leading-tight text-balance">
            Dois ambientes que conversam entre si: um novo <span className="font-display-italic text-cocoa">site</span> para
            as noivas e um <span className="font-display-italic text-cocoa">portal</span> para a equipe WM.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="border border-border/70 bg-background p-8 lift">
              <p className="text-xs tracking-luxe uppercase text-accent">Para a noiva</p>
              <p className="font-display text-2xl mt-3">Site separado e elegante</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Coleções, estilos, unidades e uma jornada guiada para encontrar o vestido certo —
                com tom consultivo, sem pressão.
              </p>
            </div>
            <div className="border border-border/70 bg-background p-8 lift">
              <p className="text-xs tracking-luxe uppercase text-accent">Para a equipe WM</p>
              <p className="font-display text-2xl mt-3">Portal Administrativo</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                Painel privado para cadastrar vestidos, acompanhar leads e ver o que está performando —
                sem precisar acionar o desenvolvedor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENTREGAS */}
      <section id="entregas" className="px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-14 gap-8 flex-wrap">
            <div>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground">O que será entregue</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 max-w-2xl text-balance">
                Quatro entregas, cada uma com prévia navegável.
              </h2>
            </div>
            <Link
              to="/escopo"
              className="text-xs tracking-luxe uppercase border-b border-accent pb-1"
            >
              Ver escopo completo
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.n}
                  className="group relative border border-border/70 bg-background p-8 lift flex flex-col"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <p className="text-xs tracking-luxe uppercase text-muted-foreground">
                        Entrega {d.n}
                      </p>
                    </div>
                  </div>
                  <h3 className="font-display text-3xl mt-6">{d.titulo}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{d.resumo}</p>
                  <ul className="mt-6 space-y-2">
                    {d.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="gold-line w-12 my-8" />
                  <Link
                    to={d.to}
                    className="mt-auto inline-flex items-center gap-2 text-xs tracking-luxe uppercase border-b border-accent pb-1 self-start hover:border-foreground transition-colors"
                  >
                    {d.cta}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-champagne/50 px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Como os dois lados conversam</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4 max-w-2xl text-balance">
            A equipe cadastra. O site publica. A noiva escolhe. O lead chega.
          </h2>
          <div className="mt-14 grid md:grid-cols-4 gap-px bg-border">
            {[
              { n: "01", t: "Equipe cadastra", d: "Vestidos são adicionados pelo Portal WM, com fotos e detalhes." },
              { n: "02", t: "Site publica", d: "O catálogo é atualizado automaticamente, com filtros prontos." },
              { n: "03", t: "Noiva navega", d: "Ela explora, favorita e segue pela jornada guiada." },
              { n: "04", t: "Lead chega", d: "O Portal recebe os favoritos e dados de contato para o atendimento." },
            ].map((s) => (
              <div key={s.n} className="bg-background p-8">
                <p className="text-xs tracking-luxe uppercase text-muted-foreground">{s.n}</p>
                <p className="font-display text-2xl mt-6">{s.t}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESCOPO INCLUSO + FASE 2 */}
      <section className="px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-10">
          <div className="border border-border/70 bg-background p-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <p className="text-xs tracking-luxe uppercase text-accent">Escopo incluso</p>
            </div>
            <h3 className="font-display text-3xl mt-5">Tudo o que está nesta proposta</h3>
            <ul className="mt-6 space-y-3">
              {[
                "Novo site institucional (4 páginas principais)",
                "Catálogo de vestidos com filtros e detalhe",
                "Jornada da Noiva em 5 etapas",
                "Portal Administrativo WM com KPIs e leads",
                "Cadastro e gestão de vestidos pela equipe",
                "Identidade visual aplicada em todos os ambientes",
                "Responsivo (celular, tablet, desktop)",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/escopo"
              className="mt-8 inline-block text-xs tracking-luxe uppercase border-b border-accent pb-1"
            >
              Abrir escopo detalhado
            </Link>
          </div>
          <div className="border border-accent/30 bg-accent/10 p-10">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent" />
              <p className="text-xs tracking-luxe uppercase text-accent">Segunda fase</p>
            </div>
            <h3 className="font-display text-3xl mt-5">O que pode vir depois</h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Temas que fazem sentido evoluir num segundo momento, depois que o site e o portal
              estiverem rodando e gerando dados.
            </p>
            <ul className="mt-6 space-y-3">
              {fase2.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FECHAMENTO CONSULTIVO */}
      <section className="px-6 lg:px-16 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-luxe uppercase text-accent">Próximo passo</p>
          <h2 className="font-display text-4xl md:text-6xl mt-6 leading-tight text-balance">
            Esta proposta foi feita para ser <span className="font-display-italic text-cocoa">conversada</span>.
          </h2>
          <p className="mt-8 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Navegue à vontade pelas prévias, marque o que faz sentido e o que não faz. A partir do retorno
            de vocês, ajustamos os detalhes e seguimos para o desenvolvimento do site definitivo e do Portal WM.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link
              to="/escopo"
              className="bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors rounded-2xl"
            >
              Ver escopo completo
            </Link>
            <Link
              to="/catalogo"
              className="text-xs tracking-luxe uppercase border-b border-accent pb-1 self-center"
            >
              Começar pelas prévias →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
