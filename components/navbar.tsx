"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartHelpers } from "@/contexts/cart-context"
import { ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { toggleCart, getTotalItems } = useCartHelpers()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false)
      } else {
        setShow(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-9 left-10 right-10 z-50 rounded-4xl transition-transform duration-500 ease-in-out
      ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      bg-white/30 backdrop-blur-md shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            href="/"
            className="text-xl font-bold text-green-900 flex items-center gap-2 hover:text-green-600 transition"
          >
            <Image src="/bigapple.png" alt="logo" width={36} height={36} className="w-9" />
            Bigappleworld
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-green-900 hover:text-green-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-green-900 hover:text-green-600 transition">
              Products
            </Link>
            <Link
              href="/admin"
              className="text-green-900 hover:text-green-600 transition flex items-center gap-1 px-3 py-1 rounded-lg hover:bg-green-50"
            >
              <span className="text-sm">⚙️</span>
              Admin Panel
            </Link>
            <Link href="/about" className="text-green-900 hover:text-green-600 transition">
              About
            </Link>
            <a href="#" className="text-green-900 hover:text-green-600 transition">
              Contact
            </a>
            <button onClick={toggleCart} className="relative p-2 text-green-900 hover:text-green-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-green-500 hover:bg-green-600">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleCart} className="relative p-2 text-green-900 hover:text-green-600 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-green-500 hover:bg-green-600">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
            <div className="burger-wrapper">
              <label className="burger" htmlFor="burger">
                <input type="checkbox" id="burger" checked={open} onChange={() => setOpen(!open)} />
                <span className="burger-line" />
                <span className="burger-line" />
                <span className="burger-line" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-4 pb-4 space-y-2 bg-white/80 backdrop-blur-md rounded-b-2xl">
          <Link href="/" className="text-green-900 hover:text-green-600 transition">
            Home
          </Link>
          <Link href="/products" className="text-green-900 hover:text-green-600 transition">
            Products
          </Link>
          <Link
            href="/admin"
            className="text-green-900 hover:text-green-600 transition flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-green-50"
          >
            <span className="text-sm">⚙️</span>
            Admin Panel
          </Link>
          <Link href="/about" className="text-green-900 hover:text-green-600 transition">
            About
          </Link>
          <a href="#" className="text-green-900 hover:text-green-600 transition">
            Contact
          </a>
        </div>
      </div>

      <style jsx>{`
        .burger-wrapper {
          position: relative;
        }
        
        .burger {
          position: relative;
          width: 40px;
          height: 30px;
          background: transparent;
          cursor: pointer;
          display: block;
        }

        .burger input {
          display: none;
        }

        .burger-line {
          display: block;
          position: absolute;
          height: 2px;
          width: 100%;
          background: black;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
        }

        .burger-line:nth-of-type(1) {
          top: 0px;
          transform-origin: left center;
        }

        .burger-line:nth-of-type(2) {
          top: 50%;
          transform: translateY(-50%);
          transform-origin: left center;
        }

        .burger-line:nth-of-type(3) {
          top: 100%;
          transform: translateY(-100%);
          transform-origin: left center;
        }

        .burger input:checked ~ .burger-line:nth-of-type(1) {
          transform: rotate(45deg);
          top: 0px;
          left: 5px;
        }

        .burger input:checked ~ .burger-line:nth-of-type(2) {
          width: 0%;
          opacity: 0;
        }

        .burger input:checked ~ .burger-line:nth-of-type(3) {
          transform: rotate(-45deg);
          top: 28px;
          left: 5px;
        }
      `}</style>
    </nav>
  )
}
