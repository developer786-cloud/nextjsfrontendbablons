import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getPackage, packageDescription, packageImage } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPackage(slug);
  if (!item) return {};

  const title = item.seo?.metaTitle || item.title || item.name || "Travel package";
  const description = packageDescription(item);
  const url = `https://bablonstravelent.com/packages/${encodeURIComponent(slug)}`;
  const image = packageImage(item);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", ...(image ? { images: [image] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

function JsonLd({ value }: { value: Record<string, unknown> }) {
  const type = String(value["@type"] || "schema").toLowerCase();
  return <Script id={`package-${type}-jsonld`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getPackage(slug);
  if (!item || item.status && item.status !== "published") notFound();

  const title = item.title || item.name || "Travel package";
  const description = packageDescription(item);
  const url = `https://bablonstravelent.com/packages/${encodeURIComponent(slug)}`;
  const image = packageImage(item);
  const price = item.pricing?.pricePerPerson ?? item.pricing?.basePrice;
  const faqs = (item.faqs || []).filter((faq) => faq.question?.trim() && faq.answer?.trim());

  return (
    <>
      <JsonLd value={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://bablonstravelent.com/" },
          { "@type": "ListItem", position: 2, name: "Packages", item: "https://bablonstravelent.com/packages" },
          { "@type": "ListItem", position: 3, name: title, item: url },
        ],
      }} />
      {typeof price === "number" && price > 0 ? <JsonLd value={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        ...(description ? { description } : {}),
        ...(image ? { image: [image] } : {}),
        brand: { "@type": "Brand", name: "Bablons Travel & Entertainment" },
        category: "Tour package",
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: item.pricing?.currency || "INR",
          price,
          availability: "https://schema.org/InStock",
        },
      }} /> : null}
      {faqs.length ? <JsonLd value={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} /> : null}
      <LegacyPublicApp initialPackage={item} />
    </>
  );
}
