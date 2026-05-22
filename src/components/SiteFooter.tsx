export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl leading-tight max-w-sm">
            Cada vestido escolhido aqui acompanha um pedaço da sua história.
          </p>
        </div>


        <div>
          <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-4">Unidades</p>
          <ul className="space-y-2 text-sm">
            <li>São Paulo · Jardins</li>
            <li>Brasília · Lago Sul</li>
            <li>Patos de Minas · Centro</li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-luxe uppercase text-muted-foreground mb-4">Atendimento</p>
          <ul className="space-y-2 text-sm">
            <li>Consultoria individual</li>
            <li>Visitas com hora marcada</li>
            <li>contato@espacowm.com.br</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Espaço WM · Protótipo de proposta</span>
          <span className="tracking-luxe uppercase">Feito com carinho</span>
        </div>
      </div>
    </footer>
  );
}
