import type { Metadata } from "next";
import { getPackages } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "International Tour Packages from India | Bablons Travel",
  description: "Explore published international tour packages from Bablons Travel & Entertainment.",
  alternates: { canonical: "https://bablonstravelent.com/packages" },
  openGraph: {
    title: "International Tour Packages from India | Bablons Travel",
    description: "Explore published international tour packages from Bablons Travel & Entertainment.",
    url: "https://bablonstravelent.com/packages",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default async function PackagesPage() {
  const packages = await getPackages();
  return <LegacyPublicApp initialPackages={packages} />;
}
