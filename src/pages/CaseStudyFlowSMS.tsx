import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, BarChart3, Users, Send, Timer, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import dashboardImg from "@/assets/flowsms/dashboard.png";
import campaignImg from "@/assets/flowsms/campaign.png";
import contactsImg from "@/assets/flowsms/contacts.png";
import automationImg from "@/assets/flowsms/automation.png";
import analyticsImg from "@/assets/flowsms/analytics.png";

const metrics = [
  { icon: Timer, value: "3×", label: "Faster Campaign Execution" },
  { icon: Users, value: "100%", label: "Centralized Communication" },
  { icon: TrendingUp, value: "Scalable", label: "Messaging Infrastructure" },
  { icon: Zap, value: "60%+", label: "Operational Efficiency Gain" },
];

const features = [
  "Contact management with tags, segments, and import/export",
  "Bulk SMS campaigns with scheduling and personalization",
  "Automation workflows triggered by events or schedules",
  "Real-time campaign tracking and delivery analytics",
  "Team collaboration with role-based access",
  "Conversation view for two-way SMS communication",
];

const techStack = [
  "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "REST API", "Twilio", "Docker",
];

const screenshots = [
  { img: dashboardImg, title: "Dashboard Overview", desc: "Real-time overview of campaigns, contacts, and messaging activity." },
  { img: campaignImg, title: "Campaign Builder", desc: "Create and schedule bulk SMS campaigns with audience targeting." },
  { img: contactsImg, title: "Contacts Management", desc: "Organize contacts with tags, segments, and smart filters." },
  { img: automationImg, title: "Automation Workflows", desc: "Build automated messaging sequences triggered by events." },
  { img: analyticsImg, title: "Analytics Dashboard", desc: "Track delivery rates, engagement, and campaign performance." },
];

const CaseStudyFlowSMS = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)]" />
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate("/portfolio")}
            className="mb-8 group hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Button>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-6 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
              SaaS Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              FlowSMS — SMS CRM platform for automated business communication
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              A scalable messaging platform that allows businesses to manage contacts, run bulk SMS campaigns, and automate communication workflows.
            </p>
          </div>

          {/* Hero screenshot */}
          <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-xl)]">
            <img src={dashboardImg} alt="FlowSMS Dashboard" className="w-full" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Project Overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FlowSMS was built to help companies manage high-volume SMS communication in one unified platform. Instead of juggling spreadsheets, multiple tools, and manual workflows, businesses can now centralize their entire messaging operation — from contact management to campaign analytics — in a single, intuitive interface designed for speed and scale.
            </p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 px-3 py-1 bg-destructive/10 text-destructive border-destructive/20">
              The Challenge
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Fragmented tools, manual processes</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Businesses sending SMS campaigns often rely on fragmented tools, spreadsheets, or manual workflows. Contact lists live in one place, campaign scheduling in another, and there's no unified view of delivery or engagement metrics. This leads to wasted time, missed messages, and zero visibility into what's working. Teams need a platform that brings everything together — without the complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 px-3 py-1 bg-accent/10 text-accent border-accent/20">
              The Solution
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">One platform for all SMS operations</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              FlowSMS centralizes every aspect of business SMS communication into a single, powerful platform:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <Badge key={t} variant="secondary" className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground border-border">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Screenshots */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-3 py-1 bg-primary/10 text-primary border-primary/20">
                Product Interface
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Built for speed and clarity</h2>
            </div>

            <div className="space-y-20">
              {screenshots.map((s, i) => (
                <div key={i} className="space-y-4">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground">{s.desc}</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
                    <img src={s.img} alt={s.title} className="w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results / Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 px-3 py-1 bg-accent/10 text-accent border-accent/20">
              Results
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Measurable impact</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border text-center hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
                  <m.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-1">{m.value}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Need a platform like this?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              We design and build custom SaaS platforms, automation tools, and enterprise software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                onClick={() => navigate("/#contact")}
              >
                Start a Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary px-8"
                onClick={() => navigate("/#contact")}
              >
                Book Consultation
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
