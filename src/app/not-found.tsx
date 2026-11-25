import Link from "next/link";
import { Monogram } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-midnight px-5 text-center text-ivory">
      <div>
        <Monogram className="mx-auto h-20 w-20" />
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne">404</p>
        <h1 className="mt-4 font-serif text-5xl font-light sm:text-6xl">Aradığınız sayfa bulunamadı.</h1>
        <p className="mx-auto mt-5 max-w-md text-ivory/60">Bağlantı değişmiş ya da sayfa kaldırılmış olabilir.</p>
        <Link href="/" className="mt-10 inline-flex rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-midnight transition hover:bg-champagne-2">
          Ana sayfaya dönün
        </Link>
      </div>
    </main>
  );
}
