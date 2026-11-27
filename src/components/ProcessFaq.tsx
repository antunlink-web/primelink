import { useTranslation } from "react-i18next";
import faqStyles from "./Faq.module.css";
import styles from "./Process.module.css";

export function Process() {
  const { t } = useTranslation();

  return (
    <section id="process" className={styles.section} aria-labelledby="process-heading">
      <div className={styles.container}>
        <h2 id="process-heading" className={styles.heading}>
          {t("approved.process")}
        </h2>

        <ol className={styles.steps}>
          {[0, 1, 2, 3].map((index) => (
            <li key={index} className={styles.step}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.copy}>
                <h3 className={styles.title}>{t(`approved.steps.${index}`)}</h3>
                <p className={styles.description}>{t(`approved.stepText.${index}`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useTranslation();

  return (
    <section id="faq" className={faqStyles.section} aria-labelledby="faq-heading">
      <div className={faqStyles.container}>
        <h2 id="faq-heading" className={faqStyles.heading}>
          {t("approved.faq")}
        </h2>

        <div className={faqStyles.list}>
          {[0, 1, 2, 3, 4].map((index) => (
            <details key={index} className={faqStyles.item}>
              <summary className={faqStyles.question}>
                <span>{t(`approved.questions.${index}`)}</span>
                <span className={faqStyles.icon} aria-hidden="true">
                  <svg viewBox="0 0 20 20" focusable="false">
                    <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
                  </svg>
                </span>
              </summary>
              <p className={faqStyles.answer}>{t(`approved.answers.${index}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
