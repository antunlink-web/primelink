import { useTranslation } from "react-i18next";

const partners = [
  { name: "Stripe", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg" },
  { name: "Nextcloud", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nextcloud.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" },
  { name: "Contabo", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/contabo.svg" },
  { name: "Cloudflare", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cloudflare.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/docker.svg" },
];

const TrustLogos = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-background border-y border-border relative">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
          {t('trust.title')}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 opacity-50 hover:opacity-80 transition-opacity"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-7 w-7 invert"
              />
              <span className="text-foreground font-medium text-lg">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustLogos;
