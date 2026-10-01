import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import LegacyPublicApp from "@/app/legacy-public-client";
import { getRecord, recordDescription, recordImage, recordTitle } from "@/lib/packages";

export const revalidate = 60;
type Props = { params: Promise<{ countrySlug: string; citySlug: string }> };

async function getDestination(countrySlug: string, citySlug: string) {
  return getRecord(`/api/v1/destinations/${encodeURIComponent(citySlug)}/page?include=blogs,packages,hotels,nearbyDestinations&countrySlug=${encodeURIComponent(countrySlug)}&cacheTtl=60`);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countrySlug, citySlug } = await params;
  const page = await getDestination(countrySlug, citySlug);
  const item = (page?.destination as typeof page) || page;
  if (!item) return {};
  const title = recordTitle(item), description = recordDescription(item), image = recordImage(item);
  const url = `https://bablonstravelent.com/destinations/${encodeURIComponent(countrySlug)}/${encodeURIComponent(citySlug)}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", ...(image ? { images: [image] } : {}) }, twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) } };
}

export default async function DestinationCityPage({ params }: Props) {
  const { countrySlug, citySlug } = await params;
  const page = await getDestination(countrySlug, citySlug);
  const item = (page?.destination as typeof page) || page;
  if (!item || item.isActive === false) notFound();
  const title = recordTitle(item);
  const url = `https://bablonstravelent.com/destinations/${encodeURIComponent(countrySlug)}/${encodeURIComponent(citySlug)}`;
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://bablonstravelent.com/" }, { "@type": "ListItem", position: 2, name: "Destinations", item: "https://bablonstravelent.com/destinations" }, { "@type": "ListItem", position: 3, name: title, item: url }] };
  return <><Script id="destination-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} /><LegacyPublicApp initialDestination={item} /></>;
}
