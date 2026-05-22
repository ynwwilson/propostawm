import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getDress, dresses } from "@/lib/dresses";
import { Heart, Send, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/vestido/$id")({
  loader: ({ params }) => {
    const dress = getDress(params.id);
    if (!dress) throw notFound();
    return { dress };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.dress.nome} — Espaço WM` },
      { name: "description", content: loaderData?.dress.descricao },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-3xl">Vestido não encontrado</p>
        <Link to="/catalogo" className="mt-6 inline-block text-xs tracking-luxe uppercase border-b border-accent pb-1">
          Voltar ao catálogo
        </Link>
      </div>
    </div>
  ),
  component: VestidoPage,
});

function VestidoPage() {
  const { dress } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [fav, setFav] = useState(false);
  const [sent, setSent] = useState(false);

  const relacionados = dresses.filter((d) => d.id !== dress.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="px-6 lg:px-16 pt-10 pb-20">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar às coleções
          </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Galeria */}
            <div className="lg:col-span-7 grid grid-cols-[80px_1fr] gap-5">
              <div className="flex flex-col gap-3">
                {dress.galeria.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`aspect-[3/4] overflow-hidden bg-secondary/40 border transition-all ${
                      active === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
              <div className="aspect-[3/4] overflow-hidden bg-secondary/40 fade-in">
                <img
                  key={active}
                  src={dress.galeria[active]}
                  alt={dress.nome}
                  className="h-full w-full object-cover reveal-img"
                />
              </div>
            </div>

            {/* Info */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start">
              <p className="text-xs tracking-luxe uppercase text-muted-foreground">{dress.marca}</p>
              <h1 className="font-display text-5xl md:text-6xl mt-3">{dress.nome}</h1>
              <div className="gold-line w-16 mt-6" />

              <dl className="mt-8 grid grid-cols-2 gap-y-5 text-sm">
                <Meta label="Estilo" value={dress.estilo} />
                <Meta label="Unidade" value={dress.unidade} />
                <Meta label="Marca" value={dress.marca} />
                <Meta label="Status" value={dress.status} />
              </dl>

              <p className="mt-8 text-muted-foreground leading-relaxed">{dress.descricao}</p>

              <div className="mt-10 flex flex-col gap-3">
                <button
                  onClick={() => setFav(!fav)}
                  className={`group inline-flex items-center justify-between gap-3 border px-6 py-4 text-xs tracking-luxe uppercase transition-all ${
                    fav
                      ? "bg-accent/20 border-accent text-foreground"
                      : "border-foreground/30 hover:border-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Heart className={`h-4 w-4 transition-all ${fav ? "fill-accent text-accent" : ""}`} />
                    {fav ? "Salvo nos favoritos" : "Adicionar aos favoritos"}
                  </span>
                </button>
                <button
                  onClick={() => setSent(true)}
                  className="group inline-flex items-center justify-between gap-3 bg-foreground text-background px-6 py-4 text-xs tracking-luxe uppercase hover:bg-cocoa transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Send className="h-4 w-4" />
                    {sent ? "Enviado para a consultora" : "Enviar para consultora"}
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
                {sent && (
                  <p className="text-xs text-muted-foreground fade-in">
                    Em breve uma consultora entrará em contato para agendar a sua prova.
                  </p>
                )}
              </div>
            </aside>
          </div>

          {/* Relacionados */}
          <div className="mt-32">
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-display text-3xl">Você também pode gostar</h2>
              <Link to="/catalogo" className="text-xs tracking-luxe uppercase border-b border-accent pb-1">
                Ver todos
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {relacionados.map((d) => (
                <Link key={d.id} to="/vestido/$id" params={{ id: d.id }} className="group lift block">
                  <div className="aspect-[3/4] overflow-hidden bg-secondary/40">
                    <img
                      src={d.imagem}
                      alt={d.nome}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="font-display text-xl mt-4">{d.nome}</p>
                  <p className="text-xs text-muted-foreground">{d.marca}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-luxe uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1.5 text-foreground">{value}</dd>
    </div>
  );
}
