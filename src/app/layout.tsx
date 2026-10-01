import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const siteUrl = "https://www.be2bag.dev"
const title = "Panupong Songsaksri | Node.js & Go Backend Developer"
const description =
  "Panupong Songsaksri (Be2Bag), a Node.js and Go backend developer in Bangkok, Thailand. Explore API projects, technical skills, resume, and contact details."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Be2Bag | Panupong Songsaksri",
  authors: [{ name: "Panupong Songsaksri", url: siteUrl }],
  creator: "Panupong Songsaksri",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: `${siteUrl}/`,
    siteName: "Be2Bag | Panupong Songsaksri",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 960,
        height: 1706,
        alt: "Panupong Songsaksri (Be2Bag), Node.js and Go backend developer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [
      {
        url: "/profile.jpg",
        alt: "Panupong Songsaksri (Be2Bag), Node.js and Go backend developer",
      },
    ],
  },
}

// Keep the profile facts in sync with the visible portfolio content.
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteUrl}/#profile`,
  url: `${siteUrl}/`,
  name: title,
  description,
  inLanguage: ["en", "th"],
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Panupong Songsaksri",
    alternateName: "Be2Bag",
    url: `${siteUrl}/`,
    image: `${siteUrl}/profile.jpg`,
    jobTitle: "Backend Developer",
    description: "Backend developer specializing in Node.js and Go (Golang).",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bangkok",
      addressCountry: "TH",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Silpakorn University",
    },
    knowsAbout: [
      "Node.js",
      "Go (Golang)",
      "JavaScript",
      "API development",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    sameAs: [
      "https://github.com/Be2Bag",
      "https://www.linkedin.com/in/panupong-songsaksri-7811a02a3/",
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  )
}
