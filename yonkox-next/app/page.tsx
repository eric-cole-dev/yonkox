import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import TheLabSection from "@/components/TheLabSection";
import CommunitySection from "@/components/CommunitySection";
import JourneySection from "@/components/JourneySection";
import MerchSection from "@/components/MerchSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="grain-overlay"></div>
      <Navbar />
      <Hero />
      <EventsSection />
      <TheLabSection />
      <CommunitySection />
      <JourneySection />
      <MerchSection />
      <Footer />
    </main>
  );
}