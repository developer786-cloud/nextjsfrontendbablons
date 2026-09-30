import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import brandLogo from "@/legacy/src/assets/logos/Bablons Logo.png";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://bablonstravelent.com"),
  title: {
    default: "Bablons Travel & Entertainment | International Tour Packages from India",
    template: "%s | Bablons Travel",
  },
  description: "Book international tour packages from India with Bablons Travel & Entertainment. Customized holidays, visa assistance, hotels, and guided travel planning.",
  category: "travel",
  applicationName: "Bablons Travel & Entertainment",
  icons: { icon: brandLogo.src, shortcut: brandLogo.src, apple: brandLogo.src },
  referrer: "strict-origin-when-cross-origin",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Bablons Travel & Entertainment",
    locale: "en_IN",
    url: "https://bablonstravelent.com/",
    title: "Bablons Travel & Entertainment | International Tour Packages from India",
    description: "Discover international holidays, visa assistance, hotels, and customized travel packages with Bablons Travel & Entertainment.",
    images: ["https://bablonstravelent.com/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TravelWithBablo",
    title: "Bablons Travel & Entertainment | International Tour Packages from India",
    description: "Book international holiday packages and customized travel experiences from India.",
    images: ["https://bablonstravelent.com/og-image.jpg"],
  },
};

const travelAgencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": "https://bablonstravelent.com/#travelagency",
  name: "Bablons Travel & Entertainment",
  url: "https://bablonstravelent.com/",
  logo: `https://bablonstravelent.com${brandLogo.src}`,
  image: "https://bablonstravelent.com/og-image.jpg",
  description: "Bablons Travel & Entertainment provides international tour packages, customized holidays, visa assistance, flights, hotels, honeymoon packages, family vacations, group tours, and luxury travel planning from India.",
  telephone: "+91-9810212399",
  email: "info.bablonstravel@gmail.com",
  priceRange: "₹₹",
  openingHours: "Mo-Sa 10:00-19:00",
  address: { "@type": "PostalAddress", addressLocality: "New Delhi", addressRegion: "Delhi", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.6292858, longitude: 77.0755844 },
  areaServed: ["India", "Dubai", "Georgia", "Uzbekistan", "Thailand", "Bali", "Europe", "Singapore", "Malaysia", "Vietnam", "Azerbaijan", "Maldives"],
  serviceType: ["International Tour Packages", "Holiday Packages", "Visa Assistance", "Flight Booking", "Hotel Booking", "Honeymoon Packages", "Family Tours", "Group Tours", "Luxury Holidays"],
  sameAs: ["https://www.instagram.com/travelwithbablons/", "https://www.facebook.com/people/Bablons-Travel-Entertainment/61590942031216/", "https://x.com/TravelWithBablo", "https://in.pinterest.com/bablonstravelandentertainment/", "https://www.youtube.com/@travelwithbablons"],
  contactPoint: { "@type": "ContactPoint", telephone: "+91-9810212399", contactType: "customer service", areaServed: "IN", availableLanguage: ["English", "Hindi"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MB9SM7RM');`}
        </Script>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MB9SM7RM" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" /></noscript>
        <script
          id="travel-agency-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgencySchema).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
