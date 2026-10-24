import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Btn, EASE, Reveal, SectionHead, toBn } from "../lib/ui";
import { VIDEOS, VIDEO_THUMB_OVERRIDE, waLink } from "../data";

const FALLBACK = "images/video-still.jpg";

function Thumb({ id }: { id: string }) {
  const [src, setSrc] = useState(
    VIDEO_THUMB_OVERRIDE[id] ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  );
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => src !== FALLBACK && setSrc(FALLBACK)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
    />
  );
}

export function Videos() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const step = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = (card?.offsetWidth ?? 320) + 20;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12;
    const atStart = el.scrollLeft <= 12;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: w * dir, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (paused || active !== null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => step(1), 4600);
    return () => clearInterval(t);
  }, [paused, active, step]);

  return (
    <section id="videos" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <img src="images/video-still.jpg" alt="" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071319] via-[#071319]/92 to-[#071319]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-9">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            idx={4}
            eyebrow="Video Archive"
            title={
              <>
                ভিডিতে <span className="brass-text">শিখে নিন</span> পুরো প্রক্রিয়া
              </>
            }
            lead="সার্ভিস ভিডিও স্লাইড করে দেখুন — ক্লিক করলেই পুরো ভিডিও এখানেই চলবে।"
          />
          <div className="flex gap-3 pb-2">
            <button
              onClick={() => step(-1)}
              aria-label="আগের ভিডিও"
              className="glass-soft grid h-12 w-12 place-items-center rounded-full text-[#e7c766] transition-colors hover:border-[#c9a227]/70"
            >
              ←
            </button>
            <button
              onClick={() => step(1)}
              aria-label="পরের ভিডিও"
              className="glass-soft grid h-12 w-12 place-items-center rounded-full text-[#e7c766] transition-colors hover:border-[#c9a227]/70"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={track}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
        >
          {VIDEOS.map((v, i) => (
            <button
              key={v.id}
              data-card
              onClick={() => setActive(i)}
              className="group glass relative w-[84%] shrink-0 snap-start overflow-hidden text-left sm:w-[52%] lg:w-[31.4%]"
            >
              <div className="relative aspect-video overflow-hidden bg-[#0c1f27]">
                <Thumb id={v.id} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071319] via-transparent to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-[#c9a227]/40 bg-[#071319]/75 px-3 py-1 font-latin tracked text-[10px] text-[#e7c766] backdrop-blur">
                  {v.tag}
                </span>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-[#f3ecdd]/40 bg-[#071319]/55 backdrop-blur transition-all duration-400 group-hover:scale-110 group-hover:border-[#c9a227] group-hover:bg-[#c9a227] group-hover:text-[#071319]">
                    <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
                <span className="absolute bottom-3 right-3 tnum font-latin text-[12px] text-[#f3ecdd]/80">
                  {toBn(i + 1)} / {toBn(VIDEOS.length)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-[17px] font-bold leading-snug text-[#f3ecdd]">
                  {v.title}
                </h3>
                <span className="mt-3 flex items-center gap-2 text-[13.5px] text-[#c9a227]">
                  এখনই দেখুন <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </button>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="glass-soft flex flex-wrap items-center justify-between gap-5 p-6">
            <p className="max-w-2xl text-[15.5px] text-[#b9c8cc]">
              ভিডিওতে যা না পেলে সরাসরি জিজ্ঞাসা করুন — প্রতিদিন {toBn(50)}+ জন এভাবেই
              উত্তর পাচ্ছেন।
            </p>
            <Btn href={waLink("ভিডিও থেকে একটি প্রশ্ন করতাম।")}>হোয়াটসঅ্যাপে জিজ্ঞাসা</Btn>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-[#071319]/92 p-4 backdrop-blur-lg"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="glass w-full max-w-4xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-[#c9a227]/25 px-5 py-3">
                <span className="font-display text-[15px] text-[#f3ecdd]">
                  {VIDEOS[active].title}
                </span>
                <button
                  onClick={() => setActive(null)}
                  aria-label="বন্ধ করুন"
                  className="text-[#8fa6ac] transition-colors hover:text-[#e7c766]"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${VIDEOS[active].id}?autoplay=1&rel=0`}
                  title={VIDEOS[active].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
