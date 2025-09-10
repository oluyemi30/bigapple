"use client"

import { useState } from "react"
import { useProducts } from "@/contexts/products-context"
import { useCart } from "@/contexts/cart-context"

interface DashboardStats {
  totalOrders: number
  totalSales: number
  totalCustomers: number
  totalProducts: number
  pendingOrders: number
  completedOrders: number
  monthlyGrowth: number
  topSellingProduct: string
}

export default function AdminDashboard() {
  const { products } = useProducts()
  const { cart } = useCart()

  // Mock data for demonstration - in real app this would come from API
  const [stats] = useState<DashboardStats>({
    totalOrders: 156,
    totalSales: 2450000, // in Naira
    totalCustomers: 89,
    totalProducts: products.length,
    pendingOrders: 12,
    completedOrders: 144,
    monthlyGrowth: 15.3,
    topSellingProduct: "Professional Hair Styling Kit",
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    trend,
  }: {
    title: string
    value: string | number
    subtitle?: string
    icon: string
    trend?: number
  }) => (
    <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl">{icon}</div>
        {trend && (
          <div className={`text-sm font-medium ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
            {trend > 0 ? "↗" : "↘"} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-green-100">Welcome back! Here's what's happening with AC BIG APPLE today.</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          subtitle="This month"
          icon="📦"
          trend={stats.monthlyGrowth}
        />
        <StatCard
          title="Total Sales"
          value={formatCurrency(stats.totalSales)}
          subtitle="Revenue this month"
          icon="💰"
          trend={12.5}
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          subtitle="Active customers"
          icon="👥"
          trend={8.2}
        />
        <StatCard title="Total Products" value={stats.totalProducts} subtitle="In inventory" icon="🛍️" />
      </div>

      {/* Order Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Pending Orders</span>
              </div>
              <span className="text-xl font-bold text-yellow-600">{stats.pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Completed Orders</span>
              </div>
              <span className="text-xl font-bold text-green-600">{stats.completedOrders}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              View All Orders
            </button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              Generate Report
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">New order #1234 received</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">Product "UV LED Nail Lamp" updated</p>
              <p className="text-sm text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium">New customer registered</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
