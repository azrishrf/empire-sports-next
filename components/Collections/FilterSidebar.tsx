"use client";

import { Product } from "@/data/products";
import { BiCheckbox, BiCheckboxSquare } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const categories = [
  { slug: "basketball", name: "Basketball" },
  { slug: "running", name: "Running" },
  { slug: "sneakers", name: "Sneakers" },
  { slug: "clothing", name: "Clothing" },
  { slug: "sandals", name: "Sandals" },
];

const genders = [
  { value: "men", name: "Men" },
  { value: "women", name: "Women" },
  { value: "unisex", name: "Unisex" },
];

interface FilterSidebarProps {
  products: Product[];
  selectedCategories: string[];
  selectedBrands?: string[];
  selectedGenders: string[];
  priceRange: number[];
  isMobileFilterOpen: boolean;
  availableFilters?: string[];
  onCategoryChange: (category: string) => void;
  onBrandChange?: (brand: string) => void;
  onGenderChange: (gender: string) => void;
  onPriceRangeChange: (range: number[]) => void;
  onMobileFilterToggle: (open: boolean) => void;
}

export default function FilterSidebar({
  products,
  selectedCategories,
  selectedBrands = [],
  selectedGenders,
  priceRange,
  isMobileFilterOpen,
  availableFilters = ["categories", "brands", "gender", "price"],
  onCategoryChange,
  onBrandChange,
  onGenderChange,
  onPriceRangeChange,
  onMobileFilterToggle,
}: FilterSidebarProps) {
  const getCategoryCount = (categorySlug: string) => {
    return products.filter((product) => product.category.toLowerCase().includes(categorySlug.toLowerCase())).length;
  };

  const getGenderCount = (gender: string) => {
    return products.filter(
      (product) =>
        product.gender?.toLowerCase().includes(gender.toLowerCase()) ||
        product.name.toLowerCase().includes(gender.toLowerCase()),
    ).length;
  };

  const getBrandCount = (brand: string) => {
    return products.filter((product) => product.brand?.toLowerCase().includes(brand.toLowerCase())).length;
  };

  // Get unique brands from products
  const getUniqueBrands = () => {
    const brands = products
      .map((product) => product.brand)
      .filter((brand) => brand && brand.trim() !== "")
      .map((brand) => brand!.trim());

    return [...new Set(brands)].sort();
  };

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden">
        <button
          onClick={() => onMobileFilterToggle(true)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
        >
          <CiFilter className="h-3 w-3" />
          Show Filters
        </button>
      </div>

      {/* Left Sidebar - Filters */}
      <div className="lg:w-1/4">
        {/* Filter Sidebar */}
        <div
          className={`fixed top-0 left-0 z-50 h-full w-80 transform overflow-y-auto bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out lg:relative lg:z-auto lg:transform-none lg:shadow-none lg:transition-none ${isMobileFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
        >
          {/* Mobile Close Button */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => onMobileFilterToggle(false)}
              className="rounded-lg p-2 text-gray-400 hover:text-gray-600"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Categories Filter */}
            {availableFilters.includes("categories") && (
              <div>
                <h3
                  className="mb-4 flex items-center justify-between text-sm font-semibold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.slug} className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center text-xs">
                        <div className="mr-2 flex items-center">
                          {selectedCategories.includes(category.slug) ? (
                            <BiCheckboxSquare
                              className="h-5 w-5 text-[var(--color-primary-green)]"
                              onClick={() => onCategoryChange(category.slug)}
                            />
                          ) : (
                            <BiCheckbox
                              className="h-5 w-5 text-gray-400"
                              onClick={() => onCategoryChange(category.slug)}
                            />
                          )}
                        </div>
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      {/* <span className="text-xs text-gray-500">({getCategoryCount(category.slug)})</span> */}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brands Filter */}
            {availableFilters.includes("brands") && (
              <div>
                <h3
                  className="mb-4 flex items-center justify-between text-sm font-semibold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Brands
                </h3>
                <div className="space-y-3">
                  {getUniqueBrands().map((brand) => (
                    <label key={brand} className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center text-xs">
                        <div className="mr-2 flex items-center">
                          {selectedBrands.includes(brand) ? (
                            <BiCheckboxSquare
                              className="h-5 w-5 text-[var(--color-primary-green)]"
                              onClick={() => onBrandChange?.(brand)}
                            />
                          ) : (
                            <BiCheckbox className="h-5 w-5 text-gray-400" onClick={() => onBrandChange?.(brand)} />
                          )}
                        </div>
                        <span className="text-gray-700">{brand}</span>
                      </div>
                      {/* <span className="text-xs text-gray-500">({getBrandCount(brand)})</span> */}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Gender Filter */}
            {availableFilters.includes("gender") && (
              <div>
                <h3
                  className="mb-4 flex items-center justify-between text-sm font-semibold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Gender
                </h3>
                <div className="space-y-3">
                  {genders.map((gender) => (
                    <label key={gender.value} className="flex cursor-pointer items-center justify-between text-xs">
                      <div className="flex items-center">
                        <div className="mr-2 flex items-center">
                          {selectedGenders.includes(gender.value) ? (
                            <BiCheckboxSquare
                              className="h-5 w-5 text-[var(--color-primary-green)]"
                              onClick={() => onGenderChange(gender.value)}
                            />
                          ) : (
                            <BiCheckbox
                              className="h-5 w-5 text-gray-400"
                              onClick={() => onGenderChange(gender.value)}
                            />
                          )}
                        </div>
                        <span className="text-gray-700">{gender.name}</span>
                      </div>
                      {/* <span className="text-xs text-gray-500">({getGenderCount(gender.value)})</span> */}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Filter */}
            {availableFilters.includes("price") && (
              <div>
                <h3
                  className="mb-4 flex items-center justify-between text-sm font-semibold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Price
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="mr-2 text-xs text-gray-600">Min Price</span>
                      <span className="text-sm font-medium">RM{priceRange[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-xs text-gray-600">Max Price</span>
                      <span className="text-sm font-medium">RM{priceRange[1]}</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                    className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    style={{ accentColor: "var(--color-primary-green)" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary-green);
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary-green);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
}
