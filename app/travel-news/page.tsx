import type { Metadata } from "next";
import { getRecords } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 60;
export const metadata: Metadata = { title: "Travel News | Bablons Travel", description: "Read the latest travel news and updates from Bablons Travel.", alternates: { canonical: "https://bablonstravelent.com/travel-news" } };

export default async function TravelNewsPage() {
  const [featured, latest, visaUpdates, airlineNews, countryNews] = await Promise.all([
    getRecords("/api/v1/news/featured?limit=6"),
    getRecords("/api/v1/news/latest?limit=8"),
    getRecords("/api/v1/news/category/visa-update?limit=6"),
    getRecords("/api/v1/news/category/airline-news?limit=6"),
    getRecords("/api/v1/news/category/country-news?limit=6"),
  ]);
  return <LegacyPublicApp initialNews={{ featured, latest, visaUpdates, airlineNews, countryNews }} />;
}
