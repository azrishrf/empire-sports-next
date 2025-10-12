"use client";

import ProductSection from "@/components/ProductSection";
import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import { useEffect, useState } from "react";

export default function TopTrending() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await ProductService.getFeaturedProducts(5);
        setProducts(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return <ProductSection title="Top Trending" products={products} loading={loading} showServices={true} />;
}
