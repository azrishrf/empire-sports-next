"use client";

import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import AOS from "aos";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedProductsProps {
  category: string;
  currentProductId: string;
  currentProductBrand: string;
}

export default function RelatedProducts({ category, currentProductId, currentProductBrand }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    const fetchProducts = async () => {
      try {
        // Get all products
        const allProducts = await ProductService.getAllProducts();

        // Filter out current product
        const availableProducts = allProducts.filter((product) => product.id !== currentProductId);

        let relatedProducts: Product[] = [];

        // 1. First try to get products from same category
        const categoryProducts = availableProducts.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase(),
        );
        relatedProducts = [...categoryProducts];

        // 2. If less than 5, add products from same brand
        if (relatedProducts.length < 5 && currentProductBrand) {
          const brandProducts = availableProducts.filter(
            (product) =>
              product.brand?.toLowerCase() === currentProductBrand.toLowerCase() &&
              !relatedProducts.some((rp) => rp.id === product.id),
          );
          relatedProducts = [...relatedProducts, ...brandProducts];
        }

        // 3. If still less than 5, add highest sales products from getFeaturedProducts
        if (relatedProducts.length < 5) {
          const featuredProducts = await ProductService.getFeaturedProducts(10); // Get more to have options
          const remainingFeaturedProducts = featuredProducts.filter(
            (product) =>
              product.id !== currentProductId && // Exclude current product
              !relatedProducts.some((rp) => rp.id === product.id), // Exclude already selected products
          );

          const needed = 5 - relatedProducts.length;
          relatedProducts = [...relatedProducts, ...remainingFeaturedProducts.slice(0, needed)];
        }

        // Limit to 5 products
        setProducts(relatedProducts.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, currentProductId, currentProductBrand]);

  //   if (loading) {
  //     return (
  //       <section className="bg-white px-4 py-16">
  //         <div className="mx-auto max-w-7xl text-center">
  //           <div className="bg-primary-green mb-8 inline-flex items-center rounded-full px-4 py-2 text-sm font-bold text-black">
  //             Loading...
  //           </div>
  //         </div>
  //       </section>
  //     );
  //   }

  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <div className="bg-primary-green inline-flex items-center rounded-full px-6 py-4 text-3xl font-bold text-black">
            <span style={{ fontFamily: "var(--font-syne)" }}>Related Products</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/collections/${product.category.toLowerCase()}/${product.id}`}
              className="group h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1 hover:shadow-lg">
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={250}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                      View Details
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col justify-between space-y-3">
                  <h3
                    className="line-clamp-2 font-semibold text-gray-900 transition-colors duration-300"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900" style={{ fontFamily: "var(--font-syne)" }}>
                      {product.price}
                    </span>

                    {product.availability === "IN STOCK" && (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
