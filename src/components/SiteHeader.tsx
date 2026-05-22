import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import BubbleMenu, { type BubbleMenuItem } from "@/components/BubbleMenu";


export function SiteHeader() {
  const navigate = useNavigate();
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
      className={`relative z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-[140%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
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
