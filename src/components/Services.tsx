import { useState } from "react";
import { motion } from "framer-motion";
import { Btn, EASE, Reveal, SectionHead, toBn } from "../lib/ui";
import { ATTACHED_BANNER, CATEGORIES, SERVICES, WHY, waLink } from "../data";

export function Services() {
  const [cat, setCat] = useState<string>("সব");
  const list = cat === "সব" ? SERVICES : SERVICES.filter((s) => s.cat === cat);

  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={1}
          eyebrow="Services Ledger"
          title={
            <>
              সবগুলো সেবা <span className="brass-text">একটি লেজারে</span>
            </>
          }
          lead="নিচের প্রতিটি দাগে ক্লিক করলে সরাসরি বুকিং ফর্মে চলে যাবেন। কোনো সেবা খুঁজে না পেলে হোয়াটসঅ্যাপে লিখে দিন — বিকল্প সাজিয়ে দেব।"
        />

        {/* attached banner slot */}
        <Reveal className="mt-10">
          <div className="glass grain relative overflow-hidden">
            {ATTACHED_BANNER ? (
              <img src={ATTACHED_BANNER} alt="সেবাসমূহ" className="w-full object-contain" />
            ) : (
              <div className="grid md:grid-cols-5">
                <div className="relative min-h-[220px] md:col-span-2">
                  <img
                    src="images/files-texture.jpg"
                    alt="মামলার ফাইল"
                    className="absolute inset-0 h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071319]/70 to-transparent" />
                  <div className="relative p-7">
                    <span className="font-latin tracked text-[10.5px] text-[#e7c766]">
                      All-in-one legal desk
                    </span>
                    <p className="font-display mt-3 text-[26px] font-black leading-tight text-[#f3ecdd]">
                      {toBn(26)} সেবা,
                      <br />
                      <span className="brass-text">একটি চুক্তি,</span>
                      <br />
                      একটি দায়িত্ব।
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-6 p-7 md:col-span-3">
                  <p className="text-[16px] leading-relaxed text-[#b9c8cc]">
                    কোম্পানি নিবন্ধন থেকে জমির নামজারি, ভ্যাট রিটার্ন থেকে পুলিশ ক্লিয়ারেন্স —
                    প্রতিটি কাজের জন্য আলাদা করে ফার্ম খুঁজতে হবে না। একবার ফাইল দিলেই
                    শেষ পর্যন্ত আমরাই দায়ী।
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Btn href="#book">ব্যানারের সেবা বুক করুন</Btn>
                    <Btn href={waLink("সেবা সম্পর্কে জানতে চাই।")} variant="ghost">
                      প্রশ্ন করুন
                    </Btn>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* filters */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5">
          {CATEGORIES.map((c) => {
            const count = c === "সব" ? SERVICES.length : SERVICES.filter((s) => s.cat === c).length;
            const on = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-300 ${
                  on
                    ? "border-[#c9a227] bg-[#c9a227] font-semibold text-[#071319]"
                    : "border-[#c9a227]/30 text-[#b9c8cc] hover:border-[#c9a227]/70 hover:text-[#e7c766]"
                }`}
              >
                {c} <span className="tnum opacity-70">({toBn(count)})</span>
              </button>
            );
          })}
        </div>

        {/* the ledger — dense ruled sheet */}
        <div className="glass mt-6 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#c9a227]/30 bg-[#0c1f27]/70 px-5 py-3 md:px-7">
            <span className="font-latin tracked text-[11px] text-[#c9a227]">
              Legal Solutions — Cause List
            </span>
            <span className="font-latin tracked text-[10.5px] text-[#8fa6ac]">
              {toBn(list.length)} / {toBn(SERVICES.length)}
            </span>
          </div>

          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-[#c9a227]/20">
            {list.map((s, i) => (
              <motion.a
                key={s.n}
                href="#book"
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: Math.min(i, 14) * 0.035, ease: EASE }}
                className="row-glow group flex items-center gap-4 border-b border-[#c9a227]/15 px-5 py-4 transition-colors duration-300 md:gap-6 md:px-7 md:py-[18px]"
              >
                <span className="font-display tnum w-9 shrink-0 text-right text-[26px] font-black leading-none text-[#c9a227]/75 transition-all duration-300 group-hover:text-[#e7c766] md:w-11 md:text-[32px]">
                  {toBn(s.n)}
                </span>
                <span className="h-8 w-px shrink-0 bg-[#c9a227]/25" />
                <span className="flex-1 text-[15.5px] text-[#f3ecdd] md:text-[16.5px]">
                  {s.t}
                </span>
                <span className="hidden shrink-0 text-[12px] text-[#8fa6ac] transition-colors group-hover:text-[#c9a227] sm:block">
                  {s.cat}
                </span>
                <span className="shrink-0 text-[#c9a227] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px hairline" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={2}
          eyebrow="Why Legal Solutions"
          title={
            <>
              অন্য ফার্মের সাথে <span className="brass-text">আমাদের পার্থক্য কোথায়</span>
            </>
          }
          lead="বড় দাবি নয় — চারটি নিয়ম যা আমরা লিখিভাবে মানি।"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.t} delay={i * 0.09} className={i % 2 === 1 ? "lg:mt-9" : ""}>
              <div className="glass group relative h-full overflow-hidden p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <span className="font-display tnum absolute right-5 top-3 text-[54px] font-black leading-none text-[#c9a227]/12 transition-colors duration-500 group-hover:text-[#c9a227]/25">
                  {toBn(i + 1)}
                </span>
                <span className="block h-10 w-px bg-gradient-to-b from-[#c9a227] to-transparent" />
                <h3 className="font-display mt-5 text-[21px] font-extrabold text-[#f3ecdd]">
                  {w.t}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#a9bcc1]">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
