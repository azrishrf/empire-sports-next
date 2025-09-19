"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";

const navItems = [
  { href: "/category-running", label: "RUNNING" },
  { href: "/category-sneakers", label: "SNEAKERS" },
  { href: "/category-clothing", label: "CLOTHING" },
  { href: "/category-sandals", label: "SANDALS" },
  { href: "/category-basketball", label: "BASKETBALL" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="relative flex items-center justify-between p-4 md:mx-auto md:max-w-[1400px] md:py-2">
        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer text-black transition-colors duration-300 hover:text-gray-900"
            aria-label="Toggle navigation menu"
          >
            <HiMenu size={20} />
          </button>
        </div>

        {/* Logo  */}
        <Link href="/" className="mr-auto flex-shrink-0">
          <Image
            src="/images/logo.jpg"
            alt="Logo business"
            width={90}
            height={50}
            className="h-9 w-16 md:h-auto md:w-20"
          />
        </Link>

        {/* Desktop Actions - Hidden on mobile */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/login" className="text-black">
            <IoPerson size={20} />
          </Link>
          <Link href="/shopping-cart">
            <FaCartShopping className="cursor-pointer text-lg text-black transition-colors duration-500 hover:text-blue-900 lg:text-xl" />
          </Link>
        </div>

        {/* Mobile Actions - Only visible on mobile */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link href="/login" className="text-black">
            <IoPerson size={20} />
          </Link>
          <Link href="/shopping-cart">
            <FaCartShopping className="cursor-pointer text-lg text-black" />
          </Link>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden bg-[#283071] md:block">
        <ul className="mx-auto flex w-full list-none flex-row items-center justify-center max-w-[1100px]">
          {navItems.map((item) => (
            <li
              key={item.href}
              className="flex-1 py-2.5 text-xs text-white transition-all duration-200 hover:bg-red-900"
            >
              <Link
                href={item.href}
                className="flex w-full justify-center rounded font-medium text-white no-underline transition-all duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 bg-black transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-70" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-80 max-w-[80vw] transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-end border-b border-gray-200 p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 transition-colors duration-300 hover:text-gray-900"
            aria-label="Close navigation menu"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-[#283071]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
