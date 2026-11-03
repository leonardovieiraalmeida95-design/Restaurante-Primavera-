import { siteMarkup } from "@/site-markup";
import SiteEnhancements from "@/components/site-enhancements";

export default function HomePage() {
  const assetBasePath = process.env.VERCEL === "1" ? "" : "/Restaurante-Primavera-";
  const markup = siteMarkup.replaceAll(
    "/Restaurante-Primavera-/assets/",
    `${assetBasePath}/assets/`,
  );

  return (
    <>
      <div className="min-h-screen" dangerouslySetInnerHTML={{ __html: markup }} />
      <SiteEnhancements />
    </>
  );
}
