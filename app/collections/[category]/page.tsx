import { notFound } from "next/navigation";
import CategoryClient from "./CategoryClient";

interface ConfigType {
  title: string;
  filters: string[];
  genderFilter: string | null;
  brandFilter?: string;
}

// Configuration for different collection types
const collectionConfig: Record<string, ConfigType> = {
  men: {
    title: "Men's Collection",
    filters: ["categories", "brands", "price"],
    genderFilter: "men",
  },
  women: {
    title: "Women's Collection",
    filters: ["categories", "brands", "price"],
    genderFilter: "women",
  },
  greatdeals: {
    title: "Great Deals Up to 50% OFF",
    filters: ["categories", "brands", "gender", "price"],
    genderFilter: null,
  },
  brands: {
    title: "Top Brands",
    filters: ["categories", "brands", "gender", "price"],
    genderFilter: null,
  },
  "about-us": {
    title: "About Us",
    filters: [],
    genderFilter: null,
  },
};

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  // Check if category is valid
  let config = collectionConfig[category as keyof typeof collectionConfig];

  // If not found in predefined configs, check if it might be a brand route
  if (!config) {
    // Convert URL slug back to brand name (e.g., "under-armour" -> "Under Armour")
    const brandName = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Create a dynamic brand configuration
    config = {
      title: `${brandName} Collection`,
      filters: ["categories", "gender", "price"],
      genderFilter: null,
      brandFilter: brandName, // Add brand filter for this specific brand
    } as ConfigType;
  }

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <CategoryClient config={config} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(collectionConfig).map((category) => ({
    category,
  }));
}
