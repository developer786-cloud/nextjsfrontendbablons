import type { Metadata } from "next";
import { getRecords } from "@/lib/packages";
import LegacyPublicApp from "@/app/legacy-public-client";

export const revalidate = 60;
export const metadata: Metadata = { title: "Travel Blogs & Guides | Bablons Travel", description: "Read travel guides, tips, and holiday inspiration from Bablons Travel.", alternates: { canonical: "https://bablonstravelent.com/blogs" } };

export default async function BlogsPage() {
  const records = await getRecords("/api/v1/blogs?limit=60", 60);
  return <LegacyPublicApp initialBlogs={{ blogs: records }} />;
}
