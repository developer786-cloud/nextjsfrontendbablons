import type { Metadata } from "next";
import { getPackages, getRecords } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Bablons Travel & Entertainment | International Tour Packages from India",
  description: "Book international tour packages from India with Bablons Travel & Entertainment. Customized holidays, visa assistance, hotels, and guided travel planning.",
  alternates: { canonical: "https://bablonstravelent.com/" },
};

export default async function Home() {
  const [packages, destinations, blogs] = await Promise.all([
    getPackages(),
    getRecords("/api/v1/destinations/groups?active=true"),
    getRecords("/api/v1/blogs?limit=12"),
  ]);
  return <LegacyPublicApp initialPackages={packages} initialDestinations={destinations} initialBlogs={{ blogs }} initialHome={{ packages, destinations, blogs }} />;
}
