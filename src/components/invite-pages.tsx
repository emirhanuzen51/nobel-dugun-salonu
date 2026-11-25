"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarPlus, Camera, Check, Globe2, Heart, MailOpen, MapPin, Music2, QrCode, Timer } from "lucide-react";
import { DRAFT_KEY, demoInvite, themes, type InviteData } from "@/lib/invite";
import { Invitation } from "@/components/invitation";
import { Kicker, Lines, Monogram, ease } from "@/components/ui";

/* ---------------- Tam ekran davetiye sayfası ---------------- */
export function InvitePage({ slug }: { slug: string }) {
  const [d, setD] = useState<InviteData | null>(slug === "onizleme" ? null : demoInvite);
  const [guest, setGuest] = useState<string | undefined>();
  useEffect(() => {
    const g = new URLSearchParams(window.location.search).get("d");
    if (g) setGuest(g.slice(0, 60));
    if (slug === "onizleme") {
      try {
        const raw = localStorage.getItem(DRAFT_KEY);
        setD(raw ? { ...demoInvite, ...JSON.parse(raw) } : demoInvite);
      } catch {
        setD(demoInvite);
      }
    }
  }, [slug]);
  if (!d) return <div className="min-h-[100svh] bg-midnight" />;
  const th = themes.find((x) => x.id === d.theme)!;
  return (
    <div className="relative min-h-[100svh]" style={{ background: th.bg }}>
      <div className="pointer-events-none fixed inset-0 hidden md:block" aria-hidden="true">
        <img src={d.photos[0] || "/img/kutlama.jpg"} alt="" className="h-full w-full scale-110 object-cover opacity-40 blur-2xl" />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${th.bg}55, ${th.bg})` }} />
      </div>
      <div className="relative">
        <Invitation d={d} mode="full" guest={guest} />
      </div>
      {slug === "onizleme" && (
        <Link href="/davetiye#studyo" className="fixed bottom-4 left-4 z-30 rounded-full bg-midnight/85 px-4 py-2.5 text-xs text-ivory backdrop-blur">
          ← Stüdyoya dön
        </Link>
      )}
    </div>
  );
}

/* ---------------- Stüdyo sayfası girişi ---------------- */
export function StudioHero() {
  return (
    <section className="relative overflow-hidden bg-midnight px-5 pb-24 pt-40 text-ivory sm:px-8 lg:pb-32">
      <div className="pointer-events-none absolute -right-40 top-20 h-[640px] w-[640px] rounded-full bg-champagne/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[88rem] items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Kicker light>NOBEL Davetiye Stüdyosu</Kicker>
          <Lines as="h1" className="font-serif text-[clamp(3.2rem,7vw,7rem)] font-light leading-[0.92]" lines={["Davetiyeniz,", <em key="b" className="gold-text animate-shine">hikâyenizin ilk sayfası.</em>]} />
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="mt-8 max-w-lg text-lg leading-relaxed text-ivory/65">
            Fotoğraflarınız, hikâyeniz ve müziğinizle; zarfı açılan, geri sayan, yol tarifi veren ve katılım yanıtı toplayan bir dijital davetiye.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#studyo" className="group inline-flex items-center justify-center gap-3 rounded-full bg-champagne py-2 pl-8 pr-2 text-sm font-semibold text-midnight transition hover:bg-champagne-2">
              Tasarlamaya başlayın
              <span className="grid h-11 w-11 place-items-center rounded-full bg-midnight text-champagne transition duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <Link href="/davet/elif-kerem" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-full border border-ivory/25 px-8 py-4 text-sm transition hover:border-champagne hover:text-champagne-2">
              <MailOpen className="h-4 w-4" /> Örnek davetiyeyi açın
            </Link>
          </motion.div>
        </div>
        <div className="relative h-[400px] min-w-0 sm:h-[460px] lg:col-span-6">
          {themes.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 60, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: (i - 1.5) * 8 }} transition={{ delay: 0.3 + i * 0.12, duration: 1.2, ease }} whileHover={{ y: -16, rotate: 0, zIndex: 10 }} className="absolute left-1/2 top-6 w-[220px] -translate-x-1/2 overflow-hidden rounded-[1.25rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:w-[250px]" style={{ background: t.paper, color: t.ink, marginLeft: `calc(${i - 1.5} * clamp(30px, 7vw, 88px))` }}>
              <div className="relative h-44 overflow-hidden">
                <img src={["/img/kutlama.jpg", "/img/dans-siyah.jpg", "/img/nisan.jpg", "/img/dans-sis.jpg"][i]} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${t.paper})` }} />
              </div>
              <div className="px-5 pb-7 pt-1 text-center">
                <p className="text-[8px] uppercase tracking-[0.32em]" style={{ color: t.acc }}>Ailelerimizle birlikte</p>
                <p className={`mt-2 font-serif ${t.id === "modern" ? "text-xl uppercase tracking-[0.14em]" : "text-3xl italic"}`}>Elif &amp; Kerem</p>
                <span className="mx-auto mt-3 block h-px w-12" style={{ background: t.acc }} />
                <p className="mt-3 text-[9px] uppercase tracking-[0.28em]" style={{ color: t.acc }}>12 Haziran 2027</p>
                <p className="mt-4 text-[10px] opacity-60">{t.t}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-16 grid max-w-[88rem] grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-ivory/10 bg-ivory/10 sm:grid-cols-4 lg:grid-cols-8">
        {[
          [MailOpen, "Zarf açılışı"],
          [Camera, "Fotoğraf galerisi"],
          [Timer, "Geri sayım"],
          [MapPin, "Yol tarifi"],
          [CalendarPlus, "Takvime ekle"],
          [Music2, "Arka plan müziği"],
          [Check, "Katılım bildirimi"],
          [QrCode, "Kişisel QR"],
        ].map(([I, l]) => {
          const Icon = I as typeof MailOpen;
          return (
            <div key={l as string} className="bg-midnight p-5 text-center">
              <Icon className="mx-auto h-5 w-5 text-champagne" strokeWidth={1.5} />
              <p className="mt-3 text-xs text-ivory/70">{l as string}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Ana sayfadaki tanıtım ---------------- */
export function InviteTeaser() {
  return (
    <section className="relative overflow-hidden bg-ivory-2 px-5 py-28 sm:px-8 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Kicker>Dijital davetiye stüdyosu</Kicker>
          <Lines className="font-serif text-[clamp(2.8rem,5.4vw,5.4rem)] font-light leading-[0.98]" lines={["Davetiyeniz", <em key="b" className="text-champagne-deep">sizin kadar özel.</em>]} />
          <p className="mt-6 max-w-lg text-lg text-mocha">Kendi fotoğraflarınız, aşk hikâyeniz ve müziğinizle animasyonlu bir davetiye hazırlayın; davetlilerinize kişisel bağlantı ve QR kodla gönderin.</p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              [Heart, "4 imza tasarım", "Klasik Saray, Modern Sade, Botanik Romantik, Gece Lüksü"],
              [MailOpen, "Zarf, perde, ışık", "Davetlinin ilk dokunuşunda sinematik açılış"],
              [Check, "Katılım takibi", "Kim geliyor, kaç kişi geliyor; tek ekranda"],
              [Globe2, "Üç dil", "Yabancı misafirler için çok dilli davetiye"],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Heart;
              return (
                <li key={t as string} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ivory text-champagne-deep">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span>
                    <span className="block font-serif text-xl">{t as string}</span>
                    <span className="text-sm text-mocha">{d as string}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link href="/davetiye" className="inline-flex items-center justify-center gap-2 rounded-full bg-midnight px-8 py-4 text-sm font-semibold text-ivory transition hover:bg-midnight-3">
              Davetiye stüdyosunu açın <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/davet/elif-kerem" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-full border border-midnight/20 px-8 py-4 text-sm transition hover:border-midnight">
              Örnek davetiye
            </Link>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <Monogram className="pointer-events-none absolute -left-10 -top-16 h-72 w-72 opacity-[0.07]" />
          <div className="relative mx-auto w-[320px] rounded-[3rem] bg-[#0b0a08] p-3 shadow-[0_60px_120px_-40px_rgba(23,21,17,0.7)] ring-1 ring-champagne/30">
            <div className="absolute left-1/2 top-5 z-50 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="relative h-[640px] overflow-y-auto overflow-x-hidden rounded-[2.4rem] [scrollbar-width:none]" data-lenis-prevent>
              <Invitation d={demoInvite} mode="phone" />
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-mocha">Zarfa dokunun · Örnek tasarım, isimler ve bilgiler temsilidir</p>
        </div>
      </div>
    </section>
  );
}
