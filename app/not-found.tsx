import type {Metadata} from "next";
import {SiteFooter,SiteHeader} from "@/components/SiteChrome";

export const metadata:Metadata={title:"Page not found",description:"The requested page could not be found.",robots:{index:false,follow:true},alternates:{canonical:null}};

export default function NotFound(){return <><SiteHeader/><main className="container content"><h1>Page not found</h1><p>The address may have changed or the page may no longer exist.</p><p><a href="/">Return to the IP address and network tools</a></p></main><SiteFooter/></>}
