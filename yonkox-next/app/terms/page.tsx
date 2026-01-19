import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <h1 className="font-display font-bold text-5xl uppercase mb-12 text-primary">Terms & Conditions</h1>
        
        <div className="prose dark:prose-invert max-w-none font-body">
          <p className="text-lg opacity-80 mb-8">
            Last Updated: January 2026
          </p>

          <div className="bg-primary/10 border-l-4 border-primary p-6 mb-12">
            <h3 className="font-display font-bold text-xl uppercase mb-2 text-primary">Critical Liability Warning</h3>
            <p className="opacity-80 text-sm">
              Participation in YonkoX workshops and events involves high-impact physical activity. By participating, you acknowledge and accept the inherent risks of injury.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">1. Agreement to Terms</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              By accessing our website and participating in our workshops, events, or purchasing our merchandise, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">2. Assumption of Risk & Liability Waiver</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              You explicitly acknowledge that cheerleading and stunting are physical activities that involve rotation, inversion, and height, which carry an inherent risk of injury, including but not limited to catastrophic injury, paralysis, or death.
            </p>
            <p className="opacity-70 leading-relaxed mb-4">
              By registering for any YonkoX event, you hereby release, waive, discharge, and covenant not to sue YonkoX, its directors, officers, agents, employees, and volunteers from any and all liability, claims, demands, actions, and causes of action whatsoever arising out of or related to any loss, damage, or injury, including death, that may be sustained by you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">3. Medical Fitness</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              You represent and warrant that you are physically fit and have no medical condition that would prevent your full participation in our workshops. It is your responsibility to consult with a physician prior to participating.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">4. Code of Conduct</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              YonkoX maintains a strict policy of respect and safety. We reserve the right to remove any participant who exhibits unsafe behavior, harassment, or fails to follow instruction from our coaches, without refund.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">5. Intellectual Property</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary rights.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
