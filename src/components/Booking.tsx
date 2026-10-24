import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Btn, EASE, Mark, Reveal, SectionHead, toBn } from "../lib/ui";
import { FIRM, FAQS, SERVICES, waLink } from "../data";

const MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];
const WEEK = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
const SLOTS = [
  "সকাল ৯:০০", "সকাল ১০:৩০", "দুপুর ১২:০০",
  "দুপুর ২:০০", "বিকাল ৪:০০", "সন্ধ্যা ৬:০০", "রাত ৮:০০",
];
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export function Booking() {
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const cells = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = first.getDay();
    const total = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const arr: (Date | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= total; d++) arr.push(new Date(view.getFullYear(), view.getMonth(), d));
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [view]);

  const isPast = (d: Date) =>
    d < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || d.getDay() === 5; // শুক্র বন্ধ

  const shift = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));
  const atMin = view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  const summary =
    date && slot
      ? `${toBn(date.getDate())} ${MONTHS[date.getMonth()]} ${toBn(date.getFullYear())}, ${slot}`
      : "";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return setErr("ক্যালেন্ডার থেকে একটি তারিখ বেছে নিন।");
    if (!slot) return setErr("সময়ের একটি স্লট বেছে নিন।");
    if (name.trim().length < 3) return setErr("আপনার সম্পূর্ণ নাম লিখুন।");
    if (!/^[0-9+\-\s]{11,16}$/.test(phone.trim()))
      return setErr("সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন।");
    if (!service) return setErr("কোন সেবা লাগবে তা বেছে নিন।");
    setErr("");
    setDone(true);
  };

  const waMsg = `আসসালামু আলাইকুম।\nনাম: ${name}\nমোবাইল: ${phone}\nসেবা: ${service}\nসময়: ${summary}${note ? `\nবিবরণ: ${note}` : ""}`;

  return (
    <section id="book" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <img src="images/consult-desk.jpg" alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071319] via-[#071319]/94 to-[#071319]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead
          idx={9}
          eyebrow="Free consultation"
          title={
            <>
              ফ্রি কনসালটেন্সি <span className="brass-text">ক্যালেন্ডার থেকেই বুক</span> করুন
            </>
          }
          lead="তারিখ আর সময় বেছে নিন — নিশ্চিত হলে আমরা ফোন বা হোয়াটসঅ্যাপে নিজেরা যোগাযোগ করব। প্রথম পরামর্শে কোনো খরচ নেই।"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* left: what to bring */}
          <div className="lg:col-span-4">
            <div className="glass overflow-hidden">
              <div className="relative aspect-[16/10]">
                <img src="images/consult-desk.jpg" alt="আইনি পরামর্শ" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1f27] to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-[20px] font-extrabold text-[#f3ecdd]">
                  পরামর্শের আগে যা রাখবেন
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "জাতীয় পরিচয়পত্র বা টিন কার্ডের কপি",
                    "সংশ্লিষ্ট দলিল / চুক্তি / নোটিশ",
                    "সমস্যাটির এক পাতা লিখিত বিবরণ",
                    "আগের কোর্ট বা অফিসের যেকোনো রসিদ",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 border-b border-dashed border-[#8fa6ac]/20 pb-3 text-[15px] text-[#cdd9dc]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a227]" />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-2.5">
                  <a href={`tel:${FIRM.phoneRaw}`} className="glass-soft flex items-center justify-between px-4 py-3 text-[15px] transition-colors hover:border-[#c9a227]/60">
                    <span className="text-[#8fa6ac]">সরাসরি কল</span>
                    <span className="text-[#f3ecdd]">{FIRM.phoneDisplay}</span>
                  </a>
                  <a href={waLink()} target="_blank" rel="noreferrer" className="flex items-center justify-between bg-[#25d366]/90 px-4 py-3 text-[15px] font-semibold text-[#06231a] transition-transform hover:-translate-y-0.5">
                    <span>হোয়াটসঅ্যাপ</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right: calendar + form */}
          <div className="lg:col-span-8">
            <div className="glass grain relative overflow-hidden p-5 md:p-7">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{ rotate: -25, scale: 0.4, opacity: 0 }}
                      animate={{ rotate: 0, scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
                      className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-dashed border-[#c9a227] text-[#c9a227]"
                    >
                      <span className="font-display text-[13px] font-bold leading-tight">
                        বুকড
                        <br />
                        <span className="font-latin text-[10px] tracked">CONFIRMED</span>
                      </span>
                    </motion.div>
                    <h3 className="font-display mt-6 text-[26px] font-black text-[#f3ecdd]">
                      আপনার সময় সংরক্ষিত হয়েছে
                    </h3>
                    <p className="mt-3 text-[16px] text-[#b9c8cc]">
                      {name} সাহেব, <span className="text-[#e7c766]">{summary}</span> — আমরা{" "}
                      {toBn(30)} মিনিটের মধ্যে আপনার নম্বরে যোগাযোগ করব।
                    </p>
                    <p className="mt-2 text-[14.5px] text-[#8fa6ac]">
                      সেবা: {service} · {FIRM.phoneDisplay}
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <Btn href={waLink(waMsg)}>হোয়াটসঅ্যাপে নিশ্চিত করুন</Btn>
                      <Btn
                        variant="ghost"
                        onClick={() => {
                          setDone(false);
                          setDate(null);
                          setSlot(null);
                        }}
                      >
                        আরেকটি তারিখ বাছুন
                      </Btn>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c9a227]/25 pb-3">
                      <span className="font-latin tracked text-[11px] text-[#c9a227]">
                        Step {toBn(1)} — তারিখ ও সময়
                      </span>
                      <span className="font-latin tracked text-[10.5px] text-[#8fa6ac]">
                        {FIRM.hours}
                      </span>
                    </div>

                    {/* month nav */}
                    <div className="mt-5 flex items-center justify-between">
                      <button type="button" onClick={() => shift(-1)} disabled={atMin}
                        className="glass-soft px-3.5 py-2 text-[#e7c766] transition-colors disabled:opacity-30">
                        ←
                      </button>
                      <span className="font-display text-[19px] font-extrabold text-[#f3ecdd]">
                        {MONTHS[view.getMonth()]} {toBn(view.getFullYear())}
                      </span>
                      <button type="button" onClick={() => shift(1)}
                        className="glass-soft px-3.5 py-2 text-[#e7c766] transition-colors">
                        →
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-7 gap-1.5">
                      {WEEK.map((w, i) => (
                        <div key={w} className={`pb-1 text-center text-[12px] ${i === 5 ? "text-[#9e2b25]" : "text-[#8fa6ac]"}`}>
                          {w}
                        </div>
                      ))}
                      {cells.map((d, i) => {
                        if (!d) return <div key={i} />;
                        const off = isPast(d);
                        const sel = date && sameDay(d, date);
                        const isToday = sameDay(d, today);
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={off}
                            onClick={() => setDate(d)}
                            className={`relative aspect-square rounded-md border text-[14.5px] transition-all duration-200 tnum ${
                              sel
                                ? "border-[#c9a227] bg-[#c9a227] font-semibold text-[#071319] shadow-[0_8px_22px_-8px_rgba(201,162,39,0.9)]"
                                : off
                                ? "cursor-not-allowed border-transparent text-[#8fa6ac]/35 line-through"
                                : "border-[#8fa6ac]/20 text-[#f3ecdd] hover:border-[#c9a227] hover:bg-[#c9a227]/15"
                            }`}
                          >
                            {toBn(d.getDate())}
                            {isToday && !sel && (
                              <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#25d366]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-2 text-[12.5px] text-[#8fa6ac]">
                      <span className="text-[#9e2b25]">লাল</span> দিনগুলো (শুক্রবার) বন্ধ · আজ{" "}
                      <span className="text-[#f3ecdd]">{toBn(today.getDate())} {MONTHS[today.getMonth()]}</span>
                    </p>

                    <div className="mt-6 border-t border-[#c9a227]/25 pt-5">
                      <span className="font-latin tracked text-[11px] text-[#c9a227]">
                        Step {toBn(2)} — সময় বেছে নিন
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {SLOTS.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSlot(s)}
                            className={`rounded-full border px-4 py-2 text-[14px] transition-all duration-300 ${
                              slot === s
                                ? "border-[#c9a227] bg-[#c9a227]/20 text-[#e7c766]"
                                : "border-[#8fa6ac]/25 text-[#b9c8cc] hover:border-[#c9a227]/70"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#c9a227]/25 pt-5">
                      <span className="font-latin tracked text-[11px] text-[#c9a227]">
                        Step {toBn(3)} — আপনার তথ্য
                      </span>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Field label="আপনার নাম *" value={name} onChange={setName} placeholder="মোঃ আব্দুল করিম" />
                        <Field label="মোবাইল নম্বর *" value={phone} onChange={setPhone} placeholder="01XXXXXXXXX" inputMode="tel" />
                        <div>
                          <label className="mb-1.5 block text-[13px] text-[#8fa6ac]">কোন সেবা লাগবে? *</label>
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full rounded-md border border-[#8fa6ac]/25 bg-[#071319]/60 px-4 py-3 text-[15px] text-[#f3ecdd] transition-colors focus:border-[#c9a227]"
                          >
                            <option value="">— বেছে নিন —</option>
                            {SERVICES.map((s) => (
                              <option key={s.n} value={s.t}>
                                {toBn(s.n)}. {s.t}
                              </option>
                            ))}
                            <option value="অন্যান্য">অন্যান্য / জানতে চাই</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[13px] text-[#8fa6ac]">সমস্যার সংক্ষিপ্ত বিবরণ</label>
                          <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={3}
                            placeholder="দুই-তিন লাইনে লিখলেই হবে…"
                            className="w-full resize-none rounded-md border border-[#8fa6ac]/25 bg-[#071319]/60 px-4 py-3 text-[15px] text-[#f3ecdd] transition-colors focus:border-[#c9a227]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#c9a227]/25 pt-5">
                      <div className="text-[14.5px]">
                        {summary ? (
                          <span className="text-[#e7c766]">নির্বাচিত: {summary}</span>
                        ) : (
                          <span className="text-[#8fa6ac]">তারিখ ও সময় নির্বাচন করুন</span>
                        )}
                        {err && <span className="mt-1 block text-[13.5px] text-[#e08a84]">{err}</span>}
                      </div>
                      <Btn type="submit">বুকিং নিশ্চিত করুন →</Btn>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, inputMode,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; inputMode?: "tel";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] text-[#8fa6ac]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="w-full rounded-md border border-[#8fa6ac]/25 bg-[#071319]/60 px-4 py-3 text-[15px] text-[#f3ecdd] transition-colors placeholder:text-[#8fa6ac]/50 focus:border-[#c9a227]"
      />
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead idx={10} eyebrow="FAQ" title={<>সাধারণ কিছু <span className="brass-text">প্রশ্ন</span></>} />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {FAQS.map((f, i) => {
            const on = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className={`glass h-full overflow-hidden transition-colors duration-300 ${on ? "border-[#c9a227]/60" : ""}`}>
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={on}
                  >
                    <span className="font-display text-[16.5px] font-bold text-[#f3ecdd]">{f.q}</span>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#c9a227]/50 text-[#e7c766] transition-transform duration-300 ${on ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE }}
                      >
                        <p className="border-t border-dashed border-[#8fa6ac]/25 px-6 py-5 text-[15.5px] leading-relaxed text-[#a9bcc1]">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const cards = [
    { k: "ফোন / হোয়াটসঅ্যাপ", v: FIRM.phoneDisplay, href: `tel:${FIRM.phoneRaw}` },
    { k: "ইমেইল", v: FIRM.email, href: `mailto:${FIRM.email}` },
    { k: "অফিস সময়", v: FIRM.hours, href: null },
    { k: "সদর দপ্তর", v: FIRM.address, href: null },
  ];
  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <SectionHead idx={11} eyebrow="Contact" title={<>যেকোনো সময় <span className="brass-text">যোগাযোগ</span> করুন</>} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.k} delay={i * 0.07}>
              {c.href ? (
                <a href={c.href} className="glass block h-full p-6 transition-transform duration-500 hover:-translate-y-1.5 hover:border-[#c9a227]/60">
                  <Body c={c} />
                </a>
              ) : (
                <div className="glass h-full p-6">
                  <Body c={c} />
                </div>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <div className="glass relative overflow-hidden">
            <div className="grid items-center gap-6 p-7 md:grid-cols-[1.4fr_1fr] md:p-9">
              <div>
                <p className="font-latin tracked text-[11px] text-[#c9a227]">Final word</p>
                <p className="font-display mt-3 text-[clamp(1.3rem,2.6vw,2rem)] font-black leading-snug text-[#f3ecdd]">
                  আইনি সমস্যা বড় হোক বা ছোট —{" "}
                  <span className="brass-text">প্রথম কথাটি আজই বলে নিন।</span>
                </p>
                <p className="mt-3 text-[15.5px] text-[#a9bcc1]">{FIRM.promise}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Btn href="#book">ফ্রি বুকিং</Btn>
                <Btn href={waLink()} variant="ghost">হোয়াটসঅ্যাপ</Btn>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Body({ c }: { c: { k: string; v: string; href: string | null } }) {
  return (
    <>
      <span className="font-latin tracked block text-[10.5px] text-[#c9a227]">{c.k}</span>
      <span className="mt-3 block break-words text-[16px] leading-relaxed text-[#f3ecdd]">{c.v}</span>
      {c.href && <span className="mt-4 block text-[13.5px] text-[#8fa6ac]">ক্লিক করুন →</span>}
    </>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-[#c9a227]/25 bg-[#050e12] pt-14 pb-8">
      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <div className="grid gap-9 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-[#c9a227]">
              <Mark className="h-9 w-9" />
              <span>
                <span className="font-display block text-[19px] font-black text-[#f3ecdd]">
                  Legal Solutions
                </span>
                <span className="font-latin tracked block text-[10px] text-[#8fa6ac]">
                  Consultancy Firm
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#8fa6ac]">
              {FIRM.taglineBn}। ট্যাক্স, রেজিস্ট্রেশন, দলিল ও আদালতের সেবায়{" "}
              {toBn(26)} বছরের অভিজ্ঞতায় পাশে আছি।
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noreferrer" className="glass-soft px-4 py-2.5 text-[14px] transition-colors hover:border-[#25d366]/70">
                হোয়াটসঅ্যাপ
              </a>
              <a href={`tel:${FIRM.phoneRaw}`} className="glass-soft px-4 py-2.5 text-[14px] transition-colors hover:border-[#c9a227]/60">
                {FIRM.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <p className="font-latin tracked text-[10.5px] text-[#c9a227]">সেবা</p>
            <ul className="mt-4 space-y-2.5">
              {["ইনকাম ট্যাক্স রিটার্ন", "কোম্পানি নিবন্ধন", "জমির দলিল ও নামজারি", "লিগাল নোটিশ", "নোটারি ও এফিডেভিট", "পাসপোর্ট ও ভিসা"].map((t) => (
                <li key={t}>
                  <a href="#services" className="text-[15px] text-[#a9bcc1] transition-colors hover:text-[#e7c766]">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-latin tracked text-[10.5px] text-[#c9a227]">যোগাযোগ</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-[#a9bcc1]">
              <li>{FIRM.address}</li>
              <li>{FIRM.hours}</li>
              <li>
                <a href={`mailto:${FIRM.email}`} className="break-all transition-colors hover:text-[#e7c766]">
                  {FIRM.email}
                </a>
              </li>
              <li className="text-[#f3ecdd]">{FIRM.phoneDisplay}</li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-11" />
        <div className="mt-5 flex flex-col items-center justify-between gap-3 text-center text-[13px] text-[#8fa6ac] sm:flex-row sm:text-left">
          <p>
            © {toBn(new Date().getFullYear())} {FIRM.name} — সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p className="font-latin tracked text-[10px]">
            {FIRM.founder} · Legal Consultant · Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}
