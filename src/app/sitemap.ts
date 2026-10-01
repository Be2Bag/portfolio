import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  // This is a single-page portfolio; section fragments are not separate pages.
  return [{ url: "https://www.be2bag.dev/" }]
}
