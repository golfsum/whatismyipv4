import type { Metadata } from "next";
import GeoDashboard from "@/components/GeoDashboard";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Geo Test Dashboard", robots: { index: false, follow: false } };

export default function Page() {
  return <><SiteHeader /><main className="container"><GeoDashboard /></main><SiteFooter /></>;
}
