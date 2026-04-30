import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowLeft, ArrowRight, Send, Phone, Sparkles, Calendar, MessageSquare, ShoppingCart, Globe } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const WEB3FORMS_ACCESS_KEY = "65b937ba-7a1f-4605-bd6e-51f19e97b7cd";

type FormData = {
  purpose: string;
  bookingType: string;
  contactPref: string;
  sellType: string;
  need: string;
  business: string;
  hasWebsite: string;
  websiteUrl: string;
  goal: string;
  timeline: string;
  budget: string;
  wantsClientHelp: string;
  socialLinks: string;
  inspirationLinks: string;
  inspirationLikes: string[];
  name: string;
  email: string;
  phone: string;
};

const initialData: FormData = {
  purpose: "",
  bookingType: "",
  contactPref: "",
  sellType: "",
  need: "",
  business: "",
  hasWebsite: "",
  websiteUrl: "",
  goal: "",
  timeline: "",
  budget: "",
  wantsClientHelp: "",
  socialLinks: "",
  inspirationLinks: "",
  inspirationLikes: [],
  name: "",
  email: "",
  phone: "",
};

// Steps: 1=purpose, 2=follow-up (dynamic, may be skipped), 3=need, 4=business, 5=social/existing content (optional), 6=timeline/budget, 7=inspiration (optional), 8=summary, 9=contact
const TOTAL_STEPS = 9;

const PURPOSE_BOOKING = "Klijenti me često zovu — želim lakše naručivanje";
const PURPOSE_LEADS = "Želim više upita putem weba";
const PURPOSE_PRESENTATION = "Želim profesionalnu prezentaciju poslovanja";
const PURPOSE_ECOMMERCE = "Želim prodavati online";
const PURPOSE_UNSURE = "Nisam siguran";

const purposeNeedsFollowUp = (purpose: string) =>
  purpose === PURPOSE_BOOKING || purpose === PURPOSE_LEADS || purpose === PURPOSE_ECOMMERCE;

const OptionButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm md:text-base ${
      selected
        ? "border-primary bg-primary/10 text-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]"
        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-secondary/50"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}
      >
        {selected && <Check className="h-3 w-3 text-primary-foreground" />}
      </div>
      <span>{label}</span>
    </div>
  </button>
);

type Recommendation = {
  icon: typeof Globe;
  title: string;
  description: string;
};

const buildRecommendations = (data: FormData): Recommendation[] => {
  const recs: Recommendation[] = [];

  // Always include a base website
  recs.push({
    icon: Globe,
    title: "Profesionalna web stranica",
    description:
      "Moderna, brza i optimizirana stranica koja gradi povjerenje i jasno komunicira što nudite.",
  });

  if (data.purpose === PURPOSE_BOOKING) {
    if (data.bookingType === "Kalendar (odabir termina)") {
      recs.push({
        icon: Calendar,
        title: "Sustav za online rezervacije",
        description:
          "Kalendar gdje klijenti sami biraju slobodan termin — manje poziva, manje propuštenih prilika.",
      });
    } else if (data.bookingType === "Forma (upit)") {
      recs.push({
        icon: MessageSquare,
        title: "Forma za narudžbe / upite",
        description:
          "Strukturirana forma koja prikuplja sve potrebne podatke o narudžbi prije nego klijent nazove.",
      });
    } else {
      recs.push({
        icon: Calendar,
        title: "Booking modul po mjeri",
        description:
          "Predložit ćemo najbolji način rezervacija (kalendar ili forma) prema vašoj djelatnosti.",
      });
    }
  }

  if (data.purpose === PURPOSE_LEADS) {
    const channel = data.contactPref || "preferirani kanal";
    recs.push({
      icon: MessageSquare,
      title: "Optimizacija za upite",
      description: `Jasni CTA-ovi i kontakt putem ${channel.toLowerCase()} — fokus stranice je da pretvori posjetitelja u upit.`,
    });
  }

  if (data.purpose === PURPOSE_ECOMMERCE) {
    const what = data.sellType ? data.sellType.toLowerCase() : "vaše proizvode";
    recs.push({
      icon: ShoppingCart,
      title: "Webshop",
      description: `Online trgovina prilagođena prodaji (${what}) s plaćanjem, dostavom i upravljanjem narudžbama.`,
    });
  }

  if (data.purpose === PURPOSE_PRESENTATION) {
    recs.push({
      icon: Sparkles,
      title: "Premium prezentacijski dizajn",
      description:
        "Naglasak na vizualnom identitetu, fotografijama i tipografiji — stranica koja izgleda kao da je iza nje ozbiljna firma.",
    });
  }

  if (data.wantsClientHelp === "Da" || data.wantsClientHelp === "Možda") {
    recs.push({
      icon: Sparkles,
      title: "Dovođenje klijenata (oglasi)",
      description:
        "Google i Meta oglasi usmjereni na vašu ciljanu publiku — stranica i oglasi rade kao jedan sustav.",
    });
  }

  return recs;
};

const QuoteForm = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleInspirationLike = (label: string) => {
    setData((prev) => {
      const exists = prev.inspirationLikes.includes(label);
      return {
        ...prev,
        inspirationLikes: exists
          ? prev.inspirationLikes.filter((l) => l !== label)
          : [...prev.inspirationLikes, label],
      };
    });
  };

  const isHighValue = ["500€ – 1000€", "1000€+"].includes(data.budget);
  const wantsAds =
    data.need === "Dovođenje klijenata (oglasi)" ||
    data.need === "Sve od navedenog" ||
    data.purpose === PURPOSE_LEADS;

  const hasFollowUp = purposeNeedsFollowUp(data.purpose);

  const goNext = () => {
    setStep((s) => {
      const next = s + 1;
      // Skip step 2 (follow-up) if no follow-up applies
      if (next === 2 && !hasFollowUp) return 3;
      return next;
    });
  };

  const goBack = () => {
    setStep((s) => {
      const prev = s - 1;
      if (prev === 2 && !hasFollowUp) return 1;
      return Math.max(1, prev);
    });
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!data.purpose;
      case 2:
        if (!hasFollowUp) return true;
        if (data.purpose === PURPOSE_BOOKING) return !!data.bookingType;
        if (data.purpose === PURPOSE_LEADS) return !!data.contactPref;
        if (data.purpose === PURPOSE_ECOMMERCE) return !!data.sellType;
        return true;
      case 3:
        return !!data.need;
      case 4:
        return (
          data.business.trim().length > 0 &&
          !!data.hasWebsite &&
          !!data.goal &&
          (data.hasWebsite !== "Da" || data.websiteUrl.trim().length > 0)
        );
      case 5:
        return true; // social/existing content is optional
      case 6:
        return !!data.timeline && !!data.budget && !!data.wantsClientHelp;
      case 7:
        return true; // inspiration is optional
      case 8:
        return true; // recommendation summary
      case 9:
        return (
          data.name.trim().length > 0 &&
          z.string().email().safeParse(data.email.trim()).success
        );
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setSubmitting(true);

    const leadQuality = isHighValue ? "HIGH" : "STANDARD";
    const recommendations = buildRecommendations(data);
    const messageBody = [
      `--- NOVI UPIT (${leadQuality}) ---`,
      `Svrha stranice: ${data.purpose}`,
      data.bookingType ? `Način rezervacije: ${data.bookingType}` : null,
      data.contactPref ? `Preferirani kontakt: ${data.contactPref}` : null,
      data.sellType ? `Što prodaje: ${data.sellType}` : null,
      `Što treba: ${data.need}`,
      `Djelatnost: ${data.business}`,
      `Ima web: ${data.hasWebsite}${data.hasWebsite === "Da" ? ` (${data.websiteUrl})` : ""}`,
      `Cilj: ${data.goal}`,
      `Kada: ${data.timeline}`,
      `Budžet: ${data.budget}`,
      `Pomoć s klijentima: ${data.wantsClientHelp}`,
      data.socialLinks.trim()
        ? `Postojeći sadržaj / profili: ${data.socialLinks.trim()}`
        : null,
      data.inspirationLinks.trim()
        ? `Inspiracija (linkovi): ${data.inspirationLinks.trim()}`
        : null,
      data.inspirationLikes.length > 0
        ? `Sviđa im se: ${data.inspirationLikes.join(", ")}`
        : null,
      `---`,
      `Preporučeno rješenje:`,
      ...recommendations.map((r) => `• ${r.title} — ${r.description}`),
      `---`,
      `Ime: ${data.name}`,
      `Email: ${data.email}`,
      `Telefon: ${data.phone || "nije uneseno"}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: messageBody,
          subject: `${leadQuality === "HIGH" ? "🔥 " : ""}Novi upit za ponudu — ${data.name}`,
          from_name: "PrimeLink Quote Form",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message);
      }
    } catch {
      toast.error("Greška pri slanju. Pokušajte ponovo.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Hvala na upitu!
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Javit ćemo vam se u najkraćem mogućem roku s prijedlogom rješenja.
        </p>
        <a href="tel:+385915122888" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <Phone className="h-4 w-4 text-primary" />
          <span>U međuvremenu nas možete nazvati: +385 91 512 2888</span>
        </a>
      </div>
    );
  }

  const recommendations = buildRecommendations(data);

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">
            Korak {step} / {TOTAL_STEPS}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((step / TOTAL_STEPS) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6 md:p-10">
          {/* STEP 1 — Purpose */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Kako vam web stranica treba služiti?
                </h2>
                <p className="text-muted-foreground">Odaberite što najbolje opisuje vašu situaciju.</p>
              </div>
              <div className="space-y-3">
                {[
                  PURPOSE_BOOKING,
                  PURPOSE_LEADS,
                  PURPOSE_PRESENTATION,
                  PURPOSE_ECOMMERCE,
                  PURPOSE_UNSURE,
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={data.purpose === opt}
                    onClick={() => {
                      update("purpose", opt);
                      // Reset follow-ups if user changes purpose
                      update("bookingType", "");
                      update("contactPref", "");
                      update("sellType", "");
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 — Dynamic follow-up */}
          {step === 2 && hasFollowUp && (
            <div className="space-y-6">
              {data.purpose === PURPOSE_BOOKING && (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      Kako želite da klijenti rezerviraju?
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {["Kalendar (odabir termina)", "Forma (upit)", "Nisam siguran"].map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={data.bookingType === opt}
                        onClick={() => update("bookingType", opt)}
                      />
                    ))}
                  </div>
                </>
              )}

              {data.purpose === PURPOSE_LEADS && (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      Kako želite da vas klijenti kontaktiraju?
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {["Telefon", "WhatsApp", "Email", "Forma"].map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={data.contactPref === opt}
                        onClick={() => update("contactPref", opt)}
                      />
                    ))}
                  </div>
                </>
              )}

              {data.purpose === PURPOSE_ECOMMERCE && (
                <>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      Što želite prodavati?
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {["Fizičke proizvode", "Usluge", "Digitalno"].map((opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={data.sellType === opt}
                        onClick={() => update("sellType", opt)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3 — Need (existing) */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Što vam konkretno treba?</h2>
                <p className="text-muted-foreground">Tip projekta koji najbolje odgovara.</p>
              </div>
              <div className="space-y-3">
                {[
                  "Nova web stranica",
                  "Redizajn postojeće stranice",
                  "Dovođenje klijenata (oglasi)",
                  "Sve od navedenog",
                ].map((opt) => (
                  <OptionButton
                    key={opt}
                    label={opt}
                    selected={data.need === opt}
                    onClick={() => update("need", opt)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 — Business info */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">O vašem poslovanju</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Čime se bavite?
                </label>
                <Input
                  placeholder="npr. frizerski salon, IT tvrtka, restoran..."
                  value={data.business}
                  onChange={(e) => update("business", e.target.value)}
                  maxLength={200}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Imate li već web stranicu?
                </label>
                <div className="flex gap-3">
                  {["Da", "Ne"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => update("hasWebsite", opt)}
                      className={`flex-1 px-5 py-3 rounded-xl border transition-all text-sm ${
                        data.hasWebsite === opt
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {data.hasWebsite === "Da" && (
                  <Input
                    className="mt-3"
                    placeholder="https://..."
                    value={data.websiteUrl}
                    onChange={(e) => update("websiteUrl", e.target.value)}
                    maxLength={500}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Koji je vaš glavni cilj?
                </label>
                <div className="space-y-3">
                  {["Više upita", "Više prodaje", "Bolja online prisutnost", "Ne znam još"].map(
                    (opt) => (
                      <OptionButton
                        key={opt}
                        label={opt}
                        selected={data.goal === opt}
                        onClick={() => update("goal", opt)}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 — Existing content / social profiles (optional) */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Imate li već sadržaj ili profile koje možemo iskoristiti?
                </h2>
                <p className="text-muted-foreground">
                  Možete poslati linkove vaših društvenih mreža ili postojećih stranica (npr. Facebook, Instagram, LinkedIn…). To pomaže da brže pripremimo prijedlog s vašim stvarnim sadržajem.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Linkovi <span className="text-muted-foreground font-normal">(neobavezno)</span>
                </label>
                <Textarea
                  placeholder="npr. https://facebook.com/..., https://instagram.com/..."
                  value={data.socialLinks}
                  onChange={(e) => update("socialLinks", e.target.value)}
                  maxLength={1000}
                  className="min-h-[110px]"
                />
              </div>
            </div>
          )}

          {/* STEP 6 — Timeline & budget */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Ciljevi i ulaganje</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kada želite krenuti?
                </label>
                <div className="space-y-3">
                  {["Odmah", "U sljedećih 30 dana", "Kasnije"].map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      selected={data.timeline === opt}
                      onClick={() => update("timeline", opt)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Planirani budžet
                </label>
                <div className="space-y-3">
                  {["Do 200€", "200€ – 500€", "500€ – 1000€", "1000€+"].map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      selected={data.budget === opt}
                      onClick={() => update("budget", opt)}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Ne obvezuje vas ni na što — služi samo za preporuku najboljeg rješenja.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Želite li i pomoć oko dovođenja klijenata?
                  {wantsAds && (
                    <span className="ml-2 text-xs text-accent font-normal">⭐ Preporučeno za vas</span>
                  )}
                </label>
                <div className="space-y-3">
                  {["Da", "Možda", "Ne"].map((opt) => (
                    <OptionButton
                      key={opt}
                      label={opt}
                      selected={data.wantsClientHelp === opt}
                      onClick={() => update("wantsClientHelp", opt)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7 — Inspiration (optional) */}
          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  Imate li primjere koji vam se sviđaju?
                </h2>
                <p className="text-muted-foreground">
                  Možete poslati linkove stranica ili aplikacija koje vam se sviđaju (nije bitno iz vaše branše). To pomaže da bolje prilagodimo dizajn i smjer.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Linkovi <span className="text-muted-foreground font-normal">(neobavezno)</span>
                </label>
                <Textarea
                  placeholder="npr. https://..., https://..."
                  value={data.inspirationLinks}
                  onChange={(e) => update("inspirationLinks", e.target.value)}
                  maxLength={1000}
                  className="min-h-[110px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Što vam se sviđa kod tih primjera?
                </label>
                <div className="space-y-3">
                  {["Dizajn", "Jednostavnost", "Funkcionalnosti", "Brzina korištenja", "Ne znam"].map(
                    (opt) => {
                      const selected = data.inspirationLikes.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleInspirationLike(opt)}
                          className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm md:text-base ${
                            selected
                              ? "border-primary bg-primary/10 text-foreground shadow-[0_0_15px_-3px_hsl(var(--primary)/0.3)]"
                              : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-secondary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                selected ? "border-primary bg-primary" : "border-muted-foreground/30"
                              }`}
                            >
                              {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                            <span>{opt}</span>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 8 — Recommendation summary */}
          {step === 8 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Preporučeno rješenje</h2>
              </div>
              <p className="text-muted-foreground -mt-2">
                Na temelju vaših odgovora, evo što bismo vam predložili:
              </p>

              <div className="space-y-3">
                {recommendations.map((rec) => {
                  const Icon = rec.icon;
                  return (
                    <div
                      key={rec.title}
                      className="flex gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-muted-foreground">
                Ovo je okvirna preporuka — finalni prijedlog s točnim opsegom i cijenom šaljemo nakon kratke analize.
              </p>
            </div>
          )}

          {/* STEP 9 — Contact */}
          {step === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">Kontakt podaci</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Ime *</label>
                <Input
                  placeholder="Vaše ime"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <Input
                  type="email"
                  placeholder="email@primjer.hr"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={255}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon <span className="text-muted-foreground font-normal">(preporučeno)</span>
                </label>
                <Input
                  type="tel"
                  placeholder="+385..."
                  value={data.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  maxLength={30}
                />
              </div>

              <div className="bg-secondary/30 border border-border rounded-xl p-4 mt-4">
                <p className="text-sm text-muted-foreground">
                  Na temelju vaših odgovora pripremit ćemo prijedlog rješenja za vaše poslovanje.
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
            {step > 1 ? (
              <Button
                variant="ghost"
                onClick={goBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Nazad
              </Button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <Button
                onClick={goNext}
                disabled={!canProceed()}
                className="gap-2"
              >
                Dalje <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Šaljem..." : "Pošalji upit"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteForm;
