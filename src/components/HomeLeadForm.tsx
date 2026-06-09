import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Loader2, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

// Same Web3Forms key as the rest of the site — notifications go to PrimeLink.
// NOTE: before heavy public use, add CAPTCHA (hCaptcha / Turnstile) and
// server-side rate limiting (e.g. 5 leads / IP / hour).
const WEB3FORMS_ACCESS_KEY = "65b937ba-7a1f-4605-bd6e-51f19e97b7cd";

const NEEDS = [
  "Nova web stranica",
  "Redizajn postojeće web stranice",
  "CRM sustav",
  "Web aplikacija",
  "Stripe integracija",
  "SEO analiza",
];

const schema = z.object({
  name: z.string().trim().min(2, "Unesite ime i prezime").max(100),
  email: z.string().trim().email("Neispravna e-mail adresa").max(255),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  message: z.string().trim().max(1500).optional().or(z.literal("")),
});

const HomeLeadForm = () => {
  const [needs, setNeeds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleNeed = (item: string) => {
    setNeeds((prev) =>
      prev.includes(item) ? prev.filter((n) => n !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot

    const parsed = schema.safeParse({ name, email, phone, website, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message || "Provjerite unesene podatke.");
      return;
    }

    setSubmitting(true);
    const body = [
      "--- NOVI UPIT S HOMEPAGE LEAD FORME ---",
      "",
      `Ime: ${name}`,
      `Email: ${email}`,
      `Telefon: ${phone || "—"}`,
      `Web / domena: ${website || "—"}`,
      `Što treba: ${needs.length ? needs.join(", ") : "—"}`,
      "",
      `Poruka:`,
      message || "—",
    ].join("\n");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Novi upit s homepage forme — PrimeLink",
          from_name: "PrimeLink homepage lead",
          name,
          email,
          phone,
          message: body,
          page_source: "/",
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || "Greška");
      }
    } catch {
      toast.error("Slanje nije uspjelo. Pokušajte ponovno ili nas kontaktirajte direktno.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-16">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">Hvala!</h3>
        <p className="text-muted-foreground">
          Zaprimili smo vaš upit i javit ćemo vam se u roku 24 sata s konkretnim prijedlogom.
        </p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Kontakt
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              Zatražite ponudu
            </h2>
            <p className="text-muted-foreground">
              Pošaljite nekoliko podataka — pripremit ćemo konkretan prijedlog.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 md:p-10 space-y-6"
          >
            {/* Honeypot — skriveno polje za spam zaštitu */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <Label className="mb-3 block">Što trebate?</Label>
              <div className="grid sm:grid-cols-2 gap-2">
                {NEEDS.map((item) => {
                  const checked = needs.includes(item);
                  return (
                    <label
                      key={item}
                      className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                        checked
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => toggleNeed(item)}
                      />
                      <span className="text-sm text-foreground">{item}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lead-name">Ime i prezime *</Label>
                <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="lead-website">Web stranica / domena</Label>
                <Input id="lead-website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="vasadomena.hr" maxLength={255} />
              </div>
              <div>
                <Label htmlFor="lead-email">Email *</Label>
                <Input id="lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
              </div>
              <div>
                <Label htmlFor="lead-phone">Telefon</Label>
                <Input id="lead-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={50} />
              </div>
            </div>

            <div>
              <Label htmlFor="lead-message">Poruka</Label>
              <Textarea
                id="lead-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                maxLength={1500}
                placeholder="Kratak opis projekta ili pitanja…"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">Odgovaramo u roku 24 sata.</p>
              <Button type="submit" size="lg" disabled={submitting} className="sm:w-auto w-full">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Šaljem…
                  </>
                ) : (
                  <>
                    Pošaljite upit <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeLeadForm;