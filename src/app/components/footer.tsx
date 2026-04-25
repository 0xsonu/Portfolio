import { Terminal, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono">sonu.dev</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>using Vite, React & Tailwind CSS</span>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sonu Kumar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
