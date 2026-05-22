import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Crown,
  Eye,
  FileText,
  ImagePlus,
  LayoutDashboard,
  PackageCheck,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Upload,
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
          "Proposta navegável: novo site institucional, catálogo gerenciável e Portal Administrativo WM para a equipe editar produtos sem depender de programador.",
      },
      { property: "og:title", content: "Proposta · Espaço WM" },
      {
        property: "og:description",
        content: "Novo site + catálogo editável + Portal Administrativo WM.",
      },
    ],
  }),
  component: Proposta,
});

const tabs = ["Resumo", "Entregas", "Portal WM", "Catálogo", "Etapas"] as const;
type Tab = (typeof tabs)[number];

const deliverables = [
  {
    icon: Store,
    title: "Novo site institucional",
    text: "Site separado do atual, com identidade própria, visual mais refinado e estrutura para apresentar coleções, vestidos, unidades e atendimento da Espaço WM.",
  },
  {
    icon: PackageCheck,
    title: "Catálogo gerenciável",
    text: "Vitrine de vestidos conectada ao Portal WM, permitindo que a equipe cadastre, edite, organize e publique produtos sem depender de programador.",
  },
  {
    icon: Search,
    title: "Filtros e organização do acervo",
    text: "Organização dos vestidos por marca, estilo, unidade, coleção, status e outros critérios definidos junto com a equipe.",
  },
  {
    icon: LayoutDashboard,
    title: "Portal Administrativo WM",
    text: "Área privada para gerenciar todos os produtos conectados ao site: imagens, descrições, disponibilidade, destaques e informações de cada peça.",
  },
  {
    icon: BarChart3,
    title: "Dados de interesse do catálogo",
    text: "Visualização simples dos vestidos mais acessados, mais favoritados e peças que mais despertam interesse, ajudando a entender melhor o acervo.",
  },
  {
    icon: ShieldCheck,
    title: "Estrutura técnica segura",
    text: "Base construída para ser responsiva, rápida, organizada e preparada para evoluções futuras sem travar a operação do site.",
  },
];

const included = [
  "Novo site separado do atual",
  "Home institucional premium",
  "Página de coleções",
  "Catálogo de vestidos",
  "Página individual de cada vestido",
  "Filtros por estilo, marca, unidade e status",
  "Sistema de favoritos para medir interesse",
  "Portal WM com login administrativo",
  "Cadastro e edição de produtos",
  "Upload e organização de imagens",
  "Controle de disponibilidade/status",
  "Publicação direta no site",
  "Destaques na home e no catálogo",
  "Base responsiva para celular e desktop",
];

const notIncluded = [
  "CRM comercial ou pipeline de vendas",
  "Jornada guiada da noiva em etapas",
  "Pagamento online completo",
  "Aplicativo nativo para App Store/Play Store",
  "Automação avançada de WhatsApp",
  "Integração com ERP externo",
  "IA recomendando vestidos automaticamente",
];

const phases: [string, string, string][] = [
  ["01", "Diagnóstico e organização do escopo", "Entender o site atual, estrutura de produtos, coleções, unidades, padrões de cadastro e como a equipe precisa editar os vestidos."],
  ["02", "Direção visual e protótipo", "Criar uma prévia navegável da proposta para validar estilo, navegação, catálogo e Portal WM antes do desenvolvimento final."],
  ["03", "Desenvolvimento do novo site", "Construir home, coleções, catálogo, páginas de vestidos, unidades e estrutura responsiva para celular e desktop."],
  ["04", "Desenvolvimento do Portal WM", "Criar a área privada para cadastrar, editar, organizar, destacar e publicar vestidos conectados ao site."],
  ["05", "Revisão, publicação e ajustes iniciais", "Revisar conteúdo, testar cadastros, validar responsividade, publicar e acompanhar os primeiros ajustes de uso."],
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

function SitePreview() {
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
          <p className="text-xs font-bold uppercase tracking-[0.22em] opacity-70">Catálogo premium</p>
          <h4 className="mt-3 font-display text-2xl font-bold leading-tight">Vestidos organizados por coleção, estilo e unidade.</h4>
          <div className="mt-5 grid grid-cols-2 gap-2 text-sm font-semibold">
            {["Princesa", "Sereia", "Evasê", "Reto"].map((item) => (
              <span key={item} className="rounded-2xl bg-white/50 px-3 py-2 text-center">{item}</span>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-white/10 p-4">
            <Eye className="mb-3 text-[#CFA77D]" size={20} />
            <p className="text-2xl font-semibold">Visual</p>
            <p className="mt-1 text-sm text-white/50">mais refinado</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <Search className="mb-3 text-[#CFA77D]" size={20} />
            <p className="text-2xl font-semibold">Filtros</p>
            <p className="mt-1 text-sm text-white/50">mais práticos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PortalPreview() {
  return (
    <div className="rounded-[2rem] border border-[#E8D7C6] bg-white p-5 shadow-xl shadow-[#44281D]/10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#CFA77D]">Portal WM</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-[#24191C]">Gestão do catálogo</h3>
        </div>
        <LayoutDashboard className="text-[#8B6748]" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["Vestidos", "248", "cadastrados"],
          ["Disponíveis", "173", "no site"],
          ["Favoritos", "1.284", "registrados"],
          ["Destaques", "32", "na home"],
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
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#CFA77D]/30 bg-[#CFA77D]/10 px-4 py-2 text-sm text-[#F7E9D9]">
                  <Sparkles size={16} /> Ideia inicial para avaliarmos juntos
                </div>
                <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                  Um novo site mais elegante, com um Portal WM para editar o acervo.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
                  A proposta é criar um site separado do atual, com uma apresentação mais refinada da marca e uma área
                  administrativa onde a equipe possa cadastrar, editar e publicar vestidos conectados ao site.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {([
                    [PenTool, "Site premium"],
                    [PackageCheck, "Produtos editáveis"],
                    [Upload, "Publicação simples"],
                  ] as const).map(([Icon, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <Icon className="mb-3 text-[#CFA77D]" size={20} />
                      <p className="font-medium text-white/85">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4 text-sm">
                  <Link to="/catalogo" className="rounded-full bg-[#F7E9D9] px-5 py-2.5 font-medium text-[#1A1114] hover:bg-white transition">
                    Ver prévia do site →
                  </Link>
                  <Link to="/portal" className="rounded-full border border-white/15 px-5 py-2.5 text-white/80 hover:bg-white/10 transition">
                    Ver Portal WM
                  </Link>
                </div>
              </motion.div>
              <SitePreview />
            </div>
          </div>
        </section>

        {/* CONTEÚDO POR ABA */}
        <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
          {active === "Resumo" && (
            <motion.div key="resumo" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <SectionTitle
                  eyebrow="Resumo da proposta"
                  title="A entrega é objetiva: novo site + Portal WM para gerenciar produtos."
                  text="A ideia não é criar CRM, jornada complexa da noiva ou automações avançadas nesta primeira versão. O foco é construir uma presença digital melhor e dar autonomia para a equipe manter o catálogo atualizado."
                />
                <div className="mt-7 rounded-[2rem] border border-[#E8D7C6] bg-white p-6 shadow-sm">
                  <h3 className="font-display text-2xl font-semibold">Entrega principal</h3>
                  <p className="mt-3 leading-8 text-[#6F5C5F]">
                    Um novo site separado para a Espaço WM, com catálogo de vestidos conectado a uma área administrativa
                    onde a equipe poderá editar qualquer produto publicado no site.
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
                title="Escopo enxuto, claro e conectado ao que o projeto realmente precisa fazer."
                text="A proposta deve mostrar que a ForYouCode vai entregar um site superior ao atual e um painel interno para manter o acervo vivo, sem prometer CRM ou fluxos que não farão parte do negócio agora."
              />
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {deliverables.map(({ icon: Icon, title, text }) => (
                  <motion.div whileHover={{ y: -4 }} key={title} className="rounded-[1.7rem] border border-[#E8D7C6] bg-white p-6 shadow-sm">
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
                    {included.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-[#F7F0EA] p-3 text-sm">
                        <CheckCircle2 className="shrink-0 text-[#8B6748]" size={18} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-[#E8D7C6] bg-[#24191C] p-7 text-white">
                  <h3 className="font-display text-2xl font-semibold">Não faz parte desta primeira versão</h3>
                  <div className="mt-5 space-y-3">
                    {notIncluded.map((item) => (
                      <div key={item} className="rounded-2xl bg-white/10 p-4 text-white/75">{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {active === "Portal WM" && (
            <motion.div key="portal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionTitle
                  eyebrow="Portal Administrativo WM"
                  title="A equipe poderá editar qualquer produto conectado ao site."
                  text="Essa é a parte mais importante do projeto: o site não fica travado. A própria equipe consegue manter os vestidos, imagens e informações atualizadas."
                />
                <div className="mt-7 rounded-[2rem] border border-[#E8D7C6] bg-white p-6">
                  <h3 className="font-display text-2xl font-semibold">O que será possível gerenciar</h3>
                  <div className="mt-5 space-y-3">
                    {[
                      "Cadastrar novos vestidos e coleções.",
                      "Editar fotos, nome, descrição, marca, estilo e unidade.",
                      "Alterar status: disponível, reservado, em prova, alugado, vendido, ajuste ou limpeza.",
                      "Definir quais peças aparecem como destaque no site.",
                      "Visualizar dados simples como vestidos mais acessados ou mais favoritados.",
                    ].map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-[#F7F0EA] p-4">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-[#8B6748]" size={19} />
                        <p className="leading-7 text-[#6F5C5F]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to="/portal" className="mt-6 inline-block rounded-full bg-[#24191C] px-5 py-2.5 text-sm text-[#F7E9D9] hover:bg-[#3a262b] transition">
                  Abrir prévia do Portal WM →
                </Link>
              </div>
              <PortalPreview />
            </motion.div>
          )}

          {active === "Catálogo" && (
            <motion.div key="catalogo" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
              <div>
                <SectionTitle
                  eyebrow="Catálogo conectado ao Portal WM"
                  title="O catálogo deixa de ser estático e passa a ser gerenciável."
                  text="A proposta é que cada vestido publicado no site venha do Portal WM. Assim, quando a equipe muda imagem, status ou descrição no painel, o site reflete essa informação."
                />
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {([
                    [ImagePlus, "Imagens", "Upload e organização das fotos de cada vestido."],
                    [PackageCheck, "Status", "Disponível, reservado, em prova, alugado, vendido ou em ajuste."],
                    [Search, "Filtros", "Busca por estilo, marca, unidade, coleção e disponibilidade."],
                    [BarChart3, "Interesse", "Visualização dos vestidos mais acessados e mais favoritados."],
                  ] as const).map(([Icon, title, text]) => (
                    <div key={title} className="rounded-[1.6rem] border border-[#E8D7C6] bg-white p-5">
                      <Icon className="mb-4 text-[#8B6748]" size={24} />
                      <h3 className="font-display text-lg font-semibold">{title}</h3>
                      <p className="mt-2 leading-7 text-[#6F5C5F]">{text}</p>
                    </div>
                  ))}
                </div>
                <Link to="/catalogo" className="mt-8 inline-block rounded-full bg-[#24191C] px-5 py-2.5 text-sm text-[#F7E9D9] hover:bg-[#3a262b] transition">
                  Ver catálogo navegável →
                </Link>
              </div>
              <SitePreview />
            </motion.div>
          )}

          {active === "Etapas" && (
            <motion.div key="etapas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <SectionTitle
                eyebrow="Como podemos conduzir"
                title="Um caminho simples para validar a ideia e depois desenvolver com segurança."
                text="A abordagem pode ser leve: primeiro apresentamos a visão, ajustamos o que fizer sentido e fechamos o escopo final antes de construir a versão definitiva."
              />
              <div className="mt-8 grid gap-4">
                {phases.map(([num, title, text]) => (
                  <div key={num} className="grid gap-4 rounded-[1.7rem] border border-[#E8D7C6] bg-white p-5 md:grid-cols-[90px_1fr] md:items-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#24191C] font-display text-xl font-semibold text-[#F7E9D9]">{num}</div>
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
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B6748]">Investimento estimado</p>
                    <h3 className="mt-2 font-display text-3xl font-semibold">Projeto na faixa de R$10 mil</h3>
                    <p className="mt-3 max-w-2xl leading-8 text-[#6F5C5F]">
                      Valor pensado para um novo site separado, com catálogo gerenciável e Portal WM para edição dos
                      produtos conectados ao site. O escopo final pode ser ajustado após o diagnóstico.
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
                  A entrega é um site novo com catálogo editável, não um sistema comercial completo.
                </h2>
                <p className="mt-4 leading-8 text-[#6F5C5F]">
                  A primeira versão fica objetiva: novo site, catálogo bonito, produtos gerenciáveis e Portal WM para
                  manter o acervo atualizado com autonomia.
                </p>
              </div>
              <div className="rounded-[2rem] bg-[#24191C] p-6 text-white">
                <ShieldCheck className="mb-4 text-[#CFA77D]" size={28} />
                <h3 className="font-display text-2xl font-semibold">Próximo passo leve</h3>
                <p className="mt-3 leading-7 text-white/70">
                  Apresentar essa estrutura, ouvir o que faz sentido para a rotina da empresa e ajustar o protótipo antes
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
