import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { dresses } from "@/lib/dresses";
import { Plus, TrendingUp, Users, Calendar, Heart } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Portal WM — Administrativo" },
      { name: "description", content: "Visão administrativa do acervo, leads e provas." },
    ],
  }),
  component: Portal,
});

const cards = [
  { icon: TrendingUp, label: "Vestidos cadastrados", value: "248", delta: "+12 este mês" },
  { icon: Users, label: "Leads novos", value: "37", delta: "Últimos 7 dias" },
  { icon: Calendar, label: "Provas agendadas", value: "14", delta: "Esta semana" },
  { icon: Heart, label: "Mais favoritados", value: "Serena", delta: "211 favoritos" },
];

function Portal() {
  const topFavoritos = [...dresses].sort((a, b) => b.favoritos - a.favoritos).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-champagne/40">
      <SiteHeader />
      <section className="px-6 lg:px-16 pt-12 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground">Portal WM</p>
              <h1 className="font-display text-5xl md:text-6xl mt-3">Boa tarde, equipe</h1>
              <p className="text-muted-foreground mt-3">
                Um panorama do acervo e das noivas em jornada.
              </p>
            </div>
            <Link
              to="/portal/vestido/novo"
              className="group inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors"
            >
              <Plus className="h-4 w-4" /> Cadastrar novo vestido
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((c) => (
              <div key={c.label} className="bg-card border border-border p-7 lift">
                <div className="flex items-center justify-between">
                  <p className="text-xs tracking-luxe uppercase text-muted-foreground">{c.label}</p>
                  <c.icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <p className="font-display text-5xl mt-6">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-3">{c.delta}</p>
              </div>
            ))}
          </div>

          {/* Two columns */}
          <div className="mt-14 grid lg:grid-cols-3 gap-8">
            {/* Lista de vestidos */}
            <div className="lg:col-span-2 bg-card border border-border">
              <header className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-2xl">Acervo</h2>
                <span className="text-xs tracking-luxe uppercase text-muted-foreground">
                  {dresses.length} itens
                </span>
              </header>
              <div className="divide-y divide-border">
                {dresses.map((d) => (
                  <div key={d.id} className="p-5 flex items-center gap-5 hover:bg-champagne/60 transition-colors">
                    <div className="h-16 w-12 overflow-hidden bg-champagne/50 flex-shrink-0">
                      <img src={d.imagem} alt={d.nome} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xl">{d.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {d.marca} · {d.estilo} · {d.unidade}
                      </p>
                    </div>
                    <StatusBadge status={d.status} />
                    <Link
                      to="/portal/vestido/novo"
                      className="text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Editar
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Mais favoritados */}
            <div className="bg-card border border-border">
              <header className="p-6 border-b border-border">
                <h2 className="font-display text-2xl">Mais favoritados</h2>
              </header>
              <ul className="divide-y divide-border">
                {topFavoritos.map((d, i) => (
                  <li key={d.id} className="p-5 flex items-center gap-4">
                    <span className="text-xs tracking-luxe uppercase text-muted-foreground w-6">
                      0{i + 1}
                    </span>
                    <div className="h-12 w-10 overflow-hidden bg-champagne/50 flex-shrink-0">
                      <img src={d.imagem} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-lg">{d.nome}</p>
                      <p className="text-xs text-muted-foreground">{d.estilo}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <Heart className="h-3 w-3 fill-accent text-accent" />
                      {d.favoritos}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Disponível para prova"
      ? "bg-accent/20 text-foreground"
      : status === "Em prova"
      ? "bg-secondary text-foreground"
      : "bg-secondary text-secondary-foreground";
  return (
    <span className={`text-[10px] tracking-luxe uppercase px-3 py-1.5 ${tone}`}>{status}</span>
  );
}
