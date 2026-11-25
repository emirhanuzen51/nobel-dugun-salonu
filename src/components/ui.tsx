"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Lenis from "lenis";
import { Menu, X } from "lucide-react";
import { brand, venues } from "@/lib/data";

export const ease = [0.22, 1, 0.36, 1] as const;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ duration: 1.25 });
    let id = 0;
    const r = (t: number) => {
      l.raf(t);
      id = requestAnimationFrame(r);
    };
    id = requestAnimationFrame(r);
    return () => {
      cancelAnimationFrame(id);
      l.destroy();
    };
  }, []);
  return null;
}

export function Reveal({ children, delay = 0, className = "", y = 30 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1.1, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

export function Lines({ lines, className = "", as: T = "h2", delay = 0 }: { lines: React.ReactNode[]; className?: string; as?: "h1" | "h2" | "h3"; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const v = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <T ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="-mt-[0.25em] block overflow-hidden pb-[0.06em] pt-[0.25em]">
          <motion.span className="block" initial={{ y: "115%" }} animate={v ? { y: "0%" } : undefined} transition={{ duration: 1.2, delay: delay + i * 0.1, ease }}>
            {l}
          </motion.span>
        </span>
      ))}
    </T>
  );
}

export function Kicker({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <p className={`mb-6 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""} ${light ? "text-champagne-2" : "text-champagne-deep"}`}>
      <span className="h-px w-10 bg-current opacity-60" />
      {children}
      {center && <span className="h-px w-10 bg-current opacity-60" />}
    </p>
  );
}

/* Monogram: altın çerçeveli "N" */
export function Monogram({ className = "h-10 w-10", draw = false }: { className?: string; draw?: boolean }) {
  const p = { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.8, ease } };
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <motion.circle cx="32" cy="32" r="30" fill="none" stroke="#c6a66b" strokeWidth="1" {...(draw ? p : {})} />
      <motion.circle cx="32" cy="32" r="26.5" fill="none" stroke="#c6a66b" strokeWidth="0.6" strokeDasharray="1 3" {...(draw ? { ...p, transition: { ...p.transition, delay: 0.2 } } : {})} />
      <motion.path d="M22 46 L22 18 L42 46 L42 18" fill="none" stroke="#c6a66b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...(draw ? { ...p, transition: { duration: 1.6, delay: 0.5, ease } } : {})} />
      <motion.path d="M17 18 H27 M37 46 H47" stroke="#c6a66b" strokeWidth="1" strokeLinecap="round" {...(draw ? { ...p, transition: { duration: 1, delay: 1.2, ease } } : {})} />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <Monogram className="h-10 w-10" />
      <span className="leading-none">
        <span className={`block font-serif text-[1.55rem] font-medium tracking-[0.32em] ${light ? "text-ivory" : "text-midnight"}`}>NOBEL</span>
        <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.38em] text-champagne">Düğün Kompleksi</span>
      </span>
    </span>
  );
}

/* Açılış perdesi: oturum başına bir kez */
export function Intro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("nobel-intro")) return;
    sessionStorage.setItem("nobel-intro", "1");
    setShow(true);
    const t = setTimeout(() => setShow(false), 2700);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div key="intro" className="fixed inset-0 z-[100] grid place-items-center bg-midnight" exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 1.1, ease }}>
          <div className="text-center">
            <Monogram className="mx-auto h-24 w-24" draw />
            <motion.p initial={{ opacity: 0, letterSpacing: "0.1em" }} animate={{ opacity: 1, letterSpacing: "0.5em" }} transition={{ duration: 1.6, delay: 0.8, ease }} className="mt-8 pl-[0.5em] font-serif text-3xl text-ivory">
              NOBEL
            </motion.p>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: 1.2, ease }} className="gold-line mx-auto mt-5 block h-px w-48" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const nav = [
  { h: "/#organizasyonlar", l: "Organizasyonlar" },
  { h: "/#salonlar", l: "Salonlarımız" },
  { h: "/#deneyim", l: "Deneyimler" },
  { h: "/#menuler", l: "Menüler" },
  { h: "/#galeri", l: "Galeri" },
  { h: "/davetiye", l: "Dijital davetiye" },
  { h: "/#iletisim", l: "İletişim" },
];

export function Header({ solid = false }: { solid?: boolean }) {
  const [s, setS] = useState(solid);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setS(solid || window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, [solid]);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${s ? "border-b border-champagne/15 bg-midnight/85 py-3 backdrop-blur-xl" : "py-6"}`}>
        <div className="mx-auto flex max-w-[88rem] items-center justify-between px-5 sm:px-8">
          <Link href="/" aria-label="Ana sayfa">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] tracking-wide text-ivory/75 xl:flex">
            {nav.map((n) => (
              <a key={n.h} href={n.h} className="group relative py-1 transition hover:text-ivory">
                {n.l}
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-champagne transition duration-500 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="/#planlayici" className="hidden rounded-full border border-champagne/60 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] text-champagne-2 transition hover:bg-champagne hover:text-midnight sm:inline-flex">
              Özel teklif al
            </a>
            <button onClick={() => setOpen(true)} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20 text-ivory xl:hidden" aria-label="Menüyü aç">
              <Menu className="h-5 w-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: "circle(0% at 100% 0%)" }} animate={{ clipPath: "circle(150% at 100% 0%)" }} exit={{ clipPath: "circle(0% at 100% 0%)" }} transition={{ duration: 0.9, ease }} className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-midnight px-6 pb-10 pt-6 text-ivory" data-lenis-prevent>
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="grid h-12 w-12 place-items-center rounded-full border border-ivory/20" aria-label="Menüyü kapat">
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>
            <nav className="mt-12 grid">
              {[...nav, { h: "/#planlayici", l: "Özel teklif al" }].map((n, i) => (
                <motion.a key={n.h} href={n.h} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease }} className="flex items-baseline justify-between border-b border-ivory/10 py-4 font-serif text-4xl">
                  {n.l}
                  <span className="font-sans text-xs text-champagne">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <div className="mt-10 grid gap-2 text-sm text-ivory/60">
              {venues.map((v) => (
                <Link key={v.slug} href={`/salonlar/${v.slug}`} onClick={() => setOpen(false)} className="hover:text-champagne">
                  {v.name} · {v.kind}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-midnight px-5 pb-10 pt-20 text-ivory sm:px-8">
      <div className="mx-auto max-w-[88rem]">
        <div className="grid gap-12 border-b border-ivory/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">Zarafet, ihtişam ve kusursuz organizasyon. Hayalinizdeki gece, ömür boyu hatırlanacak.</p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">Salonlarımız</p>
            <ul className="mt-5 grid gap-3 text-sm text-ivory/70">
              {venues.map((v) => (
                <li key={v.slug}>
                  <Link href={`/salonlar/${v.slug}`} className="hover:text-champagne">{v.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">İletişim</p>
            <ul className="mt-5 grid gap-3 text-sm text-ivory/70">
              <li>{brand.address}</li>
              <li><a href={brand.phoneHref} className="hover:text-champagne">{brand.phoneDisplay}</a></li>
              <li><a href={`mailto:${brand.email}`} className="hover:text-champagne">{brand.email}</a></li>
              <li>{brand.hours}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 text-xs text-ivory/40 md:flex-row">
          <span>© {new Date().getFullYear()} NOBEL Düğün Kompleksi & Kır Bahçesi — Karaköprü / Şanlıurfa</span>
          <div className="flex gap-6">
            <Link href="/kvkk" className="hover:text-champagne">KVKK Aydınlatma Metni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
