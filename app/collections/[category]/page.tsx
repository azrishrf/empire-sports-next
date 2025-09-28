import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "@/components/ProductGrid";
import { categoryConfig } from "@/data/products";
import { ProductService } from "@/lib/productService";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!categoryConfig[category as keyof typeof categoryConfig]) {
    notFound();
  }

  const config = categoryConfig[category as keyof typeof categoryConfig];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: config.label, href: `/collections/${category}` },
  ];

  try {
    // Capitalize first letter to match Firestore data
    const categoryName = config.label;
    const products = await ProductService.getProductsByCategory(categoryName);

    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold">{config.title}</h1>
          <ProductGrid products={products} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-center text-4xl font-bold">{config.title}</h1>
          <div className="text-center">
            <p className="text-gray-600">Error loading products. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({
    category,
  }));
}
