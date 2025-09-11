"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
}

interface ProductsState {
  products: Product[]
}

type ProductsAction =
  | { type: "ADD_PRODUCT"; payload: Omit<Product, "id"> }
  | { type: "UPDATE_PRODUCT"; payload: { id: number; updates: Partial<Product> } }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "SET_PRODUCTS"; payload: Product[] }

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Professional Hair Styling Kit",
    description: "Complete hair styling set with blow dryer and accessories",
    price: 45000,
    originalPrice: 65000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-10-16_12-33-09.jpg-IPRhwbFmwbfy5hPP6CVx7EQ78ogix5.jpeg",
    category: "Hair Care",
  },
  {
    id: 2,
    name: "Body Scrub Collection",
    description: "4-piece body scrub set with natural extracts",
    price: 18000,
    originalPrice: 25000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-10-16_12-28-51.jpg-cnDfFjQjApICrrOUIBcCxc1GgeTXAa.jpeg",
    category: "Body Care",
  },
  {
    id: 3,
    name: "Professional Skincare Machine",
    description: "Advanced skincare treatment device with digital display",
    price: 150000,
    originalPrice: 200000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-27_04-25-48-400x533.jpg-h9fiVf1ossfG16GyFQ95RTj605hPod.jpeg",
    category: "Professional",
  },
  {
    id: 4,
    name: "3-Tier Beauty Cart",
    description: "Rolling storage cart for beauty products and tools",
    price: 23000,
    originalPrice: 33000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-26_00-10-28-400x533.jpg-yCibO7Cr89XqlxrbYH0l5ZT52WnUT6.jpeg",
    category: "Storage",
  },
  {
    id: 5,
    name: "Extra Virgin Argan Oil",
    description: "100% Pure certified organic argan oil",
    price: 12500,
    originalPrice: 17500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-10-16_12-20-35.jpg-6AlnG0mNGJk84MXJ8JJ99kNJYR9A45.jpeg",
    category: "Oils",
  },
  {
    id: 6,
    name: "Cordless UV/LED Nail Lamp",
    description: "Professional nail curing lamp with timer",
    price: 20000,
    originalPrice: 30000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-25_23-59-37-400x533.jpg-qDyorXKehsLWW6Teyv6nVkRQZJ3FZF.jpeg",
    category: "Nail Care",
  },
  {
    id: 7,
    name: "Body Scrub Variety Pack",
    description: "Premium body scrubs in multiple scents",
    price: 15000,
    originalPrice: 22500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-10-16_12-28-51.jpg-S7QXrq4Ki5mYYTXUWIUCDJTtYhO37v.jpeg",
    category: "Body Care",
  },
  {
    id: 8,
    name: "Electric Nail Drill Kit",
    description: "Professional manicure tool with multiple attachments",
    price: 25000,
    originalPrice: 40000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-25_23-54-09-400x533.jpg-oX2yLt834tKhGzVUWfncPUwWZNz4sF.jpeg",
    category: "Nail Care",
  },
  {
    id: 9,
    name: "Cordless UV Nail Lamp Pro",
    description: "Advanced cordless nail lamp with LED display",
    price: 30000,
    originalPrice: 45000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-25_23-59-37-400x533.jpg-0MbKGvdZTukgvIYbKP49YsRSaBvOZp.jpeg",
    category: "Nail Care",
  },
  {
    id: 10,
    name: "Therapeutic Neck Massage Cushion",
    description: "Ergonomic neck massage pillow for relaxation and pain relief",
    price: 16500,
    originalPrice: 25000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_01-21-03-1-400x533.jpg-VTo2LNjRPizipJrGdhxrVAB9PKWH1Q.jpeg",
    category: "Wellness",
  },
  {
    id: 11,
    name: "Professional Wax Warmer",
    description: "Single wax warmer with temperature control for professional use",
    price: 40000,
    originalPrice: 55000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-27_04-27-23-400x533.jpg-zPrd8im5pwHzRkSOPZwxj1zDFpVA91.jpeg",
    category: "Professional",
  },
  {
    id: 12,
    name: "Disposable Hair Caps (100pcs)",
    description: "Blue disposable shower caps for beauty treatments",
    price: 6500,
    originalPrice: 10000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_00-46-20-400x500.jpg-CNvHV3JySonQcL1k9iXKhc912RRs4p.jpeg",
    category: "Accessories",
  },
  {
    id: 13,
    name: "NTFS Facial Steamer",
    description: "Professional facial steamer for deep pore cleansing",
    price: 45000,
    originalPrice: 65000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_00-38-02-400x533.jpg-q0ndwJ9BIZJzmDP71mSFAFieIHLLB8.jpeg",
    category: "Skincare",
  },
  {
    id: 14,
    name: "Practice Mannequin Head",
    description: "Professional training head for makeup and beauty practice",
    price: 23000,
    originalPrice: 35000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_01-25-18-400x533.jpg-BBtRvrUhuKr0ovZwc54qCDM2H3xKRh.jpeg",
    category: "Training",
  },
  {
    id: 15,
    name: "Olive Hair Care Set",
    description: "Large bottles of olive shampoo and conditioner for salon use",
    price: 20000,
    originalPrice: 30000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_01-29-30-400x533.jpg-UcnvA3y5Z1NSmkYPur5TVpz4FJx9Sk.jpeg",
    category: "Hair Care",
  },
  {
    id: 16,
    name: "Luxury Pedicure Chair",
    description: "Professional spa pedicure chair with massage function",
    price: 650000,
    originalPrice: 850000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_01-27-04-400x533.jpg-4R0YL8rPLAhc9KkKRHE27M9FUlSY1C.jpeg",
    category: "Professional",
  },
  {
    id: 17,
    name: "Memory Foam Gel Pillow",
    description: "Cooling gel memory foam pillow for better sleep",
    price: 25000,
    originalPrice: 37500,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_01-15-50-400x533.jpg-EL172c94M8phwA8WqjGmiPKROUxppQ.jpeg",
    category: "Wellness",
  },
  {
    id: 18,
    name: "Yoni Steam Seat Kit",
    description: "Complete women's wellness steam seat with remote control",
    price: 80000,
    originalPrice: 115000,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-11-28_01-10-06-1-400x533.jpg-zUOk9SJYmF7mcgVC4YxVZCB2SwxckJ.jpeg",
    category: "Wellness",
  },
]

const initialState: ProductsState = {
  products: initialProducts,
}

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const newId = Math.max(...state.products.map((p) => p.id), 0) + 1
      const newProduct = { ...action.payload, id: newId }
      return {
        ...state,
        products: [...state.products, newProduct],
      }
    }
    case "UPDATE_PRODUCT": {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? { ...product, ...action.payload.updates } : product,
        ),
      }
    }
    case "DELETE_PRODUCT": {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      }
    }
    case "SET_PRODUCTS": {
      return {
        ...state,
        products: action.payload,
      }
    }
    default:
      return state
  }
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void
  setProducts: (products: Product[]) => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  const addProduct = (product: Omit<Product, "id">) => {
    dispatch({ type: "ADD_PRODUCT", payload: product })
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: { id, updates } })
  }

  const deleteProduct = (id: number) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id })
  }

  const setProducts = (products: Product[]) => {
    dispatch({ type: "SET_PRODUCTS", payload: products })
  }

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        addProduct,
        updateProduct,
        deleteProduct,
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
