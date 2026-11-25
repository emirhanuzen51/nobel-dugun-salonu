import type { Metadata } from "next";
import { Footer, Header } from "@/components/ui";
import { StudioHero } from "@/components/invite-pages";
import { GuestTool, Studio, StudioFeatures } from "@/components/studio";

export const metadata: Metadata = {
  title: "Dijital Davetiye Stüdyosu | NOBEL Düğün Kompleksi",
  description: "Fotoğraflarınız, hikâyeniz ve müziğinizle animasyonlu dijital düğün davetiyesi hazırlayın.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <StudioHero />
        <Studio />
        <GuestTool />
        <StudioFeatures />
      </main>
      <Footer />
    </>
  );
}
