import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const benefits = [
    "Industry-leading expertise with certified professionals",
    "Custom solutions tailored to your business needs",
    "Proven track record with Fortune 500 companies",
    "24/7 dedicated support and monitoring",
    "Cutting-edge technology and innovation",
    "Scalable solutions that grow with your business",
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-secondary/50 via-background to-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.15)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We deliver enterprise-grade IT solutions that drive innovation and business growth. 
              Our team of experts is committed to your success with cutting-edge technology and 
              unparalleled support.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all hover:scale-105"
            >
              Learn More About Us
            </Button>
          </div>

          <div className="relative animate-scale-in group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-primary to-accent p-1 shadow-[var(--shadow-xl)]">
              <div className="w-full h-full rounded-3xl bg-background flex items-center justify-center group-hover:scale-[0.98] transition-transform duration-300">
                <div className="text-center p-8">
                  <div className="text-7xl font-bold bg-gradient-to-br from-primary via-primary to-accent bg-clip-text text-transparent mb-6 group-hover:scale-110 transition-transform">
                    15+
                  </div>
                  <div className="text-2xl font-semibold text-foreground mb-3">
                    Years of Excellence
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Delivering innovative IT solutions globally
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
