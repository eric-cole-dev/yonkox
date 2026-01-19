import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center pt-24">
        <div className="container mx-auto px-6 text-center">
            <h1 className="font-display font-bold text-5xl uppercase text-[var(--foreground)] mb-6">
                Join the Collective
            </h1>
            <p className="font-body text-[var(--foreground)] opacity-60 max-w-lg mx-auto mb-10">
                The Lab is currently at capacity for the current season. Sign up below to be notified when new slots open for the upcoming International Summit.
            </p>
            <form className="max-w-md mx-auto flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="EMAIL@ADDRESS.COM"
                    className="bg-[var(--surface)] border border-[var(--neutral-900)]/10 text-[var(--foreground)] px-6 py-4 font-body text-sm placeholder-black/30 focus:border-primary focus:ring-0 w-full"
                />
                <button className="bg-primary text-white font-display font-bold text-xs uppercase px-10 py-4 hover:bg-[var(--foreground)] transition-colors tracking-widest shadow-md">
                    Join Waitlist
                </button>
            </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
