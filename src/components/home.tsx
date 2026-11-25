"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Sparkles as SparklesIcon, Users } from "lucide-react";
import { concepts, otherEvents, prestige, venues } from "@/lib/data";
import { Kicker, Lines, Reveal, ease } from "@/components/ui";

/* ---------------- Sinematik giriş — Gerçek Nobel Düğün Kompleksi Fotoğrafları ---------------- */
const slides = [
  { src: "/img/nobel/nobel-dis-cephe.jpg", label: "Görkemli Dış Mimari & Karşılama", badge: "Giriş Kompleksi" },
  { src: "/img/nobel/nobel-kir-bahcesi-gece.jpg", label: "2.500 Kişilik Masalsı Kır Bahçesi", badge: "Açık Hava" },
  { src: "/img/nobel/nobel-balo-salonu.jpg", label: "Kristal Avizeli Saray Balo Salonu", badge: "Kapalı Salon" },
  { src: "/img/nobel/nobel-isikli-salon.jpg", label: "Işıklı Tören & Ziyafet Alanı", badge: "Balo Salonu" },
  { src: "/img/nobel/nobel-giris-tagi.jpg", label: "Çiçekli Gelin Yolu & Karşılama Tagı", badge: "Karşılama" },
  { src: "/img/nobel/nobel-ozel-sahne.jpg", label: "Özel Tasarım Nikâh & Kına Sahnesi", badge: "Açık Hava Sahne" },
];

function Sparkles() {
  const [dots, setDots] = useState<{ x: number; d: number; s: number; t: number }[]>([]);
  useEffect(() => {
    setDots(Array.from({ length: 34 }, () => ({ x: Math.random() * 100, d: Math.random() * 8, s: 1 + Math.random() * 2.5, t: 9 + Math.random() * 9 })));
  }, []);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((p, i) => (
        <motion.span key={i} className="absolute bottom-0 rounded-full bg-champagne-2" style={{ left: `${p.x}%`, width: p.s, height: p.s, boxShadow: "0 0 8px #e2cb98" }} animate={{ y: [0, -900], opacity: [0, 1, 0] }} transition={{ duration: p.t, delay: p.d, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const o = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Otomatik geçiş (5 saniyede bir)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const nextSlide = () => setI((x) => (x + 1) % slides.length);
  const prevSlide = () => setI((x) => (x - 1 + slides.length) % slides.length);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[680px] overflow-hidden bg-midnight text-ivory">
      {/* Arka plan sinematik slayt geçişi */}
      <motion.div style={{ y }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <div className="absolute inset-0">
              <Image
                src={slides[i].src}
                alt={slides[i].label}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Karartma ve atmosfer katmanları */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/75 via-midnight/35 to-midnight/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(23,21,17,0.75)_100%)]" />
      <Sparkles />

      {/* Aktif Fotoğraf Rozeti (Sol Üst / Sağ Üst) */}
      <div className="absolute top-28 left-6 sm:left-10 z-20 hidden sm:flex items-center gap-2 rounded-full border border-champagne/30 bg-midnight/60 px-4 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-champagne animate-pulse" />
        <span className="text-[11px] font-semibold text-champagne-2 tracking-wider">
          {slides[i].badge} · {slides[i].label}
        </span>
      </div>

      {/* Manuel Önceki / Sonraki Butonları */}
      <button
        onClick={prevSlide}
        aria-label="Önceki fotoğraf"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:grid h-12 w-12 place-items-center rounded-full border border-ivory/20 bg-midnight/40 text-ivory backdrop-blur-md transition hover:border-champagne hover:bg-champagne hover:text-midnight cursor-pointer"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Sonraki fotoğraf"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:grid h-12 w-12 place-items-center rounded-full border border-ivory/20 bg-midnight/40 text-ivory backdrop-blur-md transition hover:border-champagne hover:bg-champagne hover:text-midnight cursor-pointer"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Ana Başlık ve İçerik */}
      <motion.div style={{ opacity: o }} className="relative flex h-full flex-col items-center justify-center px-5 pt-16 text-center z-10">
        <motion.p initial={{ opacity: 0, letterSpacing: "0.2em" }} animate={{ opacity: 1, letterSpacing: "0.48em" }} transition={{ duration: 2, delay: 0.4, ease }} className="text-[11px] font-semibold uppercase text-champagne-2">
          NOBEL · Düğün Kompleksi &amp; Kır Bahçesi
        </motion.p>
        <Lines as="h1" delay={0.6} className="mt-8 font-serif text-[clamp(3.2rem,9vw,9.5rem)] font-light leading-[0.92] tracking-[-0.01em]" lines={["Aşkınızın", <em key="b" className="gold-text animate-shine font-normal">en görkemli hâli.</em>]} />
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.3, ease }} className="mt-8 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg">
          Şanlıurfa Karaköprü&apos;de 2.500 kişilik açık hava kır bahçesi ve lüks saray balo salonuyla hayalinizdeki düğün gerçeğe dönüşsün.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.5, ease }} className="mt-11 flex flex-col gap-3 sm:flex-row">
          <a href="#salonlar" className="group inline-flex items-center justify-center gap-3 rounded-full bg-champagne py-2 pl-8 pr-2 text-sm font-semibold text-midnight transition hover:bg-champagne-2">
            Salonlarımızı keşfedin
            <span className="grid h-11 w-11 place-items-center rounded-full bg-midnight text-champagne transition duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
          <a href="#iletisim" className="inline-flex items-center justify-center rounded-full border border-ivory/30 px-8 py-4 text-sm backdrop-blur transition hover:border-champagne hover:text-champagne-2">
            Ücretsiz salon turu planlayın
          </a>
        </motion.div>
      </motion.div>

      {/* Kaydırma İpucu */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-ivory/50 sm:flex z-10">
        Keşfetmek için kaydırın
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4 text-champagne" />
        </motion.span>
      </div>

      {/* Alt Çizgisel Slayt İlerleme Göstergeleri (Mobil & Masaüstü) */}
      <div className="absolute bottom-8 sm:bottom-10 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-8 flex gap-2 z-20">
        {slides.map((s, k) => (
          <button
            key={k}
            onClick={() => setI(k)}
            aria-label={`${k + 1}. görsel: ${s.label}`}
            className="group relative h-1.5 w-8 sm:w-10 overflow-hidden rounded-full bg-ivory/25 hover:bg-ivory/40 transition cursor-pointer"
          >
            {k === i && (
              <motion.span
                key={i}
                className="block h-full bg-champagne"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Prestij göstergeleri ---------------- */
function Count({ n, go }: { n: number; go: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    const c = animate(0, n, { duration: 2.2, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [go, n]);
  return <>{v.toLocaleString("tr-TR")}</>;
}

export function Prestige() {
  const ref = useRef<HTMLDivElement>(null);
  const go = useInView(ref, { once: true, margin: "-10%" });
  return (
    <section className="bg-midnight px-5 pb-24 pt-20 text-ivory sm:px-8">
      <div ref={ref} className="mx-auto grid max-w-[88rem] grid-cols-2 gap-y-12 lg:grid-cols-4">
        {prestige.map((p, i) => (
          <div key={p.l} className={`px-4 text-center ${i ? "lg:border-l lg:border-champagne/15" : ""}`}>
            <p className="font-serif text-[clamp(3rem,6vw,5.5rem)] font-light leading-none">
              <span className="gold-text">
                <Count n={p.n} go={go} />
                {p.s}
              </span>
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ivory/55">{p.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Kaydırmayla dolan manifesto ---------------- */
function Word({ w, p, i, n }: { w: string; p: MotionValue<number>; i: number; n: number }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.15, 1]);
  return (
    <motion.span style={{ opacity: o }} className="mr-[0.24em] inline-block">
      {w}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = "Bir düğün yalnızca bir gece değildir. İki ailenin buluştuğu, yıllarca anlatılacak bir hikâyenin ilk sayfasıdır. Biz o sayfayı; ışığıyla, müziğiyle ve sofrasıyla özenle yazıyoruz.".split(" ");
  return (
    <section id="deneyim" className="relative overflow-hidden bg-ivory px-5 py-32 sm:px-8 lg:py-44">
      <div className="mx-auto grid max-w-[88rem] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Kicker>Hikâyemiz</Kicker>
          <p ref={ref} className="font-serif text-[clamp(2rem,4.2vw,4.2rem)] font-light leading-[1.12]">
            {words.map((w, i) => (
              <Word key={i} w={w} p={scrollYProgress} i={i} n={words.length} />
            ))}
          </p>
        </div>
        <div className="relative lg:col-span-4">
          <Reveal className="relative ml-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-full">
            <Image src="/img/saray-avize.jpg" alt="Sütunlu salonda kristal avize" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover" />
          </Reveal>
          <Reveal delay={0.2} className="absolute -bottom-8 -left-2 rounded-2xl bg-midnight px-6 py-5 text-ivory shadow-2xl lg:-left-16">
            <p className="font-serif text-3xl italic text-champagne-2">“Her detay önemlidir.”</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ivory/50">NOBEL ilkesi</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Organizasyon konseptleri ---------------- */
function ConceptCard({ c }: { c: (typeof concepts)[number] }) {
  return (
    <Link href={`/salonlar/${c.venue}`} className="group relative block h-full overflow-hidden rounded-[2rem] bg-midnight text-ivory">
      <Image src={c.img} alt={c.t} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover opacity-80 transition duration-[1.6s] ease-out group-hover:scale-105 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7">
        <span className="font-serif text-xl italic text-champagne-2">
          {c.no} — {c.en}
        </span>
        <span className="rounded-full border border-ivory/25 px-3 py-1 text-[11px] backdrop-blur">{c.place}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
        <h3 className="font-serif text-[2.4rem] leading-[1] sm:text-5xl">{c.t}</h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/70">{c.d}</p>
        <div className="mt-6 flex items-center justify-between border-t border-ivory/15 pt-5 text-sm">
          <span className="flex items-center gap-2 text-ivory/70">
            <Users className="h-4 w-4 text-champagne" /> {c.cap}
          </span>
          <span className="flex items-center gap-2 font-semibold text-champagne-2">
            Konsepti keşfet <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Concepts() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-64%"]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const head = (
    <>
      <Kicker light>Organizasyon deneyimleri</Kicker>
      <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.6rem)] font-light leading-[0.98]" lines={["Her davetin", <em key="b" className="text-champagne-2">kendi atmosferi.</em>]} />
    </>
  );
  return (
    <div id="organizasyonlar">
      <section ref={ref} className="relative hidden h-[420vh] bg-midnight text-ivory lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-12 flex w-full max-w-[88rem] items-end justify-between px-8">
            <div>{head}</div>
            <p className="max-w-xs text-sm text-ivory/55">Altı imza konsept; her biri ayrı bir dekor, ışık ve akış kurgusuyla.</p>
          </div>
          <motion.div style={{ x }} className="flex gap-6 pl-[max(2rem,calc((100vw-88rem)/2+2rem))]">
            {concepts.map((c) => (
              <div key={c.id} className="h-[58vh] w-[42vw] shrink-0">
                <ConceptCard c={c} />
              </div>
            ))}
            <div className="flex h-[58vh] w-[30vw] shrink-0 flex-col justify-center rounded-[2rem] border border-champagne/25 p-10">
              <p className="font-serif text-4xl">Ve dahası…</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {otherEvents.map((e) => (
                  <span key={e} className="rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory/75">{e}</span>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="mx-auto mt-10 w-full max-w-[88rem] px-8">
            <div className="h-px w-full bg-ivory/10">
              <motion.div style={{ width: bar }} className="h-px bg-champagne" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-midnight px-5 py-24 text-ivory sm:px-8 lg:hidden">
        {head}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {concepts.map((c) => (
            <Reveal key={c.id} className="h-[460px]">
              <ConceptCard c={c} />
            </Reveal>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {otherEvents.map((e) => (
            <span key={e} className="rounded-full border border-ivory/20 px-4 py-2 text-sm text-ivory/75">{e}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------------- Salonlarımız ---------------- */
function VenueRow({ v, i }: { v: (typeof venues)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Link href={`/salonlar/${v.slug}`} className={`group relative block aspect-[4/3] overflow-hidden rounded-[2rem] lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <motion.div style={{ y }} className="absolute inset-[-10%_0]">
          <Image src={v.cover} alt={v.name} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition duration-[1.6s] group-hover:scale-105" />
        </motion.div>
        <div className="absolute inset-0 bg-midnight/10 transition group-hover:bg-transparent" />
        <span className="absolute left-6 top-6 rounded-full bg-ivory/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-midnight backdrop-blur">{v.kind}</span>
        <span className="absolute bottom-6 right-6 grid h-16 w-16 place-items-center rounded-full bg-champagne text-midnight transition duration-700 group-hover:rotate-45 group-hover:scale-110">
          <ArrowUpRight className="h-6 w-6" />
        </span>
      </Link>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          <span className="font-serif text-7xl font-light text-champagne/50">0{i + 1}</span>
          <h3 className="mt-2 font-serif text-[clamp(2.6rem,4.4vw,4.4rem)] font-light leading-none">{v.name}</h3>
          <p className="mt-6 text-lg leading-relaxed text-mocha">{v.short}</p>
          <div className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-midnight/10">
            {[
              ["Kapasite", `${v.min.toLocaleString("tr-TR")} – ${v.max.toLocaleString("tr-TR")}`],
              ["Alan", v.area],
              ["Tavan", v.ceiling],
            ].map(([k, val]) => (
              <div key={k} className="bg-ivory p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mocha">{k}</p>
                <p className="mt-1 font-serif text-xl">{val}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {v.events.map((e) => (
              <span key={e} className="rounded-full border border-midnight/15 px-3 py-1.5 text-xs">{e}</span>
            ))}
          </div>
          <Link href={`/salonlar/${v.slug}`} className="group mt-9 inline-flex items-center gap-3 border-b border-champagne py-2 text-sm font-semibold uppercase tracking-[0.2em]">
            Salonu keşfet · 360° tur <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export function Venues() {
  return (
    <section id="salonlar" className="bg-ivory px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-20 text-center">
          <Kicker center>Salonlarımız</Kicker>
          <Lines className="font-serif text-[clamp(2.8rem,5.6vw,5.8rem)] font-light leading-[0.98]" lines={["Üç mekân,", <em key="b" className="text-champagne-deep">sonsuz olasılık.</em>]} />
        </div>
        <div className="grid gap-28 lg:gap-40">
          {venues.map((v, i) => (
            <VenueRow key={v.slug} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
