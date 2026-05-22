import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { PreviewBanner } from "@/components/PreviewBanner";
import { ESTILOS, MARCAS, UNIDADES } from "@/lib/dresses";
import { ArrowLeft, Upload, Check } from "lucide-react";

export const Route = createFileRoute("/portal/vestido/novo")({
  head: () => ({
    meta: [{ title: "Novo vestido — Portal WM" }],
  }),
  component: NovoVestido,
});

function NovoVestido() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    marca: MARCAS[0],
    estilo: ESTILOS[0],
    unidade: UNIDADES[0],
    status: "Disponível para prova",
    descricao: "",
  });

  return (
    <div className="min-h-screen bg-champagne/40">
      <SiteHeader />
      <PreviewBanner label="Prévia · Cadastro de vestido" description="Formulário usado pela equipe para publicar peças no site." />
      <section className="px-6 lg:px-16 pt-12 pb-28">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/portal"
            className="inline-flex items-center gap-2 text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao Portal
          </Link>

          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Portal WM</p>
          <h1 className="font-display text-5xl md:text-6xl mt-3">Cadastrar vestido</h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              setTimeout(() => navigate({ to: "/portal" }), 1600);
            }}
            className="mt-12 bg-card border border-border p-8 md:p-12 grid gap-8"
          >
            {/* Imagens */}
            <Field label="Imagens">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((i) => (
                  <button
                    type="button"
                    key={i}
                    className="aspect-[3/4] border border-dashed border-border hover:border-foreground transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Upload className="h-5 w-5" />
                    <span className="text-[10px] tracking-luxe uppercase">Imagem {i + 1}</span>
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Nome do vestido">
              <input
                type="text"
                placeholder="Ex: Aurora"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3.5 focus:border-foreground outline-none transition-colors"
              />
            </Field>

            <div className="grid md:grid-cols-2 gap-8">
              <Field label="Marca">
                <Select
                  value={form.marca}
                  onChange={(v) => setForm({ ...form, marca: v as typeof form.marca })}
                  options={[...MARCAS]}
                />
              </Field>
              <Field label="Estilo">
                <Select
                  value={form.estilo}
                  onChange={(v) => setForm({ ...form, estilo: v as typeof form.estilo })}
                  options={[...ESTILOS]}
                />
              </Field>
              <Field label="Unidade">
                <Select
                  value={form.unidade}
                  onChange={(v) => setForm({ ...form, unidade: v as typeof form.unidade })}
                  options={[...UNIDADES]}
                />
              </Field>
              <Field label="Status">
                <Select
                  value={form.status}
                  onChange={(v) => setForm({ ...form, status: v })}
                  options={["Disponível para prova", "Em prova", "Reservado"]}
                />
              </Field>
            </div>

            <Field label="Descrição">
              <textarea
                rows={5}
                placeholder="Conte sobre o caimento, tecido e detalhes especiais..."
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3.5 focus:border-foreground outline-none transition-colors resize-none"
              />
            </Field>

            <div className="pt-6 border-t border-border flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-muted-foreground">
                Ao publicar, o vestido aparece no catálogo da Espaço WM.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to="/portal"
                  className="text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={saved}
                  className="bg-secondary text-secondary-foreground px-7 py-4 text-xs tracking-luxe uppercase hover:bg-secondary/85 transition-colors disabled:opacity-70 inline-flex items-center gap-3"
                >
                  {saved ? (
                    <>
                      <Check className="h-4 w-4" /> Publicado
                    </>
                  ) : (
                    "Salvar e publicar no site"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-luxe uppercase text-muted-foreground">{label}</span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-border bg-background px-4 py-3.5 focus:border-foreground outline-none transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
