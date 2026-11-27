import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./DemoLibrary.module.css";

const demos = [
  {
    key: "fitness",
    url: "https://demo.primelink.com.hr/sport/fitness-trener",
    image: "fitness-trainer.webp",
  },
  {
    key: "parking",
    url: "https://demo.primelink.com.hr/automobili/parking",
    image: "parking.webp",
  },
  {
    key: "fastFood",
    url: "https://demo.primelink.com.hr/restorani/fastfood",
    image: "fast-food.webp",
  },
] as const;

export default function DemoLibrary() {
  const { t } = useTranslation();

  return (
    <section id="demo-biblioteka" aria-labelledby="demo-library-title" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="demo-library-title">{t("approved.demos")}</h2>
          <p>{t("approved.fictional")}</p>
        </div>

        <ul className={styles.demos}>
          {demos.map((demo) => (
            <li key={demo.key}>
              <a
                href={demo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-labelledby={`demo-${demo.key}-title demo-${demo.key}-open`}
                aria-describedby={`demo-${demo.key}-description`}
                className={styles.card}
              >
                <div className={styles.screenshot}>
                  <img
                    src={`/demo-previews/${demo.image}`}
                    alt={t(`approved.demoExamples.${demo.key}.previewAlt`)}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={styles.content}>
                  <p className={styles.eyebrow}>{t("approved.demoLabel")}</p>
                  <h3 id={`demo-${demo.key}-title`}>{t(`approved.demoExamples.${demo.key}.name`)}</h3>
                  <p id={`demo-${demo.key}-description`} className={styles.description}>
                    {t(`approved.demoExamples.${demo.key}.description`)}
                  </p>
                  <span id={`demo-${demo.key}-open`} className={styles.action}>
                    {t("approved.openDemo")}
                    <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.catalogue}>
          <a
            href="https://demo.primelink.com.hr/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.catalogueLink}
          >
            {t("approved.catalogue")}
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.7} />
            <span className={styles.visuallyHidden}>{t("approved.demoNewTab")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
