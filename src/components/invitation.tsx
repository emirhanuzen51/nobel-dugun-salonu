"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Check, Heart, MapPin, MessageCircle, Music2, Pause, Send } from "lucide-react";
import { L, RSVP_KEY, icsFor, locale, mapsUrl, themes, type InviteData } from "@/lib/invite";
import { MelodyPlayer } from "@/lib/melody";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------- Temaya göre süsler ---------------- */
function Ornament({ theme, acc, className = "" }: { theme: InviteData["theme"]; acc: string; className?: string }) {
  if (theme === "botanik")
    return (
      <svg viewBox="0 0 200 40" className={className} aria-hidden="true">
        <path d="M10 20 H190" stroke={acc} strokeWidth="0.8" />
        {[40, 70, 100, 130, 160].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 20 q-8 -12 -18 -10 q6 10 18 10Z`} fill={acc} opacity={0.5 + (i % 2) * 0.3} />
            <path d={`M${x} 20 q8 12 18 10 q-6 -10 -18 -10Z`} fill={acc} opacity={0.4 + (i % 2) * 0.3} />
          </g>
        ))}
        <circle cx="100" cy="20" r="3" fill={acc} />
      </svg>
    );
  if (theme === "gece")
    return (
      <svg viewBox="0 0 200 40" className={className} aria-hidden="true">
        <path d="M10 20 H80 M120 20 H190" stroke={acc} strokeWidth="0.8" />
        <path d="M100 6 L114 20 L100 34 L86 20Z" fill="none" stroke={acc} />
        <path d="M100 12 L108 20 L100 28 L92 20Z" fill={acc} />
        <path d="M70 14 L80 20 L70 26 M130 14 L120 20 L130 26" fill="none" stroke={acc} strokeWidth="0.8" />
      </svg>
    );
  if (theme === "modern") return <span className={`mx-auto block h-px w-16 ${className}`} style={{ background: acc }} />;
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true">
      <path d="M10 20 C40 20 50 8 72 14 C84 17 88 20 100 20 C112 20 116 17 128 14 C150 8 160 20 190 20" fill="none" stroke={acc} strokeWidth="0.9" />
      <path d="M100 20 C94 10 86 10 84 16 C90 16 95 18 100 20 C105 18 110 16 116 16 C114 10 106 10 100 20Z" fill={acc} opacity=".8" />
      <circle cx="100" cy="24" r="2.4" fill={acc} />
      <circle cx="40" cy="20" r="1.4" fill={acc} />
      <circle cx="160" cy="20" r="1.4" fill={acc} />
    </svg>
  );
}

function Corners({ acc }: { acc: string }) {
  const c = (r: number) => (
    <svg viewBox="0 0 80 80" className="h-16 w-16" style={{ transform: `rotate(${r}deg)` }} aria-hidden="true">
      <path d="M4 60 V14 Q4 4 14 4 H60" fill="none" stroke={acc} strokeWidth="1" />
      <path d="M12 46 V20 Q12 12 20 12 H46" fill="none" stroke={acc} strokeWidth="0.6" />
      <path d="M20 20 q10 2 14 12 q-10 -2 -14 -12Z M20 20 q2 10 12 14 q-2 -10 -12 -14Z" fill={acc} opacity=".7" />
    </svg>
  );
  return (
    <div className="pointer-events-none absolute inset-3 z-10 flex flex-col justify-between">
      <div className="flex justify-between">
        {c(0)}
        {c(90)}
      </div>
      <div className="flex justify-between">
        {c(270)}
        {c(180)}
      </div>
    </div>
  );
}

/* ---------------- Açılış efektleri ---------------- */
function Opening({ d, onOpen, ini, t, fixed }: { d: InviteData; onOpen: () => void; ini: string; t: (typeof L)["tr"]; fixed: boolean }) {
  const th = themes.find((x) => x.id === d.theme)!;
  const [stage, setStage] = useState(0);
  const go = () => {
    if (stage) return;
    setStage(1);
    setTimeout(onOpen, d.opening === "zarf" ? 2100 : 1500);
  };
  const seal = (
    <motion.div animate={stage ? { scale: 0.4, opacity: 0 } : { scale: [1, 1.05, 1] }} transition={stage ? { duration: 0.4 } : { duration: 2.4, repeat: Infinity }} className="relative grid h-20 w-20 place-items-center rounded-full shadow-[0_10px_25px_-8px_rgba(0,0,0,0.6)]" style={{ background: `radial-gradient(circle at 35% 30%, #c9475a, #7a1424 70%)` }}>
      <span className="absolute inset-1.5 rounded-full border border-white/25" />
      <span className="font-serif text-2xl italic text-[#f6e3c4]">{ini}</span>
    </motion.div>
  );
  return (
    <motion.div className={`${fixed ? "fixed" : "absolute"} inset-0 z-40 flex cursor-pointer flex-col items-center justify-center overflow-hidden`} style={{ background: th.bg }} onClick={go} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} role="button" aria-label={t.open}>
      {d.opening === "zarf" && (
        <div className="relative w-[78%] max-w-[340px]" style={{ perspective: 900 }}>
          <motion.div className="absolute inset-x-[6%] bottom-[8%] z-[1] rounded-md p-4 text-center shadow-lg" style={{ background: th.paper, color: th.ink, height: "70%" }} animate={stage ? { y: "-78%" } : { y: 0 }} transition={{ duration: 1.1, delay: 0.7, ease }}>
            <p className="text-[9px] uppercase tracking-[0.35em]" style={{ color: th.acc }}>{d.intro}</p>
            <p className="mt-2 font-serif text-3xl italic">{d.bride}</p>
            <p className="font-serif" style={{ color: th.acc }}>&amp;</p>
            <p className="font-serif text-3xl italic">{d.groom}</p>
          </motion.div>
          <svg viewBox="0 0 340 230" className="relative z-[2] w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]">
            <defs>
              <linearGradient id="env" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={th.dark ? "#2a251d" : "#f1e7d4"} />
                <stop offset="1" stopColor={th.dark ? "#1b1813" : "#e4d6bb"} />
              </linearGradient>
            </defs>
            <path d="M0 40 L170 140 L340 40 V230 H0Z" fill="url(#env)" />
            <path d="M0 230 L150 120 M340 230 L190 120" stroke={th.acc} strokeOpacity=".35" />
            <rect x="0.5" y="40.5" width="339" height="189" fill="none" stroke={th.acc} strokeOpacity=".35" />
          </svg>
          <motion.svg viewBox="0 0 340 150" className="absolute inset-x-0 top-[17.4%] z-[3] w-full" style={{ transformOrigin: "50% 0%" }} animate={stage ? { rotateX: 180, zIndex: 0 } : { rotateX: 0 }} transition={{ duration: 0.8, ease }}>
            <path d="M0 0 L170 110 L340 0Z" fill={th.dark ? "#25211a" : "#ebdec6"} stroke={th.acc} strokeOpacity=".4" />
          </motion.svg>
          <div className="absolute left-1/2 top-[58%] z-[4] -translate-x-1/2 -translate-y-1/2">{seal}</div>
        </div>
      )}
      {d.opening === "perde" && (
        <>
          {[0, 1].map((k) => (
            <motion.div key={k} className="absolute inset-y-0 w-1/2" style={{ [k ? "right" : "left"]: 0, background: `repeating-linear-gradient(90deg, #5a0f1c 0 18px, #7a1828 18px 30px, #4a0c17 30px 44px)`, boxShadow: "inset 0 -60px 80px rgba(0,0,0,.45)" } as React.CSSProperties} animate={stage ? { x: k ? "100%" : "-100%" } : { x: 0 }} transition={{ duration: 1.3, ease }} />
          ))}
          <div className="absolute inset-x-0 top-0 h-10" style={{ background: `linear-gradient(${th.acc}, ${th.acc}00)` }} />
          <div className="relative z-10">{seal}</div>
        </>
      )}
      {d.opening === "isik" && (
        <>
          <motion.div className="absolute h-40 w-40 rounded-full blur-3xl" style={{ background: th.acc }} animate={stage ? { scale: 12, opacity: 0.9 } : { scale: [1, 1.2, 1], opacity: 0.5 }} transition={stage ? { duration: 1.4, ease } : { duration: 3, repeat: Infinity }} />
          <div className="relative z-10 text-center" style={{ color: th.ink }}>
            <p className="font-serif text-5xl italic">{d.bride}</p>
            <p className="font-serif text-2xl" style={{ color: th.acc }}>&amp;</p>
            <p className="font-serif text-5xl italic">{d.groom}</p>
          </div>
        </>
      )}
      <motion.p animate={{ opacity: stage ? 0 : [0.4, 1, 0.4] }} transition={{ duration: 2.2, repeat: stage ? 0 : Infinity }} className="relative z-10 mt-10 text-[10px] uppercase tracking-[0.35em]" style={{ color: d.opening === "perde" ? "#f6e3c4" : th.acc }}>
        {t.open}
      </motion.p>
    </motion.div>
  );
}

/* ---------------- Geri sayım ---------------- */
function Countdown({ target, t, acc, soft }: { target: Date; t: (typeof L)["tr"]; acc: string; soft: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target.getTime() - (now ?? target.getTime()));
  const parts = [
    [Math.floor(diff / 864e5), t.days],
    [Math.floor(diff / 36e5) % 24, t.hours],
    [Math.floor(diff / 6e4) % 60, t.mins],
    [Math.floor(diff / 1e3) % 60, t.secs],
  ] as const;
  return (
    <div className="grid grid-cols-4 gap-2">
      {parts.map(([v, l]) => (
        <div key={l} className="rounded-xl py-4 text-center" style={{ background: soft }}>
          <div className="relative h-9 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.p key={v} initial={{ y: "-100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ duration: 0.35 }} className="absolute inset-x-0 top-0 font-serif text-3xl leading-9 tabular-nums">
              {now === null ? "–" : String(v).padStart(2, "0")}
            </motion.p>
          </AnimatePresence>
          </div>
          <p className="mt-1 text-[9px] uppercase tracking-[0.2em]" style={{ color: acc }}>{l}</p>
        </div>
      ))}
    </div>
  );
}

function Sec({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 1, ease }} className={`px-7 py-14 text-center ${className}`}>
      {children}
    </motion.section>
  );
}

/* ---------------- Katılım bildirimi ---------------- */
function Rsvp({ d, t, th }: { d: InviteData; t: (typeof L)["tr"]; th: (typeof themes)[number] }) {
  const [name, setName] = useState("");
  const [yes, setYes] = useState<boolean | null>(null);
  const [count, setCount] = useState(1);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const field = "w-full rounded-xl border bg-transparent px-4 py-3 text-sm outline-none transition";
  const msg = `${d.bride} & ${d.groom} — ${t.rsvp}\n${name} · ${yes ? t.yes : t.no}${yes ? ` · ${count}` : ""}${note ? `\n${note}` : ""}`;
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || yes === null) return;
    try {
      const all = JSON.parse(localStorage.getItem(RSVP_KEY) || "[]");
      all.unshift({ slug: d.slug, name: name.trim().slice(0, 60), yes, count: yes ? count : 0, note: note.trim().slice(0, 200), at: Date.now() });
      localStorage.setItem(RSVP_KEY, JSON.stringify(all.slice(0, 200)));
    } catch {}
    setDone(true);
  };
  if (done)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-8" style={{ background: th.soft }}>
        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: th.acc, color: th.paper }}>
          {yes ? <Heart className="h-6 w-6" fill="currentColor" /> : <Check className="h-6 w-6" />}
        </motion.span>
        <p className="mt-5 font-serif text-3xl">{t.thanks}</p>
        <p className="mt-2 text-sm opacity-75">{yes ? t.thanksYes : t.thanksNo}</p>
        <a href={`https://wa.me/${d.contact}?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs uppercase tracking-[0.18em]" style={{ borderColor: th.acc, color: th.acc }}>
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
      </motion.div>
    );
  return (
    <form onSubmit={submit} className="grid gap-3 text-left">
      <input className={field} style={{ borderColor: `${th.acc}55` }} value={name} onChange={(e) => setName(e.target.value)} placeholder={t.name} aria-label={t.name} maxLength={60} required />
      <div className="grid grid-cols-2 gap-2">
        {[true, false].map((v) => (
          <button type="button" key={String(v)} onClick={() => setYes(v)} aria-pressed={yes === v} className="rounded-xl border px-3 py-3 text-sm transition" style={yes === v ? { background: th.acc, color: th.paper, borderColor: th.acc } : { borderColor: `${th.acc}55` }}>
            {v ? t.yes : t.no}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {yes && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex items-center justify-between rounded-xl border px-4 py-2.5" style={{ borderColor: `${th.acc}55` }}>
              <span className="text-sm">{t.count}</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setCount((c) => Math.max(1, c - 1))} className="grid h-8 w-8 place-items-center rounded-full border" style={{ borderColor: th.acc }} aria-label="Azalt">−</button>
                <span className="w-5 text-center font-serif text-xl tabular-nums">{count}</span>
                <button type="button" onClick={() => setCount((c) => Math.min(8, c + 1))} className="grid h-8 w-8 place-items-center rounded-full border" style={{ borderColor: th.acc }} aria-label="Artır">+</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <textarea className={`${field} resize-none`} style={{ borderColor: `${th.acc}55` }} rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t.note} aria-label={t.note} maxLength={200} />
      <button type="submit" disabled={!name.trim() || yes === null} className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition disabled:opacity-40" style={{ background: th.acc, color: th.paper }}>
        <Send className="h-4 w-4" /> {t.send}
      </button>
    </form>
  );
}

/* ---------------- Davetiye ---------------- */
export function Invitation({ d, mode = "full", guest, replay = 0 }: { d: InviteData; mode?: "phone" | "full"; guest?: string; replay?: number }) {
  const th = themes.find((x) => x.id === d.theme)!;
  const t = L[d.lang];
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const player = useRef<MelodyPlayer | null>(null);
  const ini = `${(d.bride.trim()[0] || "A").toLocaleUpperCase("tr-TR")}${(d.groom.trim()[0] || "B").toLocaleUpperCase("tr-TR")}`;
  const target = useMemo(() => new Date(`${d.date}T${d.partyTime || "19:00"}:00`), [d.date, d.partyTime]);
  const dt = new Date(`${d.date}T12:00:00`);
  const loc = locale(d.lang);

  useEffect(() => {
    setOpen(false);
    player.current?.stop();
    setPlaying(false);
  }, [replay, d.opening]);
  useEffect(() => () => player.current?.stop(), []);
  useEffect(() => {
    if (mode !== "full") return;
    document.documentElement.style.overflow = open ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open, mode]);

  const toggleMusic = () => {
    if (d.music === "yok") return;
    if (!player.current) player.current = new MelodyPlayer();
    if (playing) {
      player.current.stop();
      setPlaying(false);
    } else {
      player.current.start(d.music);
      setPlaying(true);
    }
  };
  const onOpen = () => {
    setOpen(true);
    if (d.music !== "yok" && mode === "full") {
      if (!player.current) player.current = new MelodyPlayer();
      player.current.start(d.music);
      setPlaying(true);
    }
  };
  const downloadIcs = () => {
    const blob = new Blob([icsFor(d)], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${d.slug || "davetiye"}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  const names = d.theme === "modern" ? "font-serif text-[3.4rem] font-light uppercase tracking-[0.12em] leading-[0.95]" : "font-serif text-[4.2rem] font-light italic leading-[0.9]";
  const photos = d.photos.length ? d.photos : ["/img/kutlama.jpg"];

  return (
    <div className={`relative ${mode === "full" ? "min-h-[100svh]" : "h-full"}`} style={{ background: mode === "full" ? "transparent" : th.bg, color: th.ink }}>
      <AnimatePresence>{!open && <Opening key={`o-${replay}-${d.opening}`} d={d} ini={ini} t={t} onOpen={onOpen} fixed={mode === "full"} />}</AnimatePresence>

      {d.music !== "yok" && open && (
        <button onClick={toggleMusic} className={`${mode === "full" ? "fixed" : "absolute"} right-4 top-4 z-30 flex h-11 items-center gap-2 rounded-full px-4 text-xs backdrop-blur-md`} style={{ background: `${th.paper}cc`, color: th.ink, border: `1px solid ${th.acc}55` }} aria-label={t.music}>
          {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          {playing && (
            <span className="flex h-3 items-end gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="w-0.5 rounded" style={{ background: th.acc }} animate={{ height: ["30%", "100%", "40%"] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </span>
          )}
        </button>
      )}

      <div className={`relative mx-auto max-w-[480px] overflow-hidden ${!open && mode === "phone" ? "h-full" : ""} ${mode === "full" ? "md:my-10 md:rounded-[2rem] md:shadow-[0_60px_120px_-40px_rgba(0,0,0,0.55)]" : ""}`} style={{ background: th.paper }}>
        {/* kapak */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.img src={photos[0]} alt={`${d.bride} ve ${d.groom}`} className="absolute inset-0 h-full w-full object-cover" initial={{ scale: 1.25 }} animate={open ? { scale: 1 } : undefined} transition={{ duration: 3, ease }} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${th.paper}00 28%, ${th.paper}cc 62%, ${th.paper}f5 86%, ${th.paper})` }} />
          {d.theme === "saray" && <Corners acc={th.acc} />}
          <motion.div className="absolute inset-x-0 bottom-0 px-6 pb-8 text-center" initial={{ opacity: 0, y: 30 }} animate={open ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 1.4, delay: 0.5, ease }}>
            <p className="text-[10px] uppercase tracking-[0.42em]" style={{ color: th.acc }}>{d.intro}</p>
            <p className={`mt-4 ${names}`}>{d.bride}</p>
            <p className="my-1 font-serif text-3xl" style={{ color: th.acc }}>&amp;</p>
            <p className={names}>{d.groom}</p>
          </motion.div>
        </div>

        <Sec className="pt-6">
          <Ornament theme={d.theme} acc={th.acc} className="mx-auto h-8 w-48" />
          {guest && <p className="mt-6 font-serif text-2xl italic">{t.dear} {guest},</p>}
          <p className="mt-6 text-[10px] uppercase tracking-[0.32em]" style={{ color: th.acc }}>{t.invite}</p>
          <p className="mx-auto mt-5 max-w-sm font-serif text-[1.45rem] leading-snug">{d.message}</p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] opacity-60">{t.brideFam}</p>
              <p className="mt-2 font-serif text-lg">{d.brideFamily}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] opacity-60">{t.groomFam}</p>
              <p className="mt-2 font-serif text-lg">{d.groomFamily}</p>
            </div>
          </div>
        </Sec>

        {/* tarih */}
        <Sec className="py-10">
          <div className="flex items-center justify-center gap-5">
            <div className="w-24 border-y py-2 text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: `${th.acc}66` }}>{dt.toLocaleDateString(loc, { weekday: "long" })}</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: th.acc }}>{dt.toLocaleDateString(loc, { month: "long" })}</p>
              <p className="font-serif text-7xl font-light leading-none">{dt.getDate()}</p>
              <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: th.acc }}>{dt.getFullYear()}</p>
            </div>
            <div className="w-24 border-y py-2 text-[10px] uppercase tracking-[0.25em]" style={{ borderColor: `${th.acc}66` }}>{d.partyTime}</div>
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-[0.32em]">{d.venue}</p>
        </Sec>

        <Sec className="py-8">
          <p className="mb-5 text-[10px] uppercase tracking-[0.32em]" style={{ color: th.acc }}>{t.countdown}</p>
          <Countdown target={target} t={t} acc={th.acc} soft={th.soft} />
        </Sec>

        {/* program */}
        <Sec>
          <p className="font-serif text-4xl">{t.program}</p>
          <Ornament theme={d.theme} acc={th.acc} className="mx-auto mt-3 h-6 w-36" />
          <div className="mt-8 grid gap-3 text-left">
            {[
              [d.nikahTime, t.nikah, d.nikahPlace],
              [d.partyTime, t.party, d.venue],
              [d.endTime, t.end, ""],
            ].map(([time, label, place]) => (
              <div key={label} className="flex items-center gap-5 rounded-2xl px-5 py-4" style={{ background: th.soft }}>
                <span className="w-16 shrink-0 font-serif text-2xl tabular-nums" style={{ color: th.acc }}>{time}</span>
                <span>
                  <span className="block font-serif text-xl leading-tight">{label}</span>
                  {place && <span className="text-xs opacity-65">{place}</span>}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm opacity-75">{d.address}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a href={mapsUrl(`${d.venue} ${d.address}`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ background: th.acc, color: th.paper }}>
              <MapPin className="h-4 w-4" /> {t.route}
            </a>
            <button onClick={downloadIcs} className="inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ borderColor: th.acc, color: th.acc }}>
              <CalendarPlus className="h-4 w-4" /> {t.calendar}
            </button>
          </div>
        </Sec>

        {/* hikâye */}
        {d.story.length > 0 && (
          <Sec>
            <p className="font-serif text-4xl">{t.story}</p>
            <Ornament theme={d.theme} acc={th.acc} className="mx-auto mt-3 h-6 w-36" />
            <ol className="relative mt-10 grid gap-8 text-left">
              <span className="absolute bottom-2 left-[27px] top-2 w-px" style={{ background: `${th.acc}55` }} />
              {d.story.map((s, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.12 }} className="relative flex gap-5">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border font-serif text-sm" style={{ borderColor: th.acc, background: th.paper, color: th.acc }}>{s.y}</span>
                  <span className="pt-1.5">
                    <span className="block font-serif text-2xl">{s.t}</span>
                    <span className="mt-1 block text-sm leading-relaxed opacity-75">{s.d}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </Sec>
        )}

        {/* galeri */}
        {photos.length > 1 && (
          <Sec className="px-0">
            <p className="font-serif text-4xl">{t.gallery}</p>
            <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-7 pb-2 [scrollbar-width:none]" data-lenis-prevent>
              {photos.slice(1).map((p, i) => (
                <img key={i} src={p} alt="" className={`h-72 shrink-0 snap-center rounded-2xl object-cover ${i % 2 ? "w-52" : "w-60"}`} />
              ))}
            </div>
          </Sec>
        )}

        {/* katılım */}
        <Sec>
          <p className="font-serif text-4xl">{t.rsvp}</p>
          <p className="mt-3 text-sm opacity-70">
            {t.rsvpBy} {new Date(`${d.rsvpBy}T12:00:00`).toLocaleDateString(loc, { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <div className="mt-8">
            <Rsvp d={d} t={t} th={th} />
          </div>
        </Sec>

        <section className="px-7 pb-16 pt-6 text-center">
          <Ornament theme={d.theme} acc={th.acc} className="mx-auto h-8 w-48" />
          <p className="mt-6 text-[10px] uppercase tracking-[0.32em]" style={{ color: th.acc }}>{t.love}</p>
          <p className="mt-3 font-serif text-4xl italic">
            {d.bride} &amp; {d.groom}
          </p>
          <p className="mt-10 text-[9px] uppercase tracking-[0.4em] opacity-40">NOBEL · Düğün Kompleksi</p>
        </section>
      </div>
    </div>
  );
}
