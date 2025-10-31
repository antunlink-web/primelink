import { Cloud, Shield, Server, Cpu, Database, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: Cloud,
      titleKey: "services.cloud.title",
      descriptionKey: "services.cloud.description",
    },
    {
      icon: Shield,
      titleKey: "services.security.title",
      descriptionKey: "services.security.description",
    },
    {
      icon: Server,
      titleKey: "services.infrastructure.title",
      descriptionKey: "services.infrastructure.description",
    },
    {
      icon: Cpu,
      titleKey: "services.ai.title",
      descriptionKey: "services.ai.description",
    },
    {
      icon: Database,
      titleKey: "services.data.title",
      descriptionKey: "services.data.description",
    },
    {
      icon: Zap,
      titleKey: "services.digital.title",
      descriptionKey: "services.digital.description",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background via-secondary/50 to-background relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10"></div>
      </div>
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,hsl(var(--primary)/0.15)_0%,transparent_50%)]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border border-[var(--glass-border)] hover:border-primary/50 transition-all duration-500 hover:shadow-[var(--shadow-glow)] hover:-translate-y-2 animate-scale-in bg-[var(--glass-bg)] backdrop-blur-xl"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[var(--shadow-glow)] group-hover:shadow-[var(--shadow-glow-strong)] animate-pulse-glow">
                  <service.icon className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
                <CardTitle className="text-2xl mb-3 text-foreground group-hover:text-primary transition-colors group-hover:glow-text">
                  {t(service.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-base leading-relaxed">
                  {t(service.descriptionKey)}
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
