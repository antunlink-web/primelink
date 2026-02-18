import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN" },
  { code: "hr", label: "HR" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex items-center rounded-lg overflow-hidden border border-border">
      {languages.map((lang, idx) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`px-3 py-1 text-sm font-medium transition-colors ${
            i18n.language === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          } ${idx !== 0 ? "border-l border-border" : ""}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
