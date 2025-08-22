import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto px-8 py-24">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Marc-Antoine Ferland
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl">
              Frontend engineer building delightful web experiences with modern technologies
            </p>
          </div>

          {/* Description */}
          <div className="space-y-6 max-w-2xl">
            <p className="text-lg leading-relaxed">
              I'm a Senior Frontend Engineer at Carta. After 10 years in this field, I've realized what 
              I love most: being a multiplier. Building systems and tooling that make my team incredibly 
              productive and help us ship what the design team envisioned—without the usual compromises.
            </p>
            
            <p className="text-lg leading-relaxed">
              I originally wanted to build video games, then discovered I actually didn't enjoy that. 
              After some time in backend work, I found my home in frontend. There's something perfect 
              about the intersection of great UX and great DX.
            </p>

            <p className="text-lg leading-relaxed">
              When I'm not coding, I cook everything from scratch—it's where craft meets craft, but this 
              time I'm creating something physical. I also run long distances, which keeps me sane. 
              These days I'm figuring out how to extend my influence and stay relevant as AI reshapes our work.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 pt-8">
            <a
              href="https://github.com/maferland"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/marcantoineferland"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
            <a
              href="mailto:hello@maferland.com"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors"
            >
              <Mail size={20} />
              Email
            </a>
          </div>

          {/* Legacy link */}
          <div className="pt-12 border-t border-foreground/10">
            <p className="text-sm text-foreground/50">
              Looking for my previous writing?{" "}
              <a 
                href="https://v2.maferland.com/blog" 
                className="underline hover:text-foreground/70 transition-colors"
              >
                Browse the archive →
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
