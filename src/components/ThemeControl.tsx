import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setPref, useThemePref, type ThemePref } from "@/theme";

// PrimeLink AI's three choices, in one header control to keep the navigation intact.
const options = [
  { value: "system", hr: "Prema uređaju", en: "Follow device", Icon: Monitor },
  { value: "light", hr: "Svijetla", en: "Light", Icon: Sun },
  { value: "dark", hr: "Tamna", en: "Dark", Icon: Moon },
] satisfies { value: ThemePref; hr: string; en: string; Icon: typeof Sun }[];

export default function ThemeControl() {
  const pref = useThemePref();
  const { i18n } = useTranslation();
  const language = i18n.language.startsWith("en") ? "en" : "hr";
  const selected = options.find((option) => option.value === pref)!;
  const label = `${language === "en" ? "Site theme" : "Tema stranice"}: ${selected[language]}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" type="button" aria-label={label} title={label}>
          <selected.Icon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={pref} aria-label={language === "en" ? "Site theme" : "Tema stranice"}
          onValueChange={(value) => {
            if (value === "light" || value === "dark" || value === "system") setPref(value);
          }}>
          {options.map(({ value, Icon, ...labels }) => (
            <DropdownMenuRadioItem key={value} value={value} className="gap-2">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {labels[language]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
