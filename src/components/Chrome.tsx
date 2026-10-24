import { useEffect, useState } from "react";
import { Mark, toBn } from "../lib/ui";
import { FIRM, waLink } from "../data";

const NAV = [
  { id: "services", t: "সেবা" },
  { id: "why", t: "কেন আমরা" },
  { id: "compare", t: "তুলনা" },
  { id: "videos", t: "ভিডিও" },
  { id: "founder", t: "ফাউন্ডার" },
  { id: "plans", t: "ফি" },
];

export function LeftRail() {
  return (
    <aside className="hidden xl:flex fixed left-0 top-0 z-40 h-screen w-14 flex-col items-center justify-between border-r border-[#c9a227]/20 bg-[#071319]/70 py-6 backdrop-blur-md">
      <span className="text-[#c9a227]">
        <Mark className="h-7 w-7" />
      </span>
      <div
        className="font-latin tracked text-[11px] text-[#8fa6ac]"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        আইনি সহায়তা <span className="text-[#c9a227]">·</span> Legal Solutions · Dhaka
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="h-10 w-px bg-gradient-to-b from-transparent to-[#c9a227]/70" />
        <span className="font-latin text-[11px] text-[#c9a227]">'২৬</span>
      </div>
    </aside>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 xl:left-14 ${
        solid ? "glass-nav" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3.5 md:px-9">
        <a href="#top" className="flex items-center gap-3">
          <span className="text-[#c9a227]">
            <Mark className="h-8 w-8" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-[15px] font-extrabold text-[#f3ecdd] md:text-[17px]">
              Legal Solutions
            </span>
            <span className="font-latin tracked block text-[9.5px] text-[#8fa6ac]">
              Consultancy Firm
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="relative text-[15px] text-[#c9d3d6] transition-colors hover:text-[#e7c766]"
            >
              {n.t}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-[#c9a227] transition-all duration-300 hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${FIRM.phoneRaw}`}
            className="hidden items-center gap-2 text-[15px] text-[#f3ecdd] transition-colors hover:text-[#e7c766] md:flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1Z" />
            </svg>
            {FIRM.phoneDisplay}
          </a>
          <a
            href="#book"
            className="hidden bg-gradient-to-b from-[#e7c766] to-[#c9a227] px-5 py-2.5 text-[14px] font-semibold text-[#071319] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-block"
          >
            ফ্রি কনসালটেন্সি
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="মেনু"
            className="glass-soft p-2.5 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" stroke="currentColor" fill="none" strokeWidth="1.8">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-nav border-t border-[#c9a227]/20 px-5 py-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="glass-soft px-4 py-3 text-[15px]"
              >
                {n.t}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="col-span-2 bg-[#c9a227] px-4 py-3 text-center font-semibold text-[#071319]"
            >
              ফ্রি কনসালটেন্সি বুক করুন
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function DockButton({
  href,
  label,
  color,
  pulse,
  children,
  delay,
}: {
  href: string;
  label: string;
  color: string;
  pulse?: boolean;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="group flex items-center justify-end gap-0"
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap rounded-r-full border-y border-l border-[#c9a227]/30 bg-[#0c1f27]/95 text-[13px] text-[#f3ecdd] opacity-0 transition-all duration-500 ease-out group-hover:max-w-[320px] group-hover:px-4 group-hover:py-3 group-hover:opacity-100">
        {label}
      </span>
      <span
        className={`float-y grid h-13 w-13 shrink-0 place-items-center rounded-full border border-white/20 text-[#071319] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-110 ${
          pulse ? "wa-pulse" : ""
        }`}
        style={{ background: color, width: 52, height: 52 }}
      >
        {children}
      </span>
    </a>
  );
}

export function ContactDock() {
  return (
    <div className="fixed right-3 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-5 sm:bottom-6">
      <DockButton
        delay={0}
        pulse
        href={waLink()}
        label={`হোয়াটসঅ্যাপে কথা বলুন — ${FIRM.phoneDisplay}`}
        color="#25d366"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.8 9.8 0 0 0 4.68 1.2h.01c5.43 0 9.84-4.4 9.84-9.84C21.89 6.4 17.48 2 12.04 2Zm5.72 13.9c-.24.68-1.4 1.3-1.94 1.34-.5.05-.98.23-3.3-.7-2.78-1.1-4.54-3.96-4.68-4.15-.14-.19-1.12-1.5-1.12-2.85s.7-2.02.96-2.3c.24-.27.53-.34.7-.34h.5c.16 0 .38-.6.58.45.22.5.72 1.75.78 1.88.6.12.1.27.02.44-.42.84-.86 1.14-.48 1.72.84 1.26 1.68 1.7 2.94 2.26.21.1.36.08.5-.05.14-.13.58-.68.74-.9.15-.24.3-.2.5-.12.22.08 1.38.66 1.62.78.24.12.4.18.46.28.6.1.6.58-.14 1.28Z" />
        </svg>
      </DockButton>

      <DockButton
        delay={0.4}
        href={`tel:${FIRM.phoneRaw}`}
        label={`কল করুন — ${FIRM.phoneDisplay}`}
        color="#c9a227"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1Z" />
        </svg>
      </DockButton>

      <DockButton
        delay={0.8}
        href={`mailto:${FIRM.email}?subject=${encodeURIComponent("আইনি পরামর্শের অনুরোধ")}`}
        label={FIRM.email}
        color="#f3ecdd"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </DockButton>

      <span className="mt-1 hidden rotate-0 text-center font-latin tracked text-[9px] text-[#8fa6ac] sm:block">
        {toBn(24)}×{toBn(7)} সাপোর্ট
      </span>
    </div>
  );
}
