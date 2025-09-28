"use client";

import ProductReviews from "@/components/Product/ProductReviews";
import { Product } from "@/data/products";
import AOS from "aos";
import { useState } from "react";
import { MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("DESCRIPTION");

  const tabs = ["DESCRIPTION", "DETAILS", "REVIEW"];
  const currentTabIndex = tabs.indexOf(activeTab);

  const navigateTab = (direction: "prev" | "next") => {
    if (direction === "prev" && currentTabIndex > 0) {
      setActiveTab(tabs[currentTabIndex - 1]);
      setTimeout(() => AOS.refresh(), 100);
    } else if (direction === "next" && currentTabIndex < tabs.length - 1) {
      setActiveTab(tabs[currentTabIndex + 1]);
      setTimeout(() => AOS.refresh(), 100);
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => AOS.refresh(), 100);
  };

  return (
    <div className="mt-12" data-aos="fade-up" data-aos-duration="800">
      {/* Desktop Tab Navigation */}
      <div className="hidden space-x-2 text-sm md:flex">
        <button
          onClick={() => handleTabClick("DESCRIPTION")}
          className={`rounded-xl px-6 py-3 font-medium ${
            activeTab === "DESCRIPTION"
              ? "bg-red-800 text-white"
              : "cursor-pointer bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
          }`}
        >
          DESCRIPTION
        </button>
        <button
          onClick={() => handleTabClick("DETAILS")}
          className={`rounded-xl px-6 py-3 font-medium ${
            activeTab === "DETAILS"
              ? "bg-red-800 text-white"
              : "cursor-pointer bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
          }`}
        >
          DETAILS
        </button>
        <button
          onClick={() => handleTabClick("REVIEW")}
          className={`rounded-xl px-6 py-3 font-medium ${
            activeTab === "REVIEW"
              ? "bg-red-800 text-white"
              : "cursor-pointer bg-gray-200 text-gray-500 transition-colors hover:bg-gray-300"
          }`}
        >
          REVIEW
        </button>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="flex items-center justify-center md:hidden">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigateTab("prev")}
            disabled={currentTabIndex === 0}
            className={`flex items-center justify-center ${
              currentTabIndex === 0
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-700 hover:text-gray-700 active:scale-90"
            } transition-all duration-150`}
          >
            <MdArrowCircleLeft size={30} />
          </button>

          <div className="rounded-xl bg-red-800 px-6 py-3 text-center text-sm font-medium text-white">{activeTab}</div>

          <button
            onClick={() => navigateTab("next")}
            disabled={currentTabIndex === tabs.length - 1}
            className={`flex items-center justify-center ${
              currentTabIndex === tabs.length - 1
                ? "cursor-not-allowed text-gray-300"
                : "text-gray-700 hover:text-gray-700 active:scale-90"
            } transition-all duration-150`}
          >
            <MdArrowCircleRight size={30} />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4 rounded-lg border border-gray-200 bg-white p-6">
        {activeTab === "DESCRIPTION" && (
          <div data-aos="fade" data-aos-duration="400" data-aos-once="false" key="description">
            <h4 className="mb-3 font-bold text-gray-900">Description</h4>
            <p className="text-sm leading-relaxed text-gray-700">{product.description}</p>
          </div>
        )}

        {activeTab === "DETAILS" && (
          <div data-aos="fade" data-aos-duration="400" data-aos-once="false" key="details">
            <h4 className="mb-3 font-bold text-gray-900">Product Details</h4>
            <table className="w-full border-separate [border-spacing:0.5rem] text-sm text-gray-700">
              <tbody>
                <tr className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="w-32 font-semibold">Brand:</td>
                  <td>{product.brand || "N/A"}</td>
                </tr>
                <tr className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="font-semibold">Model:</td>
                  <td>{product.name}</td>
                </tr>
                <tr className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="font-semibold">Colorway:</td>
                  <td>{product.colorway || "N/A"}</td>
                </tr>
                <tr className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="font-semibold">Category:</td>
                  <td>{product.category}</td>
                </tr>
                <tr className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="font-semibold">Material:</td>
                  <td>{product.material || "N/A"}</td>
                </tr>
                <tr className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="font-semibold">Gender:</td>
                  <td>{product.gender || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "REVIEW" && (
          <div data-aos="fade" data-aos-duration="400" data-aos-once="false" key="review">
            <ProductReviews product={product} />
          </div>
        )}
      </div>
    </div>
  );
}
