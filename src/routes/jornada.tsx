import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { dresses, ESTILOS, UNIDADES } from "@/lib/dresses";
import { Check, Heart } from "lucide-react";

export const Route = createFileRoute("/jornada")({
  head: () => ({
    meta: [
      { title: "Jornada da Noiva — Espaço WM" },
      { name: "description", content: "Sua jornada em cinco passos guiados, do estilo à consultora." },
    ],
  }),
  component: Jornada,
});

const steps = ["Estilo", "Data", "Unidade", "Favoritos", "Consultora"];

function Jornada() {
  const [step, setStep] = useState(0);
  const [estilo, setEstilo] = useState<string | null>(null);
  const [data, setData] = useState("");
  const [unidade, setUnidade] = useState<string | null>(null);
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [enviado, setEnviado] = useState(false);

  const progress = ((step + 1) / steps.length) * 100;
  const canNext =
    (step === 0 && !!estilo) ||
    (step === 1 && !!data) ||
    (step === 2 && !!unidade) ||
    (step === 3 && favs.size > 0) ||
    step === 4;

  const sugeridos = dresses.filter((d) => !estilo || d.estilo === estilo).slice(0, 6);

  const toggleFav = (id: string) => {
    setFavs((p) => {
      const s = new Set(p);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="px-6 lg:px-16 pt-16 pb-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Jornada da Noiva</p>
          <h1 className="font-display text-5xl md:text-6xl mt-4">
            Cinco passos, no seu tempo
          </h1>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Pensamos esta jornada para que tudo flua com leveza. Você pode voltar atrás sempre que quiser.
          </p>

          {/* progress */}
          <div className="mt-14">
            <div className="flex items-center justify-between mb-3 text-xs tracking-luxe uppercase">
              {steps.map((s, i) => (
                <span
                  key={s}
                  className={`transition-colors ${i <= step ? "text-foreground" : "text-muted-foreground/60"}`}
                >
                  {i + 1}. {s}
                </span>
              ))}
            </div>
            <div className="h-px bg-border relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-accent transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-16 pb-32">
        <div className="mx-auto max-w-5xl border border-border bg-card p-8 md:p-14 shadow-soft min-h-[420px]">
          {step === 0 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl">Qual estilo conversa mais com você?</h2>
              <p className="text-muted-foreground mt-3">
                Não se preocupe — você poderá explorar outros depois.
              </p>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-3">
                {ESTILOS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEstilo(e)}
                    className={`aspect-square border transition-all flex items-center justify-center font-display text-xl ${
                      estilo === e
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl">Quando será a celebração?</h2>
              <p className="text-muted-foreground mt-3">
                Assim conseguimos respeitar o seu cronograma de provas.
              </p>
              <div className="mt-10 max-w-md">
                <label className="text-xs tracking-luxe uppercase text-muted-foreground">
                  Data do evento
                </label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="mt-3 w-full border border-border bg-background px-4 py-4 text-lg focus:border-foreground outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl">Qual unidade fica mais perto de você?</h2>
              <div className="mt-10 grid md:grid-cols-3 gap-4">
                {UNIDADES.map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnidade(u)}
                    className={`text-left p-8 border transition-all ${
                      unidade === u
                        ? "border-foreground bg-secondary/60"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    <p className="text-xs tracking-luxe uppercase text-muted-foreground">Unidade</p>
                    <p className="font-display text-2xl mt-3">{u}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h2 className="font-display text-3xl">Selecione os seus favoritos</h2>
              <p className="text-muted-foreground mt-3">
                Aqui estão sugestões alinhadas ao estilo {estilo}. Toque no coração dos que você ama.
              </p>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5">
                {sugeridos.map((d) => {
                  const f = favs.has(d.id);
                  return (
                    <button
                      key={d.id}
                      onClick={() => toggleFav(d.id)}
                      className="group relative aspect-[3/4] overflow-hidden bg-secondary/40"
                    >
                      <img
                        src={d.imagem}
                        alt={d.nome}
                        loading="lazy"
                        className={`h-full w-full object-cover transition-all duration-700 ${
                          f ? "scale-105" : "group-hover:scale-105"
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity ${
                          f ? "bg-foreground/30" : "bg-foreground/0 group-hover:bg-foreground/10"
                        }`}
                      />
                      <span className="absolute top-3 right-3 bg-background/90 p-2 rounded-full">
                        <Heart className={`h-4 w-4 ${f ? "fill-accent text-accent" : "text-muted-foreground"}`} />
                      </span>
                      <span className="absolute bottom-3 left-3 text-background font-display text-xl drop-shadow">
                        {d.nome}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && !enviado && (
            <div className="fade-in">
              <h2 className="font-display text-3xl">Tudo pronto para enviar?</h2>
              <p className="text-muted-foreground mt-3">
                Sua consultora vai receber o resumo abaixo e entrar em contato para agendar a prova.
              </p>
              <div className="mt-10 grid md:grid-cols-2 gap-4 text-sm">
                <Resumo label="Estilo preferido" value={estilo || "—"} />
                <Resumo label="Data do evento" value={data || "—"} />
                <Resumo label="Unidade" value={unidade || "—"} />
                <Resumo label="Favoritos" value={`${favs.size} vestido(s)`} />
              </div>
              <button
                onClick={() => setEnviado(true)}
                className="mt-10 bg-foreground text-background px-8 py-4 text-xs tracking-luxe uppercase hover:bg-cocoa transition-colors"
              >
                Enviar para consultora
              </button>
            </div>
          )}

          {step === 4 && enviado && (
            <div className="fade-in text-center py-10">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent/30 flex items-center justify-center">
                <Check className="h-8 w-8 text-foreground" />
              </div>
              <h2 className="font-display text-4xl mt-8">Seu pedido chegou até nós</h2>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                Uma consultora da unidade {unidade} entrará em contato nas próximas horas para conversar sobre os seus favoritos.
              </p>
              <Link
                to="/catalogo"
                className="mt-10 inline-block text-xs tracking-luxe uppercase border-b border-accent pb-1"
              >
                Continuar explorando coleções
              </Link>
            </div>
          )}

          {/* nav */}
          {!enviado && (
            <div className="mt-14 pt-8 border-t border-border flex items-center justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
              >
                ← Voltar
              </button>
              {step < 4 && (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext}
                  className="bg-foreground text-background px-6 py-3 text-xs tracking-luxe uppercase hover:bg-cocoa transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Avançar →
                </button>
              )}
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Resumo({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border p-5">
      <p className="text-xs tracking-luxe uppercase text-muted-foreground">{label}</p>
      <p className="font-display text-2xl mt-2">{value}</p>
    </div>
  );
}
