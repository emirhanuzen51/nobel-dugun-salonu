import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui";
import { siteUrl } from "@/lib/site";
import { brand } from "@/lib/data";

const serif = Cormorant_Garamond({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });

const description = "Şanlıurfa Karaköprü'de 2.500 kişilik açık hava kır bahçesi, görkemli balo salonu ve VIP terasıyla masalsı düğün, nişan ve davet organizasyonları.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brand.name} ${brand.tagline} | Şanlıurfa Karaköprü`,
  description,
  keywords: [
    "Nobel Düğün Kompleksi",
    "Nobel Kır Bahçesi",
    "Şanlıurfa düğün salonları",
    "Karaköprü kır düğünü",
    "Şanlıurfa kır düğünü",
    "balo salonu Şanlıurfa",
    "Nobel davet",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: `${brand.name} ${brand.tagline}`,
    title: `${brand.name} ${brand.tagline} | Hayalinizdeki Gece`,
    description,
    images: [{ url: "/img/bahce-gece.jpg", width: 1800, height: 1200, alt: "Nobel Kır Bahçesi" }],
  },
  twitter: { card: "summary_large_image", title: `${brand.name} ${brand.tagline}`, description, images: ["/img/bahce-gece.jpg"] },
};
export const viewport: Viewport = { themeColor: "#171511" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: "Nobel Düğün Kompleksi & Kır Bahçesi",
    description,
    telephone: brand.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Maşuk Mah. Diyarbakır Bulvarı No:16/B",
      addressLocality: "Karaköprü",
      addressRegion: "Şanlıurfa",
      addressCountry: "TR",
    },
    maximumAttendeeCapacity: 2500,
  };

  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
