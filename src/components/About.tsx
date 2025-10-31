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
    <section id="about" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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

            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Learn More About Us
            </Button>
          </div>

          <div className="relative animate-scale-in">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-4">
                    15+
                  </div>
                  <div className="text-xl font-semibold text-foreground mb-2">
                    Years of Excellence
                  </div>
                  <p className="text-muted-foreground">
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
