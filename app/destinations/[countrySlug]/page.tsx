import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getRecord, recordDescription, recordImage, recordTitle } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 3600;
type Props = { params: Promise<{ countrySlug: string }> };
const canonical = (countrySlug: string) => `https://bablonstravelent.com/destinations/${encodeURIComponent(countrySlug)}`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countrySlug } = await params;
  const item = await getRecord(`/api/v1/destinations/${encodeURIComponent(countrySlug)}`);
  if (!item) return {};
  const title = recordTitle(item), description = recordDescription(item), image = recordImage(item), url = canonical(countrySlug);
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, type: "website", ...(image ? { images: [image] } : {}) }, twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) } };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { countrySlug } = await params;
  const item = await getRecord(`/api/v1/destinations/${encodeURIComponent(countrySlug)}`);
  if (!item || item.isActive === false) notFound();
  const title = recordTitle(item), url = canonical(countrySlug);
  return <>
    <Script id="destination-breadcrumb-jsonld" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://bablonstravelent.com/" }, { "@type": "ListItem", position: 2, name: "Destinations", item: "https://bablonstravelent.com/destinations" }, { "@type": "ListItem", position: 3, name: title, item: url }] }).replace(/</g, "\\u003c") }} />
    <LegacyPublicApp initialDestination={item} />
  </>;
}
