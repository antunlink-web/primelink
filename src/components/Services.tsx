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
    <section id="services" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive IT solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1 animate-scale-in border-border"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
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
