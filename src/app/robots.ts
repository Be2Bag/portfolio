import type { MetadataRoute } from "next"

// Metadata routes must be generated at build time for the static export.
export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.be2bag.dev/sitemap.xml",
  }
}
