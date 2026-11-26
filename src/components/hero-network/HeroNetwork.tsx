// React wrapper for the PrimeLink hero network animation.
// Put hero-network.js and hero-network.css next to this file (e.g. src/components/hero-network/).
import { useEffect, useRef } from "react";
import { mountHeroNetwork } from "./hero-network.js";
import "./hero-network.css";

type Props = {
  labels?: string[];
  theme?: "auto" | "light" | "dark";
  className?: string;
};

export default function HeroNetwork({ labels, theme = "auto", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const destroy = mountHeroNetwork(ref.current, { labels, theme });
    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, (labels || []).join("|")]);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
