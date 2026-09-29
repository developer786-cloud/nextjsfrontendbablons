const SITE_URL = "https://bablonstravelent.com";
const SITE_NAME = "Bablons Travel & Entertainment";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const normalizePath = (path = "/") => path === "/" ? "/" : `/${String(path).replace(/^\/+/, "").replace(/\/+$/, "")}`;
const absoluteUrl = (path = "/") => /^https?:\/\//i.test(path) ? path : `${SITE_URL}${normalizePath(path)}`;

// Route metadata and JSON-LD are emitted by the Next.js server routes.
export const upsertJsonLd = () => {};
export const removeJsonLd = () => {};
export const applyPageSeo = ({ path = "/" } = {}) => absoluteUrl(path);

export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const SITE_CONSTANTS = { SITE_URL, SITE_NAME, DEFAULT_IMAGE, absoluteUrl };
