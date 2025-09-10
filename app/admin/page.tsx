"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import ProductManagement from "@/components/product-management"
import AdminDashboard from "@/components/admin-dashboard"
import OrderManagement from "@/components/order-management"
import CartDrawer from "@/components/cart-drawer"
import { useProducts } from "@/contexts/products-context"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊", description: "Overview & Key Metrics" },
    { id: "products", label: "Products", icon: "🛍️", description: "Manage Inventory" },
    { id: "orders", label: "Orders", icon: "📦", description: "Order Management" },
    { id: "analytics", label: "Analytics", icon: "📈", description: "Reports & Insights" },
  ]

  return (
    <div>
      <Navbar />
      <div className="pt-32 px-6 min-h-screen bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-3 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center space-y-1 px-4 py-4 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-green-600 text-white shadow-md transform scale-105"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-600 hover:scale-102"
                    }`}
                  >
                    <span className="text-2xl">{tab.icon}</span>
                    <span className="font-semibold">{tab.label}</span>
                    <span className={`text-xs ${activeTab === tab.id ? "text-green-100" : "text-gray-500"}`}>
                      {tab.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeTab === "dashboard" && <AdminDashboard />}
          {activeTab === "products" && (
            <ProductManagement
              products={products}
              onProductAdd={addProduct}
              onProductUpdate={updateProduct}
              onProductDelete={deleteProduct}
            />
          )}
          {activeTab === "orders" && <OrderManagement />}
          {activeTab === "analytics" && <AnalyticsDashboard />}
        </div>
      </div>
      <CartDrawer />
    </div>
  )
}
