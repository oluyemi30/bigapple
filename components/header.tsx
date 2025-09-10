"use client"

import { useEffect, useState } from "react"
import Navbar from "./navbar"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/hero1.png",
    heading: "Your Premier Wholesale Beauty Destination in Lagos",
    subheading: "AC BIG APPLE",
    description:
      "Direct distributor for top Chinese beauty companies. Unbeatable wholesale prices on luxury beauty and spa essentials.",
  },
  {
    id: 2,
    image: "/hero2.png",
    heading: "Quality Products at Wholesale Rates",
    subheading: "WHOLESALE EXCELLENCE",
    description: "Extensive inventory sectioned into Nails, Pedicure & Manicure, Beauty & Spa, and Salon Equipment.",
  },
  {
    id: 3,
    image: "/hero3.png",
    heading: "Partner with Lagos' Leading Beauty Distributor",
    subheading: "BUSINESS SOLUTIONS",
    description:
      "Comprehensive selection for your business needs at the most competitive wholesale rates in the market.",
  },
]

export default function Header() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fadeClass, setFadeClass] = useState("opacity-100")

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("opacity-0")

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1))
        setFadeClass("opacity-100")
      }, 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentSlide = slides[currentIndex]

  return (
    <header className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={currentSlide.image || "/placeholder.svg"}
          alt={currentSlide.heading}
          fill
          className={`object-cover transition-opacity duration-500 ${fadeClass}`}
          priority
        />
      </div>

      <Navbar />

      <div className="absolute inset-0 bg-black/20 z-0" />

      <div
        className={`absolute inset-0 z-10 flex flex-col justify-end items-start px-6 pb-10 space-y-3 text-white transition-opacity duration-1000 ${fadeClass}`}
      >
        <h2 className="text-sm sm:text-base tracking-wide font-semibold">{currentSlide.subheading}</h2>

        <h1 className="text-2xl sm:text-3xl font-bold leading-snug max-w-sm">{currentSlide.heading}</h1>

        <p className="max-w-sm text-sm">{currentSlide.description}</p>

        <button className="text-white px-4 py-2 rounded-lg border border-orange-100 text-xs font-semibold hover:bg-green-100 hover:text-green-900 transition duration-300 cursor-pointer">
          Shop Wholesale
        </button>
      </div>
    </header>
  )
}
