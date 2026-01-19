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
            <h2 className="font-display font-bold text-2xl uppercase mb-4">1. Introduction</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              YonkoX ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">2. Data We Collect</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 opacity-70 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers (for waitlists and newsletters).</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, and other technology on the devices you use to access this website.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">3. How We Use Your Data</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 opacity-70 space-y-2">
              <li>To register you as a new member or event participant.</li>
              <li>To manage our relationship with you (including notifying you about changes to our terms or privacy policy).</li>
              <li>To enable you to partake in a prize draw, competition or complete a survey.</li>
              <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">4. Cookies</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display font-bold text-2xl uppercase mb-4">5. Contact Us</h2>
            <p className="opacity-70 leading-relaxed mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us via the form in the footer.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
