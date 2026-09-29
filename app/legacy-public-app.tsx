"use client";

import { type ReactNode } from "react";
import { BrowserRouter, Link, Route, Routes, Outlet, useLocation } from "react-router-dom";
import Navbar from "@/legacy/src/components/navbar/Navbar";
import Footer from "@/legacy/src/components/footer/Footer";
import FloatingContactButtons from "@/legacy/src/components/common/FloatingContactButtons";
import MobileFooterActions from "@/legacy/src/components/common/MobileFooterActions";
import TravelConsultationPopup from "@/legacy/src/components/common/TravelConsultationPopup";
import HomePage from "@/legacy/src/pages/Home/HomePage";
import DestinationsListPage from "@/legacy/src/pages/Destinations/DestinationsListPage";
import DestinationDetailsPage from "@/legacy/src/pages/Destinations/DestinationDetailsPage";
import PackagesListPage from "@/legacy/src/pages/Packages/PackagesListPage";
import PackageDetailsPage from "@/legacy/src/pages/Packages/PackageDetailsPage";
import BlogsListPage from "@/legacy/src/pages/Blogs/BlogsListPage";
import BlogDetailsPage from "@/legacy/src/pages/Blogs/BlogDetailsPage";
import GalleryPage from "@/legacy/src/pages/Gallery/GalleryPage";
import AboutPage from "@/legacy/src/pages/About/AboutPage";
import ContactPage from "@/legacy/src/pages/Contact/ContactPage";
import NewsPage from "@/legacy/src/pages/News/NewsPage";
import SingleNewsPage from "@/legacy/src/pages/News/SingleNewsPage";
import FAQPage from "@/legacy/src/pages/FAQ/FAQPage";
import PrivacyPolicyPage from "@/legacy/src/pages/Privacy/PrivacyPolicyPage";
import TermsPage from "@/legacy/src/pages/Terms/TermsPage";
import TripPlannerPage from "@/legacy/src/pages/TripPlanner/TripPlannerPage";
import NotFoundPage from "@/legacy/src/pages/NotFound/NotFoundPage";
import type { ComponentType } from "react";

const JsPage = (component: unknown) => component as ComponentType<Record<string, unknown>>;
const HomePageView = JsPage(HomePage);
const DestinationsListView = JsPage(DestinationsListPage);
const DestinationDetailsView = JsPage(DestinationDetailsPage);
const PackagesListView = JsPage(PackagesListPage);
const PackageDetailsView = JsPage(PackageDetailsPage);
const BlogsListView = JsPage(BlogsListPage);
const BlogDetailsView = JsPage(BlogDetailsPage);
const NewsView = JsPage(NewsPage);
const SingleNewsView = JsPage(SingleNewsPage);
const FaqView = JsPage(FAQPage);

function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Navbar />
      <main id="main-content" className="app-main flex-1">{children || <Outlet />}</main>
      <Footer />
      <FloatingContactButtons />
      <MobileFooterActions />
      <TravelConsultationPopup />
    </div>
  );
}

const faqPaths = [
  "/faq", "/dubai/faq", "/thailand/faq", "/uzbekistan/faq", "/georgia/faq", "/visa-faq", "/flight-faq", "/hotel-faq", "/payment-faq", "/emi-faq", "/passport-faq", "/travel-insurance-faq", "/honeymoon-faq", "/family-tour-faq", "/group-tour-faq", "/corporate-tour-faq", "/student-tour-faq", "/luxury-tour-faq", "/budget-tour-faq", "/packing-faq", "/travel-safety-faq",
];

type LegacyPublicAppProps = {
  initialPackages?: unknown[];
  initialPackage?: unknown;
  initialDestination?: unknown;
  initialBlog?: unknown;
  initialArticle?: unknown;
  initialDestinations?: unknown[];
  initialBlogs?: unknown;
  initialHome?: unknown;
  initialNews?: unknown;
};

function LegacyPublicRoutes({ initialPackages = [], initialPackage = null, initialDestination = null, initialBlog = null, initialArticle = null, initialDestinations = [], initialBlogs = null, initialHome = null, initialNews = null }: LegacyPublicAppProps) {
  const { pathname } = useLocation();
  const currentSlug = pathname.split("/").filter(Boolean).at(-1);
  const packageForRoute = pathname.startsWith("/packages/") && (initialPackage as { slug?: string } | null)?.slug === currentSlug ? initialPackage : null;
  const destinationForRoute = pathname.startsWith("/destinations/") && ((initialDestination as { slug?: string; citySlug?: string } | null)?.slug === currentSlug || (initialDestination as { citySlug?: string } | null)?.citySlug === currentSlug) ? initialDestination : null;
  const blogForRoute = pathname.startsWith("/blogs/") && (initialBlog as { slug?: string } | null)?.slug === currentSlug ? initialBlog : null;
  const articleForRoute = (pathname.startsWith("/news/") || pathname.startsWith("/travel-news/")) && (initialArticle as { slug?: string } | null)?.slug === currentSlug ? initialArticle : null;
  return (
    <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePageView initialData={initialHome} />} />
          <Route path="/destinations" element={<DestinationsListView initialDestinations={initialDestinations} />} />
          <Route path="/destinations/:slug" element={<DestinationDetailsView initialDestination={destinationForRoute} />} />
          <Route path="/destinations/:countrySlug/:citySlug" element={<DestinationDetailsView initialDestination={destinationForRoute} />} />
          <Route path="/packages" element={<PackagesListView initialPackages={initialPackages} />} />
          <Route path="/packages/:slug" element={<PackageDetailsView initialPackage={packageForRoute} />} />
          <Route path="/blogs" element={<BlogsListView initialBlogs={initialBlogs} />} />
          <Route path="/blogs/:slug" element={<BlogDetailsView initialBlog={blogForRoute} />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/news" element={<NewsView initialData={initialNews} />} />
          <Route path="/travel-news" element={<NewsView initialData={initialNews} />} />
          <Route path="/news/:slug" element={<SingleNewsView initialArticle={articleForRoute} />} />
          <Route path="/travel-news/:slug" element={<SingleNewsView initialArticle={articleForRoute} />} />
          {faqPaths.map((path) => <Route key={path} path={path} element={<FaqView />} />)}
          <Route path="/plan-your-trip" element={<TripPlannerPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/gallery/:destinationId" element={<GalleryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
    </Routes>
  );
}

export default function LegacyPublicApp(props: LegacyPublicAppProps) {
  return <BrowserRouter><LegacyPublicRoutes {...props} /></BrowserRouter>;
}

export { Link };
