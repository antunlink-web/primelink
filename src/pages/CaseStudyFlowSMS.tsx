import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, BarChart3, Users, Send, Timer, TrendingUp, MessageSquare, Smartphone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import dashboardImg from "@/assets/flowsms/dashboard.png";
import campaignImg from "@/assets/flowsms/campaign.png";
import contactsImg from "@/assets/flowsms/contacts.png";
import automationImg from "@/assets/flowsms/automation.png";
import analyticsImg from "@/assets/flowsms/analytics.png";

const techStack = ["React", "TypeScript", "Node.js", "PostgreSQL", "Android SDK", "REST API", "WebSocket", "Docker"];

const CaseStudyFlowSMS = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const metrics = [
    { icon: Timer, valueKey: "caseStudies.flowsms.result1Value", labelKey: "caseStudies.flowsms.result1Label" },
    { icon: Users, valueKey: "caseStudies.flowsms.result2Value", labelKey: "caseStudies.flowsms.result2Label" },
    { icon: TrendingUp, valueKey: "caseStudies.flowsms.result3Value", labelKey: "caseStudies.flowsms.result3Label" },
    { icon: Zap, valueKey: "caseStudies.flowsms.result4Value", labelKey: "caseStudies.flowsms.result4Label" },
  ];

  const featureCards = [
    { icon: Smartphone, titleKey: "caseStudies.flowsms.feature1Title", descKey: "caseStudies.flowsms.feature1Desc" },
    { icon: Send, titleKey: "caseStudies.flowsms.feature2Title", descKey: "caseStudies.flowsms.feature2Desc" },
    { icon: Users, titleKey: "caseStudies.flowsms.feature3Title", descKey: "caseStudies.flowsms.feature3Desc" },
    { icon: BarChart3, titleKey: "caseStudies.flowsms.feature4Title", descKey: "caseStudies.flowsms.feature4Desc" },
    { icon: MessageSquare, titleKey: "caseStudies.flowsms.feature5Title", descKey: "caseStudies.flowsms.feature5Desc" },
    { icon: Shield, titleKey: "caseStudies.flowsms.feature6Title", descKey: "caseStudies.flowsms.feature6Desc" },
  ];

  const screenshots = [
    { img: campaignImg, titleKey: "caseStudies.flowsms.screenshot1Title", descKey: "caseStudies.flowsms.screenshot1Desc" },
    { img: contactsImg, titleKey: "caseStudies.flowsms.screenshot2Title", descKey: "caseStudies.flowsms.screenshot2Desc" },
    { img: automationImg, titleKey: "caseStudies.flowsms.screenshot3Title", descKey: "caseStudies.flowsms.screenshot3Desc" },
    { img: analyticsImg, titleKey: "caseStudies.flowsms.screenshot4Title", descKey: "caseStudies.flowsms.screenshot4Desc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── HERO ── */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/portfolio")}
            className="mb-8 group hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {t('caseStudies.flowsms.backToPortfolio')}
          </Button>

          <div className="max-w-4xl mx-auto text-center mb-14">
            <Badge className="mb-6 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              {t('caseStudies.flowsms.badgeLabel')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('caseStudies.flowsms.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('caseStudies.flowsms.heroDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* ── LARGE DASHBOARD SCREENSHOT ── */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-xl)]">
            <img src={dashboardImg} alt="FlowSMS Dashboard" className="w-full block" />
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{t('caseStudies.flowsms.overviewLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t('caseStudies.flowsms.overviewTitle')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('caseStudies.flowsms.overviewDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ── */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <Badge className="mb-5 px-3 py-1 bg-destructive/10 text-destructive border-destructive/20">
                {t('caseStudies.flowsms.challengeLabel')}
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('caseStudies.flowsms.challengeTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('caseStudies.flowsms.challengeDesc')}</p>
            </div>
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <Badge className="mb-5 px-3 py-1 bg-accent/10 text-accent border-accent/20">
                {t('caseStudies.flowsms.solutionLabel')}
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t('caseStudies.flowsms.solutionTitle')}</h3>
              <p className="text-muted-foreground leading-relaxed">{t('caseStudies.flowsms.solutionDesc')}</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto mt-10 flex flex-wrap items-center gap-2 justify-center">
            <span className="text-sm text-muted-foreground mr-2">{t('caseStudies.flowsms.builtWith')}</span>
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="px-3 py-1 text-xs bg-secondary text-secondary-foreground border-border">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{t('caseStudies.flowsms.featuresLabel')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('caseStudies.flowsms.featuresTitle')}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featureCards.map((f, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t(f.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SCREENSHOTS ── */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{t('caseStudies.flowsms.screenshotsLabel')}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t('caseStudies.flowsms.screenshotsTitle')}</h2>
            </div>
            <div className="space-y-16">
              {screenshots.map((s, i) => (
                <div key={i}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{t(s.titleKey)}</h3>
                    <p className="text-muted-foreground text-sm">{t(s.descKey)}</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
                    <img src={s.img} alt={t(s.titleKey)} className="w-full block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{t('caseStudies.flowsms.resultsLabel')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">{t('caseStudies.flowsms.resultsTitle')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {metrics.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <m.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{t(m.valueKey)}</div>
                  <div className="text-sm text-muted-foreground">{t(m.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t('caseStudies.flowsms.ctaTitle')}
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('caseStudies.flowsms.ctaDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base" onClick={() => navigate("/#contact")}>
                {t('caseStudies.flowsms.ctaStart')}
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary px-8 h-12 text-base" onClick={() => navigate("/#contact")}>
                {t('caseStudies.flowsms.ctaConsult')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyFlowSMS;