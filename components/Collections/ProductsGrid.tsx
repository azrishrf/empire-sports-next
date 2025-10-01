"use client";

import { Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { BiSearchAlt } from "react-icons/bi";
import PropagateLoader from "react-spinners/PropagateLoader";

interface ProductsGridProps {
  filteredProducts: Product[];
  showItems: number;
  animationKey: number;
  loading: boolean;
  onClearFilters: () => void;
}

export default function ProductsGrid({
  filteredProducts,
  showItems,
  animationKey,
  loading,
  onClearFilters,
}: ProductsGridProps) {
  if (loading) {
    return (
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
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-gray-100 p-6">
            <BiSearchAlt className="h-12 w-12 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
            <p className="mx-auto max-w-md text-gray-500">
              We couldn&apos;t find any products matching your current filters. Try adjusting your search criteria or
              browse our full collection.
            </p>
          </div>
          <button
            onClick={onClearFilters}
            className="mt-4 rounded-lg bg-[var(--color-primary-green)] px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-[var(--color-primary-green)]/80"
          >
            Clear all filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={animationKey} className={`grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
      {filteredProducts.slice(0, showItems).map((product, index) => (
        <Link
          key={`${product.id}-${animationKey}`}
          href={`/collections/${product.category.toLowerCase()}/${product.id}`}
          data-aos="fade-up"
          data-aos-delay={index * 50}
          data-aos-duration="500"
          className="group h-full"
        >
          <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg">
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

            <div className="flex flex-1 flex-col justify-between p-4">
              <h3
                className="mb-2 line-clamp-2 text-sm font-medium text-gray-900"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">{product.price}</span>

                {product.availability === "IN STOCK" && (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    In Stock
                  </span>
                )}
              </div>
              {/* {product.brand && <p className="mt-1 text-xs text-gray-500">{product.brand}</p>} */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
