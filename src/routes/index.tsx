import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import heroBride from "@/assets/hero-bride.jpg";
import { dresses } from "@/lib/dresses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Espaço WM — A nova experiência digital" },
      {
        name: "description",
        content:
          "Coleções exclusivas, atendimento consultivo e a jornada completa para a sua escolha. Conheça a proposta digital da Espaço WM.",
      },
      { property: "og:title", content: "Espaço WM — A nova experiência digital" },
      {
        property: "og:description",
        content: "Vestidos de noiva selecionados, consultoria individual e jornada digital fluida.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const destaques = dresses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* HERO */}
      <section className="relative">
        <div className="grid lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
          <div className="lg:col-span-6 flex items-center px-6 lg:px-16 py-20 relative">
            <div className="max-w-xl fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-[11px] tracking-luxe uppercase text-foreground">
                <Sparkles className="h-3 w-3 text-accent" /> Proposta · 2026
              </div>
              <h1 className="mt-8 font-display text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-balance">
                A nova experiência <span className="font-display-italic text-cocoa">digital</span> da Espaço WM
              </h1>
              <p className="mt-8 text-base text-muted-foreground max-w-md leading-relaxed">
                Uma plataforma desenhada para acolher cada noiva desde o primeiro olhar até a prova final.
                Coleções selecionadas, jornada guiada e atendimento próximo — agora em um só lugar.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/catalogo"
                  className="group inline-flex items-center gap-3 bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors"
                >
                  Conhecer coleções
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  to="/jornada"
                  className="text-xs tracking-luxe uppercase border-b border-accent pb-1 hover:border-foreground transition-colors"
                >
                  Ver proposta
                </Link>
              </div>
              <div className="mt-16 flex items-center gap-8 text-xs tracking-luxe uppercase text-muted-foreground">
                <span>3 unidades</span>
                <span className="h-3 w-px bg-border" />
                <span>+ 240 vestidos</span>
                <span className="h-3 w-px bg-border" />
                <span>Atendimento 1:1</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative bg-champagne/50 overflow-hidden">
            <img
              src={heroBride}
              alt="Noiva com vestido em tule champagne"
              className="absolute inset-0 h-full w-full object-cover reveal-img"
              width={1080}
              height={1920}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-background fade-in">
              <div className="gold-line w-16 mb-4 opacity-80" />
              <p className="font-display text-2xl max-w-sm">
                "Cada vestido começa com uma conversa."
              </p>
              <p className="text-xs tracking-luxe uppercase mt-2 opacity-80">Equipe WM</p>
            </div>
          </div>
        </div>
      </section>

      {/* COLEÇÕES */}
      <section className="px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between mb-14 gap-8 flex-wrap">
            <div>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground">01 · Coleções</p>
              <h2 className="font-display text-4xl md:text-5xl mt-4 max-w-xl">
                Vestidos escolhidos a dedo, em cada estação
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="text-xs tracking-luxe uppercase border-b border-accent pb-1"
            >
              Ver catálogo completo
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {destaques.map((d) => (
              <Link
                key={d.id}
                to="/vestido/$id"
                params={{ id: d.id }}
                className="group block lift"
              >
                <div className="aspect-[3/4] overflow-hidden bg-champagne/50">
                  <img
                    src={d.imagem}
                    alt={d.nome}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl">{d.nome}</h3>
                    <span className="text-xs tracking-luxe uppercase text-muted-foreground">
                      {d.estilo}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{d.marca}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ESTILOS */}
      <section className="bg-champagne/50 px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">02 · Estilos</p>
          <h2 className="font-display text-4xl md:text-5xl mt-4 max-w-xl">
            Encontre o seu, do clássico ao contemporâneo
          </h2>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-px bg-border">
            {["Princesa", "Sereia", "Evasê", "Reto", "Midi"].map((e, i) => (
              <Link
                key={e}
                to="/catalogo"
                search={{ estilo: e }}
                className="bg-background p-8 hover:bg-accent/20 transition-colors group"
              >
                <p className="text-xs tracking-luxe uppercase text-muted-foreground">
                  0{i + 1}
                </p>
                <p className="font-display text-2xl mt-8 group-hover:translate-x-1 transition-transform">
                  {e}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section className="px-6 lg:px-16 py-28">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-10">
          <div>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">03 · Unidades</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              Três endereços, a mesma escuta atenta
            </h2>
          </div>
          {[
            { nome: "São Paulo", bairro: "Jardins", desc: "Atelier principal com coleção completa e provadores reservados." },
            { nome: "Brasília", bairro: "Lago Sul", desc: "Curadoria especial para noivas da capital, com vestidos exclusivos." },
            { nome: "Patos de Minas", bairro: "Centro", desc: "Atendimento íntimo e personalizado para quem vem do interior." },
          ].map((u) => (
            <div key={u.nome} className="border-t border-border pt-6 lift p-6 -m-6">
              <p className="text-xs tracking-luxe uppercase text-accent-foreground">
                {u.bairro}
              </p>
              <h3 className="font-display text-3xl mt-3">{u.nome}</h3>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{u.desc}</p>
              <div className="gold-line w-12 mt-6" />
            </div>
          ))}
        </div>
      </section>

      {/* ATENDIMENTO CONSULTIVO */}
      <section className="px-6 lg:px-16 py-32">
        <div className="mx-auto max-w-5xl rounded-3xl border border-accent/20 bg-accent/10 p-10 md:p-16 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
            <Sparkles className="h-6 w-6" />
          </div>
          <p className="text-xs tracking-luxe uppercase text-accent">
            04 · Atendimento consultivo
          </p>
          <h2 className="font-display text-4xl md:text-6xl mt-6 leading-tight">
            Mais que uma escolha de vestido,<br />
            <span className="text-accent">uma escuta dedicada.</span>
          </h2>
          <p className="mt-8 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cada noiva é recebida por uma consultora que acompanha desde a inspiração inicial até a última prova.
            Sem pressa, sem pressão — apenas o tempo necessário para que tudo faça sentido.
          </p>
          <div className="mt-12 flex justify-center gap-6 flex-wrap">
            <Link
              to="/jornada"
              className="bg-secondary text-secondary-foreground px-8 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors rounded-2xl"
            >
              Começar minha jornada
            </Link>
            <Link
              to="/catalogo"
              className="text-xs tracking-luxe uppercase border-b border-accent pb-1 self-center"
            >
              Explorar coleções
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
