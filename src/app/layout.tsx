import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Panupong Songsaksri - Portfolio",
  description: "Personal portfolio of Panupong Songsaksri - Web Developer & Frontend Enthusiast",
  keywords: ["web developer", "frontend", "react", "next.js", "portfolio"],
  authors: [{ name: "Panupong Songsaksri" }],
  creator: "Panupong Songsaksri",
  openGraph: {
    title: "Panupong Songsaksri - Portfolio",
    description: "Personal portfolio of Panupong Songsaksri - Web Developer & Frontend Enthusiast",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
