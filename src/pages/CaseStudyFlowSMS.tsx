import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, BarChart3, Users, Send, Timer, TrendingUp, MessageSquare, Smartphone, Shield } from "lucide-react";
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
  { icon: Users, value: "98.2%", label: "SMS Delivery Rate" },
  { icon: TrendingUp, value: "Scalable", label: "Add Devices to Scale" },
  { icon: Zap, value: "0€", label: "Per-Message Fees" },
];

const featureCards = [
  { icon: Smartphone, title: "Android Device Gateway", desc: "Connect real Android phones with SIM or eSIM — no third-party gateways or per-SMS fees." },
  { icon: Send, title: "Bulk SMS Campaigns", desc: "Upload CSV or use the API to send thousands of messages distributed across devices." },
  { icon: Users, title: "Contact Management", desc: "Import, tag, segment, and organize contacts with smart filters and lists." },
  { icon: BarChart3, title: "Real-Time Analytics", desc: "Track delivery rates, sent/failed/received metrics, and device performance." },
  { icon: MessageSquare, title: "Two-Way Messaging", desc: "Receive and view incoming SMS replies in a unified inbox." },
  { icon: Shield, title: "Device Auto-Distribution", desc: "Messages are automatically balanced across connected devices for optimal throughput." },
];

const techStack = ["React", "TypeScript", "Node.js", "PostgreSQL", "Android SDK", "REST API", "WebSocket", "Docker"];

const screenshots = [
  { img: campaignImg, title: "Campaign Builder", desc: "Create bulk SMS campaigns with message templates, recipient lists, and scheduling." },
  { img: contactsImg, title: "Contacts Management", desc: "Import contacts via CSV, organize with tags and filters, and build targeted lists." },
  { img: automationImg, title: "Device Management", desc: "Monitor connected Android devices, track messages sent per device, and configure automation rules." },
  { img: analyticsImg, title: "Analytics & Reporting", desc: "Track delivery rates (98.2%), messages sent/failed/received, and device performance over time." },
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
              FlowSMS — Send unlimited SMS using real Android phones
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              An Android-based SMS sending platform that turns real phones into scalable messaging gateways — no per-message fees, no third-party APIs.
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
              Turn Android phones into SMS gateways
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FlowSMS lets businesses connect Android phones with SIM or eSIM cards to a web dashboard and send SMS at scale. No gateways, no per-message fees — just add devices to increase capacity. Setup takes less than 3 minutes.
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
              <h3 className="text-2xl font-bold text-foreground mb-4">Expensive APIs &amp; no control</h3>
              <p className="text-muted-foreground leading-relaxed">
                Traditional SMS APIs like Twilio charge per message, making high-volume campaigns expensive. Businesses have no control over delivery infrastructure, face rate limits, and can't scale without increasing costs linearly.
              </p>
            </div>

            {/* Solution */}
            <div className="p-8 md:p-10 rounded-2xl bg-card border border-border">
              <Badge className="mb-5 px-3 py-1 bg-accent/10 text-accent border-accent/20">
                The Solution
              </Badge>
              <h3 className="text-2xl font-bold text-foreground mb-4">Real phones, zero per-SMS fees</h3>
              <p className="text-muted-foreground leading-relaxed">
                FlowSMS uses real Android devices as SMS gateways. Install the app, connect to the dashboard, and start sending. Messages are auto-distributed across devices. Scale by simply adding more phones — costs stay flat.
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
