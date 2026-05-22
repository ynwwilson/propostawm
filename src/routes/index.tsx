import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Crown,
  FileText,
  Heart,
  LayoutDashboard,
  MessageCircle,
  PackageCheck,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

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

const tabs = ["Resumo", "Entregas", "Experiência", "Painel", "Etapas"] as const;
type Tab = (typeof tabs)[number];

const deliverables = [
  {
    icon: Store,
    title: "Novo site separado",
    text: "Um novo site para a Espaço WM, com visual mais premium, navegação mais clara e estrutura pensada para apresentar vestidos, coleções, estilos e unidades com mais elegância.",
  },
  {
    icon: Search,
    title: "Catálogo inteligente",
    text: "Páginas de coleção e vestidos com filtros por estilo, marca, unidade e disponibilidade, deixando a busca da noiva mais simples e organizada.",
  },
  {
    icon: Heart,
    title: "Favoritos da noiva",
    text: "A cliente poderá salvar vestidos de interesse e enviar essa seleção para a equipe, facilitando o atendimento e deixando a consultora mais preparada.",
  },
  {
    icon: MessageCircle,
    title: "Atendimento pelo WhatsApp",
    text: "Botões de contato com mensagens mais inteligentes, levando informações como vestido, unidade, estilo e interesse da cliente.",
  },
  {
    icon: LayoutDashboard,
    title: "Portal administrativo WM",
    text: "Área interna para cadastrar, editar e organizar vestidos, imagens, status, coleções, unidades e destaques do site.",
  },
  {
    icon: ClipboardList,
    title: "Leads e oportunidades",
    text: "Visualização simples dos contatos recebidos, favoritos enviados e pedidos de atendimento, para a equipe acompanhar com mais organização.",
  },
];

const phases: [string, string, string][] = [
  ["01", "Diagnóstico e direção visual", "Entender o site atual, rotina da empresa, coleções, unidades, fluxo de atendimento e estilo visual desejado."],
  ["02", "Protótipo navegável", "Criar uma prévia clicável da proposta para validar telas, experiência da noiva e área administrativa antes do desenvolvimento final."],
  ["03", "Desenvolvimento do novo site", "Construir a estrutura pública: home, coleções, catálogo, páginas de vestido, unidades, contato e experiência mobile."],
  ["04", "Portal administrativo", "Implementar a área interna para a equipe gerenciar vestidos, imagens, status, coleções, unidades e oportunidades."],
  ["05", "Ajustes, publicação e suporte inicial", "Refinar detalhes, revisar conteúdo, publicar o projeto e acompanhar os primeiros ajustes de uso."],
];

const scope = [
  "Home premium e responsiva",
  "Páginas de coleções",
  "Catálogo com filtros",
  "Página individual de vestido",
  "Sistema de favoritos",
  "Contato inteligente via WhatsApp",
  "Portal administrativo com login",
  "Cadastro e edição de vestidos",
  "Upload e organização de imagens",
  "Controle de status e disponibilidade",
  "Gestão de unidades e coleções",
  "Base para analytics e pixel",
];

const notIncluded = [
  "Aplicativo nativo na App Store ou Play Store",
  "Pagamento online completo na primeira fase",
  "Integração com ERP externo",
  "Automação oficial avançada de WhatsApp",
  "IA de recomendação automática de vestidos",
];

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#CFA77D]">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#24191C] md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-8 text-[#6F5C5F]">{text}</p>}
    </div>
  );
}

function MiniPreview() {
  return (
    <div className="rounded-[2rem] border border-[#E8D7C6] bg-white p-4 shadow-xl shadow-[#44281D]/10">
      <div className="rounded-[1.5rem] bg-[#151015] p-5 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#CFA77D]">Prévia visual</p>
            <h3 className="mt-1 font-display text-xl font-semibold">Novo site WM</h3>
          </div>
          <Crown className="text-[#CFA77D]" />
        </div>
        <div className="mt-5 rounded-3xl bg-gradient-to-br from-[#F7E9D9] to-[#CFA77D] p-5 text-[#24191C]">
          <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-70">Experiência da noiva</p>
          <h4 className="mt-3 font-display text-2xl font-bold leading-tight">Escolha por estilo, coleção e unidade.</h4>
          <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-semibold">
            {["Princesa", "Sereia", "Evasê", "Reto"].map((item) => (
              <span key={item} className="rounded-2xl bg-white/50 px-3 py-2 text-center">{item}</span>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white/10 p-4">
            <Heart className="mb-3 text-[#CFA77D]" size={20} />
            <p className="text-2xl font-semibold">Favoritos</p>
            <p className="mt-1 text-sm text-white/50">Seleção enviada à equipe</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <CalendarDays className="mb-3 text-[#CFA77D]" size={20} />
            <p className="text-2xl font-semibold">Provas</p>
            <p className="mt-1 text-sm text-white/50">Pedido organizado</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-[2rem] border border-[#E8D7C6] bg-white p-5 shadow-xl shadow-[#44281D]/10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#CFA77D]">Portal WM</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-[#24191C]">Área administrativa</h3>
        </div>
        <LayoutDashboard className="text-[#8B6748]" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["Vestidos", "248", "cadastrados"],
          ["Leads", "86", "novos"],
          ["Provas", "41", "na semana"],
          ["Favoritos", "1.284", "salvos"],
        ].map(([label, value, detail]) => (
          <div key={label} className="rounded-3xl bg-[#F7F0EA] p-4">
            <p className="text-sm text-[#80696B]">{label}</p>
            <p className="mt-1 font-display text-3xl font-semibold text-[#24191C]">{value}</p>
            <p className="mt-1 text-xs text-[#8E7779]">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-3xl border border-[#EAD9C9] p-4">
        {[
          ["Berta Bridal 20-113", "Disponível", "São Paulo"],
          ["Milla Nova Aurora", "Reservado", "Brasília"],
          ["Multimarcas Avrora", "Em prova", "Patos de Minas"],
        ].map(([name, status, unit]) => (
          <div key={name} className="flex items-center justify-between border-b border-[#EFE2D6] py-3 last:border-b-0">
            <div>
              <p className="font-medium text-[#24191C]">{name}</p>
              <p className="text-sm text-[#80696B]">{unit}</p>
            </div>
            <span className="rounded-full bg-[#F1DFC9] px-3 py-1 text-xs font-semibold text-[#7A5635]">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Proposta() {
  const [active, setActive] = useState<Tab>("Resumo");

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF7F2] text-[#24191C]">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-[#E8D7C6] bg-[#120D10] text-white">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#CFA77D]/40 blur-3xl" />
          <div className="absolute right-[-140px] top-28 h-[30rem] w-[30rem] rounded-full bg-[#6F4E37]/35 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
            <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#CFA77D]">ForYouCode</p>
                <h1 className="mt-2 font-display text-2xl font-semibold">Proposta · Novo site Espaço WM</h1>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-white/70">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`rounded-full px-4 py-2 transition ${
                      active === tab
                        ? "bg-[#F7E9D9] text-[#1A1114]"
                        : "border border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </nav>

            <div className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CFA77D]/30 bg-[#CFA77D]/10 px-4 py-2 text-sm text-[#F7E9D9]">
                  <Sparkles size={16} /> Ideia inicial para avaliarmos juntos
                </div>
                <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                  Um novo site para apresentar melhor a marca e facilitar a gestão dos vestidos.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                  A proposta é criar uma nova estrutura separada para a Espaço WM: mais elegante para as noivas, mais
                  prática para a equipe e com uma área interna para atualizar produtos sem depender de alterações
                  manuais no código.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {([
                    [PenTool, "Design premium"],
                    [PackageCheck, "Gestão de vestidos"],
                    [Users, "Leads organizados"],
                  ] as const).map(([Icon, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Icon className="mb-3 text-[#CFA77D]" size={20} />
                      <p className="font-medium text-white/85">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4 text-sm">
                  <Link
                    to="/catalogo"
                    className="rounded-full bg-[#F7E9D9] px-5 py-2.5 font-medium text-[#1A1114] hover:bg-white transition"
                  >
                    Ver prévia do site →
                  </Link>
                  <Link
                    to="/portal"
                    className="rounded-full border border-white/15 px-5 py-2.5 text-white/80 hover:bg-white/10 transition"
                  >
                    Ver Portal WM
                  </Link>
                </div>
              </motion.div>
              <MiniPreview />
            </div>
          </div>
        </section>

        {/* CONTEÚDO POR ABA */}
        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          {active === "Resumo" && (
            <motion.div
              key="resumo"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start"
            >
              <div>
                <SectionTitle
                  eyebrow="Resumo da proposta"
                  title="O projeto não é apenas um layout novo. É um site novo com estrutura de gestão."
                  text="A ideia é unir uma experiência mais bonita para quem está procurando vestidos com uma rotina mais simples para quem precisa manter catálogo, fotos, status e oportunidades atualizadas."
                />
                <div className="mt-7 rounded-[2rem] border border-[#E8D7C6] bg-white p-6 shadow-sm">
                  <h3 className="font-display text-2xl font-semibold">Entrega principal</h3>
                  <p className="mt-3 leading-8 text-[#6F5C5F]">
                    Novo site separado da estrutura atual, com catálogo de vestidos, páginas de coleção, experiência
                    de favoritos, contato inteligente pelo WhatsApp e um Portal WM para administração dos produtos e
                    oportunidades.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {deliverables.slice(0, 4).map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-[1.6rem] border border-[#E8D7C6] bg-white p-5 shadow-sm">
                    <Icon className="mb-4 text-[#8B6748]" size={24} />
                    <h3 className="font-display text-lg font-semibold">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6F5C5F]">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {active === "Entregas" && (
            <motion.div key="entregas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <SectionTitle
                eyebrow="O que será entregue"
                title="Escopo claro para a dona entender exatamente o que está incluso."
                text="Essa parte é a proposta em si: mostra o que a ForYouCode vai construir, quais partes fazem parte da primeira versão e onde o projeto pode evoluir depois."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {deliverables.map(({ icon: Icon, title, text }) => (
                  <motion.div
                    whileHover={{ y: -4 }}
                    key={title}
                    className="rounded-[1.7rem] border border-[#E8D7C6] bg-white p-6 shadow-sm"
                  >
                    <Icon className="mb-5 text-[#8B6748]" size={25} />
                    <h3 className="font-display text-xl font-semibold">{title}</h3>
                    <p className="mt-3 leading-7 text-[#6F5C5F]">{text}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-[#E8D7C6] bg-white p-7">
                  <h3 className="font-display text-2xl font-semibold">Incluso na primeira versão</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {scope.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-[#F7F0EA] p-3 text-sm">
                        <CheckCircle2 className="shrink-0 text-[#8B6748]" size={18} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-[#E8D7C6] bg-[#24191C] p-7 text-white">
                  <h3 className="font-display text-2xl font-semibold">Pode ficar para uma segunda fase</h3>
                  <div className="mt-5 space-y-3">
                    {notIncluded.map((item) => (
                      <div key={item} className="rounded-2xl bg-white/10 p-4 text-white/75">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {active === "Experiência" && (
            <motion.div key="exp" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <SectionTitle
                  eyebrow="Experiência da noiva"
                  title="O site precisa ajudar a cliente a chegar mais preparada no atendimento."
                  text="A navegação não deve ser só bonita. Ela deve ajudar a noiva a encontrar estilos, salvar referências e iniciar uma conversa com mais contexto para a consultora."
                />
                <div className="mt-8 space-y-4">
                  {[
                    ["Entrada pelo Instagram, Google ou indicação", "A cliente chega em uma home mais elegante e entende rápido a proposta da marca."],
                    ["Exploração por coleção e estilo", "Ela navega por vestidos importados, marcas, estilos e unidades de forma mais intuitiva."],
                    ["Favoritos e interesse", "Ela salva vestidos e cria uma seleção própria antes de chamar a equipe."],
                    ["Contato mais organizado", "O WhatsApp já pode carregar informações úteis sobre estilo, unidade e vestidos de interesse."],
                  ].map(([title, text], index) => (
                    <div key={title} className="flex gap-4 rounded-[1.5rem] border border-[#E8D7C6] bg-white p-5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1DFC9] font-semibold text-[#7A5635]">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="mt-1 leading-7 text-[#6F5C5F]">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/jornada"
                  className="mt-8 inline-block rounded-full bg-[#24191C] px-5 py-2.5 text-sm text-[#F7E9D9] hover:bg-[#3a262b] transition"
                >
                  Experimentar a jornada →
                </Link>
              </div>
              <MiniPreview />
            </motion.div>
          )}

          {active === "Painel" && (
            <motion.div key="painel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionTitle
                  eyebrow="Portal administrativo WM"
                  title="A parte mais importante da proposta: autonomia para atualizar o site."
                  text="A dona ou a equipe poderá cuidar do catálogo sem depender de ajustes manuais. Isso torna o site mais vivo e mais útil no dia a dia."
                />
                <div className="mt-7 rounded-[2rem] border border-[#E8D7C6] bg-white p-6">
                  <h3 className="font-display text-2xl font-semibold">O que a equipe poderá fazer</h3>
                  <div className="mt-5 space-y-3">
                    {[
                      "Cadastrar novos vestidos e coleções.",
                      "Editar fotos, descrição, marca, estilo e unidade.",
                      "Controlar status: disponível, reservado, em prova, alugado, vendido, ajuste ou limpeza.",
                      "Destacar peças na home ou em coleções específicas.",
                      "Visualizar contatos e interesses recebidos pelo site.",
                    ].map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-[#F7F0EA] p-4">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-[#8B6748]" size={19} />
                        <p className="leading-7 text-[#6F5C5F]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  to="/portal"
                  className="mt-6 inline-block rounded-full bg-[#24191C] px-5 py-2.5 text-sm text-[#F7E9D9] hover:bg-[#3a262b] transition"
                >
                  Abrir prévia do Portal WM →
                </Link>
              </div>
              <DashboardPreview />
            </motion.div>
          )}

          {active === "Etapas" && (
            <motion.div key="etapas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <SectionTitle
                eyebrow="Como podemos conduzir"
                title="Um caminho simples, sem pressão, para validar a ideia antes de construir tudo."
                text="Como é uma proposta feita para uma relação próxima, a abordagem pode ser leve: primeiro mostramos a visão, ouvimos a empresa e ajustamos o que fizer sentido."
              />
              <div className="mt-8 grid gap-4">
                {phases.map(([num, title, text]) => (
                  <div
                    key={num}
                    className="grid gap-4 rounded-[1.7rem] border border-[#E8D7C6] bg-white p-5 md:grid-cols-[90px_1fr] md:items-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#24191C] font-display text-xl font-semibold text-[#F7E9D9]">
                      {num}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold">{title}</h3>
                      <p className="mt-2 leading-7 text-[#6F5C5F]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[2rem] border border-[#E8D7C6] bg-[#F7F0EA] p-7">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B6748]">
                      Investimento estimado
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-semibold">Projeto na faixa de R$10 mil</h3>
                    <p className="mt-3 max-w-2xl leading-8 text-[#6F5C5F]">
                      Valor pensado para um novo site separado com experiência premium, catálogo gerenciável, painel
                      administrativo e estrutura inicial de leads. O escopo final pode ser ajustado após o diagnóstico.
                    </p>
                  </div>
                  <FileText className="shrink-0 text-[#8B6748]" size={40} />
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* FECHAMENTO */}
        <section className="border-t border-[#E8D7C6] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
            <div className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#CFA77D]">Resumo final</p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                  A entrega é uma nova estrutura digital, não apenas uma tela bonita.
                </h2>
                <p className="mt-4 leading-8 text-[#6F5C5F]">
                  Novo site, catálogo mais organizado, experiência melhor para a noiva e painel interno para a empresa
                  manter o conteúdo vivo com mais autonomia.
                </p>
              </div>
              <div className="rounded-[2rem] bg-[#24191C] p-6 text-white">
                <ShieldCheck className="mb-4 text-[#CFA77D]" size={28} />
                <h3 className="font-display text-2xl font-semibold">Próximo passo leve</h3>
                <p className="mt-3 leading-7 text-white/70">
                  Apresentar essa ideia, ouvir o que faz sentido para a rotina da empresa e ajustar o protótipo antes
                  de fechar o escopo final.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
