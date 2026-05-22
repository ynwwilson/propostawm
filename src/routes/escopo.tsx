import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Store,
  LayoutDashboard,
  Heart,
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
    icon: LayoutDashboard,
    titulo: "Portal Administrativo WM",
    descricao:
      "Painel privado para a equipe gerenciar o acervo e ver dados simples de interesse do catálogo.",
    inclui: [
      "Login administrativo",
      "Cadastro de vestidos: nome, marca, estilo, unidade, status, descrição, imagens",
      "Edição e publicação direta no site, sem depender de programador",
      "Dados simples: vestidos mais favoritados e mais acessados",
    ],
    naoInclui: [
      "Permissões granulares por usuário (fase 2)",
      "Relatórios avançados com gráficos (fase 2)",
      "CRM ou pipeline comercial",
    ],
  },
];

const fase2 = [
  {
    t: "Integração com WhatsApp Business",
    d: "Mensagens de contato enviadas automaticamente para o número da unidade escolhida.",
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
    d: "Dashboard com performance por unidade e estilos mais buscados.",
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
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="text-xs tracking-luxe uppercase text-muted-foreground"
          >
            Proposta · Escopo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: EASE_DEEP, delay: 0.4 }}
            className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-balance"
          >
            <span className="md:hidden">Escopo da primeira versão</span>
            <span className="hidden md:inline">O que está incluso, o que vem depois.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.85 }}
            className="mt-6 text-base text-muted-foreground max-w-2xl leading-relaxed"
          >
            <span className="md:hidden">
              O foco desta primeira entrega é criar um novo site para a Espaço WM, com catálogo
              editável e Portal WM para a equipe manter o acervo atualizado.
            </span>
            <span className="hidden md:inline">
              Um detalhamento honesto do que entra na primeira entrega — e do que faz mais sentido
              evoluir numa segunda fase, depois que o site e o portal estiverem no ar.
            </span>
          </motion.p>
        </div>
      </section>

      {/* MOBILE: versão compacta */}
      <section className="md:hidden px-6 py-10">
        <div className="space-y-5">
          {[
            {
              n: "01",
              t: "Novo site premium",
              d: "Uma nova presença digital para apresentar a marca, coleções, vestidos e unidades com mais refinamento.",
              b: ["Home premium", "Coleções", "Páginas de vestidos", "Responsivo"],
            },
            {
              n: "02",
              t: "Catálogo gerenciável",
              d: "Um catálogo conectado ao painel, permitindo organizar e atualizar os vestidos com mais autonomia.",
              b: [
                "Filtros por estilo, marca e unidade",
                "Status e disponibilidade",
                "Destaques no site",
                "Favoritos e acessos",
              ],
            },
            {
              n: "03",
              t: "Portal WM",
              d: "Área administrativa para cadastrar, editar, ocultar, destacar e organizar os produtos do site.",
              b: [
                "Cadastro de vestidos",
                "Edição de fotos e informações",
                "Publicar e ocultar produtos",
                "Controle do acervo",
              ],
            },
          ].map((c) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.9, ease: EASE }}
              className="border border-border/70 bg-background p-6"
            >
              <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                Entrega {c.n}
              </p>
              <h2 className="font-display text-2xl mt-2">{c.t}</h2>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{c.d}</p>
              <ul className="mt-5 space-y-2">
                {c.b.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 border-t border-border/60 pt-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <p className="text-[10px] tracking-luxe uppercase text-accent">Para uma segunda etapa</p>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["CRM", "Pagamento online", "App nativo", "ERP", "IA", "Automação avançada"].map(
              (i) => (
                <li
                  key={i}
                  className="text-xs tracking-wide border border-border/70 bg-background px-3 py-1.5 text-muted-foreground"
                >
                  {i}
                </li>
              ),
            )}
          </ul>
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
          O escopo pode ser ajustado conforme a rotina da Espaço WM e o nível de profundidade
          escolhido.
        </p>
      </section>

      <section className="hidden md:block px-6 lg:px-16 py-16">

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mx-auto max-w-5xl space-y-10"
        >
          {blocos.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.article
                key={b.titulo}
                variants={childFade}
                className="border border-border/70 bg-background p-8 md:p-10 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-elegant"
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
                    <motion.ul
                      variants={listStagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={VIEWPORT}
                      className="space-y-2"
                    >
                      {b.inclui.map((i) => (
                        <motion.li
                          key={i}
                          variants={listItem}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                          <span>{i}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                  <div>
                    <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-4">
                      Não incluso nesta fase
                    </p>
                    <motion.ul
                      variants={listStagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={VIEWPORT}
                      className="space-y-2"
                    >
                      {b.naoInclui.map((i) => (
                        <motion.li
                          key={i}
                          variants={listItem}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Circle className="h-3 w-3 mt-1 shrink-0" />
                          <span>{i}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* FASE 2 */}
      <section className="hidden md:block bg-champagne/50 px-6 lg:px-16 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="text-xs tracking-luxe uppercase text-accent">Segunda fase</p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.6, ease: EASE_DEEP, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl mt-4 max-w-2xl text-balance"
          >
            Evoluções para depois do lançamento.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
            className="mt-5 text-sm text-muted-foreground max-w-2xl leading-relaxed"
          >
            Não entra nesta proposta inicial, mas fica desenhado para vocês terem clareza
            do caminho possível.
          </motion.p>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-12 grid md:grid-cols-2 gap-4"
          >
            {fase2.map((i) => (
              <motion.div
                key={i.t}
                variants={childFade}
                className="border border-border/60 bg-background p-6 transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-elegant"
              >
                <p className="font-display text-xl">{i.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{i.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="px-6 lg:px-16 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <p className="text-xs tracking-luxe uppercase text-accent">Como seguimos</p>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 36, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.6, ease: EASE_DEEP, delay: 0.2 }}
            className="font-display text-4xl md:text-5xl mt-4 max-w-2xl text-balance"
          >
            Um caminho calmo, em quatro tempos.
          </motion.h2>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-12 grid md:grid-cols-4 gap-px bg-border"
          >
            {[
              { n: "01", t: "Aprovação da proposta", d: "Vocês navegam, comentam, ajustamos o que precisar." },
              { n: "02", t: "Design final", d: "Refinamos a identidade visual aplicada a cada tela." },
              { n: "03", t: "Desenvolvimento", d: "Site e Portal WM construídos e integrados." },
              { n: "04", t: "Treinamento e go-live", d: "Equipe treinada para usar o Portal e publicar vestidos." },
            ].map((s) => (
              <motion.div
                key={s.n}
                variants={childFade}
                className="group bg-background p-6 transition-colors duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[var(--warm-white)]"
              >
                <p className="text-xs tracking-luxe uppercase text-muted-foreground">{s.n}</p>
                <p className="font-display text-xl mt-4">{s.t}</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-16 py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-4xl text-center">
          <p className="text-xs tracking-luxe uppercase text-accent">Próximo passo</p>

          <div className="mt-10 flex justify-center">
            <Link
              to="/"
              className="bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] rounded-2xl"
            >
              Voltar para a proposta
            </Link>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
