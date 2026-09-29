import type { Metadata } from "next";
import LegacyPublicApp from "@/app/legacy-public-client";

export const metadata: Metadata = { title: "About Bablons Travel & Entertainment", description: "Learn about Bablons Travel & Entertainment, our travel expertise, mission, and vision.", alternates: { canonical: "https://bablonstravelent.com/about" } };

export default function AboutPage() { return <LegacyPublicApp />; }
