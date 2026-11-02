import { siteMarkup } from "@/site-markup";
import SiteEnhancements from "@/components/site-enhancements";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen" dangerouslySetInnerHTML={{ __html: siteMarkup }} />
      <SiteEnhancements />
    </>
  );
}
