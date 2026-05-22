import { Link, useRouterState } from "@tanstack/react-router";

const nav = [
  { to: "/", label: "Início" },
  { to: "/catalogo", label: "Coleções" },
  { to: "/jornada", label: "Jornada da Noiva" },
  { to: "/portal", label: "Portal WM" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-display text-2xl tracking-tight">Espaço</span>
          <span className="h-5 w-px bg-accent/70" />
          <span className="text-xs tracking-luxe uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            WM
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-sm tracking-wide text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-500 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <Link
          to="/jornada"
          className="hidden md:inline-flex items-center gap-2 text-xs tracking-luxe uppercase border-b border-accent pb-1 hover:border-foreground transition-colors"
        >
          Agendar visita
        </Link>
      </div>
    </header>
  );
}
