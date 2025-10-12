"use client";

import ProductSection from "@/components/ProductSection";
import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
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

  return <ProductSection title="Related Products" products={products} loading={loading} showServices={false} />;
}
