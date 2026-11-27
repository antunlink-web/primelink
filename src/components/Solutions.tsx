import { ArrowRight, BrainCircuit, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./Solutions.module.css";

const Solutions = () => {
  const { t } = useTranslation();

  return (
    <section id="rjesenja" className={styles.section} aria-labelledby="solutions-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{t("solutionsSection.badge")}</p>
          <h2 id="solutions-title" className={styles.title}>
            {t("solutionsSection.title")}
          </h2>
        </header>

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.flagship}`} data-solution-card="primelink-ai">
            <div className={styles.icon} aria-hidden="true">
              <BrainCircuit />
            </div>
            <div className={styles.content}>
              <div className={styles.headingRow}>
                <h3 className={styles.cardTitle}>{t("solutionsSection.items.primelinkai.name")}</h3>
                <span className={styles.status}>{t("solutionsSection.items.primelinkai.status")}</span>
              </div>
              <p className={styles.tagline}>{t("solutionsSection.items.primelinkai.tagline")}</p>
              <p className={styles.description}>{t("solutionsSection.items.primelinkai.description")}</p>
            </div>
          </article>

          <Link
            to="/redizajn-web-stranice"
            className={`${styles.card} ${styles.demoCard}`}
            data-solution-card="primedemo"
          >
            <div className={styles.icon} aria-hidden="true">
              <Sparkles />
            </div>
            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{t("solutionsSection.items.primedemo.name")}</h3>
              <p className={styles.tagline}>{t("solutionsSection.items.primedemo.tagline")}</p>
              <p className={styles.description}>{t("solutionsSection.items.primedemo.description")}</p>
              <span className={styles.cta}>
                {t("common.learnMore")}
                <ArrowRight aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
