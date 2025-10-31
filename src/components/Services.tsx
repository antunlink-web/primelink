import { Cloud, Shield, Server, Cpu, Database, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud infrastructure and migration services to modernize your operations.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your data and infrastructure.",
  },
  {
    icon: Server,
    title: "IT Infrastructure",
    description: "Enterprise-grade hardware and network solutions for optimal performance.",
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    description: "Intelligent automation and AI-powered solutions to streamline workflows.",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Advanced data analytics, storage, and management solutions.",
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "End-to-end digital transformation to modernize your business.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.05)_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-[var(--shadow-xl)] hover:-translate-y-2 animate-scale-in bg-gradient-to-br from-card to-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
