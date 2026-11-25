import type { Metadata } from "next";
import { Onest, Red_Hat_Text, Sofia_Sans } from "next/font/google";
import { ConceptNotice } from "@/components/concept-notice";
import { PageScrollbar } from "@/components/page-scrollbar";
import { Search } from "@/components/search/search";
import { SiteFooter } from "@/components/site-footer";
import { BottomBar } from "@/components/site-nav/bottom-bar";
import { Sidebar } from "@/components/site-nav/sidebar";
import { SiteSettings } from "@/components/settings/site-settings";
import { settingsScript } from "@/lib/settings-script";
import "overlayscrollbars/overlayscrollbars.css";
import "./globals.css";

const redHat = Red_Hat_Text({ subsets: ["latin"], variable: "--face-red-hat" });
const onest = Onest({ subsets: ["latin"], variable: "--face-onest", preload: false });
const sofia = Sofia_Sans({ subsets: ["latin"], variable: "--face-sofia", preload: false });

export const metadata: Metadata = {
  title: "Store redesign concept (unofficial)",
  description: "Unofficial portfolio concept, not affiliated with Valve.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-overlayscrollbars-initialize
      className={`${redHat.variable} ${onest.variable} ${sofia.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: settingsScript }} />
      </head>
      <body data-overlayscrollbars-initialize>
        <ConceptNotice />
        <div className="pb-20 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:pb-0">
          <Sidebar />
          <div>
            <div className="mx-auto w-full max-w-[100rem] px-4 md:px-6">
              {children}
              <SiteFooter />
            </div>
          </div>
        </div>
        <BottomBar />
        <Search />
        <SiteSettings />
        <PageScrollbar />
      </body>
    </html>
  );
}
