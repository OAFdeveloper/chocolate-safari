import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSiteSettings } from "@/lib/content";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chocolate Safari",
    template: "%s · Chocolate Safari",
  },
  description:
    "Discover, taste, and remember chocolates with a personal tasting catalogue and AI Sommelier.",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg-base text-text-on-dark">
        <SiteHeader settings={settings} />
        <div className="flex-1">{children}</div>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
