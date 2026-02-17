import { Cloud, Shield, Server, Cpu, Database, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    { icon: Cloud, titleKey: "services.cloud.title", descriptionKey: "services.cloud.description" },
    { icon: Shield, titleKey: "services.security.title", descriptionKey: "services.security.description" },
    { icon: Server, titleKey: "services.infrastructure.title", descriptionKey: "services.infrastructure.description" },
    { icon: Cpu, titleKey: "services.ai.title", descriptionKey: "services.ai.description" },
    { icon: Database, titleKey: "services.data.title", descriptionKey: "services.data.description" },
    { icon: Zap, titleKey: "services.digital.title", descriptionKey: "services.digital.description" },
  ];

  return (
    <section id="services" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1 bg-card"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
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
