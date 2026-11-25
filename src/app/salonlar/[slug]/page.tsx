import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { venues } from "@/lib/data";
import { Footer, Header } from "@/components/ui";
import { Panorama, VenueCta, VenueDetail, VenueGallery, VenueHero } from "@/components/venue";

export function generateStaticParams() {
  return venues.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const v = venues.find((x) => x.slug === slug);
  return v ? { title: `${v.name} · ${v.kind} | NOBEL Düğün Kompleksi`, description: v.short } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = venues.find((x) => x.slug === slug);
  if (!v) notFound();
  return (
    <>
      <Header />
      <main>
        <VenueHero v={v} />
        <VenueDetail v={v} />
        <Panorama v={v} />
        <VenueGallery v={v} />
        <VenueCta v={v} />
      </main>
      <Footer />
    </>
  );
}
