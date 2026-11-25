// Dijital davetiye veri modeli. Örnek çift (Elif & Kerem) ve tüm bilgiler temsilidir.

export type ThemeId = "saray" | "modern" | "botanik" | "gece";
export type Lang = "tr" | "en" | "de";
export type MusicId = "canon" | "gelin" | "yok";
export type OpeningId = "zarf" | "perde" | "isik";

export type StoryItem = { y: string; t: string; d: string };

export type InviteData = {
  slug: string;
  theme: ThemeId;
  lang: Lang;
  bride: string;
  groom: string;
  brideFamily: string;
  groomFamily: string;
  intro: string;
  message: string;
  date: string; // yyyy-mm-dd
  nikahTime: string;
  partyTime: string;
  endTime: string;
  nikahPlace: string;
  venue: string;
  address: string;
  rsvpBy: string;
  photos: string[];
  story: StoryItem[];
  music: MusicId;
  opening: OpeningId;
  contact: string;
};

export const demoInvite: InviteData = {
  slug: "elif-kerem",
  theme: "saray",
  lang: "tr",
  bride: "Elif",
  groom: "Kerem",
  brideFamily: "Ayşe & Mehmet Yıldız",
  groomFamily: "Zeynep & Ahmet Demir",
  intro: "Ailelerimizle birlikte",
  message: "Bir ömür boyu sürecek hikâyemizin en güzel başlangıcında sizleri de aramızda görmekten mutluluk duyarız.",
  date: "2027-06-12",
  nikahTime: "18:30",
  partyTime: "19:30",
  endTime: "00:30",
  nikahPlace: "Nobel Kır Bahçesi · Nikâh Alanı",
  venue: "NOBEL · Düğün Kompleksi",
  address: "Maşuk Mah. Diyarbakır Bulvarı No:16/B, Karaköprü / Şanlıurfa",
  rsvpBy: "2027-05-20",
  photos: ["/img/kutlama.jpg", "/img/dans-sis.jpg", "/img/dans-mavi.jpg", "/img/eglence.jpg", "/img/dans-siyah.jpg", "/img/nisan.jpg"],
  story: [
    { y: "2019", t: "İlk tanışma", d: "Bir kitapçının önünde başlayan sohbet, hiç bitmeyecek bir dostluğun başlangıcı oldu." },
    { y: "2022", t: "İlk yolculuk", d: "Kapadokya'da gün doğumunda balonlar arasında aynı hayali kurduk." },
    { y: "2026", t: "Evet!", d: "Gün batımında, en sevdiğimiz şarkı eşliğinde gelen soru ve en kolay cevap." },
  ],
  music: "canon",
  opening: "zarf",
  contact: "905461866363",
};

export const themes: { id: ThemeId; t: string; d: string; bg: string; paper: string; ink: string; acc: string; soft: string; dark: boolean }[] = [
  { id: "saray", t: "Klasik Saray", d: "Fildişi, altın, zarif çiçekler ve klasik tipografi.", bg: "#f3ede2", paper: "#fdfaf3", ink: "#2a251c", acc: "#b08d4f", soft: "#efe5d2", dark: false },
  { id: "modern", t: "Modern Sade", d: "Sade, modern ve fotoğraf odaklı.", bg: "#ecebe8", paper: "#fafaf8", ink: "#141414", acc: "#141414", soft: "#e8e6e1", dark: false },
  { id: "botanik", t: "Botanik Romantik", d: "Yaprak desenleri, doğal tonlar ve romantik detaylar.", bg: "#e6eadf", paper: "#f5f6ef", ink: "#2f3a2a", acc: "#6f7f5c", soft: "#dfe5d5", dark: false },
  { id: "gece", t: "Gece Lüksü", d: "Siyah, altın ve gece daveti atmosferi.", bg: "#0e0c0a", paper: "#171511", ink: "#f5f0e7", acc: "#d8bd85", soft: "#221e18", dark: true },
];

export const messagePresets = [
  "Bir ömür boyu sürecek hikâyemizin en güzel başlangıcında sizleri de aramızda görmekten mutluluk duyarız.",
  "Hayatımızı birleştirdiğimiz bu özel günde, sevincimizi sizinle paylaşmak istiyoruz.",
  "Aşkımızı ailelerimiz ve sevdiklerimizle kutlayacağımız gecede, varlığınız bizim için en güzel hediye olacak.",
];

export const musics: { id: MusicId; t: string; d: string }[] = [
  { id: "canon", t: "Canon", d: "Pachelbel · müzik kutusu" },
  { id: "gelin", t: "Gelin Marşı", d: "Wagner · arp" },
  { id: "yok", t: "Müziksiz", d: "Sessiz davetiye" },
];

export const openings: { id: OpeningId; t: string; d: string }[] = [
  { id: "zarf", t: "Zarf", d: "Mühürlü zarf açılır, davetiye yükselir." },
  { id: "perde", t: "Perde", d: "Saray perdesi iki yana aralanır." },
  { id: "isik", t: "Işık", d: "Altın bir ışıkla yavaşça belirir." },
];

/* Davetiye üzerindeki sabit etiketler (davetli kendi dilinde görebilsin) */
export const L: Record<Lang, Record<string, string>> = {
  tr: { open: "Davetiyeyi açmak için dokunun", dear: "Sevgili", invite: "Düğünümüze davetlisiniz", families: "Aileleri", brideFam: "Gelinin ailesi", groomFam: "Damadın ailesi", countdown: "Büyük güne kalan", days: "Gün", hours: "Saat", mins: "Dakika", secs: "Saniye", program: "Program", nikah: "Nikâh töreni", party: "Düğün yemeği ve eğlence", end: "Kapanış", route: "Yol tarifi", calendar: "Takvime ekle", story: "Hikâyemiz", gallery: "Anılarımız", rsvp: "Katılım bildirimi", rsvpBy: "Lütfen yanıtınızı şu tarihe kadar iletin:", name: "Adınız soyadınız", yes: "Katılıyorum", no: "Katılamıyorum", count: "Kişi sayısı", note: "Çifte bir notunuz (isteğe bağlı)", send: "Yanıtı gönder", thanks: "Teşekkür ederiz!", thanksYes: "Sizi aramızda görmek için sabırsızlanıyoruz.", thanksNo: "Yokluğunuzu hissedeceğiz; güzel dilekleriniz için teşekkürler.", love: "Sevgiyle", music: "Müzik", share: "Paylaş" },
  en: { open: "Tap to open your invitation", dear: "Dear", invite: "You are invited to our wedding", families: "Families", brideFam: "Family of the bride", groomFam: "Family of the groom", countdown: "Counting down to the big day", days: "Days", hours: "Hours", mins: "Minutes", secs: "Seconds", program: "Programme", nikah: "Wedding ceremony", party: "Dinner & celebration", end: "Farewell", route: "Directions", calendar: "Add to calendar", story: "Our story", gallery: "Our moments", rsvp: "RSVP", rsvpBy: "Kindly reply by", name: "Your full name", yes: "Joyfully accepts", no: "Regretfully declines", count: "Number of guests", note: "A note for the couple (optional)", send: "Send reply", thanks: "Thank you!", thanksYes: "We can't wait to celebrate with you.", thanksNo: "You will be missed — thank you for your wishes.", love: "With love", music: "Music", share: "Share" },
  de: { open: "Zum Öffnen tippen", dear: "Liebe/r", invite: "Wir laden euch zu unserer Hochzeit ein", families: "Familien", brideFam: "Familie der Braut", groomFam: "Familie des Bräutigams", countdown: "Countdown zum großen Tag", days: "Tage", hours: "Std.", mins: "Min.", secs: "Sek.", program: "Ablauf", nikah: "Trauung", party: "Dinner & Feier", end: "Ausklang", route: "Anfahrt", calendar: "Zum Kalender", story: "Unsere Geschichte", gallery: "Unsere Momente", rsvp: "Rückmeldung", rsvpBy: "Bitte antwortet bis", name: "Vor- und Nachname", yes: "Ich komme gerne", no: "Leider verhindert", count: "Anzahl Personen", note: "Eine Nachricht an das Paar (optional)", send: "Antwort senden", thanks: "Vielen Dank!", thanksYes: "Wir freuen uns sehr auf euch.", thanksNo: "Ihr werdet uns fehlen — danke für eure Wünsche.", love: "Von Herzen", music: "Musik", share: "Teilen" },
};

export const langNames: { id: Lang; t: string }[] = [
  { id: "tr", t: "Türkçe" },
  { id: "en", t: "İngilizce" },
  { id: "de", t: "Almanca" },
];

export const locale = (l: Lang) => (l === "tr" ? "tr-TR" : l === "de" ? "de-DE" : "en-GB");

export const DRAFT_KEY = "nobel-davetiye-taslak";
export const RSVP_KEY = "nobel-davetiye-yanitlar";

export function mapsUrl(q: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/* .ics takvim dosyası */
export function icsFor(d: InviteData) {
  const [Y, M, D] = d.date.split("-").map(Number);
  const [sh, sm] = (d.nikahTime || "19:00").split(":").map(Number);
  const [eh, em] = (d.endTime || "23:59").split(":").map(Number);
  const p = (n: number) => String(n).padStart(2, "0");
  const start = `${Y}${p(M)}${p(D)}T${p(sh)}${p(sm)}00`;
  const endDay = eh < sh ? new Date(Y, M - 1, D + 1) : new Date(Y, M - 1, D);
  const end = `${endDay.getFullYear()}${p(endDay.getMonth() + 1)}${p(endDay.getDate())}T${p(eh)}${p(em)}00`;
  const esc = (s: string) => s.replace(/([,;])/g, "\\$1");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//NOBEL//Davetiye//TR",
    "BEGIN:VEVENT",
    `UID:${d.slug}-${start}@nobel`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${esc(`${d.bride} & ${d.groom} Düğünü`)}`,
    `LOCATION:${esc(`${d.venue}, ${d.address}`)}`,
    `DESCRIPTION:${esc(d.message)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
