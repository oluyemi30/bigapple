"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartHelpers } from "@/contexts/cart-context"
import { useProducts } from "@/contexts/products-context"
import ProductFilters from "./product-filters"

interface ProductsSectionProps {
  showFilters?: boolean
}

export default function ProductsSection({ showFilters = true }: ProductsSectionProps) {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const { addItem, openCart } = useCartHelpers()
  const { products } = useProducts()

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [products])

  // Filter products based on search and filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, searchTerm, selectedCategory, priceRange])

  const handleAddToCart = (product: any) => {
    addItem(product)
    openCart()
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {showFilters && (
          <ProductFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            categories={categories}
          />
        )}

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {showFilters ? "Wholesale Beauty & Spa Collection" : "Featured Wholesale Products"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {showFilters
              ? `Showing ${filteredProducts.length} of ${products.length} wholesale products at unbeatable prices`
              : "Professional beauty and spa essentials from top Chinese manufacturers at wholesale rates"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`w-full h-64 object-cover transition-all duration-500 ${
                      hoveredProduct === product.id ? "scale-110 rotate-2" : "scale-100 rotate-0"
                    }`}
                  />
                  <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">{product.category}</Badge>
                  <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600">Wholesale</Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">
                        Retail: ₦{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs text-green-600 font-semibold">
                      Save ₦{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Wholesale Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No products found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("")
                setPriceRange([0, 100000])
              }}
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
