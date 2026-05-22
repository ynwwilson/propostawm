import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { dresses, ESTILOS, MARCAS, UNIDADES } from "@/lib/dresses";
import { Heart, MessageCircle } from "lucide-react";

type Search = { estilo?: string; marca?: string; unidade?: string };

export const Route = createFileRoute("/catalogo")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    estilo: typeof s.estilo === "string" ? s.estilo : undefined,
    marca: typeof s.marca === "string" ? s.marca : undefined,
    unidade: typeof s.unidade === "string" ? s.unidade : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Coleções — Espaço WM" },
      { name: "description", content: "Catálogo curado de vestidos de noiva da Espaço WM." },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const initial = Route.useSearch();
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set());
  const [estilo, setEstilo] = useState<string | undefined>(initial.estilo);
  const [marca, setMarca] = useState<string | undefined>(initial.marca);
  const [unidade, setUnidade] = useState<string | undefined>(initial.unidade);

  const filtered = useMemo(
    () =>
      dresses.filter(
        (d) =>
          (!estilo || d.estilo === estilo) &&
          (!marca || d.marca === marca) &&
          (!unidade || d.unidade === unidade),
      ),
    [estilo, marca, unidade],
  );

  const toggleFav = (id: string) => {
    setFavoritos((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="px-6 lg:px-16 pt-16 pb-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Coleções</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4 max-w-3xl">
            Toda a curadoria, em um só lugar
          </h1>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Filtre por estilo, marca ou unidade. Salve os seus favoritos e converse com uma consultora quando quiser.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-16 sticky top-20 z-30 bg-background/85 backdrop-blur-md border-y border-border/60">
        <div className="mx-auto max-w-7xl py-5 flex flex-wrap items-center gap-6">
          <FilterGroup
            label="Estilo"
            value={estilo}
            onChange={setEstilo}
            options={ESTILOS}
          />
          <FilterGroup
            label="Marca"
            value={marca}
            onChange={setMarca}
            options={MARCAS}
          />
          <FilterGroup
            label="Unidade"
            value={unidade}
            onChange={setUnidade}
            options={UNIDADES}
          />
          {(estilo || marca || unidade) && (
            <button
              onClick={() => {
                setEstilo(undefined);
                setMarca(undefined);
                setUnidade(undefined);
              }}
              className="text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </section>

      <section className="px-6 lg:px-16 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-8">
            {filtered.length} vestido{filtered.length !== 1 && "s"} encontrado{filtered.length !== 1 && "s"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map((d) => {
              const fav = favoritos.has(d.id);
              return (
                <article key={d.id} className="group fade-up">
                  <Link to="/vestido/$id" params={{ id: d.id }} className="block relative overflow-hidden bg-white/[0.045]">
                    <div className="aspect-[3/4]">
                      <img
                        src={d.imagem}
                        alt={d.nome}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="absolute top-4 left-4 bg-background/90 text-foreground text-[10px] tracking-luxe uppercase px-3 py-1.5">
                      {d.status}
                    </span>
                  </Link>
                  <div className="pt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl">{d.nome}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {d.marca} · {d.estilo} · {d.unidade}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleFav(d.id)}
                      aria-label="Favoritar"
                      className="p-2 -m-2 transition-transform hover:scale-110"
                    >
                      <Heart
                        className={`h-5 w-5 transition-all ${
                          fav ? "fill-accent text-accent" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="mt-5 flex items-center gap-5 text-xs tracking-luxe uppercase">
                    <Link
                      to="/vestido/$id"
                      params={{ id: d.id }}
                      className="border-b border-accent pb-0.5 hover:border-foreground transition-colors"
                    >
                      Ver detalhes
                    </Link>
                    <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                      <MessageCircle className="h-3.5 w-3.5" /> Consultora
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              Nenhum vestido com esses filtros. Tente combinar de outra forma.
            </p>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T | string | undefined;
  onChange: (v: T | undefined) => void;
  options: readonly T[];
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs tracking-luxe uppercase text-muted-foreground">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              onClick={() => onChange(active ? undefined : (opt as T))}
              className={`text-xs px-3 py-1.5 border transition-all ${
                active
                  ? "border-foreground bg-secondary text-secondary-foreground"
                  : "border-border text-foreground/75 hover:border-foreground"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
