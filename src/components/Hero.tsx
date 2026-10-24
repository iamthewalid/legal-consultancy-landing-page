import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Btn, EASE, Eyebrow, toBn } from "../lib/ui";
import { FIRM, SERVICES, STATS, waLink } from "../data";

function Counter({ to, suf }: { to: number; suf: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return setV(to);
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tnum">
      {toBn(v)}
      {suf}
    </span>
  );
}

export default function Hero() {
  const half = SERVICES.map((s) => s.t);
  const ticker = [...half, ...half];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* material: the chamber */}
      <div className="absolute inset-0">
        <img
          src="images/hero-chamber.jpg"
          alt="রাতের আইন চেম্বার"
          className="h-full w-full object-cover object-right"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071319] via-[#071319]/88 to-[#071319]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071319] via-transparent to-[#071319]/85" />
      </div>
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-32 pb-16 md:px-9 md:pt-40 lg:pt-44">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Eyebrow>{FIRM.taglineBn}</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
              className="font-display mt-6 font-black leading-[1.08] text-[clamp(2.15rem,5.4vw,4.5rem)]"
            >
              আপনার আইনি ঝামেলার
              <br />
              <span className="brass-text">সমাধান নিশ্চিত</span> করি
              <br />
              <span className="block text-[0.62em] font-bold leading-[1.35] text-[#8fa6ac]">
                কাগজে, আদালতে, সময়ে।
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
              className="mt-6 max-w-xl text-[clamp(1.02rem,1.6vw,1.2rem)] leading-relaxed text-[#b9c8cc]"
            >
              {FIRM.promise}। ট্যাক্স, নিবন্ধন, দলিল আর আদালতের কাজ —{" "}
              <span className="text-[#f3ecdd]">{toBn(26)}</span> ধরনের সেবা একটি মাত্র
              ডেস্কে। প্রথম পরামর্শ সম্পূর্ণ ফ্রি।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Btn href="#book">ফ্রি কনসালটেন্সি বুক করুন</Btn>
              <Btn href={waLink()} variant="ghost">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#25d366]" /> হোয়াটসঅ্যাপে জিজ্ঞাসা
                </span>
              </Btn>
              <a
                href="#services"
                className="ml-1 border-b border-[#c9a227]/50 pb-1 text-[15px] text-[#e7c766] transition-colors hover:text-[#f3ecdd]"
              >
                {toBn(26)} টি সেবা দেখুন →
              </a>
            </motion.div>
          </div>

      {/* glass docket card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="glass grain relative overflow-hidden p-6 lg:col-span-5 lg:mb-2"
      >
        <div className="flex items-center justify-between border-b border-[#c9a227]/25 pb-3">
          <span className="font-latin tracked text-[11px] text-[#c9a227]">দ্রুত যোগাযোগ</span>
          <span className="font-latin tracked text-[10px] text-[#8fa6ac]">DOCKET / ০১</span>
        </div>

        <div className="mt-5 space-y-4">
          {[
            { k: "ফোন", v: FIRM.phoneDisplay, href: `tel:${FIRM.phoneRaw}` },
            { k: "ইমেইল", v: FIRM.email, href: `mailto:${FIRM.email}` },
            { k: "সময়", v: FIRM.hours, href: null },
            { k: "অফিস", v: FIRM.address, href: null },
          ].map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-4 border-b border-dashed border-[#8fa6ac]/20 pb-3">
              <span className="shrink-0 text-[13px] text-[#8fa6ac]">{r.k}</span>
              {r.href ? (
                <a href={r.href} className="break-all text-right text-[15px] text-[#f3ecdd] hover:text-[#e7c766]">
                  {r.v}
                </a>
              ) : (
                <span className="text-right text-[15px] text-[#f3ecdd]">{r.v}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#25d366]" />
          <span className="text-[13.5px] text-[#b9c8cc]">
            এখনই লাইভ — গড় উত্তর সময় {toBn(5)} মিনিট
          </span>
        </div>
      </motion.div>
        </div>
      </div>

      {/* ruled ticker */}
      <div className="relative border-y border-[#c9a227]/25 bg-[#0c1f27]/70 py-3 backdrop-blur-md">
        <div className="marquee flex w-max items-center gap-8 whitespace-nowrap">
          {ticker.map((t, i) => (
            <span key={i} className="flex items-center gap-8 text-[14.5px] text-[#b9c8cc]">
              <span className="text-[#c9a227]">✦</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* stats */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px bg-[#c9a227]/20 px-5 md:px-9 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="bg-[#071319] px-4 py-7 text-center md:px-6"
            style={{ boxShadow: "inset 0 0 0 1px rgba(201,162,39,0.08)" }}
          >
            <div className="font-display text-[clamp(2rem,4vw,3rem)] font-black leading-none brass-text">
              <Counter to={s.v} suf={s.suf} />
            </div>
            <div className="mt-2 text-[13.5px] text-[#8fa6ac]">
              {toBn(i + 1)}. {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
