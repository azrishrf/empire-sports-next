"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";
import Toastify from "toastify-js";

const navItems = [
  { href: "/collections/running", label: "RUNNING" },
  { href: "/collections/sneakers", label: "SNEAKERS" },
  { href: "/collections/clothing", label: "CLOTHING" },
  { href: "/collections/sandals", label: "SANDALS" },
  { href: "/collections/basketball", label: "BASKETBALL" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      Toastify({
        text: "Successfully signed out!",
        duration: 3000,
        backgroundColor: "#10B981",
        close: true,
      }).showToast();
    } catch (error) {
      Toastify({
        text: "Error signing out",
        duration: 3000,
        backgroundColor: "#EF4444",
      }).showToast();
    }
  };

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
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-black hover:text-gray-600"
              >
                <IoPerson size={20} />
                <span className="text-sm">{user.email}</span>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                  <Link
                    href="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="text-black hover:text-gray-600">
              <IoPerson size={20} />
            </Link>
          )}
          <Link href="/cart" className="relative">
            <FaCartShopping className="cursor-pointer text-lg text-black transition-colors duration-500 hover:text-blue-900 lg:text-xl" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Actions - Only visible on mobile */}
        <div className="flex items-center space-x-3 md:hidden">
          {user ? (
            <div className="relative">
              <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="text-black">
                <IoPerson size={20} />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                  <div className="border-b px-4 py-2 text-sm text-gray-700">{user.email}</div>
                  <Link
                    href="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="text-black">
              <IoPerson size={20} />
            </Link>
          )}
          <Link href="/cart" className="relative">
            <FaCartShopping className="cursor-pointer text-lg text-black" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden bg-[#283071] md:block">
        <ul className="mx-auto flex w-full max-w-[1100px] list-none flex-row items-center justify-center">
          {navItems.map((item) => (
            <li key={item.href} className="flex-1 text-xs text-white transition-all duration-200 hover:bg-red-900">
              <Link
                href={item.href}
                className="flex w-full justify-center rounded py-2.5 font-medium text-white no-underline transition-all duration-300"
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
