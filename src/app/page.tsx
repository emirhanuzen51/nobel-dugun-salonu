import { Footer, Header, Intro } from "@/components/ui";
import { Concepts, Hero, Prestige, Statement, Venues } from "@/components/home";
import { Checklist, Decor, Planner, Seating } from "@/components/interactive";
import { InviteTeaser } from "@/components/invite-pages";
import { Behind, Faq, FinalCta, Gallery, Menus } from "@/components/showcase";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Prestige />
        <Statement />
        <Concepts />
        <Venues />
        <Seating />
        <Decor />
        <Menus />
        <Gallery />
        <Behind />
        <Planner />
        <InviteTeaser />
        <Checklist />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
