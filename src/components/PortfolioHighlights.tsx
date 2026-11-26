import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { selectedProjects } from "@/data/selected-projects";
import styles from "./PortfolioHighlights.module.css";

export default function PortfolioHighlights() {
  const { t } = useTranslation();

  return (
    <section id="selected-projects" aria-labelledby="selected-projects-title" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="selected-projects-title">{t("approved.projects")}</h2>
          <Link to="/portfolio" className={styles.portfolioLink}>
            {t("approved.portfolio")}
          </Link>
        </div>
        <ul className={styles.projects}>
          {selectedProjects.map((project, index) => (
            <li key={project.name}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <div className={styles.metadata}>
                  <h3>{project.name}</h3>
                  <p>{t(`approved.projectTypes.${index}`)}</p>
                </div>
                <div className={styles.screenshot}>
                  <img
                    src={project.image}
                    alt={project.name}
                    width="1440"
                    height="900"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
