import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setPref, useThemePref, type ThemePref } from "@/theme";

const options = [
  { value: "light", hr: "Svijetla", en: "Light", Icon: Sun },
  { value: "dark", hr: "Tamna", en: "Dark", Icon: Moon },
] satisfies { value: ThemePref; hr: string; en: string; Icon: typeof Sun }[];

export default function ThemeControl() {
  const pref = useThemePref();
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith("en") ? "en" : "hr";
  const legend = language === "en" ? "Site theme" : "Tema stranice";

  return (
    <fieldset className="shrink-0">
      <legend className="sr-only">{legend}</legend>
      <div className="flex h-9 items-center rounded-full border border-border bg-secondary p-0.5">
        {options.map(({ value, Icon, ...labels }) => {
          const label = labels[language];
          return (
            <label
              key={value}
              title={`${legend}: ${label}`}
              className={`relative inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2 text-xs font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background ${
                pref === value
                  ? "border border-border bg-card text-foreground shadow-[var(--pl-shadow-lift)]"
                  : "border border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <input
                type="radio"
                name="site-theme"
                value={value}
                checked={pref === value}
                onChange={() => setPref(value)}
                className="sr-only"
              />
              <Icon className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
