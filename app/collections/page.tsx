"use client";

import CollectionsToolbar from "@/components/Collections/CollectionsToolbar";
import FilterSidebar from "@/components/Collections/FilterSidebar";
import ProductsGrid from "@/components/Collections/ProductsGrid";
import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import AOS from "aos";
import { useEffect, useState } from "react";

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
          {/* Filter Sidebar */}
          <FilterSidebar
            products={products}
            selectedCategories={selectedCategories}
            selectedGenders={selectedGenders}
            priceRange={priceRange}
            isMobileFilterOpen={isMobileFilterOpen}
            onCategoryChange={handleCategoryChange}
            onGenderChange={handleGenderChange}
            onPriceRangeChange={setPriceRange}
            onMobileFilterToggle={setIsMobileFilterOpen}
          />

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <CollectionsToolbar
              filteredProductsCount={filteredProducts.length}
              showItems={showItems}
              sortBy={sortBy}
              onShowItemsChange={setShowItems}
              onSortByChange={setSortBy}
            />

            {/* Products Grid */}
            <ProductsGrid
              filteredProducts={filteredProducts}
              showItems={showItems}
              animationKey={animationKey}
              loading={loading}
              onClearFilters={() => {
                setSelectedCategories([]);
                setSelectedGenders([]);
                setPriceRange([0, 1000]);
                setSortBy("default");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
