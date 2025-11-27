import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CaseStudiesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const caseStudies = [
    {
      clientKey: "caseStudies.mobile.client",
      industryKey: "caseStudies.mobile.industry",
      titleKey: "caseStudies.mobile.title",
      descriptionKey: "caseStudies.mobile.description",
      results: [
        { metricKey: "caseStudies.mobile.metric1", labelKey: "caseStudies.mobile.label1" },
        { metricKey: "caseStudies.mobile.metric2", labelKey: "caseStudies.mobile.label2" },
        { metricKey: "caseStudies.mobile.metric3", labelKey: "caseStudies.mobile.label3" },
      ],
      tags: ["Self-Service", "Mobile", "UX"],
      link: "/case-study/mobile-operator",
    },
    {
      clientKey: "caseStudies.medical.client",
      industryKey: "caseStudies.medical.industry",
      titleKey: "caseStudies.medical.title",
      descriptionKey: "caseStudies.medical.description",
      results: [
        { metricKey: "caseStudies.medical.metric1", labelKey: "caseStudies.medical.label1" },
        { metricKey: "caseStudies.medical.metric2", labelKey: "caseStudies.medical.label2" },
        { metricKey: "caseStudies.medical.metric3", labelKey: "caseStudies.medical.label3" },
      ],
      tags: ["E-Learning", "Healthcare", "Video"],
      link: "/case-study/medical-elearning",
    },
    {
      clientKey: "caseStudies.website.client",
      industryKey: "caseStudies.website.industry",
      titleKey: "caseStudies.website.title",
      descriptionKey: "caseStudies.website.description",
      results: [
        { metricKey: "caseStudies.website.metric1", labelKey: "caseStudies.website.label1" },
        { metricKey: "caseStudies.website.metric2", labelKey: "caseStudies.website.label2" },
        { metricKey: "caseStudies.website.metric3", labelKey: "caseStudies.website.label3" },
      ],
      tags: ["High-Traffic", "Global", "Scale"],
      link: "/case-study/global-website",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-background via-secondary/50 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.1)_0%,transparent_50%)]"></div>
        
        {/* Multiple glowing orbs */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 glow-border">
              {t('caseStudies.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t('caseStudies.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('caseStudies.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {caseStudies.map((study, index) => (
              <Card 
                key={index}
                className="group relative overflow-hidden border border-[var(--glass-border)] hover:border-primary/50 transition-all duration-500 hover:shadow-[var(--shadow-glow)] hover:-translate-y-2 animate-scale-in bg-[var(--glass-bg)] backdrop-blur-xl"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary" className="text-xs glow-border">
                      {t(study.industryKey)}
                    </Badge>
                    <TrendingUp className="h-5 w-5 text-accent group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_hsl(var(--accent)/0.5)]" />
                  </div>
                  <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors group-hover:glow-text">
                    {t(study.clientKey)}
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-foreground/80">
                    {t(study.titleKey)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t(study.descriptionKey)}
                  </p>

                  {/* Results Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-secondary/50 border border-[var(--glass-border)] backdrop-blur-sm">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="text-center group/stat">
                        <div className="text-xl md:text-2xl font-bold text-primary mb-1 group-hover/stat:glow-text transition-all">
                          {t(result.metricKey)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {t(result.labelKey)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs border-primary/30 text-primary/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    onClick={() => navigate(study.link)}
                  >
                    {t('caseStudies.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in-up">
            <p className="text-muted-foreground mb-6 text-lg">
              {t('caseStudies.callToAction')}
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 px-8 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] glow-border"
              onClick={() => navigate("/#contact")}
            >
              {t('caseStudies.discussProject')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
