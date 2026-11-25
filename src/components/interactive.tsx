"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import { brand, checklist, eventTypes, extras, layouts, venues, type LayoutId } from "@/lib/data";
import { Kicker, Lines, Monogram, ease } from "@/components/ui";

/* =========================================================
   Masa düzeni karşılaştırıcı + akıllı salon önerisi
   ========================================================= */
type Slot = { x: number; y: number; w: number; h: number; r: number };
const N = 28;
function slotsFor(id: LayoutId): Slot[] {
  const out: Slot[] = [];
  if (id === "yuvarlak") {
    const ys = [140, 225, 310, 395];
    for (const y of ys) for (let c = 0; c < 8; c++) {
      if ((y === 225 || y === 310) && (c === 3 || c === 4)) continue;
      out.push({ x: 70 + c * 95 - 22, y: y - 22, w: 44, h: 44, r: 22 });
    }
  } else if (id === "ziyafet") {
    for (const y of [135, 195, 330, 390]) for (let c = 0; c < 7; c++) out.push({ x: 190 + c * 60, y: y - 14, w: 60, h: 28, r: 3 });
  } else if (id === "kokteyl") {
    for (let k = 0; k < N; k++) {
      const a = k * 2.399963;
      const rr = 40 + Math.sqrt(k / N) * 230;
      out.push({ x: 400 + Math.cos(a) * rr * 1.35 - 13, y: 282 + Math.sin(a) * rr * 0.6 - 13, w: 26, h: 26, r: 13 });
    }
  } else {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) out.push({ x: 115 + c * 84, y: 160 + r * 64, w: 72, h: 14, r: 4 });
  }
  return out.slice(0, N);
}

function capacity(max: number, id: LayoutId) {
  const f = { yuvarlak: 1, ziyafet: 0.8, kokteyl: 1.25, protokol: 1.2 }[id];
  return Math.round((max * f) / 10) * 10;
}

export function Seating() {
  const [lay, setLay] = useState<LayoutId>("yuvarlak");
  const [guests, setGuests] = useState(400);
  const slots = useMemo(() => slotsFor(lay), [lay]);
  const L = layouts.find((l) => l.id === lay)!;
  const fits = venues.filter((v) => guests >= Math.round(v.min * 0.6) && guests <= capacity(v.max, lay));
  const tables = lay === "protokol" ? Math.ceil(guests / 20) : Math.ceil(guests / L.per);

  return (
    <section id="masa-duzeni" className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Kicker>Akıllı masa planı</Kicker>
            <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.6rem)] font-light leading-[0.98]" lines={["Düzeninizi", <em key="b" className="text-champagne-deep">şimdiden görün.</em>]} />
          </div>
          <p className="max-w-sm text-mocha">Masa düzenlerini karşılaştırın, davetli sayınızı girin; size uygun salonu önerelim.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-[2rem] bg-midnight p-4 sm:p-8 lg:col-span-8">
            <svg viewBox="0 0 800 500" className="w-full" role="img" aria-label={`${L.t} kuşbakışı yerleşim planı`}>
              <defs>
                <pattern id="floor" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M24 0H0V24" fill="none" stroke="#c6a66b" strokeOpacity=".07" />
                </pattern>
                <radialGradient id="pist">
                  <stop offset="0" stopColor="#e2cb98" stopOpacity=".35" />
                  <stop offset="1" stopColor="#c6a66b" stopOpacity=".05" />
                </radialGradient>
              </defs>
              <rect x="10" y="10" width="780" height="480" rx="18" fill="url(#floor)" stroke="#c6a66b" strokeOpacity=".25" />
              <motion.rect animate={{ x: lay === "protokol" ? 180 : 260, width: lay === "protokol" ? 440 : 280 }} y="30" height="56" rx="8" fill="#2c2820" stroke="#c6a66b" strokeOpacity=".6" transition={{ duration: 0.9, ease }} />
              <text x="400" y="64" textAnchor="middle" fill="#e2cb98" fontSize="13" letterSpacing="4">SAHNE</text>
              <motion.ellipse cx="400" cy="267" animate={{ rx: lay === "yuvarlak" ? 92 : lay === "ziyafet" ? 190 : 0, ry: lay === "yuvarlak" ? 62 : lay === "ziyafet" ? 34 : 0, opacity: lay === "kokteyl" || lay === "protokol" ? 0 : 1 }} fill="url(#pist)" stroke="#c6a66b" strokeOpacity=".5" strokeDasharray="4 6" transition={{ duration: 0.9, ease }} />
              {(lay === "yuvarlak" || lay === "ziyafet") && (
                <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="400" y="271" textAnchor="middle" fill="#e2cb98" fontSize="11" letterSpacing="3">
                  DANS PİSTİ
                </motion.text>
              )}
              {slots.map((s, k) => (
                <motion.rect key={k} initial={false} animate={{ x: s.x, y: s.y, width: s.w, height: s.h, rx: s.r }} transition={{ duration: 0.9, delay: k * 0.012, ease }} fill="#f5f0e7" fillOpacity={lay === "protokol" ? 0.75 : 0.92} stroke="#c6a66b" strokeWidth="1.5" />
              ))}
              <rect x="360" y="468" width="80" height="14" rx="3" fill="#c6a66b" fillOpacity=".5" />
              <text x="400" y="460" textAnchor="middle" fill="#f5f0e7" fillOpacity=".5" fontSize="10" letterSpacing="3">GİRİŞ</text>
            </svg>
            <p className="mt-3 text-center text-xs text-ivory/40">Temsili kuşbakışı plan · Gerçek yerleşim salon turunda netleştirilir.</p>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="grid grid-cols-2 gap-2">
              {layouts.map((l) => (
                <button key={l.id} onClick={() => setLay(l.id)} aria-pressed={lay === l.id} className={`rounded-2xl border p-4 text-left transition duration-500 ${lay === l.id ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 bg-ivory hover:border-midnight/40"}`}>
                  <p className="font-serif text-xl leading-tight">{l.t}</p>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p key={lay} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-mocha">
                {L.d}
              </motion.p>
            </AnimatePresence>
            <div className="rounded-[1.75rem] bg-ivory p-6">
              <div className="flex items-baseline justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-mocha">Davetli sayısı</p>
                <p className="font-serif text-4xl tabular-nums">{guests.toLocaleString("tr-TR")}</p>
              </div>
              <input type="range" min={50} max={1500} step={10} value={guests} onChange={(e) => setGuests(+e.target.value)} className="mt-4 w-full accent-[#9a7d45]" aria-label="Davetli sayısı" />
              <div className="mt-1 flex justify-between text-xs text-mocha">
                <span>50</span>
                <span>1.500</span>
              </div>
              <p className="mt-5 text-sm">
                Yaklaşık <b className="font-semibold">{tables}</b> {lay === "protokol" ? "oturma sırası" : lay === "kokteyl" ? "kokteyl masası" : "masa"}
              </p>
            </div>
            <div className="rounded-[1.75rem] bg-midnight p-6 text-ivory">
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">
                <Sparkles className="h-4 w-4" /> Önerilen salon
              </p>
              <AnimatePresence mode="popLayout">
                {fits.length ? (
                  fits.map((v) => (
                    <motion.div key={v.slug} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                      <Link href={`/salonlar/${v.slug}`} className="group mt-3 flex items-center justify-between border-b border-ivory/10 pb-3">
                        <span>
                          <span className="block font-serif text-2xl">{v.name}</span>
                          <span className="text-xs text-ivory/50">Bu düzende {capacity(v.max, lay).toLocaleString("tr-TR")} kişiye kadar</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-champagne transition group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-ivory/60">
                    Bu düzen ve davetli sayısı için birlikte özel bir kurgu hazırlayalım.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Dekorasyon konfigüratörü
   ========================================================= */
const flowers = [
  { id: "beyaz", t: "Beyaz güller", c: ["#fbf7ef", "#efe6d6", "#e5d9c3", "#ffffff"], leaf: "#7d8a6a" },
  { id: "pudra", t: "Pudra ve şakayık", c: ["#f3d3d1", "#e8b4b8", "#f8e4e1", "#d99aa1"], leaf: "#8b927a" },
  { id: "bordo", t: "Bordo ve mürdüm", c: ["#7a1f2b", "#a33a47", "#5c1520", "#c45a63"], leaf: "#5d6650" },
  { id: "kir", t: "Kır çiçekleri", c: ["#f2c14e", "#e57a44", "#b7d1e8", "#f6f1e7"], leaf: "#6f8a4f" },
];
const lights = [
  { id: "mum", t: "Mum ışığı", bg: ["#3a2a17", "#120e09"], glow: "#ffb45e", k: 1 },
  { id: "kristal", t: "Kristal ışıltı", bg: ["#2a2d36", "#0f1014"], glow: "#e9f0ff", k: 0.8 },
  { id: "los", t: "Loş ve romantik", bg: ["#3a1b24", "#110a0d"], glow: "#ff8aa0", k: 0.6 },
];
const cloths = [
  { id: "fildisi", t: "Fildişi", c: "#f2ebde", s: "#d9cdb8" },
  { id: "sampanya", t: "Şampanya", c: "#d9c193", s: "#b89d68" },
  { id: "gece", t: "Gece mavisi", c: "#1e2638", s: "#121827" },
];

function Opt({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={on} className={`flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition ${on ? "border-champagne bg-champagne/15 text-ivory" : "border-ivory/15 text-ivory/65 hover:border-ivory/40"}`}>
      {children}
    </button>
  );
}

export function Decor() {
  const [f, setF] = useState(flowers[0]);
  const [l, setL] = useState(lights[0]);
  const [c, setC] = useState(cloths[0]);
  const blooms = useMemo(() => {
    const out: { x: number; y: number; r: number; k: number }[] = [];
    for (let i = 0; i < 26; i++) {
      const a = i * 2.4, rr = 8 + (i % 7) * 7;
      out.push({ x: 300 + Math.cos(a) * rr * 1.6, y: 205 - Math.abs(Math.sin(a)) * rr * 0.9 - (i % 3) * 6, r: 9 + (i % 4) * 2.5, k: i % 4 });
    }
    return out;
  }, []);
  return (
    <section className="relative overflow-hidden bg-midnight px-5 py-28 text-ivory sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker light>Dekorasyon konfigüratörü</Kicker>
          <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.4rem)] font-light leading-[0.98]" lines={["Masanızı", <em key="b" className="text-champagne-2">siz tasarlayın.</em>]} />
          <p className="mt-6 max-w-md text-ivory/60">Çiçek paletini, ışığı ve masa örtüsünü seçin; davet masanızın atmosferini anında görün.</p>
          <div className="mt-10 grid gap-7">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">Çiçekler</p>
              <div className="flex flex-wrap gap-2">
                {flowers.map((x) => (
                  <Opt key={x.id} on={f.id === x.id} onClick={() => setF(x)}>
                    <span className="flex -space-x-1">
                      {x.c.slice(0, 3).map((cc) => (
                        <span key={cc} className="h-3.5 w-3.5 rounded-full border border-midnight" style={{ background: cc }} />
                      ))}
                    </span>
                    {x.t}
                  </Opt>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">Işık</p>
              <div className="flex flex-wrap gap-2">
                {lights.map((x) => (
                  <Opt key={x.id} on={l.id === x.id} onClick={() => setL(x)}>
                    <span className="h-3.5 w-3.5 rounded-full" style={{ background: x.glow, boxShadow: `0 0 10px ${x.glow}` }} />
                    {x.t}
                  </Opt>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">Masa örtüsü</p>
              <div className="flex flex-wrap gap-2">
                {cloths.map((x) => (
                  <Opt key={x.id} on={c.id === x.id} onClick={() => setC(x)}>
                    <span className="h-3.5 w-3.5 rounded-full border border-ivory/30" style={{ background: x.c }} />
                    {x.t}
                  </Opt>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-[2rem] border border-champagne/20">
            <svg viewBox="0 0 600 440" className="block w-full" role="img" aria-label={`${f.t}, ${l.t}, ${c.t} örtü ile masa önizlemesi`}>
              <defs>
                <radialGradient id="room" cx="50%" cy="30%" r="80%">
                  <motion.stop offset="0" animate={{ stopColor: l.bg[0] }} transition={{ duration: 1 }} />
                  <motion.stop offset="1" animate={{ stopColor: l.bg[1] }} transition={{ duration: 1 }} />
                </radialGradient>
                <radialGradient id="glow">
                  <motion.stop offset="0" animate={{ stopColor: l.glow }} stopOpacity=".55" />
                  <stop offset="1" stopColor="#000" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cloth" x1="0" y1="0" x2="0" y2="1">
                  <motion.stop offset="0" animate={{ stopColor: c.c }} transition={{ duration: 0.8 }} />
                  <motion.stop offset="1" animate={{ stopColor: c.s }} transition={{ duration: 0.8 }} />
                </linearGradient>
              </defs>
              <rect width="600" height="440" fill="url(#room)" />
              {/* avize */}
              <g opacity={l.id === "kristal" ? 1 : 0.55}>
                <line x1="300" y1="0" x2="300" y2="40" stroke="#c6a66b" />
                <path d="M240 60 Q300 90 360 60" fill="none" stroke="#c6a66b" strokeWidth="2" />
                <path d="M255 52 Q300 72 345 52" fill="none" stroke="#c6a66b" strokeWidth="1.5" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.circle key={i} cx={244 + i * 14} cy={70 + Math.sin(i / 8 * Math.PI) * 14} r="3" fill={l.glow} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2 + (i % 3), repeat: Infinity }} />
                ))}
              </g>
              <motion.ellipse cx="300" cy="230" rx="260" ry="150" fill="url(#glow)" animate={{ opacity: l.k }} transition={{ duration: 1 }} />
              {/* masa */}
              <ellipse cx="300" cy="300" rx="220" ry="46" fill="url(#cloth)" />
              <path d="M80 300 L92 428 Q300 446 508 428 L520 300 Q300 360 80 300Z" fill="url(#cloth)" />
              {[150, 230, 300, 370, 450].map((x) => (
                <path key={x} d={`M${x} 335 Q${x + 4} 390 ${x - 2} 436`} fill="none" stroke="#000" strokeOpacity=".07" strokeWidth="6" />
              ))}
              <path d="M80 300 Q300 360 520 300" fill="none" stroke="#000" strokeOpacity=".12" strokeWidth="2" />
              {[150, 450].map((x) => (
                <g key={x}>
                  <ellipse cx={x} cy={302} rx="34" ry="8" fill="#fff" fillOpacity=".9" />
                  <ellipse cx={x} cy={302} rx="22" ry="5" fill="none" stroke="#c6a66b" />
                </g>
              ))}
              {/* mumlar */}
              {[210, 390, 245, 355].map((x, i) => (
                <g key={x}>
                  <rect x={x - 4} y={250 - (i % 2) * 18} width="8" height={40 + (i % 2) * 18} fill="#f5f0e7" />
                  <motion.ellipse cx={x} cy={244 - (i % 2) * 18} rx="4" ry="8" fill={l.glow} animate={{ scaleY: [1, 1.25, 0.9, 1], opacity: [0.9, 1, 0.8, 0.9] }} style={{ transformBox: "fill-box", transformOrigin: "center bottom" }} transition={{ duration: 1.4 + i * 0.2, repeat: Infinity }} />
                  <circle cx={x} cy={244 - (i % 2) * 18} r="16" fill={l.glow} opacity=".18" />
                </g>
              ))}
              {/* çiçek aranjmanı */}
              <rect x="285" y="230" width="30" height="62" rx="4" fill="#c6a66b" fillOpacity=".8" />
              {[-60, -30, 0, 30, 60].map((a, i) => (
                <motion.ellipse key={a} cx={300 + a * 1.2} cy={222 - Math.abs(a) * 0.1} rx="16" ry="6" fill={f.leaf} transform={`rotate(${a / 2} ${300 + a * 1.2} ${222 - Math.abs(a) * 0.1})`} animate={{ fill: f.leaf }} transition={{ duration: 0.8, delay: i * 0.04 }} />
              ))}
              {blooms.map((b, i) => (
                <g key={i}>
                  <motion.circle cx={b.x} cy={b.y} r={b.r} animate={{ fill: f.c[b.k] }} transition={{ duration: 0.7, delay: i * 0.02 }} />
                  <motion.circle cx={b.x - b.r * 0.2} cy={b.y - b.r * 0.2} r={b.r * 0.45} fill="#fff" animate={{ opacity: f.id === "bordo" ? 0.12 : 0.35 }} />
                </g>
              ))}
            </svg>
          </div>
          <p className="mt-3 text-center text-xs text-ivory/40">Temsili önizlemedir; dekorasyon seçenekleri tasarım ekibimizle birlikte detaylandırılır.</p>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Davet planlayıcısı (adım adım)
   ========================================================= */
export function Planner() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState(eventTypes[0]);
  const [guests, setGuests] = useState(400);
  const [venue, setVenue] = useState("Henüz karar vermedim");
  const [date, setDate] = useState("");
  const [ex, setEx] = useState<string[]>([]);
  const steps = ["Organizasyon", "Davetli", "Mekân", "Tarih", "Ek hizmetler"];
  const venueOpts = [...venues.map((v) => `${v.name} · ${v.kind}`), "Henüz karar vermedim"];
  const dateText = date ? new Date(date + "T12:00").toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "Belirlenmedi";
  const msg = `Merhaba, NOBEL Düğün Kompleksi için teklif almak istiyorum.\nOrganizasyon: ${type}\nDavetli: ${guests}\nMekân: ${venue}\nTarih: ${dateText}\nEk hizmetler: ${ex.join(", ") || "-"}`;
  const today = new Date().toISOString().slice(0, 10);

  const Choice = ({ v, on, onClick }: { v: string; on: boolean; onClick: () => void }) => (
    <button onClick={onClick} aria-pressed={on} className={`flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left transition ${on ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 bg-ivory hover:border-midnight/40"}`}>
      <span className="font-serif text-xl">{v}</span>
      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${on ? "border-champagne bg-champagne text-midnight" : "border-midnight/25"}`}>{on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}</span>
    </button>
  );

  return (
    <section id="planlayici" className="bg-ivory px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="text-center">
          <Kicker center>Davet planlayıcısı</Kicker>
          <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.6rem)] font-light leading-[0.98]" lines={["Hayalinizdeki daveti", <em key="b" className="text-champagne-deep">birkaç adımda planlayın.</em>]} />
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(23,21,17,0.35)] sm:p-10 lg:col-span-8">
            <div className="flex gap-2">
              {steps.map((s, i) => (
                <button key={s} onClick={() => setStep(i)} className="group -my-3 flex-1 py-3 text-left" aria-current={i === step} aria-label={`${i + 1}. adım: ${s}`}>
                  <span className={`block h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-champagne" : "bg-midnight/10"}`} />
                  <span className={`mt-3 hidden text-[11px] font-semibold uppercase tracking-[0.16em] sm:block ${i === step ? "text-midnight" : "text-mocha/60"}`}>
                    {i + 1}. {s}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-10 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.45, ease }}>
                  {step === 0 && (
                    <>
                      <h3 className="font-serif text-4xl">Organizasyon türünüz</h3>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {eventTypes.map((t) => (
                          <Choice key={t} v={t} on={type === t} onClick={() => setType(t)} />
                        ))}
                      </div>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <h3 className="font-serif text-4xl">Tahmini davetli sayısı</h3>
                      <p className="mt-10 text-center font-serif text-[6rem] font-light leading-none tabular-nums">
                        {guests.toLocaleString("tr-TR")}
                        <span className="ml-3 text-2xl text-mocha">kişi</span>
                      </p>
                      <input type="range" min={50} max={1500} step={10} value={guests} onChange={(e) => setGuests(+e.target.value)} className="mt-8 w-full accent-[#9a7d45]" aria-label="Davetli sayısı" />
                      <div className="mt-2 flex justify-between text-sm text-mocha">
                        <span>50 kişi</span>
                        <span>1.500 kişi</span>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h3 className="font-serif text-4xl">Mekân tercihiniz</h3>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {venueOpts.map((v) => (
                          <Choice key={v} v={v} on={venue === v} onClick={() => setVenue(v)} />
                        ))}
                      </div>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <h3 className="font-serif text-4xl">Planlanan tarih</h3>
                      <p className="mt-3 text-mocha">Kesin değilse yaklaşık bir tarih seçebilirsiniz.</p>
                      <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="mt-8 w-full rounded-2xl border border-midnight/15 bg-ivory px-5 py-4 font-serif text-2xl outline-none focus:border-champagne" aria-label="Planlanan tarih" />
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <h3 className="font-serif text-4xl">Ek hizmetler</h3>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {extras.map((x) => (
                          <Choice key={x} v={x} on={ex.includes(x)} onClick={() => setEx((o) => (o.includes(x) ? o.filter((y) => y !== x) : [...o, x]))} />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-midnight/10 pt-6">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-sm text-mocha transition hover:text-midnight disabled:opacity-30">
                <ArrowLeft className="h-4 w-4" /> Geri
              </button>
              {step < steps.length - 1 ? (
                <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 rounded-full bg-midnight px-7 py-3.5 text-sm font-semibold text-ivory transition hover:bg-midnight-3">
                  Devam <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <a href="#ozet" className="inline-flex items-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-midnight transition hover:bg-champagne-2">
                  Özeti gör <Check className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <aside id="ozet" className="relative overflow-hidden rounded-[2rem] bg-midnight p-8 text-ivory lg:col-span-4">
            <Monogram className="absolute -right-10 -top-10 h-48 w-48 opacity-10" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">Davet özetiniz</p>
            <dl className="mt-6 grid gap-4">
              {[
                ["Organizasyon", type],
                ["Davetli", `${guests.toLocaleString("tr-TR")} kişi`],
                ["Mekân", venue],
                ["Tarih", dateText],
                ["Ek hizmetler", ex.length ? ex.join(", ") : "Seçilmedi"],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-ivory/10 pb-3">
                  <dt className="text-[10px] uppercase tracking-[0.24em] text-ivory/45">{k}</dt>
                  <motion.dd key={v} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 font-serif text-xl">
                    {v}
                  </motion.dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 grid gap-3">
              <a href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-6 py-4 text-sm font-semibold text-midnight transition hover:bg-champagne-2">
                <MessageCircle className="h-4 w-4" /> WhatsApp ile teklif iste
              </a>
              <a href={`mailto:${brand.email}?subject=${encodeURIComponent("Teklif talebi")}&body=${encodeURIComponent(msg)}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/20 px-6 py-4 text-sm transition hover:border-champagne">
                <Mail className="h-4 w-4" /> E-posta ile gönder
              </a>
            </div>
            <p className="mt-5 text-xs leading-relaxed text-ivory/40">Seçimleriniz yalnızca mesaj taslağı oluşturmak için kullanılır; site üzerinde saklanmaz.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Dijital davetiye önizlemesi
   ========================================================= */
const themes = [
  { id: "altin", t: "Klasik altın", bg: "#fbf8f1", ink: "#2a251c", acc: "#b08d4f" },
  { id: "gece", t: "Gece", bg: "#171511", ink: "#f5f0e7", acc: "#d8bd85" },
  { id: "botanik", t: "Botanik", bg: "#eef0e8", ink: "#2f3a2a", acc: "#7d8a6a" },
];

export function Invitation() {
  const [a, setA] = useState("Elif");
  const [b, setB] = useState("Can");
  const [d, setD] = useState("");
  const [v, setV] = useState(venues[0].name);
  const [th, setTh] = useState(themes[0]);
  const dt = d ? new Date(d + "T12:00") : null;
  const dateText = dt ? dt.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "Gün Ay Yıl";
  const dayText = dt ? dt.toLocaleDateString("tr-TR", { weekday: "long" }) : "";
  const ini = `${(a.trim()[0] || "A").toLocaleUpperCase("tr-TR")}${(b.trim()[0] || "B").toLocaleUpperCase("tr-TR")}`;
  const field = "w-full rounded-2xl border border-midnight/15 bg-white px-5 py-3.5 outline-none transition focus:border-champagne";
  return (
    <section className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>Dijital davetiye</Kicker>
          <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.4rem)] font-light leading-[0.98]" lines={["Davetiyeniz", <em key="b" className="text-champagne-deep">bir dokunuş uzakta.</em>]} />
          <p className="mt-6 max-w-md text-mocha">İsimlerinizi ve tarihinizi yazın; davetiyenizin taslağını hemen görün. Tasarım ekibimiz son hâlini sizinle birlikte hazırlar.</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <input className={field} value={a} maxLength={24} onChange={(e) => setA(e.target.value)} placeholder="Gelinin adı" aria-label="Gelinin adı" />
            <input className={field} value={b} maxLength={24} onChange={(e) => setB(e.target.value)} placeholder="Damadın adı" aria-label="Damadın adı" />
            <input className={field} type="date" value={d} onChange={(e) => setD(e.target.value)} aria-label="Düğün tarihi" />
            <select className={field} value={v} onChange={(e) => setV(e.target.value)} aria-label="Salon">
              {venues.map((x) => (
                <option key={x.slug}>{x.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {themes.map((x) => (
              <button key={x.id} onClick={() => setTh(x)} aria-pressed={th.id === x.id} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${th.id === x.id ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 hover:border-midnight/40"}`}>
                <span className="h-3.5 w-3.5 rounded-full border border-midnight/20" style={{ background: x.bg }} /> {x.t}
              </button>
            ))}
          </div>
        </div>
        <div className="grid place-items-center lg:col-span-7">
          <motion.div key={th.id} initial={{ rotateY: -90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 1, ease }} style={{ background: th.bg, color: th.ink, perspective: 1000 }} className="relative w-full max-w-[440px] rounded-[6px] p-3 shadow-[0_50px_100px_-40px_rgba(23,21,17,0.55)]">
            <div className="relative rounded-[3px] border px-8 py-14 text-center sm:px-12" style={{ borderColor: th.acc }}>
              <div className="pointer-events-none absolute inset-2 rounded-[2px] border border-dashed opacity-40" style={{ borderColor: th.acc }} />
              <svg viewBox="0 0 120 120" className="mx-auto h-24 w-24">
                <circle cx="60" cy="60" r="54" fill="none" stroke={th.acc} />
                <circle cx="60" cy="60" r="48" fill="none" stroke={th.acc} strokeDasharray="1 4" />
                <text x="60" y="72" textAnchor="middle" fontSize="34" fill={th.acc} style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
                  {ini}
                </text>
              </svg>
              <p className="mt-6 text-[10px] uppercase tracking-[0.4em]" style={{ color: th.acc }}>Birlikte bir ömre</p>
              <p className="mt-5 break-words font-serif text-[3.2rem] font-light italic leading-[1]">{a || "Gelin"}</p>
              <p className="my-2 font-serif text-2xl" style={{ color: th.acc }}>&amp;</p>
              <p className="break-words font-serif text-[3.2rem] font-light italic leading-[1]">{b || "Damat"}</p>
              <p className="mx-auto mt-7 max-w-[260px] text-sm leading-relaxed opacity-75">Hayatımızın en mutlu gününde sizleri de aramızda görmekten onur duyarız.</p>
              <div className="mx-auto mt-7 h-px w-24" style={{ background: th.acc }} />
              <p className="mt-6 font-serif text-2xl">{dateText}</p>
              {dayText && <p className="text-xs uppercase tracking-[0.3em] opacity-60">{dayText}</p>}
              <p className="mt-4 text-[11px] uppercase tracking-[0.32em]" style={{ color: th.acc }}>
                NOBEL · {v}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Kişisel düğün kontrol listesi (yalnızca bu cihazda)
   ========================================================= */
const CK = "nobel-kontrol";
export function Checklist() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(CK) || "[]"));
    } catch {}
  }, []);
  const toggle = (k: string) => {
    const n = done.includes(k) ? done.filter((x) => x !== k) : [...done, k];
    setDone(n);
    try {
      localStorage.setItem(CK, JSON.stringify(n));
    } catch {}
  };
  const total = checklist.reduce((s, g) => s + g.items.length, 0);
  const pct = Math.round((done.length / total) * 100);
  const R = 70, C = 2 * Math.PI * R;
  return (
    <section className="bg-ivory px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Kicker>Kontrol listesi</Kicker>
            <Lines className="font-serif text-[clamp(2.6rem,4.6vw,4.6rem)] font-light leading-[0.98]" lines={["Adım adım", <em key="b" className="text-champagne-deep">büyük güne.</em>]} />
            <div className="relative mt-10 h-44 w-44">
              <svg viewBox="0 0 160 160" className="h-full w-full -rotate-90">
                <circle cx="80" cy="80" r={R} fill="none" stroke="#ece4d6" strokeWidth="8" />
                <motion.circle cx="80" cy="80" r={R} fill="none" stroke="#c6a66b" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} animate={{ strokeDashoffset: C * (1 - pct / 100) }} transition={{ duration: 0.8, ease }} />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="font-serif text-5xl">%{pct}</p>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-mocha">tamamlandı</p>
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm text-mocha">İşaretleriniz yalnızca bu cihazda saklanır.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {checklist.map((g) => (
              <div key={g.g} className="rounded-[1.75rem] border border-midnight/10 bg-white p-7">
                <p className="font-serif text-3xl text-champagne-deep">{g.g}</p>
                <ul className="mt-5 grid gap-2">
                  {g.items.map((it) => {
                    const k = `${g.g}-${it}`;
                    const on = done.includes(k);
                    return (
                      <li key={k}>
                        <button onClick={() => toggle(k)} aria-pressed={on} className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-ivory">
                          <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${on ? "border-champagne bg-champagne text-midnight" : "border-midnight/25"}`}>{on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}</span>
                          <span className={`transition ${on ? "text-mocha line-through" : ""}`}>{it}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
