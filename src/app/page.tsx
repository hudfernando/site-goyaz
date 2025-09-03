import Header from "@/components/site/Header";
import HeroCarousel from "@/components/site/HeroCarousel";
import MissionSection from "@/components/site/MissionSection";
import SacSection from "@/components/site/SacSection";
import SalesChannelsSection from "@/components/site/SalesChannelsSection";
import DistributorSection from "@/components/site/DistributorSection";
import PartnersSection from "@/components/site/PartnersSection";
import Footer from "@/components/site/Footer";


export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="flex flex-col min-h-screen w-5xl justify-center">
        <HeroCarousel />
        <MissionSection />
        <SacSection />
        <SalesChannelsSection />
        <DistributorSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}