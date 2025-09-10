"use client"

import { useState } from "react"
import { useProducts } from "@/contexts/products-context"

interface SalesData {
  month: string
  sales: number
  orders: number
}

interface CustomerData {
  segment: string
  count: number
  percentage: number
}

interface ProductPerformance {
  name: string
  sales: number
  revenue: number
  units: number
}

export default function AnalyticsDashboard() {
  const { products } = useProducts()
  const [activeReport, setActiveReport] = useState("sales")

  // Mock analytics data
  const salesData: SalesData[] = [
    { month: "Jan", sales: 1200000, orders: 45 },
    { month: "Feb", sales: 1450000, orders: 52 },
    { month: "Mar", sales: 1680000, orders: 61 },
    { month: "Apr", sales: 1920000, orders: 68 },
    { month: "May", sales: 2150000, orders: 74 },
    { month: "Jun", sales: 2450000, orders: 89 },
  ]

  const customerData: CustomerData[] = [
    { segment: "New Customers", count: 45, percentage: 35 },
    { segment: "Returning Customers", count: 58, percentage: 45 },
    { segment: "VIP Customers", count: 26, percentage: 20 },
  ]

  const productPerformance: ProductPerformance[] = [
    { name: "Professional Hair Styling Kit", sales: 156, revenue: 7020000, units: 156 },
    { name: "UV LED Nail Lamp", sales: 134, revenue: 3350000, units: 134 },
    { name: "Watermelon Body Scrub", sales: 98, revenue: 833000, units: 98 },
    { name: "Facial Steamer", sales: 76, revenue: 2660000, units: 76 },
    { name: "Argan Oil", sales: 89, revenue: 1335000, units: 89 },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const SalesReports = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Sales Reports</h2>
        <p className="text-green-100">Track sales performance and revenue trends</p>
      </div>

      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(10850000)}</p>
          <p className="text-sm text-gray-500 mt-1">+15.3% from last month</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">389</p>
          <p className="text-sm text-gray-500 mt-1">+12.8% from last month</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Order Value</h3>
          <p className="text-3xl font-bold text-purple-600">{formatCurrency(27890)}</p>
          <p className="text-sm text-gray-500 mt-1">+2.1% from last month</p>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Sales Trend</h3>
        <div className="space-y-4">
          {salesData.map((data, index) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Revenue</span>
                  <span className="text-sm font-bold text-green-600">{formatCurrency(data.sales)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(data.sales / Math.max(...salesData.map((d) => d.sales))) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">{data.orders} orders</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const CustomerReports = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Customer Analytics</h2>
        <p className="text-blue-100">Analyze customer behavior and demographics</p>
      </div>

      {/* Customer Segments */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Segments</h3>
        <div className="space-y-4">
          {customerData.map((segment, index) => (
            <div key={segment.segment} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{segment.segment}</span>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{segment.count}</span>
                  <span className="text-sm text-gray-500 ml-2">({segment.percentage}%)</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-purple-500"
                  }`}
                  style={{ width: `${segment.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Locations</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Lagos Island</span>
              <span className="font-bold text-green-600">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Victoria Island</span>
              <span className="font-bold text-green-600">28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Ikeja</span>
              <span className="font-bold text-green-600">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Surulere</span>
              <span className="font-bold text-green-600">9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Lifetime Value</h3>
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{formatCurrency(125000)}</p>
              <p className="text-sm text-gray-500">Average CLV</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <p className="text-xl font-bold text-blue-600">3.2</p>
                <p className="text-sm text-gray-500">Avg Orders</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-purple-600">45 days</p>
                <p className="text-sm text-gray-500">Avg Frequency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const ProductPerformanceReports = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Product Performance</h2>
        <p className="text-purple-100">Track product sales and revenue performance</p>
      </div>

      {/* Top Products Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Top Performing Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Units Sold</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productPerformance.map((product, index) => (
                <tr key={product.name} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.units}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{formatCurrency(product.revenue)}</td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${(product.revenue / Math.max(...productPerformance.map((p) => p.revenue))) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Categories Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Beauty Tools</span>
              <span className="font-bold text-green-600">{formatCurrency(8500000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Skincare</span>
              <span className="font-bold text-green-600">{formatCurrency(3200000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Wellness</span>
              <span className="font-bold text-green-600">{formatCurrency(2800000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Accessories</span>
              <span className="font-bold text-green-600">{formatCurrency(1900000)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Insights</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Products</span>
              <span className="font-bold text-gray-900">{products.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Low Stock Items</span>
              <span className="font-bold text-red-600">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Out of Stock</span>
              <span className="font-bold text-red-600">1</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Best Seller</span>
              <span className="font-bold text-green-600">Hair Kit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Report Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveReport("sales")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeReport === "sales" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            📊 Sales Reports
          </button>
          <button
            onClick={() => setActiveReport("customers")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeReport === "customers" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            👥 Customer Analytics
          </button>
          <button
            onClick={() => setActiveReport("products")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeReport === "products" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-purple-100"
            }`}
          >
            🛍️ Product Performance
          </button>
        </div>
      </div>

      {/* Report Content */}
      {activeReport === "sales" && <SalesReports />}
      {activeReport === "customers" && <CustomerReports />}
      {activeReport === "products" && <ProductPerformanceReports />}
    </div>
  )
}
