import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, BarChart3, Users, Send, Timer, TrendingUp, MessageSquare, Settings, Shield } from "lucide-react";
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

const featureCards = [
  { icon: Users, title: "Contact Management", desc: "Import, tag, segment, and organize contacts with smart filters." },
  { icon: Send, title: "Bulk SMS Campaigns", desc: "Schedule and send personalized campaigns to targeted audiences." },
  { icon: Settings, title: "Automation Workflows", desc: "Trigger automated sequences based on events or schedules." },
  { icon: BarChart3, title: "Campaign Analytics", desc: "Track delivery rates, engagement, and performance in real time." },
  { icon: MessageSquare, title: "Two-Way Messaging", desc: "View and respond to SMS conversations in a unified inbox." },
  { icon: Shield, title: "Team Collaboration", desc: "Role-based access and shared workspace for your team." },
];

const techStack = ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "REST API", "Twilio", "Docker"];

const screenshots = [
  { img: campaignImg, title: "Campaign Builder", desc: "Create and schedule bulk SMS campaigns with audience targeting and personalization." },
  { img: contactsImg, title: "Contacts Management", desc: "Organize your entire contact database with tags, segments, and smart filters." },
  { img: automationImg, title: "Automation Workflows", desc: "Build automated messaging sequences triggered by user events or schedules." },
  { img: analyticsImg, title: "Analytics Dashboard", desc: "Monitor delivery rates, engagement metrics, and campaign performance." },
];

const CaseStudyFlowSMS = () => {
  const navigate = useNavigate();

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
            Back to Portfolio
          </Button>

          <div className="max-w-4xl mx-auto text-center mb-14">
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
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Project Overview</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              All SMS operations in one platform
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FlowSMS was built to help companies manage high-volume SMS communication in one unified platform — from contact management and campaign scheduling to real-time analytics — replacing fragmented tools and manual workflows with a single, intuitive interface designed for speed and scale.
            </p>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION — TWO COLUMNS ── */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Challenge */}
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <Badge className="mb-5 px-3 py-1 bg-destructive/10 text-destructive border-destructive/20">
                The Challenge
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">Fragmented tools &amp; manual processes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Businesses sending SMS campaigns rely on scattered spreadsheets, disconnected tools, and manual workflows. Contact lists live in one place, campaign scheduling in another, and there's no unified view of delivery or engagement — leading to wasted time, missed messages, and zero visibility into performance.
              </p>
            </div>

            {/* Solution */}
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <Badge className="mb-5 px-3 py-1 bg-accent/10 text-accent border-accent/20">
                The Solution
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">One platform for everything SMS</h3>
              <p className="text-muted-foreground leading-relaxed">
                FlowSMS centralizes every aspect of business messaging — contact management, bulk SMS campaigns, automation workflows, campaign tracking, and team collaboration — into a single, powerful platform that replaces complexity with clarity.
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="max-w-5xl mx-auto mt-10 flex flex-wrap items-center gap-2 justify-center">
            <span className="text-sm text-muted-foreground mr-2">Built with:</span>
            {techStack.map((t) => (
              <Badge key={t} variant="secondary" className="px-3 py-1 text-xs bg-secondary text-secondary-foreground border-border">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES — CARD GRID ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Key Features</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Everything you need for SMS at scale</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featureCards.map((f, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
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
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Product Interface</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Built for speed and clarity</h2>
            </div>

            <div className="space-y-16">
              {screenshots.map((s, i) => (
                <div key={i}>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-shadow duration-300">
                    <img src={s.img} alt={s.title} className="w-full block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS — METRICS ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Results</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Measurable impact</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/30 hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <m.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">{m.value}</div>
                  <div className="text-sm text-muted-foreground">{m.label}</div>
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
              Need a platform like this?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              We design and build custom SaaS platforms, automation tools, and enterprise software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-base"
                onClick={() => navigate("/#contact")}
              >
                Start a Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-secondary px-8 h-12 text-base"
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
