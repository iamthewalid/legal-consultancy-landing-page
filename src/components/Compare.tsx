import { Reveal, SectionHead, toBn, Btn } from "../lib/ui";
import { COMPARE, PROCESS, waLink } from "../data";

export function Compare() {
  return (
    <section id="compare" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
            idx={3}
            eyebrow="Comparison"
          title={
            <>
              অন্যান্য ফার্মের সাথে <span className="brass-text">সরাসরি তুলনা</span>
            </>
          }
          lead="একই কাজ, একই সময় — পার্থক্যটা নিচে স্তম্ভে সাজিয়ে দেওয়া হলো।"
        />

        <Reveal className="mt-10">
          <div className="glass overflow-hidden">
            {/* header */}
            <div className="grid grid-cols-2 border-b border-[#c9a227]/30 bg-[#0c1f27]/70 md:grid-cols-[1.7fr_1fr_1fr]">
              <div className="col-span-2 px-5 py-3 font-latin tracked text-[11px] text-[#8fa6ac] md:col-span-1 md:px-7">
                বিষয়
              </div>
              <div className="border-l border-[#c9a227]/20 bg-[#c9a227]/12 px-4 py-3 text-center text-[14px] font-semibold text-[#e7c766] md:px-5">
                Legal Solutions
              </div>
              <div className="border-l border-[#8fa6ac]/15 px-4 py-3 text-center text-[14px] text-[#8fa6ac] md:px-5">
                অন্যান্য ফার্ম
              </div>
            </div>

            {COMPARE.map((c, i) => (
              <div
                key={c.point}
                className={`grid grid-cols-2 items-center border-b border-[#8fa6ac]/12 transition-colors duration-300 hover:bg-[#c9a227]/8 md:grid-cols-[1.7fr_1fr_1fr] ${
                  i % 2 ? "bg-[#071319]/35" : ""
                }`}
              >
                <div className="col-span-2 px-5 py-4 text-[15px] text-[#f3ecdd] md:col-span-1 md:px-7">
                  <span className="tnum mr-3 font-display text-[13px] text-[#c9a227]/70">
                    {toBn(i + 1)}
                  </span>
                  {c.point}
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-[#c9a227]/20 bg-[#c9a227]/8 px-3 py-4 text-center text-[14.5px] font-medium text-[#f3ecdd] md:px-5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#25d366]" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="m4 12.5 5 5L20 6.5" />
                  </svg>
                  <span>{c.us}</span>
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-[#8fa6ac]/12 px-3 py-4 text-center text-[14px] text-[#8fa6ac] md:px-5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#9e2b25]" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                  <span>{c.them}</span>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0c1f27]/70 px-5 py-5 md:px-7">
              <p className="text-[14.5px] text-[#a9bcc1]">
                তুলনাটা যাচাই করতে চান? একটি কাজের কোটেশন আমাদের ফার্ম থেকে নিন — তারপর
                সিদ্ধান্ত নিন।
              </p>
              <Btn href="#book">ফ্রি কোটেশন নিন</Btn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={5}
          eyebrow="How it works"
          title={
            <>
              চার ধাপে <span className="brass-text">শুরু থেকে শেষ</span>
            </>
          }
        />

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#c9a227]/45 to-transparent lg:block" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1}>
                <div className="glass relative h-full p-6 transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="flex items-center gap-4">
                    <span className="font-display grid h-16 w-16 shrink-0 place-items-center rounded-full border border-[#c9a227]/45 bg-[#071319] text-[28px] font-black brass-text">
                      {toBn(p.n)}
                    </span>
                    <span className="h-px flex-1 bg-[#c9a227]/25" />
                  </div>
                  <h3 className="font-display mt-5 text-[20px] font-extrabold text-[#f3ecdd]">
                    {p.t}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[#a9bcc1]">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-8">
          <div className="glass-soft flex flex-wrap items-center justify-between gap-5 p-6">
            <p className="text-[15.5px] text-[#b9c8cc]">
              গড় সময়: ফ্রি পরামর্শ {toBn(20)} মিনিট · প্ল্যান হাতে {toBn(24)} ঘণ্টার মধ্যে।
            </p>
            <Btn href={waLink("প্রক্রিয়া সম্পর্কে জানতে চাই।")} variant="ghost">
              প্রক্রিয়া জানুন
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
