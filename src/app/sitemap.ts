import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { venues } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/davetiye`, lastModified: now, priority: 0.8 },
    ...venues.map((v) => ({ url: `${siteUrl}/salonlar/${v.slug}`, lastModified: now, priority: 0.8 })),
    { url: `${siteUrl}/kvkk`, lastModified: now, priority: 0.2 },
  ];
}
