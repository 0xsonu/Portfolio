import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 pt-16 text-center">
        <h1 className="font-mono text-8xl font-bold text-accent-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
          404
        </h1>

        <p className="mt-4 font-mono text-xl text-text-primary">
          Page not found
        </p>

        <p className="mt-2 max-w-md text-text-secondary">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-block rounded border border-accent-cyan/30 bg-accent-cyan/10 px-6 py-2 font-mono text-sm text-accent-cyan transition-all duration-300 hover:bg-accent-cyan/20 hover:shadow-glow-cyan"
        >
          ← Back to Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
