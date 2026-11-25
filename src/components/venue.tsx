"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Car, Check, ChevronsLeftRight, Hand, Lightbulb, Maximize, Mic2, Ruler, Sparkles, Users } from "lucide-react";
import { brand, layouts, venues, type Venue } from "@/lib/data";
import { Kicker, Lines, Reveal, ease } from "@/components/ui";

export function VenueHero({ v }: { v: Venue }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="relative h-[92svh] min-h-[620px] overflow-hidden bg-midnight text-ivory">
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 animate-kenburns">
          <Image src={v.cover} alt={v.name} fill priority sizes="100vw" className="object-cover" />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-midnight/60" />
      <div className="relative mx-auto flex h-full max-w-[88rem] flex-col justify-end px-5 pb-16 sm:px-8">
        <Link href="/#salonlar" className="mb-auto mt-32 inline-flex w-fit items-center gap-2 text-sm text-ivory/70 transition hover:text-champagne-2">
          <ArrowLeft className="h-4 w-4" /> Tüm salonlar
        </Link>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }} className="text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne-2">
          {v.kind}
        </motion.p>
        <Lines as="h1" delay={0.4} className="mt-4 font-serif text-[clamp(3.6rem,10vw,10rem)] font-light leading-[0.9]" lines={[v.name]} />
        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ivory/15 bg-ivory/10 backdrop-blur sm:grid-cols-4">
          {[
            [Users, "Kapasite", `${v.min.toLocaleString("tr-TR")} – ${v.max.toLocaleString("tr-TR")}`],
            [Maximize, "Alan", v.area],
            [Ruler, "Tavan", v.ceiling],
            [Sparkles, "Uygun", v.events[0]],
          ].map(([I, k, val]) => {
            const Icon = I as typeof Users;
            return (
              <div key={k as string} className="bg-midnight/50 p-5">
                <Icon className="h-4 w-4 text-champagne" />
                <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-ivory/50">{k as string}</p>
                <p className="mt-1 font-serif text-xl">{val as string}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Sürüklenebilir panoramik tur: görsel aynalanarak kesintisiz döngü oluşturur */
export function Panorama({ v }: { v: Venue }) {
  const box = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(560);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const drag = useRef<{ on: boolean; sx: number; ox: number; last: number }>({ on: false, sx: 0, ox: 0, last: 0 });
  const W = h * 1.5;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.clientHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, dt) => {
    if (drag.current.on || active !== null) return;
    if (performance.now() - drag.current.last < 2500) return;
    x.set(x.get() - dt * 0.02);
  });

  const tx = useTransform(x, (val) => {
    const p = 2 * W;
    return ((val % p) + p) % p - p;
  });

  return (
    <section className="bg-midnight px-5 py-24 text-ivory sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker light>360° sanal tur</Kicker>
            <Lines className="font-serif text-[clamp(2.6rem,5vw,5rem)] font-light leading-[0.98]" lines={["Salonu", <em key="b" className="text-champagne-2">kendi gözünüzle gezin.</em>]} />
          </div>
          <p className="flex items-center gap-2 text-sm text-ivory/55">
            <Hand className="h-4 w-4 text-champagne" /> Sürükleyerek çevrenize bakın, noktalara dokunun.
          </p>
        </div>
        <div
          ref={box}
          className="relative mt-12 h-[62vh] min-h-[420px] cursor-grab touch-pan-y select-none overflow-hidden rounded-[2rem] border border-champagne/20 active:cursor-grabbing"
          onPointerDown={(e) => {
            drag.current = { on: true, sx: e.clientX, ox: x.get(), last: performance.now() };
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (!drag.current.on) return;
            x.set(drag.current.ox + (e.clientX - drag.current.sx));
          }}
          onPointerUp={() => {
            drag.current.on = false;
            drag.current.last = performance.now();
          }}
          onPointerCancel={() => (drag.current.on = false)}
        >
          <motion.div style={{ x: tx }} className="absolute inset-y-0 left-0 flex">
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="relative h-full shrink-0" style={{ width: W }}>
                <div className="absolute inset-0" style={{ transform: k % 2 ? "scaleX(-1)" : undefined }}>
                  <Image src={v.pano} alt={k === 0 ? `${v.name} panoramik görünüm` : ""} fill sizes="150vh" className="pointer-events-none object-cover" draggable={false} />
                </div>
                {k % 2 === 0 &&
                  v.hotspots.map((s, j) => (
                    <button key={j} onPointerDown={(e) => e.stopPropagation()} onClick={() => setActive(active === j ? null : j)} className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${s.x}%` }} aria-label={s.t}>
                      <span className="relative grid h-11 w-11 place-items-center">
                        <span className="absolute inset-0 animate-ping rounded-full bg-champagne/50" />
                        <span className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-ivory bg-champagne/90 font-serif text-lg text-midnight">{j + 1}</span>
                      </span>
                    </button>
                  ))}
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(23,21,17,0.7)_100%)]" />
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full bg-midnight/70 px-4 py-2 text-xs backdrop-blur">
            <ChevronsLeftRight className="h-4 w-4 text-champagne" /> 360° görünüm
          </div>
          <AnimatePresence>
            {active !== null && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.4, ease }} className="absolute bottom-5 left-5 right-5 max-w-md rounded-2xl border border-champagne/30 bg-midnight/85 p-6 backdrop-blur-xl sm:right-auto" onPointerDown={(e) => e.stopPropagation()}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Nokta {active + 1}</p>
                <p className="mt-1 font-serif text-3xl">{v.hotspots[active].t}</p>
                <p className="mt-2 text-sm text-ivory/70">{v.hotspots[active].d}</p>
                <button onClick={() => setActive(null)} className="mt-4 text-xs uppercase tracking-[0.2em] text-champagne-2">Turu sürdür</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="mt-3 text-xs text-ivory/40">Panoramik önizleme temsilidir; gerçek 360° çekimlerle değiştirilebilir.</p>
      </div>
    </section>
  );
}

export function VenueDetail({ v }: { v: Venue }) {
  const icons = [Sparkles, Mic2, Lightbulb, Check, Car, Check];
  return (
    <section className="bg-ivory px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-[88rem] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>Salon hakkında</Kicker>
          <Lines className="font-serif text-[clamp(2.6rem,4.6vw,4.6rem)] font-light leading-[0.98]" lines={[v.name, <em key="b" className="text-champagne-deep">{v.kind.toLocaleLowerCase("tr-TR")}</em>]} />
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg leading-relaxed text-mocha">{v.long}</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {v.events.map((e) => (
              <span key={e} className="rounded-full bg-midnight px-4 py-2 text-sm text-ivory">{e}</span>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
          {v.features.map((f, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={f} delay={i * 0.05}>
                <div className="flex h-full items-center gap-4 rounded-2xl border border-midnight/10 bg-white p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ivory-2 text-champagne-deep">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-xl">{f}</span>
                </div>
              </Reveal>
            );
          })}
          <div className="rounded-2xl bg-midnight p-6 text-ivory sm:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">Düzenlere göre kapasite</p>
            <div className="mt-5 grid gap-4">
              {layouts.map((l, i) => {
                const f = [1, 0.8, 1.25, 1.2][i];
                const cap = Math.round((v.max * f) / 10) * 10;
                return (
                  <div key={l.id}>
                    <div className="flex justify-between text-sm">
                      <span>{l.t}</span>
                      <span className="tabular-nums text-ivory/70">{cap.toLocaleString("tr-TR")} kişi</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ivory/10">
                      <motion.div className="h-full rounded-full bg-champagne" initial={{ width: 0 }} whileInView={{ width: `${(cap / 1900) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.1, ease }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-ivory/40">Yaklaşık değerlerdir; sahne ve dekor kurgusuna göre değişir.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VenueGallery({ v }: { v: Venue }) {
  return (
    <section className="bg-ivory-2 px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-[88rem]">
        <Kicker>Fotoğraflar</Kicker>
        <div className="mt-8 grid auto-rows-[240px] gap-4 md:grid-cols-4">
          {v.gallery.map((g, i) => (
            <Reveal key={g} delay={i * 0.06} className={`group relative overflow-hidden rounded-[1.5rem] ${i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : ""}`}>
              <Image src={g} alt={`${v.name} — fotoğraf ${i + 1}`} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-[1.4s] group-hover:scale-105" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function VenueCta({ v }: { v: Venue }) {
  const others = venues.filter((x) => x.slug !== v.slug);
  const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Merhaba, ${v.name} için tarih sorgulamak ve teklif almak istiyorum.`)}`;
  return (
    <section className="bg-midnight px-5 py-28 text-ivory sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-[88rem] gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Kicker light>Tarih sorgulama</Kicker>
          <Lines className="font-serif text-[clamp(2.6rem,5vw,5rem)] font-light leading-[0.98]" lines={[`${v.name} için`, <em key="b" className="text-champagne-2">tarihinizi ayırtın.</em>]} />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-midnight transition hover:bg-champagne-2">
              Tarih sorgula ve teklif al <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href={brand.phoneHref} className="inline-flex items-center justify-center rounded-full border border-ivory/25 px-8 py-4 text-sm transition hover:border-champagne">
              {brand.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
          {others.map((o) => (
            <Link key={o.slug} href={`/salonlar/${o.slug}`} className="group relative h-64 overflow-hidden rounded-[1.5rem]">
              <Image src={o.cover} alt={o.name} fill sizes="30vw" className="object-cover transition duration-[1.4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-champagne-2">{o.kind}</p>
                <p className="font-serif text-3xl">{o.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
