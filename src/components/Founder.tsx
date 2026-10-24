import { Btn, Reveal, SectionHead, toBn } from "../lib/ui";
import { FIRM, FOUNDER_IMAGE, PLANS, TESTIMONIALS, waLink } from "../data";

export function Founder() {
  const img = FOUNDER_IMAGE || "images/founder.jpg";
  return (
    <section id="founder" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 hairline" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={6}
          eyebrow="Founder & CEO"
          title={
            <>
              যিনি প্রতিটি ফাইলের <span className="brass-text">দায়িত্বে</span>
            </>
          }
        />

        <Reveal className="mt-10">
          <div className="glass grain relative overflow-hidden">
            <div className="grid lg:grid-cols-12">
              {/* portrait */}
              <div className="relative lg:col-span-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[540px]">
                  <img
                    src={img}
                    alt={FIRM.founder}
                    onError={(e) => {
                      const t = e.currentTarget;
                      if (!t.src.endsWith("images/founder.jpg")) t.src = "images/founder.jpg";
                    }}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071319] via-[#071319]/25 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0c1f27]" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:hidden">
                    <p className="font-display text-[24px] font-black text-[#f3ecdd]">
                      {FIRM.founder}
                    </p>
                    <p className="text-[14px] text-[#e7c766]">{FIRM.founderRole}</p>
                  </div>
                </div>
                <span className="absolute left-4 top-4 rounded-full border border-[#c9a227]/50 bg-[#071319]/70 px-3 py-1 font-latin tracked text-[10px] text-[#e7c766] backdrop-blur">
                  Chamber · Dhaka
                </span>
              </div>

              {/* quote */}
              <div className="flex flex-col justify-center p-7 md:p-11 lg:col-span-7">
                <svg viewBox="0 0 48 36" className="h-9 w-12 text-[#c9a227]" fill="currentColor" aria-hidden="true">
                  <path d="M0 36V19.8C0 8.9 6.4 1.6 18 0l2.4 6.6c-6.4 1.6-9.6 5.2-9.6 10.8h8.4V36H0Zm27.6 0V19.8C27.6 8.9 34 1.6 45.6 0L48 6.6c-6.4 1.6-9.6 5.2-9.6 10.8h8.4V36H27.6Z" />
                </svg>

                <blockquote className="font-display mt-6 text-[clamp(1.4rem,2.7vw,2.2rem)] font-bold leading-[1.5] text-[#f3ecdd]">
                  “আইন শুধু শাস্তির বই নয়, এটি সুরক্ষার প্রতিশ্রুতি। যখন একজন মানুষ তার
                  নিজের অধিকার সম্পর্কে সচেতন হয়ে ওঠেন, তখনই দুর্বলতা কেড়ে নেয় —{" "}
                  <span className="brass-text">আমাদের কাজ সেই সচেতনতাকে কাগজে রূপ দেওয়া।</span>”
                </blockquote>

                <div className="hairline my-7" />

                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <p className="font-display text-[22px] font-black text-[#f3ecdd]">
                      {FIRM.founder}
                    </p>
                    <p className="font-latin tracked mt-1 text-[11px] text-[#c9a227]">
                      {FIRM.founderRole}
                    </p>
                  </div>
                  <div className="font-display italic text-[#8fa6ac]">
                    <span className="font-latin text-[15px] italic">Atiqul Islam Rasel</span>
                  </div>
                </div>

                <div className="mt-7 grid grid-cols-3 gap-px bg-[#c9a227]/20">
                  {[
                    { v: 12, l: "বছরের অভিজ্ঞতা" },
                    { v: 4800, l: "সম্পন্ন কাজ" },
                    { v: 26, l: "ধরনের সেবা" },
                  ].map((s) => (
                    <div key={s.l} className="bg-[#0c1f27]/70 px-3 py-4 text-center">
                      <div className="tnum font-display text-[26px] font-black brass-text">
                        {toBn(s.v)}
                        {s.v > 100 ? "+" : ""}
                      </div>
                      <div className="mt-1 text-[12.5px] text-[#8fa6ac]">{s.l}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Btn href="#book">রাসেল স্যারের সাথে কথা বলুন</Btn>
                  <Btn href={waLink(`আসসালামু আলাইকুম ${FIRM.founder} স্যার, আমি পরামর্শ চাই।`)} variant="ghost">
                    হোয়াটসঅ্যাপ
                  </Btn>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={7}
          eyebrow="Client voices"
          title={
            <>
              ক্লায়েন্টদের <span className="brass-text">নিজেদের ভাষায়</span>
            </>
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.08}>
              <div className="glass relative h-full overflow-hidden p-6 md:p-7">
                <span className="font-display absolute -top-4 right-5 text-[96px] font-black leading-none text-[#c9a227]/10">
                  ধ”
                </span>
                <div className="flex gap-1 text-[#c9a227]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <svg key={k} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                      <path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8Z" />
                    </svg>
                  ))}
                </div>
                <p className="relative mt-4 text-[16px] leading-relaxed text-[#dbe5e7]">“{t.q}”</p>
                <div className="mt-5 flex items-center gap-3 border-t border-dashed border-[#8fa6ac]/25 pt-4">
                  <span className="font-display grid h-11 w-11 place-items-center rounded-full border border-[#c9a227]/40 bg-[#c9a227]/12 text-[17px] font-bold text-[#e7c766]">
                    {t.n.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-[15px] text-[#f3ecdd]">{t.n}</span>
                    <span className="block text-[13px] text-[#8fa6ac]">{t.r}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Plans() {
  return (
    <section id="plans" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={8}
          eyebrow="Packages"
          title={
            <>
              স্বচ্ছ খরচ, <span className="brass-text">শুরুতেই নির্ধারিত</span>
            </>
          }
          lead="নিচের যেকোনো প্যাকেজে ক্লিক করলে বুকিং ফর্মে সরাসরি চলে যাবেন — চূড়ান্ত কোটেশন পরামর্শের পর।"
        />

        <div className="mt-10 grid items-start gap-5 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`relative h-full overflow-hidden p-7 transition-transform duration-500 hover:-translate-y-2 ${
                  p.best ? "glass border-[#c9a227]/70 lg:-mt-4" : "glass-soft"
                }`}
              >
                {p.best && (
                  <span className="absolute right-0 top-0 bg-gradient-to-b from-[#e7c766] to-[#c9a227] px-4 py-1.5 text-[12px] font-semibold text-[#071319]">
                    সর্বাধিক জনপ্রিয়
                  </span>
                )}
                <span className="font-latin tracked text-[10.5px] text-[#8fa6ac]">
                  Package {toBn(i + 1)}
                </span>
                <h3 className="font-display mt-2 text-[26px] font-black text-[#f3ecdd]">{p.name}</h3>
                <div className="mt-4 flex items-end gap-2">
                  <span className="font-display text-[38px] font-black leading-none brass-text">
                    {p.price}
                  </span>
                  <span className="pb-1 text-[13.5px] text-[#8fa6ac]">{p.per}</span>
                </div>
                <div className="hairline my-6" />
                <ul className="space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-[15px] text-[#cdd9dc]">
                      <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-[#25d366]" fill="none" stroke="currentColor" strokeWidth="2.6">
                        <path d="m4 12.5 5 5L20 6.5" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Btn href="#book" variant={p.best ? "brass" : "ghost"} className="w-full">
                    {p.best ? "আজই শুরু করুন" : "প্যাকেজটি বেছে নিন"}
                  </Btn>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
