"use client"

import Header from "@/components/header"
import CartDrawer from "@/components/cart-drawer"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <div>
      <Header />
      <FeaturedProducts />
      <CartDrawer />
    </div>
  )
}
