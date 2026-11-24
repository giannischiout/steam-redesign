import type { Metadata } from "next";
import { ConceptNotice } from "@/components/concept-notice";
import { SiteFooter } from "@/components/site-footer";
import { BottomBar } from "@/components/site-nav/bottom-bar";
import { Sidebar } from "@/components/site-nav/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Store redesign concept (unofficial)",
  description: "Unofficial portfolio concept, not affiliated with Valve.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <div className="pb-20 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:pb-0">
          <Sidebar />
          <div>
            <ConceptNotice />
            <div className="mx-auto w-full max-w-[100rem] px-4 md:px-8">
              {children}
              <SiteFooter />
            </div>
          </div>
        </div>
        <BottomBar />
      </body>
    </html>
  );
}
