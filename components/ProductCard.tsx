import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/collections/${product.category.toLowerCase()}/${product.id}`} className="group">
      <div className="overflow-hidden rounded-lg border border-gray-300 bg-white transition-shadow duration-300">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-white" data-aos="zoom-out" data-aos-duration="800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Product Info */}
        <div className="bg-gray-100 p-4">
          <p className="mb-2 text-xs tracking-wide text-gray-500 uppercase">{product.category}</p>
          <h3 className="mb-3 line-clamp-2 text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="text-lg font-bold text-gray-900">{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
