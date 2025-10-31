import { Linkedin, Twitter, Facebook, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card text-foreground py-12 border-t border-[var(--glass-border)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-[var(--shadow-glow)]">
                <span className="text-white font-bold text-xl">PL</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">PrimeLink</span>
            </div>
            <p className="text-muted-foreground">
              Leading IT solutions provider for modern enterprises.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Cloud Solutions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cybersecurity</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">IT Infrastructure</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI & Automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-[var(--glass-border)] flex items-center justify-center transition-all hover:scale-110 hover:shadow-[var(--shadow-glow)]">
                <Linkedin className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-[var(--glass-border)] flex items-center justify-center transition-all hover:scale-110 hover:shadow-[var(--shadow-glow)]">
                <Twitter className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-[var(--glass-border)] flex items-center justify-center transition-all hover:scale-110 hover:shadow-[var(--shadow-glow)]">
                <Facebook className="h-5 w-5 text-primary" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 border border-[var(--glass-border)] flex items-center justify-center transition-all hover:scale-110 hover:shadow-[var(--shadow-glow)]">
                <Github className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--glass-border)] pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 PrimeLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
