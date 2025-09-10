"use client"

import { useState } from "react"

interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  orderDate: string
  shippingAddress: string
  trackingNumber?: string
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Adunni Okafor",
      customerEmail: "adunni@email.com",
      customerPhone: "08012345678",
      items: [
        { name: "Professional Hair Styling Kit", quantity: 2, price: 45000 },
        { name: "UV LED Nail Lamp", quantity: 1, price: 25000 },
      ],
      total: 115000,
      status: "pending",
      orderDate: "2024-01-15",
      shippingAddress: "15 Allen Avenue, Ikeja, Lagos",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      customerName: "Kemi Adebayo",
      customerEmail: "kemi@email.com",
      customerPhone: "08087654321",
      items: [
        { name: "Watermelon Body Scrub", quantity: 3, price: 8500 },
        { name: "Argan Oil", quantity: 1, price: 15000 },
      ],
      total: 40500,
      status: "shipped",
      orderDate: "2024-01-14",
      shippingAddress: "22 Victoria Island, Lagos",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      customerName: "Funmi Lagos",
      customerEmail: "funmi@email.com",
      customerPhone: "08098765432",
      items: [{ name: "Facial Steamer", quantity: 1, price: 35000 }],
      total: 35000,
      status: "delivered",
      orderDate: "2024-01-13",
      shippingAddress: "8 Surulere Street, Lagos",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus })
    }
  }

  const filteredOrders = filterStatus === "all" ? orders : orders.filter((order) => order.status === filterStatus)

  const OrderDetailsModal = ({ order, onClose }: { order: Order; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
              <p>
                <span className="font-medium">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Date:</span> {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </p>
              {order.trackingNumber && (
                <p>
                  <span className="font-medium">Tracking:</span> {order.trackingNumber}
                </p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
              <p>
                <span className="font-medium">Name:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order.customerEmail}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {order.customerPhone}
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
            <p className="text-gray-600">{order.shippingAddress}</p>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-green-600">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold text-green-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => updateOrderStatus(order.id, status as Order["status"])}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    order.status === status
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Order Management</h1>
        <p className="text-green-100">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              filterStatus === "all" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            All Orders ({orders.length})
          </button>
          {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filterStatus === status ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({orders.filter((o) => o.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-green-100 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-green-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  )
}
