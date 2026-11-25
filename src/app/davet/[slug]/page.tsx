import type { Metadata } from "next";
import { InvitePage } from "@/components/invite-pages";
import { demoInvite } from "@/lib/invite";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: demoInvite.slug }, { slug: "onizleme" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return slug === "onizleme"
    ? { title: "Davetiye önizlemesi | NOBEL", robots: { index: false } }
    : { title: `${demoInvite.bride} & ${demoInvite.groom} · Düğün davetiyesi`, description: demoInvite.message, robots: { index: false } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <InvitePage slug={slug} />;
}
