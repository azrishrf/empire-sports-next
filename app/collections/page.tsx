import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

const categories = [
  { slug: "running", name: "Running", description: "Performance running shoes" },
  { slug: "sneakers", name: "Sneakers", description: "Stylish sneakers and casual shoes" },
  { slug: "clothing", name: "Clothing", description: "Athletic wear and sportswear" },
  { slug: "sandals", name: "Sandals", description: "Comfortable sandals and slides" },
  { slug: "basketball", name: "Basketball", description: "High-performance basketball shoes" },
];

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">SHOP BY CATEGORY</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group block rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-300 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                {category.name}
              </h2>
              <p className="mt-2 text-gray-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
