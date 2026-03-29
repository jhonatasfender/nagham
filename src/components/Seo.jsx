import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const ROUTE_PAGE_KEY = {
  "/": "home",
  "/about": "about",
  "/chord-builder": "chordBuilder",
};

export function Seo() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const pageKey = ROUTE_PAGE_KEY[pathname] ?? "home";

  const siteName = t("seo.siteName");
  const pageTitle = t(`seo.pages.${pageKey}.title`);
  const description = t(`seo.pages.${pageKey}.description`);
  const documentTitle = t("seo.documentTitle", {
    title: pageTitle,
    site: siteName,
  });

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = origin
    ? `${origin}${pathname.startsWith("/") ? pathname : `/${pathname}`}`
    : "";

  const ogImage = origin ? `${origin}/icons.svg` : "/icons.svg";

  const jsonLd =
    pathname === "/"
      ? {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: siteName,
          description: t("seo.pages.home.description"),
          applicationCategory: "EducationalApplication",
          operatingSystem: "Any",
          url: canonical || undefined,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }
      : null;

  return (
    <Helmet
      defaultTitle={siteName}
      htmlAttributes={{ lang: i18n.language }}
      prioritizeSeoTags
    >
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={documentTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:locale" content={i18n.language.replace("-", "_")} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={documentTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd ? (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      ) : null}
    </Helmet>
  );
}
