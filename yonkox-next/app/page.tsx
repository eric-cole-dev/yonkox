import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import TheLabSection from "@/components/TheLabSection";
import CommunitySection from "@/components/CommunitySection";
import JourneySection from "@/components/JourneySection";
import MerchSection from "@/components/MerchSection";
import Footer from "@/components/Footer";
import { FixedGradientBackground } from "@/components/ui/hero-section-gradient";

export default function Home() {
  return (
    <>
      <FixedGradientBackground
        distortion={1.2}
        swirl={0.9}
        speed={0.5}
        veilOpacity="bg-white/20 dark:bg-black/25"
      />
      <main className="min-h-screen relative z-10">
        <div className="grain-overlay"></div>
        <Hero />
        <EventsSection />
        <TheLabSection />
        <CommunitySection />
        <JourneySection />
        <MerchSection />
        <Footer />
      </main>
    </>
  );
}