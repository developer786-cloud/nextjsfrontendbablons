import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/dashboard", "/api", "/*?*"] },
      { userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "PerplexityBot", "ClaudeBot", "anthropic-ai", "CCBot"], allow: "/" },
    ],
    sitemap: "https://bablonstravelent.com/sitemap.xml",
  };
}
