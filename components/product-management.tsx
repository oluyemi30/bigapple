"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ImageUpload from "./image-upload"
import Image from "next/image"
import type { Product } from "@/contexts/products-context"

interface ProductManagementProps {
  products: Product[]
  onProductAdd: (product: Omit<Product, "id">) => void
  onProductUpdate: (id: number, product: Partial<Product>) => void
  onProductDelete: (id: number) => void
}

export default function ProductManagement({
  products,
  onProductAdd,
  onProductUpdate,
  onProductDelete,
}: ProductManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    image: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const categories = [
    "Hair Care",
    "Body Care",
    "Professional",
    "Storage",
    "Oils",
    "Nail Care",
    "Wellness",
    "Accessories",
    "Skincare",
    "Training",
  ]

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      category: "",
      image: "",
    })
    setUploadedFile(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.category) return

    const productData = {
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      originalPrice: Number.parseFloat(formData.originalPrice) || Number.parseFloat(formData.price),
      category: formData.category,
      image: uploadedFile ? URL.createObjectURL(uploadedFile) : formData.image,
    }

    if (editingProduct) {
      onProductUpdate(editingProduct, productData)
      setEditingProduct(null)
    } else {
      onProductAdd(productData)
      setShowAddForm(false)
    }

    resetForm()
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      category: product.category,
      image: product.image,
    })
    setEditingProduct(product.id)
    setShowAddForm(true)
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingProduct(null)
    resetForm()
  }

  const handleImageUpload = (file: File) => {
    setUploadedFile(file)
  }

  const handleImageRemove = () => {
    setUploadedFile(null)
    setFormData((prev) => ({ ...prev, image: "" }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <p className="text-gray-600">Manage your wholesale inventory and pricing</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-800">Total Products</h3>
          <p className="text-2xl font-bold text-green-900">{products.length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800">Categories</h3>
          <p className="text-2xl font-bold text-blue-900">{new Set(products.map((p) => p.category)).size}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-purple-800">Avg. Price</h3>
          <p className="text-2xl font-bold text-purple-900">
            ₦
            {products.length > 0
              ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString()
              : 0}
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-orange-800">Total Value</h3>
          <p className="text-2xl font-bold text-orange-900">
            ₦{products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-green-900">
                      Product Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="border-green-200 focus:border-green-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-green-900">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      className="border-green-200 focus:border-green-500"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="price" className="text-green-900">
                        Wholesale Price (₦)
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="100"
                        value={formData.price}
                        onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                        className="border-green-200 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="originalPrice" className="text-green-900">
                        Retail Price (₦)
                      </Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="100"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                        className="border-green-200 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-green-900">
                      Category
                    </Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-green-200 rounded-md focus:border-green-500 focus:ring-green-500"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-green-900">Product Image</Label>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    onImageRemove={handleImageRemove}
                    currentImage={formData.image}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  {editingProduct ? "Update Product" : "Add Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300 bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-gray-100">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                <Badge className="absolute top-2 left-2 bg-green-500">{product.category}</Badge>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-600">₦{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <span className="text-xs text-green-600 font-medium">
                  Save ₦{(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(product)}
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onProductDelete(product.id)}
                  className="border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
