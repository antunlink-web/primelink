import { useTranslation } from "react-i18next";
import { englishPageSeo } from "../data/seo";
import { Helmet } from "react-helmet-async";
import type { SeoMetadata } from "../data/seo";

export function Seo({ metadata }: { metadata: SeoMetadata }) {
  const { i18n } = useTranslation();
  const english = i18n.language?.startsWith("en");
  const path = metadata.canonical?.replace("https://primelink.hr", "");
  const translated = english && path ? englishPageSeo[path] : undefined;
  const seo = translated ? { ...metadata, ...translated, ogTitle: translated.title, ogDescription: translated.description } : metadata;
  return (
    <Helmet htmlAttributes={{ lang: english ? "en" : "hr" }}>
      <title>{seo.title}</title>
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}
      {seo.ogTitle && <meta property="og:title" content={seo.ogTitle} />}
      {seo.ogDescription && <meta property="og:description" content={seo.ogDescription} />}
      {seo.ogUrl && <meta property="og:url" content={seo.ogUrl} />}
      {seo.ogType && <meta property="og:type" content={seo.ogType} />}
      {seo.robots && <meta name="robots" content={seo.robots} />}
    </Helmet>
  );
}
