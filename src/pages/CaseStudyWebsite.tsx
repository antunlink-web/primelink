import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

const CaseStudyWebsite = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-24 bg-gradient-to-b from-background via-secondary/50 to-background relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15)_0%,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-8 group hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t('caseStudies.backToAll')}
          </Button>

          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 glow-border">
              {t('caseStudies.website.industry')}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              {t('caseStudies.website.title')}
            </h1>

            {/* Client Section */}
            <div className="mb-12 p-8 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t('caseStudies.website.clientTitle')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('caseStudies.website.clientDescription')}
              </p>
            </div>

            {/* Challenge Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('caseStudies.website.challengeTitle')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('caseStudies.website.challenge')}
              </p>
            </div>

            {/* Solution Section */}
            <div className="mb-12 p-8 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('caseStudies.website.solutionTitle')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('caseStudies.website.solution')}
              </p>
            </div>

            {/* Outcomes Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {t('caseStudies.website.outcomesTitle')}
              </h2>
              <div className="space-y-4">
                {[
                  'caseStudies.website.outcome1',
                  'caseStudies.website.outcome2',
                  'caseStudies.website.outcome3',
                  'caseStudies.website.outcome4',
                ].map((key, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-lg text-muted-foreground">{t(key)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center p-8 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {t('caseStudies.ctaTitle')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('caseStudies.ctaDescription')}
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-glow)]">
                {t('caseStudies.ctaButton')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyWebsite;
