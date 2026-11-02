import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://leonardovieiraalmeida95-design.github.io/Restaurante-Primavera-/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Restaurante e Pizzaria Primavera | Jaguariaíva, PR",
  description:
    "Restaurante e Pizzaria Primavera em Jaguariaíva, PR. Almoço com bife livre e por peso, pizza de forno a lenha e pizza na esteira. Consulte pelo WhatsApp.",
  openGraph: {
    type: "website",
    title: "Restaurante e Pizzaria Primavera | Jaguariaíva",
    description:
      "Almoço com bife livre ou por peso e pizzas de forno a lenha e na esteira no Restaurante e Pizzaria Primavera, em Jaguariaíva.",
    url: siteUrl,
    locale: "pt_BR",
  },
};

export const viewport: Viewport = { themeColor: "#11100e" };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Restaurante e Pizzaria Primavera",
    servesCuisine: ["Pizza", "Brazilian"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Conde Francisco Matarazzo, 296",
      addressLocality: "Jaguariaíva",
      addressRegion: "PR",
      addressCountry: "BR",
    },
    sameAs: ["https://www.instagram.com/restaurantepizzariaprimavera/"],
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
