import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const caseStudies = [
  {
    client: "Global Finance Corp",
    industry: "Finance",
    title: "Cloud Migration & Security Overhaul",
    description: "Successfully migrated 500+ servers to cloud infrastructure while implementing zero-trust security architecture.",
    results: [
      { metric: "99.99%", label: "Uptime Achieved" },
      { metric: "60%", label: "Cost Reduction" },
      { metric: "3x", label: "Performance Boost" },
    ],
    tags: ["Cloud", "Security", "Migration"],
  },
  {
    client: "HealthTech Solutions",
    industry: "Healthcare",
    title: "AI-Powered Patient Management System",
    description: "Developed an intelligent patient management platform with predictive analytics and automated workflows.",
    results: [
      { metric: "85%", label: "Efficiency Gain" },
      { metric: "2M+", label: "Patients Served" },
      { metric: "40%", label: "Cost Savings" },
    ],
    tags: ["AI", "Healthcare", "Automation"],
  },
  {
    client: "RetailPro International",
    industry: "Retail",
    title: "Omnichannel E-commerce Platform",
    description: "Built a scalable e-commerce solution integrating online and offline channels with real-time inventory sync.",
    results: [
      { metric: "250%", label: "Sales Increase" },
      { metric: "50K", label: "Daily Orders" },
      { metric: "4.8/5", label: "Customer Rating" },
    ],
    tags: ["E-commerce", "Integration", "Scale"],
  },
];

const CaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.08)_0%,transparent_50%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proven Results for Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we've helped organizations transform their IT infrastructure 
            and achieve measurable business outcomes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-[var(--shadow-xl)] hover:-translate-y-2 animate-scale-in bg-gradient-to-br from-card via-card to-primary/5"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-[var(--gradient-card)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {study.industry}
                  </Badge>
                  <TrendingUp className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                  {study.client}
                </CardTitle>
                <CardDescription className="text-base font-semibold text-foreground/80">
                  {study.title}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {study.description}
                </p>

                {/* Results Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-primary mb-1">
                        {result.metric}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {result.label}
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
                >
                  Read Full Case Study
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center animate-fade-in-up">
          <p className="text-muted-foreground mb-6 text-lg">
            Want to see how we can help your business achieve similar results?
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
            Discuss Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
