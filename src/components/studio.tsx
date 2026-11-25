"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import { ArrowLeft, ArrowRight, BarChart3, Check, Copy, Download, ExternalLink, FileSpreadsheet, Globe2, ImagePlus, LayoutGrid, Link2, MessageCircle, Plus, QrCode, RotateCcw, ScanLine, Star, Trash2, Upload, Users, X } from "lucide-react";
import { DRAFT_KEY, RSVP_KEY, demoInvite, langNames, messagePresets, musics, openings, themes, type InviteData } from "@/lib/invite";
import { Invitation } from "@/components/invitation";
import { Kicker, Lines, ease } from "@/components/ui";

const steps = ["Şablon", "Fotoğraflar", "İsimler", "Davet metni", "Tarih ve konum", "Hikâyemiz", "Müzik ve açılış", "Yayınla"];

function slugify(s: string) {
  const m: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", İ: "i" };
  return s.toLocaleLowerCase("tr-TR").replace(/[çğıöşüİ]/g, (c) => m[c] || c).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function resize(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1400;
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * k);
        c.height = Math.round(img.height * k);
        c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = rej;
      img.src = r.result as string;
    };
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha">{label}</span>
      {children}
    </label>
  );
}
const inp = "w-full rounded-2xl border border-midnight/15 bg-white px-4 py-3.5 outline-none transition focus:border-champagne";

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[340px] max-w-full rounded-[3rem] bg-[#0b0a08] p-3 shadow-[0_60px_120px_-40px_rgba(23,21,17,0.7)] ring-1 ring-champagne/30">
      <div className="absolute left-1/2 top-5 z-50 h-6 w-28 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-[680px] overflow-y-auto overflow-x-hidden rounded-[2.4rem] [scrollbar-width:none]" data-lenis-prevent>
        {children}
      </div>
    </div>
  );
}

export function Studio() {
  const [d, setD] = useState<InviteData>(demoInvite);
  const [step, setStep] = useState(0);
  const [replay, setReplay] = useState(0);
  const [saved, setSaved] = useState(false);
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setD({ ...demoInvite, ...JSON.parse(raw) });
    } catch {}
    loaded.current = true;
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
        setSaved(true);
        setTimeout(() => setSaved(false), 1200);
      } catch {}
    }, 500);
    return () => clearTimeout(t);
  }, [d]);

  const up = <K extends keyof InviteData>(k: K, v: InviteData[K]) => setD((o) => ({ ...o, [k]: v }));
  const publicPath = `/davet/${d.slug || "davetiye"}`;
  const demoLink = `${origin}/davet/elif-kerem`;
  useEffect(() => {
    if (!origin) return;
    QRCode.toDataURL(demoLink, { margin: 1, width: 320, color: { dark: "#171511", light: "#fdfaf3" } }).then(setQr).catch(() => {});
  }, [origin, demoLink]);

  const addPhotos = async (files: FileList | null) => {
    if (!files) return;
    const list = await Promise.all(Array.from(files).slice(0, 8).map((f) => resize(f).catch(() => "")));
    setD((o) => ({ ...o, photos: [...o.photos, ...list.filter(Boolean)].slice(0, 10) }));
  };

  const share = `${d.bride} & ${d.groom} düğün davetiyesi: ${demoLink}`;

  return (
    <section id="studyo" className="bg-ivory-2 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto grid max-w-[88rem] gap-10 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          {/* adımlar */}
          <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" data-lenis-prevent>
            {steps.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${i === step ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 bg-ivory hover:border-midnight/40"}`}>
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${i === step ? "bg-champagne text-midnight" : "bg-midnight/10"}`}>{i + 1}</span>
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[560px] rounded-[2rem] bg-ivory p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne-deep">Adım {step + 1} / {steps.length}</p>
                <h3 className="mt-2 font-serif text-4xl">{steps[step]}</h3>

                {step === 0 && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {themes.map((t) => (
                      <button key={t.id} onClick={() => up("theme", t.id)} aria-pressed={d.theme === t.id} className={`group overflow-hidden rounded-[1.5rem] border-2 text-left transition ${d.theme === t.id ? "border-champagne" : "border-transparent hover:border-midnight/15"}`}>
                        <div className="relative h-40 overflow-hidden" style={{ background: t.bg }}>
                          <div className="absolute inset-x-8 bottom-0 top-6 rounded-t-xl p-4 text-center shadow-lg transition duration-700 group-hover:-translate-y-1" style={{ background: t.paper, color: t.ink }}>
                            <p className="text-[7px] uppercase tracking-[0.3em]" style={{ color: t.acc }}>Ailelerimizle birlikte</p>
                            <p className={`mt-2 font-serif ${t.id === "modern" ? "text-lg uppercase tracking-[0.15em]" : "text-2xl italic"}`}>{d.bride} &amp; {d.groom}</p>
                            <span className="mx-auto mt-2 block h-px w-10" style={{ background: t.acc }} />
                            <p className="mt-2 text-[8px] uppercase tracking-[0.25em]" style={{ color: t.acc }}>12 · 06 · 2027</p>
                          </div>
                          {d.theme === t.id && (
                            <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-champagne text-midnight">
                              <Check className="h-4 w-4" strokeWidth={3} />
                            </span>
                          )}
                        </div>
                        <div className="bg-white p-5">
                          <p className="font-serif text-2xl">{t.t}</p>
                          <p className="mt-1 text-sm text-mocha">{t.d}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="mt-8">
                    <p className="text-mocha">İlk fotoğraf davetiyenin kapağı olur. Yıldıza dokunarak kapağı değiştirebilirsiniz.</p>
                    <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {d.photos.map((p, i) => (
                        <motion.div layout key={p.slice(-40) + i} className={`group relative aspect-[3/4] overflow-hidden rounded-2xl ${i === 0 ? "ring-2 ring-champagne ring-offset-2 ring-offset-ivory" : ""}`}>
                          <img src={p} alt="" className="h-full w-full object-cover" />
                          {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-champagne px-2 py-0.5 text-[10px] font-semibold text-midnight">Kapak</span>}
                          <div className="absolute inset-x-2 bottom-2 flex justify-between opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                            <button onClick={() => setD((o) => ({ ...o, photos: [o.photos[i], ...o.photos.filter((_, k) => k !== i)] }))} className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-midnight" aria-label="Kapak yap">
                              <Star className="h-4 w-4" />
                            </button>
                            <button onClick={() => setD((o) => ({ ...o, photos: o.photos.filter((_, k) => k !== i) }))} className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-midnight" aria-label="Sil">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                      {d.photos.length < 10 && (
                        <button onClick={() => fileRef.current?.click()} className="grid aspect-[3/4] place-items-center rounded-2xl border-2 border-dashed border-midnight/20 text-mocha transition hover:border-champagne hover:text-champagne-deep">
                          <span className="text-center text-sm">
                            <ImagePlus className="mx-auto mb-2 h-7 w-7" strokeWidth={1.3} />
                            Fotoğraf ekle
                          </span>
                        </button>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => addPhotos(e.target.files)} />
                    <p className="mt-4 text-xs text-mocha">Fotoğraflar tarayıcınızda küçültülür ve yalnızca bu cihazdaki taslakta saklanır; sunucuya yüklenmez.</p>
                  </div>
                )}

                {step === 2 && (
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field label="Gelinin adı"><input className={inp} value={d.bride} maxLength={20} onChange={(e) => up("bride", e.target.value)} /></Field>
                    <Field label="Damadın adı"><input className={inp} value={d.groom} maxLength={20} onChange={(e) => up("groom", e.target.value)} /></Field>
                    <Field label="Gelinin ailesi"><input className={inp} value={d.brideFamily} maxLength={50} onChange={(e) => up("brideFamily", e.target.value)} /></Field>
                    <Field label="Damadın ailesi"><input className={inp} value={d.groomFamily} maxLength={50} onChange={(e) => up("groomFamily", e.target.value)} /></Field>
                    <Field label="Üst satır"><input className={inp} value={d.intro} maxLength={40} onChange={(e) => up("intro", e.target.value)} /></Field>
                    <Field label="Davetiye dili">
                      <select className={inp} value={d.lang} onChange={(e) => up("lang", e.target.value as InviteData["lang"])}>
                        {langNames.map((l) => (
                          <option key={l.id} value={l.id}>{l.t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <div className="mt-8 grid gap-5">
                    <Field label="Davet metni"><textarea className={`${inp} resize-none`} rows={4} maxLength={240} value={d.message} onChange={(e) => up("message", e.target.value)} /></Field>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha">Hazır metinler</p>
                    <div className="grid gap-2">
                      {messagePresets.map((m) => (
                        <button key={m} onClick={() => up("message", m)} className={`rounded-2xl border p-4 text-left font-serif text-lg transition ${d.message === m ? "border-champagne bg-white" : "border-midnight/10 hover:border-midnight/30"}`}>
                          “{m}”
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <Field label="Düğün tarihi"><input type="date" className={inp} value={d.date} onChange={(e) => e.target.value && up("date", e.target.value)} /></Field>
                    <Field label="Katılım bildirimi son tarih"><input type="date" className={inp} value={d.rsvpBy} onChange={(e) => e.target.value && up("rsvpBy", e.target.value)} /></Field>
                    <Field label="Nikâh saati"><input type="time" className={inp} value={d.nikahTime} onChange={(e) => up("nikahTime", e.target.value)} /></Field>
                    <Field label="Düğün başlangıcı"><input type="time" className={inp} value={d.partyTime} onChange={(e) => up("partyTime", e.target.value)} /></Field>
                    <Field label="Bitiş saati"><input type="time" className={inp} value={d.endTime} onChange={(e) => up("endTime", e.target.value)} /></Field>
                    <Field label="Nikâh yeri"><input className={inp} value={d.nikahPlace} maxLength={60} onChange={(e) => up("nikahPlace", e.target.value)} /></Field>
                    <Field label="Düğün mekânı"><input className={inp} value={d.venue} maxLength={60} onChange={(e) => up("venue", e.target.value)} /></Field>
                    <Field label="Adres (yol tarifi için)"><input className={inp} value={d.address} maxLength={100} onChange={(e) => up("address", e.target.value)} /></Field>
                  </div>
                )}

                {step === 5 && (
                  <div className="mt-8 grid gap-4">
                    {d.story.map((s, i) => (
                      <div key={i} className="grid gap-3 rounded-2xl border border-midnight/10 bg-white p-5 sm:grid-cols-[90px_1fr_auto]">
                        <input className={inp} value={s.y} maxLength={6} onChange={(e) => up("story", d.story.map((x, k) => (k === i ? { ...x, y: e.target.value } : x)))} aria-label="Yıl" />
                        <div className="grid gap-2">
                          <input className={inp} value={s.t} maxLength={40} onChange={(e) => up("story", d.story.map((x, k) => (k === i ? { ...x, t: e.target.value } : x)))} aria-label="Başlık" />
                          <textarea className={`${inp} resize-none`} rows={2} maxLength={160} value={s.d} onChange={(e) => up("story", d.story.map((x, k) => (k === i ? { ...x, d: e.target.value } : x)))} aria-label="Açıklama" />
                        </div>
                        <button onClick={() => up("story", d.story.filter((_, k) => k !== i))} className="grid h-11 w-11 place-items-center self-start rounded-full border border-midnight/15 text-mocha hover:text-midnight" aria-label="Sil">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    {d.story.length < 5 && (
                      <button onClick={() => up("story", [...d.story, { y: String(new Date().getFullYear()), t: "Yeni bir an", d: "" }])} className="inline-flex w-fit items-center gap-2 rounded-full border border-midnight/20 px-5 py-3 text-sm hover:border-midnight">
                        <Plus className="h-4 w-4" /> Anı ekle
                      </button>
                    )}
                  </div>
                )}

                {step === 6 && (
                  <div className="mt-8 grid gap-8">
                    <div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha">Arka plan müziği</p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {musics.map((m) => (
                          <button key={m.id} onClick={() => up("music", m.id)} aria-pressed={d.music === m.id} className={`rounded-2xl border p-5 text-left transition ${d.music === m.id ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 bg-white hover:border-midnight/40"}`}>
                            <p className="font-serif text-2xl">{m.t}</p>
                            <p className={`text-xs ${d.music === m.id ? "text-ivory/60" : "text-mocha"}`}>{m.d}</p>
                          </button>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-mocha">Müzik, davetli zarfı açtığında başlar ve her an kapatılabilir. Eserler kamu malıdır; dilerseniz kendi şarkınız eklenebilir.</p>
                    </div>
                    <div>
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha">Açılış animasyonu</p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        {openings.map((o) => (
                          <button key={o.id} onClick={() => { up("opening", o.id); setReplay((r) => r + 1); }} aria-pressed={d.opening === o.id} className={`rounded-2xl border p-5 text-left transition ${d.opening === o.id ? "border-midnight bg-midnight text-ivory" : "border-midnight/15 bg-white hover:border-midnight/40"}`}>
                            <p className="font-serif text-2xl">{o.t}</p>
                            <p className={`text-xs ${d.opening === o.id ? "text-ivory/60" : "text-mocha"}`}>{o.d}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 7 && (
                  <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_200px]">
                    <div className="grid content-start gap-5">
                      <Field label="Davetiye bağlantınız">
                        <div className="flex items-center overflow-hidden rounded-2xl border border-midnight/15 bg-white">
                          <span className="whitespace-nowrap pl-4 text-sm text-mocha">{origin.replace(/^https?:\/\//, "") || "siteniz"}/davet/</span>
                          <input className="w-full bg-transparent py-3.5 pr-4 outline-none" value={d.slug} onChange={(e) => up("slug", slugify(e.target.value))} />
                        </div>
                      </Field>
                      <button onClick={() => up("slug", slugify(`${d.bride}-${d.groom}`))} className="w-fit text-xs text-champagne-deep underline underline-offset-4">İsimlerden oluştur</button>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <a href="/davet/onizleme" target="_blank" className="inline-flex items-center justify-center gap-2 rounded-full bg-midnight px-5 py-3.5 text-sm text-ivory transition hover:bg-midnight-3">
                          <ExternalLink className="h-4 w-4" /> Tam ekran önizle
                        </a>
                        <a href={`https://wa.me/?text=${encodeURIComponent(share)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f8f5f] px-5 py-3.5 text-sm text-white">
                          <MessageCircle className="h-4 w-4" /> WhatsApp&apos;ta paylaş
                        </a>
                        <button onClick={() => { navigator.clipboard?.writeText(demoLink); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center justify-center gap-2 rounded-full border border-midnight/20 px-5 py-3.5 text-sm">
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Kopyalandı" : "Bağlantıyı kopyala"}
                        </button>
                        <button onClick={() => { if (confirm("Taslak silinip örnek davetiyeye dönülsün mü?")) { setD(demoInvite); setReplay((r) => r + 1); } }} className="inline-flex items-center justify-center gap-2 rounded-full border border-midnight/20 px-5 py-3.5 text-sm text-mocha">
                          <RotateCcw className="h-4 w-4" /> Örneğe sıfırla
                        </button>
                      </div>
                      <p className="rounded-2xl bg-white p-4 text-xs leading-relaxed text-mocha">
                        Bu demoda taslağınız yalnızca bu cihazda saklanır. Paylaşım bağlantısı ve QR kod, yayındaki örnek davetiyeyi açar. Yönetim paneliyle yayınlandığında davetiyeniz <b className="break-all text-midnight">{origin.replace(/^https?:\/\//, "")}{publicPath}</b> adresinde herkese açık olur.
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white p-4 text-center">
                      {qr ? <img src={qr} alt="Davetiye QR kodu" className="mx-auto w-full max-w-[170px]" /> : <div className="aspect-square animate-pulse rounded-xl bg-ivory-2" />}
                      <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-mocha">Davetiye QR kodu</p>
                      {qr && (
                        <a href={qr} download="davetiye-qr.png" className="mt-3 inline-flex items-center gap-1.5 text-xs text-champagne-deep">
                          <Download className="h-3.5 w-3.5" /> İndir
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-sm text-mocha disabled:opacity-30">
              <ArrowLeft className="h-4 w-4" /> Geri
            </button>
            <span className={`hidden text-xs text-mocha transition sm:inline ${saved ? "opacity-100" : "opacity-0"}`}>Taslak kaydedildi</span>
            <a href="#onizleme" className="inline-flex items-center gap-1.5 rounded-full border border-champagne px-4 py-3 text-sm text-champagne-deep lg:hidden">Önizle</a>
            {step < steps.length - 1 && (
              <button onClick={() => setStep((s) => s + 1)} className="inline-flex items-center gap-2 rounded-full bg-midnight px-7 py-3.5 text-sm font-semibold text-ivory">
                Devam <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div id="onizleme" className="min-w-0 scroll-mt-24 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Phone>
              <Invitation d={d} mode="phone" replay={replay} />
            </Phone>
            <div className="mt-5 flex justify-center gap-3">
              <button onClick={() => setReplay((r) => r + 1)} className="inline-flex items-center gap-2 rounded-full border border-midnight/20 px-5 py-2.5 text-sm hover:border-midnight">
                <RotateCcw className="h-4 w-4" /> Açılışı tekrar oynat
              </button>
              <a href="/davet/onizleme" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-2.5 text-sm font-semibold text-midnight">
                Tam ekran <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-3 text-center text-xs text-mocha">Canlı önizleme · değişiklikler anında yansır</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Davetli listesi: kişiye özel bağlantı ve QR ---------------- */
type Guest = { name: string; phone: string };
function parseGuests(text: string): Guest[] {
  return text
    .split(/\r?\n/)
    .map((l) => l.split(/[;,\t]/).map((x) => x.trim()))
    .filter((p) => p[0] && !/^ad|^isim|^name/i.test(p[0]))
    .map((p) => ({ name: p[0].slice(0, 60), phone: (p[1] || "").replace(/[^\d]/g, "") }))
    .slice(0, 500);
}

export function GuestTool() {
  const [text, setText] = useState("Ayşe Yılmaz, 905000000001\nMehmet Kaya, 905000000002\nZeynep Arslan\nCan ve Ece Demir, 905000000004");
  const guests = useMemo(() => parseGuests(text), [text]);
  const [origin, setOrigin] = useState("");
  const [qrFor, setQrFor] = useState<Guest | null>(null);
  const [qr, setQr] = useState("");
  const [rsvps, setRsvps] = useState<{ name: string; yes: boolean; count: number; note: string; at: number }[]>([]);
  useEffect(() => {
    setOrigin(window.location.origin);
    const read = () => {
      try {
        setRsvps(JSON.parse(localStorage.getItem(RSVP_KEY) || "[]"));
      } catch {}
    };
    read();
    window.addEventListener("focus", read);
    return () => window.removeEventListener("focus", read);
  }, []);
  const link = (g: Guest) => `${origin}/davet/elif-kerem?d=${encodeURIComponent(g.name)}`;
  useEffect(() => {
    if (!qrFor) return;
    QRCode.toDataURL(link(qrFor), { margin: 1, width: 360, color: { dark: "#171511", light: "#fdfaf3" } }).then(setQr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrFor]);
  const onFile = (f: File | undefined) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setText(String(r.result || ""));
    r.readAsText(f, "utf-8");
  };
  const exportCsv = () => {
    const rows = ["Ad Soyad;Telefon;Kişisel bağlantı", ...guests.map((g) => `${g.name};${g.phone};${link(g)}`)];
    const blob = new Blob(["﻿" + rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "davetli-baglantilari.csv";
    a.click();
  };
  const yes = rsvps.filter((r) => r.yes);
  const people = yes.reduce((s, r) => s + r.count, 0);

  return (
    <section id="davetliler" className="bg-ivory px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Kicker>Davetli listesi</Kicker>
            <Lines className="font-serif text-[clamp(2.6rem,5vw,5rem)] font-light leading-[0.98]" lines={["Her davetliye", <em key="b" className="text-champagne-deep">kendi davetiyesi.</em>]} />
          </div>
          <p className="max-w-sm text-mocha">Excel listenizi CSV olarak yükleyin ya da yapıştırın; her davetli için adıyla karşılanacağı kişisel bağlantı ve QR kod oluşsun.</p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 rounded-[2rem] bg-white p-6 sm:p-8 lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mocha">Ad Soyad, Telefon (her satıra bir davetli)</p>
            <textarea className="mt-3 h-56 w-full resize-none rounded-2xl border border-midnight/15 p-4 font-mono text-sm outline-none focus:border-champagne" value={text} onChange={(e) => setText(e.target.value)} aria-label="Davetli listesi" />
            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-full border border-dashed border-midnight/25 px-5 py-3 text-sm text-mocha transition hover:border-champagne hover:text-midnight">
              <Upload className="h-4 w-4" /> CSV dosyası yükle
              <input type="file" accept=".csv,.txt" hidden onChange={(e) => onFile(e.target.files?.[0])} />
            </label>
            <p className="mt-3 text-xs text-mocha">Excel&apos;de “Farklı kaydet → CSV” ile dışa aktarabilirsiniz. Liste yalnızca tarayıcınızda işlenir.</p>
          </div>
          <div className="min-w-0 overflow-hidden rounded-[2rem] bg-white lg:col-span-8">
            <div className="flex items-center justify-between border-b border-midnight/10 px-6 py-4">
              <p className="font-serif text-2xl">{guests.length} davetli</p>
              <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full bg-midnight px-4 py-2 text-xs text-ivory">
                <FileSpreadsheet className="h-4 w-4" /> Bağlantıları indir
              </button>
            </div>
            <div className="max-h-[360px] overflow-y-auto" data-lenis-prevent>
              <AnimatePresence initial={false}>
                {guests.map((g, i) => (
                  <motion.div key={g.name + i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-center justify-between gap-3 border-b border-midnight/5 px-6 py-3">
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory-2 font-serif text-sm">{g.name[0]?.toLocaleUpperCase("tr-TR")}</span>
                      <span className="min-w-0">
                        <span className="block truncate">{g.name}</span>
                        <span className="block truncate text-xs text-mocha">/davet/elif-kerem?d={g.name}</span>
                      </span>
                    </span>
                    <span className="flex shrink-0 gap-1.5">
                      <button onClick={() => navigator.clipboard?.writeText(link(g))} className="grid h-9 w-9 place-items-center rounded-full border border-midnight/15 hover:border-midnight" aria-label={`${g.name} bağlantısını kopyala`}>
                        <Link2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => setQrFor(g)} className="grid h-9 w-9 place-items-center rounded-full border border-midnight/15 hover:border-midnight" aria-label={`${g.name} QR kodu`}>
                        <QrCode className="h-4 w-4" />
                      </button>
                      <a href={`https://wa.me/${g.phone}?text=${encodeURIComponent(`Sevgili ${g.name}, düğün davetiyemiz: ${link(g)}`)}`} target="_blank" rel="noopener noreferrer" className={`grid h-9 w-9 place-items-center rounded-full ${g.phone ? "bg-[#1f8f5f] text-white" : "pointer-events-none border border-midnight/10 text-midnight/25"}`} aria-label={`${g.name} kişisine WhatsApp ile gönder`}>
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <a href={`/davet/elif-kerem?d=${encodeURIComponent(g.name)}`} target="_blank" className="grid h-9 w-9 place-items-center rounded-full border border-midnight/15 hover:border-midnight" aria-label="Davetiyeyi aç">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-[2rem] bg-midnight p-6 text-ivory sm:p-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-champagne">Katılım yanıtları</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["Yanıt", rsvps.length],
                ["Katılıyor", yes.length],
                ["Kişi", people],
              ].map(([k, v]) => (
                <div key={k as string} className="rounded-2xl bg-ivory/5 p-4">
                  <p className="font-serif text-4xl tabular-nums">{v as number}</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">{k as string}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ivory/45">Bu demoda yalnızca bu cihazdan gönderilen yanıtlar görünür. Örnek davetiyeyi açıp bir yanıt gönderebilirsiniz.</p>
          </div>
          <div className="max-h-56 overflow-y-auto lg:col-span-8" data-lenis-prevent>
            {rsvps.length ? (
              rsvps.map((r, i) => (
                <div key={i} className="flex items-center justify-between border-b border-ivory/10 py-3 text-sm">
                  <span>
                    {r.name}
                    {r.note && <span className="block text-xs text-ivory/50">“{r.note}”</span>}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-xs ${r.yes ? "bg-champagne text-midnight" : "bg-ivory/10 text-ivory/70"}`}>{r.yes ? `Katılıyor · ${r.count} kişi` : "Katılamıyor"}</span>
                </div>
              ))
            ) : (
              <p className="grid h-full place-items-center py-10 text-sm text-ivory/45">Henüz yanıt yok</p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {qrFor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] grid place-items-center bg-midnight/80 p-5 backdrop-blur" onClick={() => setQrFor(null)}>
            <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-[2rem] bg-ivory p-8 text-center" role="dialog" aria-modal="true">
              <button onClick={() => setQrFor(null)} className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-midnight/15" aria-label="Kapat">
                <X className="h-4 w-4" />
              </button>
              <p className="font-serif text-3xl">{qrFor.name}</p>
              <p className="mt-1 text-xs text-mocha">Kişisel davetiye ve giriş QR kodu</p>
              {qr && <img src={qr} alt={`${qrFor.name} QR kodu`} className="mx-auto mt-5 w-60" />}
              {qr && (
                <a href={qr} download={`${slugify(qrFor.name)}-qr.png`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm text-ivory">
                  <Download className="h-4 w-4" /> İndir
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- İşletmeye değer katan özellikler ---------------- */
export function StudioFeatures() {
  const items = [
    { I: Link2, t: "Çifte özel bağlantı", d: "Her davetiye kendi adresiyle yayınlanır: /davet/elif-kerem gibi kısa ve akılda kalıcı.", live: true },
    { I: FileSpreadsheet, t: "Excel'den içe aktarma", d: "Davetli listesi tek seferde yüklenir; kişisel bağlantılar otomatik oluşur.", live: true },
    { I: Users, t: "Katılım ve kişi takibi", d: "Kim geliyor, kaç kişi geliyor; yanıtlar tek ekranda toplanır.", live: false },
    { I: ScanLine, t: "QR ile giriş kontrolü", d: "Davet günü kapıda QR kod okutularak davetli girişi doğrulanır.", live: false },
    { I: BarChart3, t: "Görüntülenme istatistikleri", d: "Davetiyenin kaç kez açıldığı ve hangi kanaldan geldiği izlenir.", live: false },
    { I: LayoutGrid, t: "Masa planına aktarım", d: "Katılım yanıtları, salonun masa planına doğrudan aktarılır.", live: false },
    { I: Globe2, t: "Çok dilli davetiye", d: "Yabancı misafirler için davetiye Türkçe, İngilizce veya Almanca hazırlanır.", live: true },
    { I: QrCode, t: "Basılı davetiyeye QR", d: "Klasik davetiyelerinize eklenecek QR kod ile dijital deneyime geçiş.", live: true },
  ];
  return (
    <section className="bg-midnight px-5 py-24 text-ivory sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[88rem]">
        <div className="text-center">
          <Kicker light center>Organizasyon ekibi için</Kicker>
          <Lines className="font-serif text-[clamp(2.6rem,5vw,5rem)] font-light leading-[0.98]" lines={["Davetiyeden", <em key="b" className="text-champagne-2">masa planına kadar.</em>]} />
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((x, i) => (
            <motion.div key={x.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease }} className="flex flex-col rounded-[1.75rem] border border-ivory/10 bg-midnight-2 p-7">
              <x.I className="h-7 w-7 text-champagne" strokeWidth={1.4} />
              <h3 className="mt-6 font-serif text-2xl">{x.t}</h3>
              <p className="mt-2 flex-1 text-sm text-ivory/60">{x.d}</p>
              <span className={`mt-6 w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${x.live ? "bg-champagne/15 text-champagne-2" : "bg-ivory/5 text-ivory/50"}`}>{x.live ? "Bu demoda çalışıyor" : "Yönetim paneliyle"}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
