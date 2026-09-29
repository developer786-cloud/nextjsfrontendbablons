import type { Metadata } from "next";
import LegacyPublicApp from "@/app/legacy-public-client";

export const metadata: Metadata = { title: "Contact Bablons Travel", description: "Contact Bablons Travel & Entertainment for help planning your next trip.", alternates: { canonical: "https://bablonstravelent.com/contact-us" } };

export default function ContactUsPage() { return <LegacyPublicApp />; }
