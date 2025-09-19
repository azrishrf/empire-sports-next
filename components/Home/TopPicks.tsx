import Image from "next/image";

const products = [
  {
    id: 1,
    image: "/images/top picks/NIKE ZOOM FLY X OFF-WHITE THE 10.png",
    name: "NIKE ZOOM FLY X OFF-WHITE THE 10",
    newPrice: "RM 5,500.00",
    oldPrice: "RM 6,000.00",
  },
  {
    id: 2,
    image: "/images/top picks/bred toe.png",
    name: "AIR JORDAN 1 LOW 'BRED TOE'",
    newPrice: "RM 1,250.00",
    oldPrice: "RM 1,550.00",
  },
  {
    id: 3,
    image: "/images/top picks/yeezy.png",
    name: "ADIDAS YEEZY BOOST 350 V2 'BONE / PURE OAT'",
    newPrice: "RM 1,560.00",
    oldPrice: "RM 1,765.00",
  },
  {
    id: 4,
    image: "/images/top picks/pandan.png",
    name: "NIKE DUNK LOW RETRO 'PANDA' / 'BLACK WHITE'",
    newPrice: "RM 999.00",
    oldPrice: "RM 1,100.00",
  },
];

export default function TopPicks() {
  return (
    <section className="container">
      <h2 className="mb-4 text-center text-2xl font-semibold">Top Picks</h2>
      <p className="mb-6 text-center text-xs text-black md:text-sm">
        A selection of shoes that is a favorite of every shoe enthusiast and also our customers. Curated daily from
        brands such as adidas, Yeezy, Nike, Jordan, Adidas and more.
      </p>
      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group mx-auto w-full max-w-xs">
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
              <span className="text-sm font-bold text-green-600">{product.newPrice}</span>
              <span className="text-sm text-gray-500 line-through">{product.oldPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
