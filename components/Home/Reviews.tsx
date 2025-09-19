import Image from "next/image";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Yousaf Iqbal",
    image: "/images/yousaf.jpg",
    review:
      "If you're looking for high quality genuine sneakers, do check them out~ Attentive, Responsive and Authentic!",
  },
  {
    id: 2,
    name: "Khairul Aming",
    image: "/images/khairul aming.jpg",
    review:
      "The best shoe store I have ever bought shoes from. The service provided is the best. It's hard not to go back.",
  },
  {
    id: 3,
    name: "Ryan Bakery",
    image: "/images/ryan.jpg",
    review: "Ordered some sneakers products and it got delivered in only two days. Package secured nicely.",
  },
];

const StarRating = () => (
  <div className="mb-4 flex justify-center gap-1 text-xl text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <FaStar key={i} />
    ))}
  </div>
);

export default function Reviews() {
  return (
    <section className="bg-gray-800">
      <div className="container">
        <h2 className="mb-4 text-center text-2xl font-semibold text-white">Our Reviews</h2>
        <p className="mb-6 text-center text-xs text-gray-300 md:text-sm">
          Various reviews that are satisfied with the products and services we provide throughout our business.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 text-sm lg:flex-row">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="max-w-96 rounded-3xl bg-white px-5 py-7 text-center text-black transition-shadow duration-300 hover:shadow-xl"
            >
              <Image
                src={review.image}
                width={50}
                height={50}
                alt={review.name}
                className="mx-auto mb-4 rounded-full"
              />
              <p className="mb-3 text-base font-bold">{review.name}</p>
              <StarRating />
              <p className="text-xs md:text-sm">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
