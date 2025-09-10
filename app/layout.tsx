import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { CartProvider } from "@/contexts/cart-context"
import { ProductsProvider } from "@/contexts/products-context"
import Navbar from "@/components/navbar"
import "./globals.css"

export const metadata: Metadata = {
  title: "AC BIG APPLE - Premier Wholesale Beauty & Spa Essentials",
  description:
    "Your premier wholesale destination in Lagos for luxurious, quality beauty and spa essentials at unbeatable prices",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
