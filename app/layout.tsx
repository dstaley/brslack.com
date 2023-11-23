import Link from "next/link";
import type { Metadata } from "next/types";
import "../styles/global.scss";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav role="navigation">
          <ul>
            <li>
              <Link href="/">
                <img src="img/icon.svg" alt="Baton Rouge Slack Logo" />
              </Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/code-of-conduct/">Code of Conduct</Link>
            </li>
            <li>
              <Link href="/community-guidelines/">Community Guidelines</Link>
            </li>
          </ul>
        </nav>
        {children}
        <div className="footer-container">
          <div className="container">
            <footer className="row">
              <div className="columns">
                This website is governed by the{" "}
                <a
                  href="https://creativecommons.org/publicdomain/zero/1.0/"
                  rel="noopener"
                >
                  Creative Commons Zero license
                </a>
                ; it’s public domain! Any and all use of this site’s content is
                allowed, which you can find on{" "}
                <a href="https://github.com/dstaley/brslack.com" rel="noopener">
                  GitHub
                </a>
                .
              </div>
            </footer>
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://www.schema.org",
              "@type": "EducationalOrganization",
              name: metadata.title,
              url: metadata.metadataBase,
              description: metadata.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Baton Rouge",
                addressRegion: "LA",
                addressCountry: "United States",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "30.4582829",
                longitude: "-91.1403196",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase:
    process.env.VERCEL_ENV === "production"
      ? new URL("https://brslack.com")
      : process.env.VERCEL_ENV === "preview"
      ? new URL(`https://${process.env.VERCEL_URL}`)
      : new URL(`http://localhost:${process.env.PORT || 3000}`),
  title: "Baton Rouge Slack",
  description:
    "The Baton Rouge Slack is a community for BR area developers, designers, marketers, business people, and other professionals involved in technology",
  openGraph: {
    title: "Baton Rouge Slack",
    description:
      "The Baton Rouge Slack is a community for BR area developers, designers, marketers, business people, and other professionals involved in technology",
    url: "/",
    type: "website",
  },
};
