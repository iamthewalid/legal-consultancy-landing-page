import { motion } from "framer-motion";
import type { ReactNode } from "react";

const BN = "০১২৩৪৫৬৭৮৯";
export const toBn = (n: number | string) =>
  String(n).replace(/[0-9]/g, (d) => BN[+d]);

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  idx,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  idx: number;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <div
        className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="font-latin tracked text-[11px] text-[#c9a227]">
          {toBn(String(idx).padStart(2, "0"))}
        </span>
        <span className="h-px w-8 bg-[#c9a227]/60" />
        <span className="font-latin tracked text-[11px] text-[#8fa6ac]">{eyebrow}</span>
      </div>
      <h2 className="font-display font-black leading-[1.14] mt-4 text-[clamp(1.9rem,4.4vw,3.4rem)] text-[#f3ecdd]">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-[#8fa6ac] leading-relaxed text-[clamp(1rem,1.4vw,1.12rem)]">
          {lead}
        </p>
      )}
      <div className="hairline mt-7 w-full" />
    </div>
  );
}

export function Btn({
  children,
  href,
  variant = "brass",
  onClick,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  variant?: "brass" | "ghost";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const base =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 overflow-hidden group";
  const style =
    variant === "brass"
      ? "bg-gradient-to-b from-[#e7c766] to-[#c9a227] text-[#071319] hover:shadow-[0_14px_34px_-12px_rgba(201,162,39,0.75)] hover:-translate-y-0.5"
      : "glass-soft text-[#f3ecdd] hover:border-[#c9a227]/60 hover:bg-[#c9a227]/10";
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "brass" && (
        <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </>
  );
  if (href)
    return (
      <a href={href} className={`${base} ${style} ${className}`}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={`${base} ${style} ${className}`}>
      {inner}
    </button>
  );
}

/* Scales of justice mark — drawn, not generated */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 7v30" />
        <path d="M16 41h16" />
        <path d="M11 13h26" />
        <circle cx="24" cy="9.5" r="2.4" fill="currentColor" stroke="none" />
        <path d="M11 13 5 26a6.6 6.6 0 0 0 12 0Z" />
        <path d="M37 13l-6 13a6.6 6.6 0 0 0 12 0Z" />
        <path d="M17 41h14" />
      </g>
    </svg>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/8 px-4 py-1.5 text-[12px] text-[#e7c766] backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-[#25d366] shadow-[0_0_10px_#25d366]" />
      {children}
    </span>
  );
}
