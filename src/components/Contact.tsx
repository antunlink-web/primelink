import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-muted-foreground">
            Let's discuss how we can help you achieve your IT goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-[var(--shadow-card)] transition-shadow animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
            <p className="text-muted-foreground">contact@techsolutions.com</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-[var(--shadow-card)] transition-shadow animate-scale-in" style={{ animationDelay: "100ms" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-[var(--shadow-card)] transition-shadow animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Visit Us</h3>
            <p className="text-muted-foreground">123 Tech Street, San Francisco</p>
          </div>
        </div>

        <div className="text-center animate-fade-in-up">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
