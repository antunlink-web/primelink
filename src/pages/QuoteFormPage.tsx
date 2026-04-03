import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Check, ArrowLeft, ArrowRight, Send, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const WEB3FORMS_ACCESS_KEY = "7a6fbce5-f71b-4f52-a58e-12bcbbd3a492";

type FormData = {
  need: string;
  business: string;
  hasWebsite: string;
  websiteUrl: string;
  goal: string;
  timeline: string;
  budget: string;
  wantsClientHelp: string;
  name: string;
  email: string;
  phone: string;
};

const initialData: FormData = {
  need: "",
  business: "",
  hasWebsite: "",
  websiteUrl: "",
  goal: "",
  timeline: "",
  budget: "",
  wantsClientHelp: "",
  name: "",
  email: "",
  phone: "",
};

const TOTAL_STEPS = 4;

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

const QuoteFormPage = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const isHighValue = ["500€ – 1000€", "1000€+"].includes(data.budget);
  const wantsAds = data.need === "Dovođenje klijenata (oglasi)" || data.need === "Sve od navedenog";

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return !!data.need;
      case 2:
        return (
          data.business.trim().length > 0 &&
          !!data.hasWebsite &&
          !!data.goal &&
          (data.hasWebsite !== "Da" || data.websiteUrl.trim().length > 0)
        );
      case 3:
        return !!data.timeline && !!data.budget && !!data.wantsClientHelp;
      case 4:
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
    const messageBody = [
      `--- NOVI UPIT (${leadQuality}) ---`,
      `Što treba: ${data.need}`,
      `Djelatnost: ${data.business}`,
      `Ima web: ${data.hasWebsite}${data.hasWebsite === "Da" ? ` (${data.websiteUrl})` : ""}`,
      `Cilj: ${data.goal}`,
      `Kada: ${data.timeline}`,
      `Budžet: ${data.budget}`,
      `Pomoć s klijentima: ${data.wantsClientHelp}`,
      `---`,
      `Ime: ${data.name}`,
      `Email: ${data.email}`,
      `Telefon: ${data.phone || "nije uneseno"}`,
    ].join("\n");

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
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Hvala na upitu!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Javit ćemo vam se u najkraćem mogućem roku s prijedlogom rješenja.
            </p>
            <a href="tel:+385915122888" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4 text-primary" />
              <span>U međuvremenu nas možete nazvati: +385 91 512 2888</span>
            </a>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-xl">
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
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">Krenimo od početka</h2>
                    <p className="text-muted-foreground">Što vam treba?</p>
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

              {/* STEP 2 */}
              {step === 2 && (
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

              {/* STEP 3 */}
              {step === 3 && (
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

              {/* STEP 4 */}
              {step === 4 && (
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
                    onClick={() => setStep((s) => s - 1)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Nazad
                  </Button>
                ) : (
                  <div />
                )}

                {step < TOTAL_STEPS ? (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
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
      </section>

      <Footer />
    </div>
  );
};

export default QuoteFormPage;
