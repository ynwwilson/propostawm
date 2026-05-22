import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  Store,
  LayoutDashboard,
  Heart,
  BarChart3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";


export const Route = createFileRoute("/escopo")({
  head: () => ({
    meta: [
      { title: "Escopo da proposta — Espaço WM" },
      {
        name: "description",
        content:
          "Escopo detalhado: novo site, catálogo, Portal WM, gestão de vestidos, leads e segunda fase.",
      },
      { property: "og:title", content: "Escopo · Proposta Espaço WM" },
    ],
  }),
  component: Escopo,
});

const blocos = [
  {
    icon: Store,
    titulo: "Novo site institucional",
    descricao:
      "Site separado do sistema interno, com identidade própria e foco em apresentar a marca para a noiva.",
    inclui: [
      "Home premium com hero, coleções, estilos e unidades",
      "Página de coleções com filtros por estilo, marca e unidade",
      "Página de detalhe do vestido com galeria e CTAs consultivos",
      "Página de unidades e atendimento",
      "SEO básico, meta tags por página e responsividade completa",
    ],
    naoInclui: [
      "Blog editorial (pode entrar na fase 2)",
      "Versão multilíngue",
    ],
  },
  {
    icon: Heart,
    titulo: "Catálogo gerenciável",
    descricao:
      "Vitrine de vestidos alimentada pelo Portal WM. Cada peça pode ser cadastrada, editada e publicada pela equipe.",
    inclui: [
      "Listagem com filtros combinados (estilo, marca, unidade)",
      "Sistema de favoritos para a noiva",
      "Página de detalhe com galeria de imagens",
      "Status de disponibilidade por unidade",
    ],
    naoInclui: ["Reserva online de prova (fase 2)"],
  },
  {
    icon: BarChart3,
    titulo: "Gestão de Produtos e Acervo",
    descricao:
      "Toda a operação do catálogo passa pelo Portal WM: cadastro, edição, status, destaques e dados simples do acervo — sem depender de programador.",
    inclui: [
      "Cadastro e edição completa de cada vestido",
      "Upload e organização de imagens",
      "Controle de status (disponível, reservado, em prova, etc.)",
      "Definição de destaques na home e no catálogo",
      "Dados simples: vestidos mais acessados e mais favoritados",
    ],
    naoInclui: ["CRM, pipeline ou funil comercial (fora do escopo)"],
  },

  {
    icon: LayoutDashboard,
    titulo: "Portal Administrativo WM",
    descricao:
      "Painel privado para a equipe gerenciar o acervo, acompanhar leads e ver o que está performando.",
    inclui: [
      "KPIs principais (leads, vestidos mais favoritados)",
      "Listagem de leads recebidos pela jornada",
      "Cadastro de vestidos: nome, marca, estilo, unidade, status, descrição, imagens",
      "Publicação direta no site, sem depender de programador",
    ],
    naoInclui: [
      "Permissões granulares por usuário (fase 2)",
      "Relatórios avançados com gráficos (fase 2)",
    ],
  },
];

const fase2 = [
  {
    t: "Integração com WhatsApp Business",
    d: "Leads da jornada enviados automaticamente para o número da unidade escolhida.",
  },
  {
    t: "Agendamento online de provas",
    d: "Noiva escolhe data e horário diretamente no site, integrado ao calendário da unidade.",
  },
  {
    t: "Área da noiva",
    d: "Login simples para a noiva revisitar seus favoritos e histórico de visitas.",
  },
  {
    t: "Relatórios e métricas",
    d: "Dashboard com performance por unidade, estilos mais buscados e funil da jornada.",
  },
  {
    t: "Permissões e múltiplos usuários",
    d: "Cada consultora com seu próprio acesso ao Portal WM.",
  },
];

function Escopo() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <section className="px-6 lg:px-16 pt-20 pb-12">
        <div className="mx-auto max-w-5xl fade-up">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Proposta · Escopo</p>
          <h1 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05] tracking-tight text-balance">
            O que está incluso, o que vem depois.
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-2xl leading-relaxed">
            Um detalhamento honesto do que entra na primeira entrega — e do que faz mais sentido
            evoluir numa segunda fase, depois que o site e o portal estiverem no ar.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-16 py-16">
        <div className="mx-auto max-w-5xl space-y-10">
          {blocos.map((b, i) => {
            const Icon = b.icon;
            return (
              <article
                key={b.titulo}
                className="border border-border/70 bg-background p-8 md:p-10 lift"
              >
                <div className="flex items-start gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent shrink-0">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-xs tracking-luxe uppercase text-muted-foreground">
                      Entrega 0{i + 1}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl mt-2">{b.titulo}</h2>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-2xl">
                      {b.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-xs tracking-luxe uppercase text-accent mb-4">Incluso</p>
                    <ul className="space-y-2">
                      {b.inclui.map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-4">
                      Não incluso nesta fase
                    </p>
                    <ul className="space-y-2">
                      {b.naoInclui.map((i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Circle className="h-3 w-3 mt-1 shrink-0" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FASE 2 */}
      <section className="bg-champagne/50 px-6 lg:px-16 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="text-xs tracking-luxe uppercase text-accent">Segunda fase</p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl mt-4 max-w-2xl text-balance">
            Evoluções para depois do lançamento.
          </h2>
          <p className="mt-5 text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Não entra nesta proposta inicial, mas fica desenhado para vocês terem clareza
            do caminho possível.
          </p>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {fase2.map((i) => (
              <div key={i.t} className="border border-border/60 bg-background p-6 lift">
                <p className="font-display text-xl">{i.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="px-6 lg:px-16 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <p className="text-xs tracking-luxe uppercase text-accent">Como seguimos</p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl mt-4 max-w-2xl text-balance">
            Um caminho calmo, em quatro tempos.
          </h2>
          <div className="mt-12 grid md:grid-cols-4 gap-px bg-border">
            {[
              { n: "01", t: "Aprovação da proposta", d: "Vocês navegam, comentam, ajustamos o que precisar." },
              { n: "02", t: "Design final", d: "Refinamos a identidade visual aplicada a cada tela." },
              { n: "03", t: "Desenvolvimento", d: "Site e Portal WM construídos e integrados." },
              { n: "04", t: "Treinamento e go-live", d: "Equipe treinada para usar o Portal e publicar vestidos." },
            ].map((s) => (
              <div key={s.n} className="bg-background p-6">
                <p className="text-xs tracking-luxe uppercase text-muted-foreground">{s.n}</p>
                <p className="font-display text-xl mt-4">{s.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-luxe uppercase text-accent">Próximo passo</p>
          <h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight text-balance">
            Se fizer sentido, seguimos juntos.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <Link
              to="/"
              className="bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors rounded-2xl"
            >
              Voltar para a proposta
            </Link>
            <Link
              to="/portal"
              className="text-xs tracking-luxe uppercase border-b border-accent pb-1 self-center"
            >
              Ver prévia do Portal WM →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
