import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import wmLogo from "@/assets/wm-logo.png";






const nav = [
  { to: "/", label: "Proposta" },
  { to: "/escopo", label: "Escopo" },
];


export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (y < 80) setHidden(false);
      else if (delta > 0) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-display text-2xl tracking-tight">Espaço</span>
          <span className="h-5 w-px bg-accent/70" />
          <span className="text-xs tracking-luxe uppercase text-muted-foreground group-hover:text-foreground transition-colors">
            WM · Proposta
          </span>

        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative text-sm tracking-wide text-foreground/75 hover:text-foreground transition-colors"
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
          to="/escopo"
          className="hidden md:inline-flex items-center gap-2 text-xs tracking-luxe uppercase border-b border-accent pb-1 hover:border-foreground transition-colors"
        >
          Ver escopo
        </Link>
      </div>
    </header>
  );
}
