import { Globe2, Layers3, PlugZap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getService } from "@/data/services";
import styles from "./Services.module.css";

const groups = [
  { icon: Globe2, slugs: ["izrada-web-stranica", "redizajn-web-stranice", "izrada-web-trgovina"] },
  { icon: Layers3, slugs: ["izrada-crm-sustava", "izrada-web-aplikacija", "saas-razvoj"] },
  { icon: PlugZap, slugs: ["integracije-karticnog-placanja", "hosting-odrzavanje"] },
];

export default function Services() {
  const { t, i18n } = useTranslation();

  return (
    <section id="services" aria-labelledby="services-heading" className={styles.section}>
      <div className={styles.container}>
        <h2 id="services-heading" className={styles.heading}>{t("approved.services")}</h2>
        <ul className={styles.groups}>
          {groups.map(({ icon: Icon, slugs }, index) => (
            <li key={slugs[0]}>
              <article className={styles.card} aria-labelledby={`service-group-${index}`}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.4} />
                </span>
                <h3 id={`service-group-${index}`} className={styles.title}>
                  {t(`approved.groups.${index}`)}
                </h3>
                <ul className={styles.links}>
                  {slugs.map((slug) => (
                    <li key={slug}>
                      <Link to={`/${slug}`} className={styles.link}>
                        {getService(slug, i18n.language)?.navTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
                {index === 2 && (
                  <p className={styles.description}>
                    {t("servicesGrid.items.integracije-karticnog-placanja.description")}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
