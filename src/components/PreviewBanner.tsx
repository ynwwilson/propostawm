import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

interface PreviewBannerProps {
  label: string;
  description: string;
}

export function PreviewBanner({ label, description }: PreviewBannerProps) {
  return (
    <div className="border-b border-accent/30 bg-accent/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1 tracking-luxe uppercase">
            <Eye className="h-3 w-3" /> Prévia
          </span>
          <span className="tracking-luxe uppercase text-foreground/80">{label}</span>
          <span className="hidden md:inline text-muted-foreground">— {description}</span>
        </div>
        <Link
          to="/"
          className="tracking-luxe uppercase border-b border-accent pb-0.5 hover:border-foreground transition-colors duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          ← Voltar para a proposta
        </Link>
      </div>
    </div>
  );
}
