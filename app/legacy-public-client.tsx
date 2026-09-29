"use client";

import dynamic from "next/dynamic";

const LegacyPublicApp = dynamic(() => import("./legacy-public-app"), {
  ssr: false,
  loading: () => <main aria-busy="true" className="min-h-[50vh]" />,
});

export default LegacyPublicApp;
