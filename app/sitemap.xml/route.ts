const BACKEND_SITEMAP_URL = "https://bablonstravelent.com/api/v1/seo/sitemap.xml";

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BACKEND_SITEMAP_URL}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=900, s-maxage=3600",
    },
  });
}
