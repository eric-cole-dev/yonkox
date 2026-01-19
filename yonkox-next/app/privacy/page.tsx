import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <div className="container mx-auto px-6 py-32 max-w-4xl">
        <h1 className="font-display font-bold text-5xl uppercase mb-12 text-primary">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none font-body">
          <p className="text-lg opacity-80 mb-8">
            Last Updated: January 2026
          </p>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">1. Introduction & PDPA Compliance</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              YonkoX ("we," "our," or "us") respects your privacy and is committed to protecting your personal data in accordance with the <strong>Personal Data Protection Act 2010 (PDPA)</strong> of Malaysia. This privacy policy informs you how we collect, process, and look after your personal data when you visit our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">2. Data We Collect</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              We collect the following personal data only when voluntarily provided by you via our forms (e.g., "Join Us" newsletter or waitlist):
            </p>
            <ul className="list-disc pl-6 opacity-70 space-y-2">
              <li><strong>Contact Data:</strong> Email address.</li>
              <li><strong>Usage Data:</strong> Theme preference (Light/Dark mode) stored locally on your device.</li>
            </ul>
            <p className="opacity-70 leading-relaxed mt-4">
              We do not automatically collect sensitive personal data or track your browsing history via third-party analytics cookies at this time.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">3. Purpose of Processing (Notice & Choice)</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              In strict adherence to the PDPA, we process your data for the following specific purposes:
            </p>
            <ul className="list-disc pl-6 opacity-70 space-y-2">
              <li>To register you for our newsletter or event waitlists (based on your request).</li>
              <li>To notify you about upcoming workshops, clinics, and merchandise drops.</li>
              <li>To maintain your preferred website appearance (Light/Dark mode).</li>
            </ul>
            <p className="opacity-70 leading-relaxed mt-4">
              By submitting your email address, you explicitly consent to the processing of your data for these purposes. You may withdraw your consent at any time by contacting us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">4. Cookies & Local Storage</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              <strong>We do not use third-party tracking or advertising cookies.</strong>
            </p>
            <p className="opacity-70 leading-relaxed mb-4">
              We utilize <strong>Local Storage</strong> solely for the following strictly necessary and functional purposes:
            </p>
            <ul className="list-disc pl-6 opacity-70 space-y-2">
              <li><strong>Strictly Necessary Storage:</strong> Required to remember your consent to this privacy policy so you are not asked again.</li>
              <li><strong>Functionality Storage:</strong> Used to remember your site preferences, specifically your choice between Light and Dark mode, to provide a consistent visual experience.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">5. Data Security & Retention</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              We implement appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We retain your data only as long as necessary to fulfill the purposes we collected it for.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">6. Your Rights</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              Under the PDPA, you have the right to access, correct, or withdraw consent for your personal data. To exercise these rights, please contact us via the inquiries form.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
