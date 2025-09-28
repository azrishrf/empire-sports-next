import Breadcrumb from "@/components/Breadcrumb";
import { categoryConfig } from "@/data/products";
import { ProductService } from "@/lib/productService";
import { notFound } from "next/navigation";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId, category } = await params;

  try {
    const product = await ProductService.getProductById(productId);

    if (!product) {
      notFound();
    }

    // Get category info
    const categoryKey = category as keyof typeof categoryConfig;
    const categoryInfo = categoryConfig[categoryKey];

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Collections", href: "/collections" },
      { label: categoryInfo?.label || product.category, href: `/collections/${categoryKey}` },
      { label: product.name, href: `/collections/${category}/${product.id}` },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <ProductPageClient product={product} breadcrumbItems={breadcrumbItems} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">Product Not Found</h1>
            <p className="text-gray-600">
              The product you&apos;re looking for could not be loaded. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
