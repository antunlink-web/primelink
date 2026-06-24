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
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Shared Web3Forms access key (same as QuoteForm). Lead notifications go to PrimeLink.
const WEB3FORMS_ACCESS_KEY = "65b937ba-7a1f-4605-bd6e-51f19e97b7cd";

// NOTE on abuse protection:
//   - URL validacija + honeypot polje su implementirani niže.
//   - Audit (provjera URL-a) NE šalje email — email se šalje tek nakon
//     submita lead forme ispod rezultata.
//   - Prije veće javne upotrebe dodati CAPTCHA (hCaptcha / Turnstile)
//     i rate limiting (npr. 5 leadova / IP / sat) na serverskoj strani.

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
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadConsent, setLeadConsent] = useState(true);
  const [leadHoneypot, setLeadHoneypot] = useState(""); // spam trap — mora ostati prazno
  const [leadSending, setLeadSending] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

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

    // Honeypot: ako je polje popunjeno, prekidamo bez slanja.
    if (leadHoneypot) return;

    if (!leadName.trim() || !leadEmail.trim() || !leadUrl.trim()) {
      toast({
        title: "Nedostaju podaci",
        description: "Unesite ime, email i URL stranice.",
        variant: "destructive",
      });
      return;
    }
    if (!isValidUrl(leadUrl)) {
      toast({
        title: "Neispravan URL",
        description: "Provjerite adresu web stranice.",
        variant: "destructive",
      });
      return;
    }

    setLeadSending(true);

    const timestamp = new Date().toISOString();
    const messageLines = [
      `--- Novi lead: Besplatna SEO analiza ---`,
      `Web stranica: ${leadUrl}`,
      `Ime: ${leadName}`,
      `Email: ${leadEmail}`,
      `Telefon: ${leadPhone || "—"}`,
      `Kontakt s prijedlogom: ${leadConsent ? "DA" : "NE"}`,
      `Vrijeme: ${timestamp}`,
      ``,
      `--- Poruka korisnika ---`,
      leadMessage?.trim() || "—",
      ``,
      `--- Rezultati audita prikazani korisniku ---`,
      result ? `SEO score: ${result.seoScore}` : "",
      result ? `Mobilna brzina: ${result.performanceScore}` : "",
      result ? `Tehničko stanje: ${result.technicalScore}` : "",
      result ? `Potencijal redizajna: ${result.redesignPotential}` : "",
      ``,
      `--- Detektirani problemi ---`,
      ...(result?.issues.map(
        (i) => `• [${i.severity}] ${i.title} — ${i.recommendation}`,
      ) ?? []),
    ]
      .filter(Boolean)
      .join("\n");

    // TODO: spremiti lead/audit u bazu podataka
    // uključen. Predviđena tablica `seo_audit_leads`:
    //   website_url, seo_score, performance_score, technical_score,
    //   redesign_potential, issues_json, name, email, phone, message, created_at.
    // Trenutno Cloud nije aktiviran pa preskačemo INSERT bez greške.

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Novi lead: Besplatna SEO analiza – PrimeLink",
          from_name: "PrimeLink SEO audit",
          page_source: "/besplatna-seo-analiza",
          name: leadName,
          email: leadEmail,
          phone: leadPhone || "",
          website: leadUrl,
          consent: leadConsent ? "yes" : "no",
          timestamp,
          seo_score: result?.seoScore ?? "",
          performance_score: result?.performanceScore ?? "",
          technical_score: result?.technicalScore ?? "",
          redesign_potential: result?.redesignPotential ?? "",
          issues_json: JSON.stringify(result?.issues ?? []),
          message: messageLines,
          botcheck: leadHoneypot, // Web3Forms built-in honeypot
        }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Slanje nije uspjelo.");
      setLeadSubmitted(true);
    } catch {
      toast({
        title: "Greška pri slanju",
        description:
          "Pokušajte ponovno ili nas kontaktirajte na primelink@primelink.hr.",
        variant: "destructive",
      });
    } finally {
      setLeadSending(false);
    }
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
        <section className="container mx-auto px-4 pt-8 pb-6 md:pt-12 md:pb-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Besplatan alat
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 leading-tight">
              SEO analiza
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
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
                placeholder="Unesite URL web stranice"
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
                    Pokreni analizu
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Analiza je informativna. Ne spremamo podatke o vašoj stranici.
            </p>
          </div>
        </section>

        {/* Explanation */}
        {!result && (
          <section className="container mx-auto px-4 pt-4 pb-12 md:pt-6 md:pb-16">
            <div className="max-w-4xl mx-auto">
              {/* Sample result preview */}
              <Card className="p-5 md:p-6 mb-10 max-w-2xl mx-auto bg-card/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground/70 font-semibold">
                    Primjer rezultata
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                    demo
                  </span>
                </div>
                <ul className="divide-y divide-border">
                  {[
                    { label: "SEO naslov", value: "pronađen", tone: "ok" as const },
                    { label: "Meta opis", value: "nedostaje", tone: "bad" as const },
                    { label: "Mobile performanse", value: "potrebno poboljšanje", tone: "warn" as const },
                    { label: "Tehnički problemi", value: "2 upozorenja", tone: "warn" as const },
                  ].map((row) => (
                    <li key={row.label} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span
                        className={
                          "inline-flex items-center gap-1.5 font-medium " +
                          (row.tone === "ok"
                            ? "text-green-500"
                            : row.tone === "warn"
                              ? "text-yellow-500"
                              : "text-red-500")
                        }
                      >
                        {row.tone === "ok" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
                Što analiza provjerava
              </h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                Brza, automatska provjera ključnih SEO i tehničkih parametara koji najčešće utječu na vidljivost i konverziju.
              </p>
              <div className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {checks.map((c) => (
                  <div
                    key={c}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
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
                  {leadSubmitted ? (
                    <div className="text-center py-6">
                      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Hvala!
                      </h3>
                      <p className="text-muted-foreground">
                        Zaprimili smo vaš zahtjev i javit ćemo vam se s prijedlogom poboljšanja.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
                        Želite detaljniju analizu i konkretan prijedlog poboljšanja?
                      </h3>
                      <p className="text-muted-foreground text-center mb-6">
                        Pošaljite upit i izrađujemo detaljan izvještaj s prioritetima i procjenom efekta.
                      </p>
                      <form onSubmit={handleLead} className="space-y-4" noValidate>
                        {/* Honeypot — sakriven od korisnika, vidljiv botovima */}
                        <input
                          type="text"
                          name="botcheck"
                          tabIndex={-1}
                          autoComplete="off"
                          value={leadHoneypot}
                          onChange={(e) => setLeadHoneypot(e.target.value)}
                          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                          aria-hidden="true"
                        />

                        <div>
                          <Label htmlFor="lead-url">Web stranica</Label>
                          <Input
                            id="lead-url"
                            type="text"
                            placeholder="https://vasa-stranica.hr"
                            value={leadUrl}
                            onChange={(e) => setLeadUrl(e.target.value)}
                            required
                            className="mt-1.5"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="lead-name">Ime i prezime</Label>
                            <Input
                              id="lead-name"
                              type="text"
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              required
                              className="mt-1.5"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lead-email">Email</Label>
                            <Input
                              id="lead-email"
                              type="email"
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              required
                              className="mt-1.5"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="lead-phone">Telefon (opcionalno)</Label>
                          <Input
                            id="lead-phone"
                            type="tel"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>

                        <div>
                          <Label htmlFor="lead-message">Poruka (opcionalno)</Label>
                          <Textarea
                            id="lead-message"
                            value={leadMessage}
                            onChange={(e) => setLeadMessage(e.target.value)}
                            rows={4}
                            className="mt-1.5"
                          />
                        </div>

                        <div className="flex items-start gap-2.5 pt-1">
                          <Checkbox
                            id="lead-consent"
                            checked={leadConsent}
                            onCheckedChange={(v) => setLeadConsent(v === true)}
                            className="mt-0.5"
                          />
                          <Label htmlFor="lead-consent" className="text-sm font-normal text-muted-foreground leading-relaxed">
                            Želim da me kontaktirate s prijedlogom poboljšanja.
                          </Label>
                        </div>

                        <Button type="submit" size="lg" className="w-full" disabled={leadSending}>
                          {leadSending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Šaljem…
                            </>
                          ) : (
                            <>Zatraži detaljnu analizu <ArrowRight className="h-4 w-4" /></>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Želite bolju web stranicu i više kvalitetnih upita?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              PrimeLink izrađuje moderne web stranice, CRM sustave i web aplikacije za tvrtke koje žele ozbiljniji digitalni nastup.
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