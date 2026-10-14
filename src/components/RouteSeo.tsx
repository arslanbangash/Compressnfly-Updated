import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { notFoundMeta, pages, SITE_NAME, SITE_URL } from "@/seo/meta";

/**
 * Renders <title>, description, canonical, Open Graph and JSON-LD
 * for the current route, based on src/seo/meta.ts.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  const meta = pages[path];
  const isNotFound = !meta;
  const m = meta ?? notFoundMeta;
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const ogImage = `${SITE_URL}/my-logo.png`;

  const jsonLd: object[] = [];
  if (path === "/") {
    jsonLd.push(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any (runs in the browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: m.description,
      },
    );
  }
  if (m.type === "tool") {
    jsonLd.push(
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: m.name ?? m.title,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any (runs in the browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: m.description,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: m.name ?? m.title, item: url },
        ],
      },
    );
  }
  if (m.type === "article") {
    jsonLd.push(
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: m.title,
        description: m.description,
        datePublished: m.datePublished,
        dateModified: m.dateModified ?? m.datePublished,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/about` },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: ogImage },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: m.title, item: url },
        ],
      },
    );
  }

  return (
    <Helmet>
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      {isNotFound ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      <meta property="og:type" content={m.type === "article" ? "article" : "website"} />
      {!isNotFound && <meta property="og:url" content={url} />}
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary" />
      {jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default RouteSeo;
