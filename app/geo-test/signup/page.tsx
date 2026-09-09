import type { Metadata } from "next";
import GeoAuthForm from "@/components/GeoAuthForm";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export const metadata: Metadata = { title: "Create Geo Test Account", robots: { index: false, follow: true } };

export default function Page() {
  return <><SiteHeader /><main className="container"><GeoAuthForm mode="signup" /></main><SiteFooter /></>;
}
