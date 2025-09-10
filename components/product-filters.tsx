"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface ProductFiltersProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  categories: string[]
}

export default function ProductFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  categories,
}: ProductFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const clearFilters = () => {
    onSearchChange("")
    onCategoryChange("")
    onPriceRangeChange([0, 500])
  }

  const hasActiveFilters = searchTerm || selectedCategory || priceRange[0] > 0 || priceRange[1] < 500

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border-green-200 focus:border-green-500 focus:ring-green-500 rounded-xl"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-1 bg-green-500 hover:bg-green-600 text-white">
              {[searchTerm, selectedCategory, priceRange[0] > 0 || priceRange[1] < 500].filter(Boolean).length}
            </Badge>
          )}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Expandable Filters */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-6 pt-4 border-t border-gray-200">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                onClick={() => onCategoryChange("")}
                className={`text-sm ${
                  selectedCategory === ""
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "border-green-200 text-green-700 hover:bg-green-50"
                }`}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => onCategoryChange(category)}
                  className={`text-sm ${
                    selectedCategory === category
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "border-green-200 text-green-700 hover:bg-green-50"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                  className="w-20 text-sm border-green-200 focus:border-green-500"
                />
              </div>
              <span className="text-gray-400">-</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                  className="w-20 text-sm border-green-200 focus:border-green-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPriceRangeChange([0, 50])}
                className="text-xs border-green-200 text-green-700 hover:bg-green-50"
              >
                Under $50
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPriceRangeChange([50, 100])}
                className="text-xs border-green-200 text-green-700 hover:bg-green-50"
              >
                $50-$100
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPriceRangeChange([100, 500])}
                className="text-xs border-green-200 text-green-700 hover:bg-green-50"
              >
                $100+
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
