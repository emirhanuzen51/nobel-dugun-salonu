import type { Metadata } from "next";
import { brand } from "@/lib/data";
import { Footer, Header } from "@/components/ui";

export const metadata: Metadata = { title: "KVKK Aydınlatma Metni | NOBEL Düğün Kompleksi & Kır Bahçesi" };

// Taslak metindir; yayından önce hukuk kontrolünden geçirilmelidir.
export default function Page() {
  return (
    <>
      <Header solid />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-40">
        <h1 className="font-serif text-6xl font-light">KVKK Aydınlatma Metni</h1>
        <div className="mt-10 grid gap-5 leading-relaxed text-mocha">
          <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, veri sorumlusu sıfatıyla NOBEL Düğün Kompleksi & Kır Bahçesi tarafından kişisel verileriniz aşağıdaki çerçevede işlenir.</p>
          <p><b className="font-semibold text-midnight">İşlenen veriler:</b> Telefon, WhatsApp veya e-posta ile ilettiğiniz ad-soyad, iletişim bilgileri ve organizasyon tercihleri.</p>
          <p><b className="font-semibold text-midnight">Site içi araçlar:</b> Davet planlayıcısı, dijital davetiye ve kontrol listesi sunucuya veri göndermez. Kontrol listesi işaretleri yalnızca kendi tarayıcınızda saklanır.</p>
          <p><b className="font-semibold text-midnight">Amaç:</b> Teklif hazırlanması, salon turu ve randevu planlaması.</p>
          <p><b className="font-semibold text-midnight">Haklarınız:</b> KVKK m.11 kapsamındaki taleplerinizi {brand.email} adresine iletebilirsiniz.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
