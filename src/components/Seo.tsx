import { Helmet } from "react-helmet-async";
import type { SeoMetadata } from "../data/seo";

export function Seo({ metadata: seo }: { metadata: SeoMetadata }) {
  return (
    <Helmet>
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
