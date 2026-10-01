import type { Metadata } from "next";
import { getRecords } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 60;
export const metadata: Metadata = {
  title: "Travel Destinations | Bablons Travel",
  description: "Explore destinations and plan your next holiday with Bablons Travel.",
  alternates: { canonical: "https://bablonstravelent.com/destinations" },
};

export default async function DestinationsPage() {
  const records = await getRecords("/api/v1/destinations/groups?active=true");
  return <LegacyPublicApp initialDestinations={records} />;
}
