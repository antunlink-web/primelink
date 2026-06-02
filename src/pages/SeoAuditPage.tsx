import { useState, FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Search,
  Gauge,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// ---------------------------------------------------------------------------
// Backend integration point
// ---------------------------------------------------------------------------
// Endpoint:   POST /api/seo-audit
// Payload:    { "url": "https://example.com" }
// Response:   { url, seoScore, performanceScore, technicalScore,
//               redesignPotential, issues: [{ title, severity, recommendation }] }
//
// Abuse protection checklist (to implement server-side before production):
//   - Validate URL format (must be http/https, valid hostname)
//   - Block private/local IPs and reserved ranges (127.0.0.0/8, 10/8, 192.168/16,
//     172.16/12, ::1, fc00::/7, link-local, metadata endpoints)
//   - Add per-IP rate limiting (e.g. 5 requests / hour)
//   - Require CAPTCHA (hCaptcha / Cloudflare Turnstile) before production
//   - Cache audit results for 24h per normalized URL to reduce load
//   - Set sensible request timeouts and a max-redirect cap
// ---------------------------------------------------------------------------

type Severity = "low" | "medium" | "high";

interface AuditIssue {
  title: string;
  severity: Severity;
  recommendation: string;
}

interface AuditResult {
  url: string;
  seoScore: number;
  performanceScore: number;
  technicalScore: number;
  redesignPotential: "Low" | "Medium" | "High";
  issues: AuditIssue[];
}

const SAMPLE_RESULT = (url: string): AuditResult => ({
  url,
  seoScore: 72,
  performanceScore: 64,
  technicalScore: 78,
  redesignPotential: "Medium",
  issues: [
    {
      title: "Nedostaje meta description",
      severity: "medium",
      recommendation: "Dodajte jedinstveni meta description (do 160 znakova) za svaku stranicu.",
    },
    {
      title: "Slike nisu optimizirane",
      severity: "high",
      recommendation: "Konvertirajte slike u WebP/AVIF format i koristite responsive srcset.",
    },
    {
      title: "Više od jednog H1 elementa",
      severity: "medium",
      recommendation: "Zadržite samo jedan H1 po stranici i organizirajte sadržaj kroz H2/H3.",
    },
    {
      title: "Spori Largest Contentful Paint na mobilnim uređajima",
      severity: "high",
      recommendation: "Smanjite render-blocking JS/CSS i lazy-load slike izvan viewporta.",
    },
    {
      title: "Nedostaje sitemap.xml",
      severity: "low",
      recommendation: "Generirajte sitemap.xml i navedite ga u robots.txt.",
    },
  ],
});

const isValidUrl = (value: string) => {
  try {
    const u = new URL(value.startsWith("http") ? value : `https://${value}`);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

const scoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};

const severityBadge: Record<Severity, string> = {
  low: "bg-secondary text-foreground border-border",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  high: "bg-red-500/10 text-red-600 border-red-500/30",
};

const SeoAuditPage = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const [leadEmail, setLeadEmail] = useState("");
  const [leadUrl, setLeadUrl] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadSending, setLeadSending] = useState(false);

  const handleAudit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      toast({
        title: "Neispravan URL",
        description: "Unesite valjanu adresu, npr. https://primjer.hr",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setResult(null);

    // TODO: zamijeniti pravim pozivom prema /api/seo-audit kad backend bude spreman.
    // try {
    //   const res = await fetch("/api/seo-audit", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ url }),
    //   });
    //   const data = await res.json();
    //   setResult(data);
    // } catch (err) { ... }

    await new Promise((r) => setTimeout(r, 1400));
    const normalized = url.startsWith("http") ? url : `https://${url}`;
    setResult(SAMPLE_RESULT(normalized));
    setLeadUrl(normalized);
    setLoading(false);
  };

  const handleLead = async (e: FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadUrl) {
      toast({ title: "Nedostaju podaci", description: "Unesite email i URL stranice.", variant: "destructive" });
      return;
    }
    setLeadSending(true);
    // TODO: integrirati s postojećim Web3Forms endpointom ili /api/lead.
    await new Promise((r) => setTimeout(r, 900));
    setLeadSending(false);
    setLeadEmail("");
    setLeadMessage("");
    toast({
      title: "Hvala na upitu",
      description: "Javljamo se unutar 24 sata s detaljnom analizom.",
    });
  };

  const checks = [
    "SEO naslov i meta description",
    "Struktura H1, H2 i H3 elemenata",
    "sitemap.xml i robots.txt",
    "Mobilne performanse i Core Web Vitals",
    "Optimizacija slika",
    "Osnovni tehnički problemi",
    "Struktura za konverziju",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Besplatna SEO analiza web stranice | PrimeLink</title>
        <meta
          name="description"
          content="Besplatna SEO analiza web stranice — provjerite SEO, brzinu i tehničke probleme svoje stranice u nekoliko sekundi. PrimeLink d.o.o. Zagreb."
        />
        <link rel="canonical" href="https://primelink.hr/besplatna-seo-analiza" />
        <meta property="og:title" content="Besplatna SEO analiza web stranice | PrimeLink" />
        <meta
          property="og:description"
          content="Provjerite osnovne SEO, brzinske i tehničke probleme svoje web stranice u nekoliko sekundi."
        />
        <meta property="og:url" content="https://primelink.hr/besplatna-seo-analiza" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="pt-28 md:pt-32">
        {/* Hero */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Besplatni alat
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              Besplatna SEO analiza web stranice
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Provjerite osnovne SEO, brzinske i tehničke probleme svoje web stranice u nekoliko sekundi.
            </p>

            <form
              onSubmit={handleAudit}
              className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
              aria-label="Pokreni SEO analizu"
            >
              <Input
                type="text"
                inputMode="url"
                placeholder="https://vasa-stranica.hr"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-12 text-base"
                aria-label="URL web stranice"
                required
              />
              <Button type="submit" size="lg" disabled={loading} className="h-12 px-6">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analiziram…
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Analiziraj stranicu
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Analiza je informativna i ne sprema podatke o vašoj stranici.
            </p>
          </div>
        </section>

        {/* Explanation */}
        {!result && (
          <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
                Što analiza provjerava
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                Brza, automatska provjera ključnih SEO i tehničkih parametara koji najčešće utječu na vidljivost i konverziju.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {checks.map((c) => (
                  <div
                    key={c}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        {result && (
          <section className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 text-center">
                <p className="text-sm text-muted-foreground mb-1">Rezultati analize za</p>
                <p className="text-lg font-semibold text-foreground break-all">{result.url}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                <ScoreCard icon={<Search className="h-5 w-5" />} label="SEO" value={`${result.seoScore}`} color={scoreColor(result.seoScore)} />
                <ScoreCard icon={<Gauge className="h-5 w-5" />} label="Mobilna brzina" value={`${result.performanceScore}`} color={scoreColor(result.performanceScore)} />
                <ScoreCard icon={<ShieldCheck className="h-5 w-5" />} label="Tehničko stanje" value={`${result.technicalScore}`} color={scoreColor(result.technicalScore)} />
                <ScoreCard icon={<Sparkles className="h-5 w-5" />} label="Potencijal redizajna" value={result.redesignPotential} color="text-primary" />
              </div>

              <Card className="p-6 md:p-8 mb-8">
                <h3 className="text-xl font-bold text-foreground mb-5">Detektirani problemi i preporuke</h3>
                <ul className="space-y-4">
                  {result.issues.map((issue, i) => (
                    <li key={i} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{issue.title}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${severityBadge[issue.severity]}`}>
                            {issue.severity === "high" ? "visok" : issue.severity === "medium" ? "srednji" : "nizak"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Lead capture */}
              <Card className="p-6 md:p-8 bg-secondary/50">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
                    Želite detaljniju analizu i konkretan prijedlog poboljšanja?
                  </h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Pošaljite upit i izrađujemo detaljan izvještaj s prioritetima i procjenom efekta.
                  </p>
                  <form onSubmit={handleLead} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        type="email"
                        placeholder="Vaš email"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        required
                        aria-label="Email"
                      />
                      <Input
                        type="text"
                        placeholder="URL stranice"
                        value={leadUrl}
                        onChange={(e) => setLeadUrl(e.target.value)}
                        required
                        aria-label="URL stranice"
                      />
                    </div>
                    <Textarea
                      placeholder="Kratka poruka (opcionalno)"
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      rows={4}
                      aria-label="Poruka"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={leadSending}>
                      {leadSending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Šaljem…
                        </>
                      ) : (
                        <>Pošalji upit <ArrowRight className="h-4 w-4" /></>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Trebate pomoć oko optimizacije ili redizajna?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              PrimeLink izrađuje moderne web stranice, CRM sustave i web aplikacije za tvrtke u Hrvatskoj.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link to="/ponuda/forma">Zatražite ponudu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/ponuda">Pogledajte usluge</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

interface ScoreCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const ScoreCard = ({ icon, label, value, color }: ScoreCardProps) => (
  <Card className="p-5">
    <div className="flex items-center gap-2 text-muted-foreground mb-2">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <div className={`text-3xl font-bold ${color}`}>{value}</div>
  </Card>
);

export default SeoAuditPage;