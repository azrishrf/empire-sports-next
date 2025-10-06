"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import Toastify from "toastify-js";

const navItems = [
  { href: "/collections/men", label: "MEN" },
  { href: "/collections/women", label: "WOMEN" },
  { href: "/collections/greatdeals", label: "GREAT DEALS" },
  { href: "/brands", label: "TOP BRANDS" },
  { href: "/about-us", label: "ABOUT US" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuAnimating, setIsUserMenuAnimating] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { getTotalItems } = useCart();
  const { user, signOut, loading } = useAuth();

  const handleUserMenuToggle = useCallback(() => {
    if (isUserMenuOpen) {
      // Closing
      setIsUserMenuAnimating(true);
      setTimeout(() => {
        setIsUserMenuOpen(false);
        setIsUserMenuAnimating(false);
      }, 150);
    } else {
      // Opening
      setIsUserMenuOpen(true);
      setIsUserMenuAnimating(true);
      setTimeout(() => {
        setIsUserMenuAnimating(false);
      }, 150);
    }
  }, [isUserMenuOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        if (isUserMenuOpen) {
          handleUserMenuToggle();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, handleUserMenuToggle]);

  const closeUserMenu = () => {
    if (isUserMenuOpen) {
      handleUserMenuToggle();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      closeUserMenu(); // Close menu with animation
      Toastify({
        text: "Successfully signed out!",
        duration: 3000,
        backgroundColor: "#10B981",
        close: true,
      }).showToast();
    } catch {
      Toastify({
        text: "Error signing out",
        duration: 3000,
        backgroundColor: "#EF4444",
      }).showToast();
    }
  };

  const handleMenuItemClick = () => {
    closeUserMenu(); // Close menu with animation
  };

  return (
    <div className="sticky top-0 z-50 bg-black">
      {/* Header */}
      <header
        className="relative flex items-center justify-between px-4 py-1 backdrop-blur-sm md:mx-auto md:max-w-[1400px] md:p-4 md:py-2"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="cursor-pointer text-white transition-colors duration-300 hover:text-gray-300"
            aria-label="Toggle navigation menu"
          >
            <HiMenu size={25} />
          </button>
        </div>

        {/* Logo  */}
        <Link href="/" className="mr-auto flex-shrink-0">
          <Image src="/logo.png" alt="Logo business" width={90} height={50} className="w-12 md:h-auto md:w-12" />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 transform lg:block">
          <ul className="space-x- flex list-none flex-row items-center justify-center">
            {navItems.map((item) => (
              <li
                key={item.href}
                className="hover:bg-primary-green/20 rounded text-xs text-white transition-all duration-200"
              >
                <Link
                  href={item.href}
                  onClick={closeUserMenu}
                  className={`block px-10 py-2.5 font-medium no-underline transition-all duration-300 ${
                    item.label === "GREAT DEALS" ? "text-primary-green" : "hover:text-primary-green text-white"
                  }`}
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions - Hidden on mobile */}
        <div className="hidden items-center space-x-4 md:flex">
          {loading ? (
            <div className="flex items-center space-x-2 text-white">
              <BsPerson size={20} />
              <div className="h-4 w-16 animate-pulse rounded bg-gray-600"></div>
            </div>
          ) : user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={handleUserMenuToggle}
                className="hover:text-primary-green flex cursor-pointer items-center space-x-2 text-white"
              >
                <BsPerson size={20} />
                <span className="text-sm">{user.displayName || "User"}</span>
              </button>
              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-150 ease-out ${
                    isUserMenuAnimating ? "-translate-y-1 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
                  }`}
                  style={{
                    transformOrigin: "top right",
                  }}
                >
                  {/* User Info Header */}
                  <div className="border-b border-gray-100 px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <FiUser className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                        <p className="truncate text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/my-account"
                      onClick={handleUserMenuToggle}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                    >
                      <FiUser className="h-4 w-4 text-gray-400" />
                      <span>My Account</span>
                    </Link>
                    <Link
                      href="/orders"
                      onClick={handleUserMenuToggle}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                    >
                      <FiPackage className="h-4 w-4 text-gray-400" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full cursor-pointer items-center space-x-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <FiLogOut className="h-4 w-4 text-gray-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" onClick={closeUserMenu} className="text-white hover:text-gray-300">
              <BsPerson className="hover:text-primary-green" size={20} />
            </Link>
          )}
          <Link href="/cart" onClick={closeUserMenu} className="relative">
            <PiShoppingCartSimpleBold className="hover:text-primary-green cursor-pointer text-lg text-white transition-colors duration-500 lg:text-xl" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Actions - Only visible on mobile */}
        <div className="flex items-center space-x-3 md:hidden">
          {loading ? (
            <div className="flex items-center justify-center text-white">
              <BsPerson size={20} className="hover:text-primary-green" />
            </div>
          ) : user ? (
            <div className="relative">
              <button onClick={handleUserMenuToggle} className="flex items-center justify-center text-white">
                <BsPerson size={20} className="hover:text-primary-green" />
              </button>
              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white shadow-xl transition-all duration-150 ease-out ${
                    isUserMenuAnimating ? "-translate-y-1 scale-95 opacity-0" : "translate-y-0 scale-100 opacity-100"
                  }`}
                  style={{
                    transformOrigin: "top right",
                  }}
                >
                  {/* User Info Header */}
                  <div className="border-b border-gray-100 px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                        <FiUser className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">{user.displayName || "User"}</p>
                        <p className="truncate text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <Link
                      href="/my-account"
                      onClick={handleMenuItemClick}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                    >
                      <FiUser className="h-4 w-4 text-gray-400" />
                      <span>My Account</span>
                    </Link>
                    <Link
                      href="/orders"
                      onClick={handleMenuItemClick}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-50"
                    >
                      <FiPackage className="h-4 w-4 text-gray-400" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center space-x-3 px-4 py-3 text-sm text-gray-700 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <FiLogOut className="h-4 w-4 text-gray-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" onClick={closeUserMenu} className="text-white">
              <BsPerson size={20} className="hover:text-primary-green" />
            </Link>
          )}
          <Link href="/cart" onClick={closeUserMenu} className="relative">
            <PiShoppingCartSimpleBold className="cursor-pointer text-lg text-white" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {getTotalItems()}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Desktop Navigation */}
      {/* <nav className="hidden md:block">
        <ul className="mx-auto flex w-full max-w-[1100px] list-none flex-row items-center justify-center">
          {navItems.map((item) => (
            <li
              key={item.href}
              className="hover:bg-primary-green/20 flex-1 text-xs text-white transition-all duration-200"
            >
              <Link
                href={item.href}
                className="hover:text-primary-green flex w-full justify-center rounded py-2.5 font-medium text-white no-underline transition-all duration-300"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}

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
                  className={`block rounded-lg px-4 py-3 font-medium transition-colors duration-200 hover:bg-gray-100 ${
                    item.label === "GREAT DEALS"
                      ? "text-primary-green hover:text-[#283071]"
                      : "text-gray-700 hover:text-[#283071]"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    closeUserMenu();
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
