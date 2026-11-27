import { useTranslation } from "react-i18next";
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
 return <section id="faq" className="py-20 bg-card border-y border-border"><div className="max-w-3xl mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold mb-8">{t('approved.faq')}</h2>{[0,1,2,3,4].map(i=><details key={i} className="border-b border-border py-5"><summary className="cursor-pointer font-semibold text-lg">{t(`approved.questions.${i}`)}</summary><p className="pt-4 text-muted-foreground leading-relaxed">{t(`approved.answers.${i}`)}</p></details>)}</div></section>;
}
