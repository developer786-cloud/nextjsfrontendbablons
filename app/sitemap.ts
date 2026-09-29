import type { MetadataRoute } from "next";
import { API_BASE_URL } from "@/lib/packages";

const SITE_URL = "https://bablonstravelent.com";
const staticPaths = [
  "/", "/destinations", "/packages", "/blogs", "/travel-news", "/news", "/gallery", "/about", "/contact-us",
  "/faq", "/dubai/faq", "/thailand/faq", "/uzbekistan/faq", "/georgia/faq", "/visa-faq", "/flight-faq",
  "/hotel-faq", "/payment-faq", "/emi-faq", "/passport-faq", "/travel-insurance-faq", "/honeymoon-faq",
  "/family-tour-faq", "/group-tour-faq", "/corporate-tour-faq", "/student-tour-faq", "/luxury-tour-faq",
  "/budget-tour-faq", "/packing-faq", "/travel-safety-faq", "/plan-your-trip", "/privacy-policy", "/terms-and-conditions",
];

function decodeXml(value: string) {
  return value.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(`${API_BASE_URL}/sitemap.xml`, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error("Backend sitemap unavailable");
    const xml = await response.text();
    const entries: MetadataRoute.Sitemap = [];
    const add = (loc: string | undefined, lastmod?: string) => {
      if (!loc) return;
      let url = decodeXml(loc.trim());
      try {
        const parsed = new URL(url, SITE_URL);
        if (parsed.hostname !== new URL(SITE_URL).hostname || parsed.search || parsed.hash) return;
        url = parsed.toString().replace(/\/$/, parsed.pathname === "/" ? "/" : "");
      } catch { return; }
      url = url.replace(/\/contact\/?$/, "/contact-us");
      if (entries.some((entry) => entry.url === url)) return;
      const validDate = lastmod && !Number.isNaN(Date.parse(lastmod)) ? new Date(lastmod) : undefined;
      entries.push({ url, ...(validDate ? { lastModified: validDate } : {}) });
    };
    // Accept both a urlset and a sitemap index, following the backend's real sitemap
    // rather than silently returning an empty list when the API returns an index.
    for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
      add(match[1].match(/<loc>([\s\S]*?)<\/loc>/i)?.[1], match[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1]);
    }
    if (!entries.length) {
      const sitemapLocs = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/gi)]
        .map((match) => match[1].match(/<loc>([\s\S]*?)<\/loc>/i)?.[1]?.trim()).filter((loc): loc is string => Boolean(loc));
      const nested = await Promise.all(sitemapLocs.map(async (loc) => {
        try {
          const sitemapUrl = new URL(decodeXml(loc), SITE_URL);
          if (sitemapUrl.hostname !== new URL(SITE_URL).hostname) return "";
          const nestedResponse = await fetch(sitemapUrl, { next: { revalidate: 3600 } });
          return nestedResponse.ok ? nestedResponse.text() : "";
        } catch { return ""; }
      }));
      for (const nestedXml of nested) for (const match of nestedXml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
        add(match[1].match(/<loc>([\s\S]*?)<\/loc>/i)?.[1], match[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/i)?.[1]);
      }
    }
    for (const path of staticPaths) add(`${SITE_URL}${path}`);
    return entries;
  } catch {
    return staticPaths.map((path) => ({ url: `${SITE_URL}${path}` }));
  }
}
