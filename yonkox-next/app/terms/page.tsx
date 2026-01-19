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
            <h3 className="font-display font-bold text-xl uppercase mb-2 text-primary">CRITICAL: RELEASE AND WAIVER OF LIABILITY</h3>
            <p className="opacity-80 text-sm">
              PLEASE READ THIS SECTION CAREFULLY. BY PARTICIPATING, YOU ARE GIVING UP LEGAL RIGHTS.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">1. Definitions</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              <strong>"Activity"</strong> refers to all workshops, clinics, training sessions, and events organized by YonkoX, involving cheerleading, gymnastics, stunting, and tumbling.<br/>
              <strong>"Releasee"</strong> refers to YonkoX, its directors, officers, employees, volunteers, agents, and facility owners.<br/>
              <strong>"Releasor"</strong> refers to the participant (or their legal guardian if under 18).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">2. Assumption of Risk</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              The Releasor explicitly acknowledges that the Activity involves inherent risks, including but not limited to: inversion, rotation, heights, contact with other participants, and landing on varying surfaces. 
            </p>
            <p className="opacity-70 leading-relaxed mb-4">
              The Releasor understands that these risks can result in serious physical injury, including permanent paralysis, brain injury, or death. The Releasor voluntarily assumes all such risks, both known and unknown, even if arising from the negligence of the Releasee.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">3. Release of Liability</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              In consideration of being allowed to participate, the Releasor hereby forever releases, waives, discharges, and covenants not to sue the Releasee from any and all liability for any loss, damage, or injury (including death) that may be sustained by the Releasor, whether caused by the negligence of the Releasee or otherwise, to the fullest extent permitted by the <strong>Civil Law Act 1956</strong> and <strong>Contracts Act 1950</strong> of Malaysia.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">4. Indemnification</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              The Releasor agrees to indemnify and hold harmless the Releasee from any loss, liability, damage, or costs, including court costs and legal fees, that the Releasee may incur due to the Releasor's participation in the Activity, whether caused by negligence or otherwise.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">5. Medical Authorization</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              In the event of an injury or medical emergency, the Releasor grants permission to the Releasee to secure whatever medical treatment is deemed necessary, including calling an ambulance. The Releasor agrees to be solely responsible for all costs associated with such medical care.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">6. Code of Conduct</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              YonkoX maintains a strict policy of respect and safety. We reserve the right to remove any participant who exhibits unsafe behavior, harassment, or fails to follow instruction from our coaches, without refund.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">7. Severability & Governing Law</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              If any provision of this agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. These Terms shall be governed by and construed in accordance with the laws of <strong>Malaysia</strong>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
