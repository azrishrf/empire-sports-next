import { Product } from "@/data/products";
import { ProductService } from "@/lib/productService";
import Image from "next/image";
import Link from "next/link";

export default async function TopPicks() {
  let products: Product[] = [];

  try {
    // Get featured products from Firestore (limit to 4 for top picks)
    products = await ProductService.getFeaturedProducts(4);
  } catch (error) {
    console.error("Error fetching top picks:", error);
    // Fallback to empty array if Firestore fails
    products = [];
  }
  return (
    <section className="container">
      <h2 className="mb-4 text-center text-2xl font-semibold">Top Picks</h2>
      <p className="mb-6 text-center text-xs text-black md:text-sm">
        A selection of shoes that is a favorite of every shoe enthusiast and also our customers. Curated daily from
        brands such as adidas, Yeezy, Nike, Jordan, Adidas and more.
      </p>
      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            <p>Loading featured products...</p>
          </div>
        ) : (
          products.map((product) => (
            <Link
              href={`/collections/${product.category.toLowerCase()}/${product.id}`}
              key={product.id}
              className="group mx-auto block w-full max-w-xs"
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  width={250}
                  height={132}
                  alt={product.name}
                  className="mb-5 aspect-video h-32 w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mb-2 text-sm font-medium lg:h-12">{product.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-bold text-green-600">{product.price}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
