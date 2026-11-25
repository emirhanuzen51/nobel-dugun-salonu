// NOBEL Düğün Kompleksi & Kır Bahçesi — Şanlıurfa / Karaköprü

export const brand = {
  name: "NOBEL",
  tagline: "Düğün Kompleksi & Kır Bahçesi",
  city: "Şanlıurfa",
  district: "Karaköprü",
  address: "Maşuk Mah. Diyarbakır Bulvarı No:16/B, Karaköprü / Şanlıurfa",
  phoneDisplay: "+90 (546) 186 63 63",
  phoneHref: "tel:+905461866363",
  whatsapp: "905461866363",
  email: "iletisim@nobeldugun.com",
  instagram: "https://www.instagram.com/nobeldugunurfa",
  instagramHandle: "@nobeldugunurfa",
  hours: "Her gün 09:00 – 23:00 (randevu ile mekân turu)",
  mapsQuery: "https://www.google.com/maps/search/?api=1&query=Nobel+D%C3%BC%C4%9F%C3%BCn+K%C4%B1r+Bah%C3%A7esi+Karak%C3%B6pr%C3%BC+%C5%9Eanl%C4%B1urfa",
};

export const prestige = [
  { n: 3, s: "", l: "Farklı davet alanı (Kır Bahçesi & Salonlar)" },
  { n: 7, s: "", l: "Özel organizasyon konsepti" },
  { n: 2500, s: "", l: "Kişiye kadar misafir kapasitesi" },
  { n: 1, s: ":1", l: "Kişiye özel organizasyon planlama" },
];

export type Concept = { id: string; no: string; en: string; t: string; d: string; cap: string; place: string; img: string; venue: string };
export const concepts: Concept[] = [
  { id: "kir", no: "01", en: "Botanika", t: "Masalsı kır bahçesi düğünü", d: "Yemyeşil doğal çim zemin, romantik nikâh tagı, gökyüzünü süsleyen ışıklar ve açık hava ziyafeti.", cap: "500 – 2.500 kişi", place: "Kır bahçesi", img: "/img/bahce-gece.jpg", venue: "botanika" },
  { id: "saray", no: "02", en: "Saray", t: "Saray zarafetinde balo düğünü", d: "Kristal avizeler, görkemli sahne ve LED ekranlar, lüks masa düzeni ve unutulmaz bir ilk dans.", cap: "400 – 1.500 kişi", place: "Balo salonu", img: "/img/balo-tiyatro.jpg", venue: "saray" },
  { id: "teras", no: "03", en: "Panorama", t: "VIP teras & kokteyl daveti", d: "Karaköprü gün batımı manzarası, şık bistro masalar, kokteyl alanı ve gece boyu süren eğlence.", cap: "150 – 600 kişi", place: "Teras", img: "/img/teras-gunbatimi.jpg", venue: "panorama" },
  { id: "kina", no: "04", en: "Kına", t: "Görkemli kına gecesi seremonisi", d: "Özel kına tahtı, dans ekibi koreografisi, tematik dekorasyon ve geleneksel ritüeller.", cap: "150 – 800 kişi", place: "Özel konsept", img: "/img/kina.jpg", venue: "saray" },
  { id: "nisan", no: "05", en: "Söz", t: "Zarif nişan ve söz daveti", d: "Butik arka plan tasarımı, taze çiçekler, yüzük merasimi ve ailelere özel samimi davet düzeni.", cap: "100 – 500 kişi", place: "Butik organizasyon", img: "/img/nisan.jpg", venue: "panorama" },
  { id: "gala", no: "06", en: "Gala", t: "Yemekli kurumsal davet & sünnet", d: "Geniş protokol düzeni, profesyonel ses-ışık sistemleri ve zengin mutfak menüleriyle şölen havası.", cap: "300 – 2.500 kişi", place: "Kompleks geneli", img: "/img/gala.jpg", venue: "botanika" },
];
export const otherEvents = ["Sünnet şöleni", "Mezuniyet balosu", "Mevlid & İftar yemekleri", "Kurumsal bayi toplantısı", "Özel kutlamalar"];

export type Venue = {
  slug: string;
  name: string;
  kind: string;
  short: string;
  long: string;
  cover: string;
  pano: string;
  min: number;
  max: number;
  area: string;
  ceiling: string;
  features: string[];
  events: string[];
  gallery: string[];
  hotspots: { x: number; t: string; d: string }[];
};

export const venues: Venue[] = [
  {
    slug: "botanika",
    name: "Nobel Kır Bahçesi",
    kind: "Açık hava kır bahçesi",
    short: "Doğal çim zemin, asırlık ağaçlar ve masalsı ışıklandırmalarla bölgenin en görkemli kır alanı.",
    long: "Nobel Kır Bahçesi, Şanlıurfa Karaköprü'nün en ferah noktasında, 2.500 kişiye kadar uzanan kapasitesi ve yemyeşil doğal çim zeminiyle unutulmaz açık hava davetlerine ev sahipliği yapar. Romantik gelin yolu, açık hava nikâh sahnesi, dinamik robot ışık sistemleri ve geniş dans pistiyle rüya gibi bir gece sunar.",
    cover: "/img/bahce-gece.jpg",
    pano: "/img/bahce-gece.jpg",
    min: 500,
    max: 2500,
    area: "8.500 m² bahçe",
    ceiling: "Açık hava / Yıldızlar altında",
    features: [
      "2.500 kişilik açık hava kapasitesi",
      "Doğal çim zemin ve botanik peyzaj",
      "Görkemli nikâh töreni sahnesi & gelin yolu",
      "Robot ışık, sis ve profesyonel ses sistemi",
      "Gelin & damat özel hazırlık villası",
      "1.000 araçlık geniş otopark & ücretsiz vale",
      "Yağış ihtimaline karşı hızlı kapalı alan geçişi",
      "Engelsiz düzayak misafir erişimi",
    ],
    events: ["Kır düğünü", "Açık hava nikâh töreni", "Yaz sünnet şöleni", "Büyük yemekli davetler"],
    gallery: ["/img/bahce-masa.jpg", "/img/bahce-isik.jpg", "/img/avize-yesil.jpg", "/img/masa-uzun.jpg", "/img/ahsap-masa.jpg", "/img/masa-renkli.jpg"],
    hotspots: [
      { x: 20, t: "Nikâh töreni alanı", d: "Çiçek kemerli ve özel kürsülü açık hava nikâh sahnesi." },
      { x: 52, t: "Işıklı bahçe ağaçları", d: "Gece gökyüzünü aydınlatan yüzlerce sarı peri led aydınlatma." },
      { x: 82, t: "Geniş ziyafet masaları", d: "Şık suplalar ve çiçek aranjmanlarıyla süslenmiş yuvarlak masalar." },
    ],
  },
  {
    slug: "saray",
    name: "Nobel Balo Salonu",
    kind: "Lüks kapalı balo salonu",
    short: "Kristal avizeler, yüksek tavan mimarisi ve dev sahnesiyle dört mevsim saray konforu.",
    long: "Nobel Balo Salonu; yüksek tavanlı saray mimarisi, görkemli kristal avizeleri ve kolon bulunmayan ferah görüş açısıyla kapalı salon davetleri için tasarlandı. Güçlü merkezi havalandırma ve iklimlendirme sistemleri sayesinde her mevsim aynı konforu yaşatır.",
    cover: "/img/balo-salon.jpg",
    pano: "/img/balo-tiyatro.jpg",
    min: 400,
    max: 1500,
    area: "2.200 m² kapalı alan",
    ceiling: "10 metre ferah tavan",
    features: [
      "1.500 kişiye varan ziyafet düzeni",
      "Kristal dev avize ve tavan ambiyans ışıkları",
      "14 metre genişliğinde dev ana sahne & LED ekran",
      "Merkezi güçlü klima ve taze hava santrali",
      "VIP aile locaları ve dinlenme alanları",
      "Gelin hazırlık süiti (özel banyolu)",
      "Engelsiz asansör ve rampa bağlantısı",
      "Ayrı çocuk eğlence odası",
    ],
    events: ["Salon düğünü", "Kına gecesi", "Kurumsal kongre & gala", "Geleneksel yemekli davet"],
    gallery: ["/img/saray-avize.jpg", "/img/balo-salon.jpg", "/img/salon-lounge.jpg", "/img/avize-sb.jpg", "/img/dans-sis.jpg", "/img/kutuphane-davet.jpg"],
    hotspots: [
      { x: 16, t: "VIP aile locaları", d: "Özel misafirler ve aile büyükleri için ayrılmış konforlu alanlar." },
      { x: 48, t: "Ana orkestra sahnesi", d: "Canlı müzik ve gösteriler için 14 metrelik profesyonel sahne." },
      { x: 78, t: "Geniş dans pisti", d: "Sis ve lazer efektleriyle ilk dansın unutulmaz adresi." },
    ],
  },
  {
    slug: "panorama",
    name: "Nobel VIP Teras & Lounge",
    kind: "Panoramik teras & butik davet",
    short: "Karaköprü gün batımı manzarası eşliğinde butik nişan, söz ve kına geceleri.",
    long: "Nobel VIP Teras, gün batımının sıcak renklerini kutlamanıza katan özel teras alanıdır. Açılır kapanır tavan pergola sistemi, kokteyl bistroları ve modern lounge oturma alanlarıyla nişan, söz, butik kına ve eğlenceler için eşsiz bir tercihtir.",
    cover: "/img/teras-gunbatimi.jpg",
    pano: "/img/teras-gunbatimi.jpg",
    min: 150,
    max: 600,
    area: "1.200 m² teras",
    ceiling: "Açılır-kapanır bioklimatik tente",
    features: [
      "Karaköprü ve gün batımı manzarası",
      "Bioklimatik açılır-kapanır pergola sistemi",
      "Özel kına tahtı ve seremoni köşesi",
      "Lounge oturma grupları & kokteyl barı",
      "Fotoğraf çekimi için tasarlanmış özel köşeler",
      "Direkt asansör ile teras katına erişim",
    ],
    events: ["Nişan ve söz daveti", "Kına gecesi", "After party & kokteyl", "Özel kutlamalar"],
    gallery: ["/img/teras-aksam.jpg", "/img/kanape.jpg", "/img/dans-mor.jpg", "/img/masa-servis.jpg", "/img/kutlama.jpg", "/img/eglence.jpg"],
    hotspots: [
      { x: 24, t: "Kokteyl & İkram Barı", d: "Zengin soğuk ikramlar ve alkolsüz özel kokteyller." },
      { x: 55, t: "Gün batımı fotoğraf köşesi", d: "Gelin ve damat çekimleri için en gözde manzara noktası." },
      { x: 84, t: "Lounge dinlenme alanı", d: "Sıcak sohbetler için rahat koltuk düzeni." },
    ],
  },
];

export type LayoutId = "yuvarlak" | "ziyafet" | "kokteyl" | "protokol";
export const layouts: { id: LayoutId; t: string; d: string; per: number; factor: number }[] = [
  { id: "yuvarlak", t: "Yuvarlak masa", d: "Klasik düğün ziyafet düzeni; her masada 10 misafir, merkezde ferah dans pisti.", per: 10, factor: 1 },
  { id: "ziyafet", t: "Uzun ziyafet masası", d: "Geleneksel ve samimi; aileleri bir araya getiren uzun şölen sofraları.", per: 24, factor: 1.1 },
  { id: "kokteyl", t: "Kokteyl düzeni", d: "Ayakta ikram, yüksek bistrolar ve serbest dolaşımlı modern davet.", per: 6, factor: 1.4 },
  { id: "protokol", t: "Protokol düzeni", d: "Sahneye dönük sıralı oturma; resmi tören, gala ve lansmanlar için.", per: 1, factor: 1.25 },
];

export type Menu = { id: string; t: string; d: string; img: string; courses: { k: string; items: string[] }[]; tags: string[] };
export const menus: Menu[] = [
  {
    id: "altin",
    t: "Nobel Kraliyet Menüsü",
    d: "Şanlıurfa yöresel lezzetleri ve usta şeflerimizin ziyafet sunumları.",
    img: "/img/menu-somon.jpg",
    courses: [
      { k: "Başlangıç & Mezeler", items: ["Zengin meze tabağı (Çiğ köfte, humus, haydari, ezme)", "Mevsim yeşillikleri ve nar ekşili bostana"] },
      { k: "Ara sıcak", items: ["İçli köfte ve paçanga böreği tabağı"] },
      { k: "Ana yemek", items: ["Kuzu tandır & fırın kuzu incik, iç pilav eşliğinde", "Urfa kebabı ve ızgara domates-biber"] },
      { k: "Tatlı", items: ["Fıstıklı Şanlıurfa baklavası veya katmer", "Görkemli düğün pastası"] },
      { k: "İçecek", items: ["Karaköprü yayık ayranı, meşrubatlar", "Mırra ve geleneksel çay ikramı"] },
    ],
    tags: ["Yöresel Ziyafet", "Kuzu Eti", "Tatlı & Mırra"],
  },
  {
    id: "gumus",
    t: "Gümüş Ziyafet Menüsü",
    d: "Klasik düğün yemeğinin seçkin ve dengeli lezzetleri.",
    img: "/img/masa-servis.jpg",
    courses: [
      { k: "Başlangıç", items: ["Zeytinyağlı meze tabağı", "Çoban salatası"] },
      { k: "Ara sıcak", items: ["Peynirli su böreği"] },
      { k: "Ana yemek", items: ["Fırında kuzu kavurma veya Hünkâr beğendi", "Tereyağlı pirinç pilavı"] },
      { k: "Tatlı", items: ["Fırın sütlaç veya cevizli baklava"] },
      { k: "İçecek", items: ["Meşrubat servisi", "Çay ikramı"] },
    ],
    tags: ["Geleneksel", "Et Yemeği"],
  },
  {
    id: "kokteyl",
    t: "Nobel Botanika Kokteyl",
    d: "Açık hava ve teras davetleri için zengin atıştırmalıklar.",
    img: "/img/kanape.jpg",
    courses: [
      { k: "Soğuk kanapeler", items: ["Mini bruschetta", "Peynir & zeytin tabağı", "Cevizli meze tartoletleri"] },
      { k: "Sıcak ikramlar", items: ["Mini köfte şiş", "Sigara böreği", "Tavuk pane parçaları"] },
      { k: "Tatlı", items: ["Mini yaş pasta ve ekler büfesi"] },
      { k: "İçecek", items: ["Özel meyve kokteylleri ve soğuk içecekler"] },
    ],
    tags: ["Aperatif", "Kokteyl"],
  },
  {
    id: "geleneksel",
    t: "Geleneksel Kına & Söz Menüsü",
    d: "Kına ve söz davetlerine özel lezzetli ikram sofrası.",
    img: "/img/bufe.jpg",
    courses: [
      { k: "İkram tabağı", items: ["Su böreği", "Yaprak sarma", "Kuru pasta çeşitleri"] },
      { k: "Ana ikram", items: ["Kavurmalı pilav veya lahmacun menüsü"] },
      { k: "Tatlı", items: ["Kına kuruyemişi ve baklava"] },
      { k: "İçecek", items: ["Limonata ve çay ikramı"] },
    ],
    tags: ["Kına Özel", "Geleneksel"],
  },
  {
    id: "yesil",
    t: "Vejetaryen Menü",
    d: "Özel beslenme tercihlerine uygun taze bitkisel alternatifler.",
    img: "/img/masa-renkli.jpg",
    courses: [
      { k: "Başlangıç", items: ["Köz patlıcan salatası", "Mevsim yeşillikleri tabağı"] },
      { k: "Ana yemek", items: ["Zeytinyağlı taze fasulye & enginar", "Sebzeli güveç"] },
      { k: "Tatlı", items: ["Meyve tabağı ve sütlü tatlı"] },
    ],
    tags: ["Vejetaryen"],
  },
  {
    id: "cocuk",
    t: "Çocuk Menüsü",
    d: "Küçük misafirlerimizin en sevdiği eğlenceli lezzetler.",
    img: "/img/masa-menu.jpg",
    courses: [
      { k: "Ana yemek", items: ["Izgara köfte & çıtır patates", "Mini burgerler"] },
      { k: "Tatlı", items: ["Dondurmalı pasta"] },
      { k: "İçecek", items: ["Meyve suyu ve süt"] },
    ],
    tags: ["Çocuk Özel"],
  },
];

export type Photo = { src: string; cat: string; alt: string; tall?: boolean };
export const gallery: Photo[] = [
  { src: "/img/dans-sis.jpg", cat: "İlk dans", alt: "Sis ve ışık efektleriyle ilk dans" },
  { src: "/img/saray-avize.jpg", cat: "Salonlar", alt: "Nobel Balo Salonu kristal avize ve sahne", tall: true },
  { src: "/img/masa-mum.jpg", cat: "Masa düzeni", alt: "Ziyafet sofrası ve şık masa düzeni" },
  { src: "/img/bahce-gece.jpg", cat: "Kır Bahçesi", alt: "Nobel Kır Bahçesi gece ışıklandırması" },
  { src: "/img/eglence.jpg", cat: "Eğlence", alt: "Dans pistinde gelin ve damat kutlaması", tall: true },
  { src: "/img/masa-renkli.jpg", cat: "Masa düzeni", alt: "Taze çiçeklerle bezenmiş düğün masası" },
  { src: "/img/dans-mavi.jpg", cat: "İlk dans", alt: "Mavi ışıklar altında masalsı ilk dans" },
  { src: "/img/masa-karanlik.jpg", cat: "Masa düzeni", alt: "Zarif şamdanlar ve akşam aydınlatması", tall: true },
  { src: "/img/kutuphane-davet.jpg", cat: "Salonlar", alt: "VIP karşılama ve kokteyl salonu" },
  { src: "/img/avize-yesil.jpg", cat: "Dekorasyon", alt: "Yeşillikler ve sarkan avizeler" },
  { src: "/img/masa-menu.jpg", cat: "Dekorasyon", alt: "Kişiye özel menü kartı ve masa tasarımı", tall: true },
  { src: "/img/kutlama.jpg", cat: "Eğlence", alt: "Davetlilerin coşkulu kutlama anları" },
  { src: "/img/dans-siyah.jpg", cat: "İlk dans", alt: "Göz alıcı ilk dans karesi" },
  { src: "/img/nisan.jpg", cat: "Dekorasyon", alt: "Özel çiçekli nişan tagı ve dekorasyon", tall: true },
  { src: "/img/dans-mor.jpg", cat: "Eğlence", alt: "Canlı müzik ve coşkulu dans pisti" },
  { src: "/img/ahsap-salon.jpg", cat: "Salonlar", alt: "Ferah tavan mimarili balo salonu", tall: true },
  { src: "/img/masa-uzun.jpg", cat: "Masa düzeni", alt: "Geniş aileler için uzun ziyafet masası" },
  { src: "/img/kina.jpg", cat: "Dekorasyon", alt: "Görkemli kına tahtı ve kırmızı konsept" },
];

export const behind = [
  { t: "İlk randevu & görüşme", d: "Hayal ettiğiniz düğün konseptini, davetli sayınızı dinliyor ve size en uygun seçenekleri planlıyoruz." },
  { t: "Mekân & bahçe turu", d: "Kır bahçemizi ve balo salonlarımızı farklı ışık ve masa senaryolarıyla yerinde birlikte geziyoruz." },
  { t: "Konsept ve dekor seçimi", d: "Çiçekler, masa örtüleri, gelin yolu, sahne kurgusu ve renk paleti zevkinize göre netleşiyor." },
  { t: "Menü tadımı", d: "Usta aşçılarımızın hazırladığı lezzetleri önceden tadıyor, düğün menünüzü kişiselleştiriyorsunuz." },
  { t: "Teknik & sahne provası", d: "Giriş müziği, ilk dans, sis ve ışık gösterileri düğünden önce detaylıca prova ediliyor." },
  { t: "Düğün günü", d: "Özel organizasyon sorumlunuz gün boyu yanınızda; siz ve aileniz yalnızca bu mutlu günün tadını çıkarıyorsunuz." },
  { t: "Ölümsüz anılar", d: "Fotoğraf ve 4K video kayıtlarınız profesyonelce kurgulanarak en kısa sürede teslim ediliyor." },
];

export const faqs = [
  { q: "Mekân turu için randevu almam gerekiyor mu?", a: "Evet. Size ve ailenize özel zaman ayırabilmek, kır bahçesi ve salonlarımızı ışık senaryolarıyla gezdirebilmek için randevu ile ağırlamaktayız." },
  { q: "Otopark ve vale hizmetiniz var mı?", a: "Evet. Nobel Düğün Kompleksi bünyesinde 1.000 araç kapasiteli geniş otoparkımız ve ücretsiz profesyonel vale hizmetimiz bulunmaktadır." },
  { q: "Hava muhalefeti durumunda açık hava kır düğünü nasıl yönetiliyor?", a: "Kompleksimizde hem 2.500 kişilik kır bahçemiz hem de 1.500 kişilik kapalı balo salonumuz bulunmaktadır. Ani hava değişimlerinde hiçbir aksaklık yaşanmadan organizasyon kapalı alana aktarılabilir." },
  { q: "Dışarıdan fotoğrafçı veya orkestra getirebilir miyiz?", a: "Anlaşmalı profesyonel ekiplerimiz bulunduğu gibi, arzu ederseniz kendi tercih ettiğiniz müzik veya çekim ekipleriyle de çalışabilirsiniz." },
  { q: "Fiyat teklifi nasıl belirleniyor?", a: "Seçtiğiniz tarih, tercih edilen alan (Kır Bahçesi / Balo Salonu / Teras), davetli sayısı ve menü içeriğine göre size özel en avantajlı teklif sunulmaktadır." },
];

export const extras = ["Fotoğraf ve 4K Video Prodüksiyon", "Canlı Orkestra & Yöresel Müzik", "Özel Kına Tahtı ve Nedime Ekibi", "Gelin & Damat Hazırlık Villası", "Menü Tadımı", "Sis, Volkan & Işık Şovları"];
export const eventTypes = ["Kır Düğünü", "Balo Salonu Düğünü", "Kına Gecesi", "Nişan / Söz", "Sünnet Şöleni", "Kurumsal Davet & Gala"];

export const checklist = [
  { g: "12 ay önce", items: ["Bütçeyi belirleyin", "Tahmini davetli sayısı çıkarın", "Nobel Düğün Kompleksi turu ve tarih rezervasyonu"] },
  { g: "6 ay önce", items: ["Fotoğraf ve müzik ekibi seçimi", "Gelinlik ve damatlık provaları", "Dijital davetiye tasarımının hazırlanması"] },
  { g: "3 ay önce", items: ["Menü tadımı ve ziyafet seçimi", "Masa süslemesi ve çiçek konsepti", "Davetiyelerin misafirlere gönderilmesi"] },
  { g: "1 ay önce", items: ["Masa oturma planının netleştirilmesi", "Teknik ve giriş provası", "Son organizasyon koordinasyonu"] },
];
