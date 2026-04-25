import { Navigation } from './components/navigation';
import { Hero } from './components/hero';
import { About } from './components/about';
import { Skills } from './components/skills';
import { Projects } from './components/projects';
import { Blog } from './components/blog';
import { Experience } from './components/experience';
import { Contact } from './components/contact';
import { Footer } from './components/footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Blog />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}