"use client"

import Navbar from "@/components/navbar"
import ProductsSection from "@/components/products-section"
import CartDrawer from "@/components/cart-drawer"

export default function ProductsPage() {
  return (
    <div>
      <Navbar />
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">Our Products</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium beauty and skincare products
            </p>
          </div>
        </div>
        <ProductsSection />
      </div>
      <CartDrawer />
    </div>
  )
}
