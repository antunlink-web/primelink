import { useTranslation } from "react-i18next";

const languages = [
  { code: "hr", label: "HR" },
  { code: "en", label: "EN" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.startsWith("en") ? "en" : "hr";

  return (
    <div className="flex h-9 shrink-0 items-center rounded-full border border-border bg-secondary p-0.5" role="group" aria-label={currentLanguage === "en" ? "Language" : "Jezik"}>
      {languages.map((lang) => (
        <button
          type="button"
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          aria-pressed={currentLanguage === lang.code}
          className={`h-7 rounded-full px-2 text-xs font-semibold tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            currentLanguage === lang.code
              ? "border border-border bg-card text-foreground shadow-[var(--pl-shadow-lift)]"
              : "border border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
