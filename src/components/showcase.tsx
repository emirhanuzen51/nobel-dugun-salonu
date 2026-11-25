"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin, MessageCircle, Phone, Plus, UtensilsCrossed, X } from "lucide-react";
import { behind, brand, faqs, gallery, menus } from "@/lib/data";
import { Kicker, Lines, Reveal, ease } from "@/components/ui";

/* ---------------- Menü ve gastronomi ---------------- */
export function Menus() {
  const [i, setI] = useState(0);
  const m = menus[i];
  return (
    <section id="menuler" className="bg-midnight px-5 py-28 text-ivory sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Kicker light>Menü ve gastronomi</Kicker>
            <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.6rem)] font-light leading-[0.98]" lines={["Sofranız,", <em key="b" className="text-champagne-2">davetinizin imzası.</em>]} />
          </div>
          <p className="max-w-sm text-ivory/55">Şefimizin hazırladığı menüler, tadım masasında sizin için kişiselleştirilir.</p>
        </div>
        <div className="mt-12 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" data-lenis-prevent>
          {menus.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} onClick={() => setI(k)} className={`shrink-0 rounded-full border px-5 py-3 text-sm transition ${k === i ? "border-champagne bg-champagne text-midnight" : "border-ivory/15 text-ivory/70 hover:border-ivory/40"}`}>
              {x.t}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease }} className="mt-8 grid overflow-hidden rounded-[2rem] border border-champagne/15 lg:grid-cols-12">
            <div className="relative min-h-[320px] lg:col-span-5">
              <Image src={m.img} alt={m.t} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <p className="font-serif text-5xl">{m.t}</p>
                <p className="mt-2 max-w-sm text-sm text-ivory/70">{m.d}</p>
              </div>
            </div>
            <div className="bg-midnight-2 p-8 sm:p-12 lg:col-span-7">
              <div className="grid gap-7 sm:grid-cols-2">
                {m.courses.map((c, k) => (
                  <motion.div key={c.k} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + k * 0.06 }}>
                    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-champagne">
                      <span className="h-px w-6 bg-champagne" /> {c.k}
                    </p>
                    <ul className="mt-3 grid gap-1.5">
                      {c.items.map((it) => (
                        <li key={it} className="font-serif text-xl text-ivory/90">{it}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-ivory/10 pt-6">
                <span className="mr-2 text-[11px] uppercase tracking-[0.2em] text-ivory/45">İçerik bilgisi</span>
                {m.tags.map((t) => (
                  <span key={t} className="rounded-full bg-ivory/5 px-3 py-1.5 text-xs text-ivory/75">{t}</span>
                ))}
              </div>
              <a href="#iletisim" className="mt-8 inline-flex items-center gap-2 rounded-full border border-champagne/60 px-6 py-3.5 text-sm text-champagne-2 transition hover:bg-champagne hover:text-midnight">
                <UtensilsCrossed className="h-4 w-4" /> Menü tadımı için randevu
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
        <p className="mt-4 text-xs text-ivory/40">Menü içerikleri örnektir; alerjen ve özel beslenme ihtiyaçlarınız tadım sırasında ayrıntılı olarak değerlendirilir.</p>
      </div>
    </section>
  );
}

/* ---------------- Sinematik galeri + tam ekran görüntüleyici ---------------- */
export function Gallery() {
  const cats = ["Tümü", ...Array.from(new Set(gallery.map((g) => g.cat)))];
  const [cat, setCat] = useState("Tümü");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "Tümü" ? gallery : gallery.filter((g) => g.cat === cat);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);
  const touch = useRef(0);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [open, go]);

  return (
    <section id="galeri" className="bg-ivory px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="text-center">
          <Kicker center>Galeri</Kicker>
          <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.6rem)] font-light leading-[0.98]" lines={["Anlar,", <em key="b" className="text-champagne-deep">ışık ve duygu.</em>]} />
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-5 py-2.5 text-sm transition ${cat === c ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 hover:border-midnight/40"}`}>
              {c}
            </button>
          ))}
        </div>
        <motion.div layout className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {list.map((g, k) => (
              <motion.button layout key={g.src} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5, ease }} onClick={() => setOpen(k)} className={`group relative mb-4 block w-full overflow-hidden rounded-[1.5rem] ${g.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`} aria-label={`${g.alt} — büyüt`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-cover transition duration-[1.4s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-5 translate-y-2 text-left text-sm text-ivory opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-[10px] uppercase tracking-[0.24em] text-champagne-2">{g.cat}</span>
                  {g.alt}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex flex-col bg-midnight text-ivory" role="dialog" aria-modal="true" aria-label="Galeri" data-lenis-prevent onTouchStart={(e) => (touch.current = e.touches[0].clientX)} onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          }}>
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="text-sm tabular-nums text-ivory/60">
                {open + 1} / {list.length}
              </span>
              <button onClick={() => setOpen(null)} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 transition hover:border-champagne" aria-label="Kapat">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex-1">
              <AnimatePresence initial={false}>
                <motion.div key={list[open].src} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease }} className="absolute inset-4 sm:inset-x-24">
                  <Image src={list[open].src} alt={list[open].alt} fill sizes="100vw" loading="eager" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-midnight/60 backdrop-blur transition hover:bg-champagne hover:text-midnight sm:left-6" aria-label="Önceki">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-midnight/60 backdrop-blur transition hover:bg-champagne hover:text-midnight sm:right-6" aria-label="Sonraki">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <p className="px-5 py-6 text-center font-serif text-xl">{list[open].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Perde arkası ---------------- */
export function Behind() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const h = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Kicker>Perde arkası</Kicker>
            <Lines className="font-serif text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.98]" lines={["Kusursuz bir gece,", <em key="b" className="text-champagne-deep">titiz bir hazırlık.</em>]} />
            <p className="mt-6 max-w-md text-mocha">Salon kiralamaktan fazlası: ilk görüşmeden davet sonrasına kadar her adımda yanınızda olan bir organizasyon ekibi.</p>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[2rem] lg:block">
              <Image src="/img/ahsap-masa.jpg" alt="Hazırlanmış davet masaları" fill sizes="40vw" className="object-cover" />
            </div>
          </div>
        </div>
        <div ref={ref} className="relative lg:col-span-7">
          <div className="absolute left-[27px] top-2 h-full w-px bg-midnight/10" />
          <motion.div style={{ height: h }} className="absolute left-[27px] top-2 w-px bg-champagne" />
          <ol className="grid gap-12">
            {behind.map((b, i) => (
              <Reveal key={b.t} delay={0.05}>
                <li className="relative flex gap-8">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-champagne bg-ivory font-serif text-xl text-champagne-deep">{String(i + 1).padStart(2, "0")}</span>
                  <div className="pt-2">
                    <h3 className="font-serif text-[2rem] leading-tight">{b.t}</h3>
                    <p className="mt-2 max-w-lg text-mocha">{b.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SSS ---------------- */
export function Faq() {
  const [o, setO] = useState<number | null>(0);
  return (
    <section className="bg-ivory px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Kicker>Sıkça sorulanlar</Kicker>
          <Lines className="font-serif text-[clamp(2.6rem,4.6vw,4.6rem)] font-light leading-[0.98]" lines={["Merak", <em key="b" className="text-champagne-deep">ettikleriniz.</em>]} />
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-midnight/15">
              <button onClick={() => setO(o === i ? null : i)} aria-expanded={o === i} className="flex w-full items-center justify-between gap-6 py-7 text-left">
                <span className="font-serif text-2xl sm:text-[1.7rem]">{f.q}</span>
                <motion.span animate={{ rotate: o === i ? 45 : 0 }} transition={{ duration: 0.5, ease }} className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border ${o === i ? "border-champagne bg-champagne text-midnight" : "border-midnight/20"}`}>
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {o === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-mocha">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kapanış çağrısı ---------------- */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const s = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const v = useInView(ref, { once: true, margin: "-20%" });
  const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Merhaba, NOBEL Düğün Kompleksi & Kır Bahçesi için salon turu planlamak istiyorum.")}`;
  return (
    <section id="iletisim" ref={ref} className="relative overflow-hidden bg-midnight px-5 py-32 text-ivory sm:px-8 lg:py-48">
      <motion.div style={{ scale: s }} className="absolute inset-0">
        <Image src="/img/dans-mavi.jpg" alt="" fill sizes="100vw" className="object-cover opacity-35" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/60 to-midnight" />
      <div className="relative mx-auto max-w-5xl text-center">
        <Kicker light center>Hikâyeniz burada başlıyor</Kicker>
        <Lines className="font-serif text-[clamp(3rem,7vw,7rem)] font-light leading-[0.95]" lines={["En güzel gününüzü", <em key="b" className="gold-text animate-shine">birlikte tasarlayalım.</em>]} />
        <motion.p initial={{ opacity: 0 }} animate={v ? { opacity: 1 } : undefined} transition={{ delay: 0.6, duration: 1 }} className="mx-auto mt-8 max-w-xl text-lg text-ivory/70">
          Kır bahçemizi ve balo salonlarımızı keşfedin, organizasyon danışmanlarımızla tanışın ve hayalinizdeki davet için ilk adımı atın.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={v ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.8, duration: 1, ease }} className="mt-12 flex flex-col items-center gap-4">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-champagne py-2 pl-9 pr-2 text-base font-semibold text-midnight transition hover:bg-champagne-2">
            Ücretsiz salon turu planlayın
            <span className="grid h-12 w-12 place-items-center rounded-full bg-midnight text-champagne transition duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[
              [MessageCircle, "WhatsApp", wa],
              [Phone, "0546 186 63 63", brand.phoneHref],
              [MapPin, "Karaköprü / Harita", brand.mapsQuery],
            ].map(([I, l, h]) => {
              const Icon = I as typeof Phone;
              return (
                <a key={l as string} href={h as string} target={(h as string).startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-sm backdrop-blur transition hover:border-champagne hover:text-champagne-2">
                  <Icon className="h-4 w-4" /> {l as string}
                </a>
              );
            })}
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-sm backdrop-blur transition hover:border-champagne hover:text-champagne-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span>{brand.instagramHandle}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
