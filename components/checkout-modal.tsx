"use client"

import { useState } from "react"
import { useCartHelpers } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { X, Truck, User, MessageCircle } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartHelpers()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    // Customer Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Shipping Address
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "Nigeria",

    // Order Notes
    orderNotes: "",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    // Create WhatsApp message with order details
    const orderDetails = items
      .map((item) => `• ${item.name} (Qty: ${item.quantity}) - ₦${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const whatsappMessage = `🛍️ *NEW ORDER FROM AC BIG APPLE*

👤 *Customer Details:*
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}

📍 *Delivery Address:*
${formData.shippingAddress}
${formData.shippingCity}, ${formData.shippingState} ${formData.shippingZip}
${formData.shippingCountry}

🛒 *Order Items:*
${orderDetails}

💰 *Order Summary:*
Subtotal: ₦${getTotalPrice().toFixed(2)}
Total Items: ${getTotalItems()}
*Total Amount: ₦${getTotalPrice().toFixed(2)}*

📝 *Special Instructions:*
${formData.orderNotes || "None"}

---
Please confirm this order and provide delivery timeline.
Thank you! 🙏`

    const whatsappNumber = "+2348105834317"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    setIsProcessing(false)
    setOrderComplete(true)
    clearCart()
  }

  const shippingCost = getTotalPrice() > 50000 ? 0 : 2500 // Free shipping over ₦50,000
  const finalTotal = getTotalPrice() + shippingCost

  if (!isOpen) return null

  if (orderComplete) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Sent!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been sent to our WhatsApp. We'll confirm your order and provide delivery details shortly.
              </p>
              <Button onClick={onClose} className="w-full bg-green-500 hover:bg-green-600">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Checkout via WhatsApp</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Forms */}
              <div className="space-y-6">
                {/* Progress Steps */}
                <div className="flex items-center space-x-4 mb-6">
                  {[1, 2].map((stepNum) => (
                    <div key={stepNum} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step >= stepNum ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {stepNum}
                      </div>
                      {stepNum < 2 && (
                        <div className={`w-12 h-0.5 ${step > stepNum ? "bg-green-500" : "bg-gray-200"}`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <User className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">Customer Information</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+234 801 234 5678"
                        required
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-4 mt-6">
                      <Truck className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">Delivery Address</h3>
                    </div>

                    <div>
                      <Label htmlFor="shippingAddress">Street Address</Label>
                      <Input
                        id="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shippingCity">City</Label>
                        <Input
                          id="shippingCity"
                          value={formData.shippingCity}
                          onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                          placeholder="Lagos"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shippingState">State</Label>
                        <Select
                          value={formData.shippingState}
                          onValueChange={(value) => handleInputChange("shippingState", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lagos">Lagos</SelectItem>
                            <SelectItem value="Abuja">Abuja</SelectItem>
                            <SelectItem value="Kano">Kano</SelectItem>
                            <SelectItem value="Rivers">Rivers</SelectItem>
                            <SelectItem value="Oyo">Oyo</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="shippingZip">Postal Code (Optional)</Label>
                      <Input
                        id="shippingZip"
                        value={formData.shippingZip}
                        onChange={(e) => handleInputChange("shippingZip", e.target.value)}
                        placeholder="100001"
                      />
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      className="w-full mt-6 bg-green-500 hover:bg-green-600"
                      disabled={
                        !formData.firstName || !formData.lastName || !formData.phone || !formData.shippingAddress
                      }
                    >
                      Continue to Review
                    </Button>
                  </div>
                )}

                {/* Step 2: Order Review */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold">Review & Send to WhatsApp</h3>
                    </div>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Customer Information</h4>
                        <p className="text-sm text-gray-600">
                          {formData.firstName} {formData.lastName}
                          <br />
                          {formData.phone}
                          <br />
                          {formData.email}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Delivery Address</h4>
                        <p className="text-sm text-gray-600">
                          {formData.shippingAddress}
                          <br />
                          {formData.shippingCity}, {formData.shippingState} {formData.shippingZip}
                          <br />
                          {formData.shippingCountry}
                        </p>
                      </CardContent>
                    </Card>

                    <div>
                      <Label htmlFor="orderNotes">Special Instructions (Optional)</Label>
                      <Textarea
                        id="orderNotes"
                        value={formData.orderNotes}
                        onChange={(e) => handleInputChange("orderNotes", e.target.value)}
                        placeholder="Any special delivery instructions or product preferences..."
                        rows={3}
                      />
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">WhatsApp Order Process</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Your order details will be sent to our WhatsApp business number. We'll confirm availability,
                        provide exact pricing, and arrange delivery within Lagos.
                      </p>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmitOrder}
                        disabled={isProcessing}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                      >
                        {isProcessing ? "Sending..." : `Send Order via WhatsApp`}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:sticky lg:top-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-sm font-medium">₦{(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal ({getTotalItems()} items)</span>
                        <span>₦{getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery (Lagos)</span>
                        <span>{shippingCost === 0 ? "Free" : `₦${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Estimated Total</span>
                        <span className="text-green-600">₦{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {getTotalPrice() < 50000 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-700">
                          Add ₦{(50000 - getTotalPrice()).toFixed(2)} more for free delivery!
                        </p>
                      </div>
                    )}

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-700">
                        <strong>Note:</strong> Final pricing and delivery charges will be confirmed via WhatsApp based
                        on your location and current wholesale rates.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
