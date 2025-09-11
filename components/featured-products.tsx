"use client"

import { useProducts } from "@/contexts/products-context"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedProducts() {
  const { products } = useProducts()
  const { addToCart } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Get first 6 products for featured section
  const featuredProducts = products.slice(0, 6)

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    if (!isLoading && featuredProducts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === featuredProducts.length - 3 ? 0 : prevIndex + 1))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [featuredProducts.length, isLoading])

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  if (isLoading) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
                <Skeleton className="h-64 w-full mb-4 rounded-xl" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-8 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our best-selling beauty and spa essentials at wholesale prices
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {featuredProducts.map((product) => (
              <div key={product.id} className="w-1/3 flex-shrink-0 px-3">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-100">
                  <div className="relative h-64 rounded-t-2xl overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Wholesale
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-green-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore Our Complete Collection</h3>
            <p className="text-gray-600 mb-6">
              Browse through our extensive catalog of over 18 premium beauty and spa products at unbeatable wholesale
              prices.
            </p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
