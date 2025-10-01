"use client";

import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCheckbox, BiCheckboxSquare, BiSearchAlt } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import PropagateLoader from "react-spinners/PropagateLoader";

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

export default function CollectionsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("default");
  const [showItems, setShowItems] = useState(15);
  const [loading, setLoading] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await ProductService.getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((cat) => product.category.toLowerCase().includes(cat.toLowerCase())),
      );
    }

    // Filter by gender
    if (selectedGenders.length > 0) {
      filtered = filtered.filter((product) =>
        selectedGenders.some(
          (gender) =>
            product.gender?.toLowerCase().includes(gender.toLowerCase()) ||
            product.name.toLowerCase().includes(gender.toLowerCase()),
        ),
      );
    }

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price.replace(/[^\d.]/g, ""));
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceB - priceA;
        });
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);

    // Trigger animation refresh when sorting changes
    setAnimationKey((prev) => prev + 1);

    // Refresh AOS after a short delay to ensure DOM is updated
    setTimeout(() => {
      if (typeof window !== "undefined") {
        AOS.refresh();
      }
    }, 50);
  }, [products, selectedCategories, selectedGenders, priceRange, sortBy]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
    // Close mobile filter on selection for better UX
    if (window.innerWidth < 1024) {
      setTimeout(() => setIsMobileFilterOpen(false), 300);
    }
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) => (prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]));
    // Close mobile filter on selection for better UX
    if (window.innerWidth < 1024) {
      setTimeout(() => setIsMobileFilterOpen(false), 300);
    }
  };

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

  //   if (loading) {
  //     return (
  //       <div className="">
  //         <BeatLoader
  //           color="var(--primary-green)"
  //           loading={loading}
  //           cssOverride={override}
  //           size={150}
  //           aria-label="Loading Spinner"
  //           data-testid="loader"
  //         />
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="mb-4 text-2xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-syne)" }}>
              Collections
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto !max-w-[1400px] px-4 py-8">
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
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
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-lg p-2 text-gray-400 hover:text-gray-600"
                >
                  <IoClose className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Categories Filter */}
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
                                onClick={() => handleCategoryChange(category.slug)}
                              />
                            ) : (
                              <BiCheckbox
                                className="h-5 w-5 text-gray-400"
                                onClick={() => handleCategoryChange(category.slug)}
                              />
                            )}
                          </div>
                          <span className="text-gray-700">{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({getCategoryCount(category.slug)})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Gender Filter */}
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
                                onClick={() => handleGenderChange(gender.value)}
                              />
                            ) : (
                              <BiCheckbox
                                className="h-5 w-5 text-gray-400"
                                onClick={() => handleGenderChange(gender.value)}
                              />
                            )}
                          </div>
                          <span className="text-gray-700">{gender.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">({getGenderCount(gender.value)})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
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
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                      style={{ accentColor: "var(--color-primary-green)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-xs text-gray-600">
                Showing 1-{Math.min(showItems, filteredProducts.length)} of {filteredProducts.length} results
              </p>

              <div className="flex items-center gap-4">
                {/* Items per page */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Show</span>
                  <select
                    value={showItems}
                    onChange={(e) => setShowItems(parseInt(e.target.value))}
                    className="rounded border border-gray-300 px-2 py-1 text-xs"
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                  </select>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Default sorting</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded border border-gray-300 px-2 py-1 text-xs"
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <PropagateLoader
                    color="var(--color-primary-green)"
                    loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              </div>
            ) : (
              <div key={animationKey} className={`grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
                {filteredProducts.slice(0, showItems).map((product, index) => (
                  <Link
                    key={`${product.id}-${animationKey}`}
                    href={`/collections/${product.category.toLowerCase()}/${product.id}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    data-aos-duration="500"
                  >
                    <div className="group relative cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                      {/* NEW badge for recent products */}
                      {product.createdAt &&
                        (() => {
                          try {
                            const createdDate = product.createdAt.toDate();
                            return createdDate > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                          } catch {
                            return false;
                          }
                        })() && (
                          <span className="absolute top-3 left-3 z-10 rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">
                            NEW
                          </span>
                        )}

                      <div className="aspect-square overflow-hidden bg-gray-50">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <h3
                          className="mb-2 line-clamp-2 text-sm font-medium text-gray-900"
                          style={{ fontFamily: "var(--font-syne)" }}
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                        </div>
                        {product.brand && <p className="mt-1 text-xs text-gray-500">{product.brand}</p>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && !loading && (
              <div className="py-16 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-gray-100 p-6">
                    <BiSearchAlt className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
                    <p className="mx-auto max-w-md text-gray-500">
                      We couldn&apos;t find any products matching your current filters. Try adjusting your search
                      criteria or browse our full collection.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategories([]);
                      setSelectedGenders([]);
                      setPriceRange([0, 1000]);
                      setSortBy("default");
                    }}
                    className="mt-4 rounded-lg bg-[var(--color-primary-green)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--color-primary-green)]/80"
                  >
                    Clear all filters
                  </button>
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
    </div>
  );
}
