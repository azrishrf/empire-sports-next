"use client";

import BrandsGrid from "@/components/Collections/BrandsGrid";
import CollectionsToolbar from "@/components/Collections/CollectionsToolbar";
import FilterSidebar from "@/components/Collections/FilterSidebar";
import ProductsGrid from "@/components/Collections/ProductsGrid";
import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import AOS from "aos";
import { useEffect, useState } from "react";

interface ConfigType {
  title: string;
  filters: string[];
  genderFilter: string | null;
  brandFilter?: string;
}

interface CategoryClientProps {
  config: ConfigType;
}

export default function CategoryClient({ config }: CategoryClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
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
        let allProducts = await ProductService.getAllProducts();

        // Apply initial filtering based on collection type
        if (config.genderFilter) {
          allProducts = allProducts.filter(
            (product) =>
              product.gender?.toLowerCase() === config.genderFilter ||
              product.name.toLowerCase().includes(config.genderFilter!),
          );
        }

        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [config]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Filter by specific brand (for brand-specific pages)
    if (config.brandFilter) {
      filtered = filtered.filter((product) => product.brand?.toLowerCase() === config.brandFilter?.toLowerCase());
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((cat) => product.category.toLowerCase().includes(cat.toLowerCase())),
      );
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.some((brand) => product.brand?.toLowerCase().includes(brand.toLowerCase())),
      );
    }

    // Filter by gender (only for brands and sports pages)
    if (selectedGenders.length > 0 && config.filters.includes("gender")) {
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
    setAnimationKey((prev) => prev + 1);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        AOS.refresh();
      }
    }, 50);
  }, [products, selectedCategories, selectedBrands, selectedGenders, priceRange, sortBy, config]);

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName],
    );
    if (window.innerWidth < 1024) {
      setTimeout(() => setIsMobileFilterOpen(false), 300);
    }
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
    if (window.innerWidth < 1024) {
      setTimeout(() => setIsMobileFilterOpen(false), 300);
    }
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) => (prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]));
    if (window.innerWidth < 1024) {
      setTimeout(() => setIsMobileFilterOpen(false), 300);
    }
  };

  return (
    <div>
      {/* Conditional rendering for Brands page */}
      {config.title.toLowerCase().includes("brand") ? (
        <BrandsGrid />
      ) : (
        <div>
          {/* Hero Section */}
          <div className="relative h-64 bg-gradient-to-r from-gray-900 to-gray-700">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="text-center text-white">
                <h1 className="mb-4 text-2xl font-bold md:text-5xl" style={{ fontFamily: "var(--font-syne)" }}>
                  {config.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="!max-w-[1400px container mx-auto flex flex-col gap-4 lg:flex-row">
            {/* Filter Sidebar */}
            <FilterSidebar
              products={products}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              selectedGenders={selectedGenders}
              priceRange={priceRange}
              isMobileFilterOpen={isMobileFilterOpen}
              availableFilters={config.filters}
              onCategoryChange={handleCategoryChange}
              onBrandChange={handleBrandChange}
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
                  setSelectedBrands([]);
                  setSelectedGenders([]);
                  setPriceRange([0, 1000]);
                  setSortBy("default");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
