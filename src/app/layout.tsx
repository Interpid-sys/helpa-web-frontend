import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import "../styles.css";

export const metadata: Metadata = {
  title: "oyaAlerts - Community-powered emergency response for Nigeria",
  description:
    "oyaAlerts is building a community-powered emergency response network for Nigeria. Join the waitlist to help decide where we launch first.",
  authors: [{ name: "oyaAlerts" }],
  openGraph: {
    title: "oyaAlerts - Community-powered emergency response",
    description:
      "Emergency help should not depend on who answers first. Join the waitlist for oyaAlerts' coordinated response network.",
    images: [{ url: "https://oyaa.ng/og-banner.png", width: 1200, height: 630 }],
    url: "https://oyaa.ng",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "oyaAlerts - Community-powered emergency response",
    description:
      "Emergency help should not depend on who answers first. Join the waitlist for oyaAlerts' coordinated response network.",
    images: ["https://oyaa.ng/og-banner.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
