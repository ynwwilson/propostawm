import { useNavigate } from "@tanstack/react-router";
import BubbleMenu, { type BubbleMenuItem } from "@/components/BubbleMenu";
import wmLogo from "@/assets/wm-logo.png";

export function SiteHeader() {
  const navigate = useNavigate();

  const items: BubbleMenuItem[] = [
    {
      label: "proposta",
      href: "/",
      ariaLabel: "Proposta",
      rotation: -8,
      hoverStyles: { bgColor: "#d8c7a8", textColor: "#1a1410" },
    },
    {
      label: "escopo",
      href: "/escopo",
      ariaLabel: "Escopo",
      rotation: 8,
      hoverStyles: { bgColor: "#1a1410", textColor: "#f5efe4" },
    },
  ];

  return (
    <div
      className="relative z-50"
      onClickCapture={(e) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest("a.pill-link") as HTMLAnchorElement | null;
        if (anchor) {
          const href = anchor.getAttribute("href");
          if (href && href.startsWith("/")) {
            e.preventDefault();
            navigate({ to: href });
          }
        }
      }}
    >
      <BubbleMenu
        logo={<img src={wmLogo} alt="WM" className="bubble-logo" />}
        items={items}
        menuAriaLabel="Abrir menu"
        menuBg="#f5efe4"
        menuContentColor="#1a1410"
        useFixedPosition
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    </div>
  );
}
