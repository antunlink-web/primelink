import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const demos = [
  { key: "fitness", path: "/sport/fitness-trener", image: "fitness-trainer.webp" },
  { key: "parking", path: "/automobili/parking", image: "parking.webp" },
  { key: "fastFood", path: "/restorani/fastfood", image: "fast-food.webp" },
] as const;

export default function DemoLibrary() {
  const { t } = useTranslation();

  return (
    <section
      id="demo-biblioteka"
      aria-labelledby="demo-library-title"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4">
        <div className="mb-9 max-w-2xl md:mb-12">
          <h2 id="demo-library-title" className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {t("approved.demos")}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("approved.fictional")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {demos.map((demo) => (
            <a
              key={demo.key}
              href={`https://demo.primelink.com.hr${demo.path}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-labelledby={`demo-${demo.key}-title demo-${demo.key}-open`}
              aria-describedby={`demo-${demo.key}-label`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] hover:border-primary/50 hover:shadow-[var(--shadow-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-300 motion-safe:hover:-translate-y-1"
            >
              <img
                src={`/demo-previews/${demo.image}`}
                alt={t(`approved.demoExamples.${demo.key}.previewAlt`)}
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[8/5] w-full border-b border-border object-cover object-top"
              />
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <p
                  id={`demo-${demo.key}-label`}
                  className="mb-4 self-start rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
                >
                  {t("approved.demoLabel")}
                </p>
                <h3 id={`demo-${demo.key}-title`} className="mb-3 text-2xl font-semibold tracking-tight">
                  {t(`approved.demoExamples.${demo.key}.name`)}
                </h3>
                <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                  {t(`approved.demoExamples.${demo.key}.description`)}
                </p>
                <span
                  id={`demo-${demo.key}-open`}
                  className="mt-auto border-t border-border pt-5 text-sm font-medium text-foreground group-hover:underline group-hover:decoration-accent group-hover:underline-offset-4 group-focus-visible:underline group-focus-visible:underline-offset-4"
                >
                  {t("approved.openDemo")}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-9 md:mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-auto min-h-12 w-full whitespace-normal py-3 text-base focus-visible:ring-accent motion-reduce:transition-none sm:w-auto"
          >
            <a href="https://demo.primelink.com.hr/" target="_blank" rel="noopener noreferrer">
              {t("approved.catalogue")}
              <span className="sr-only">{t("approved.demoNewTab")}</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
