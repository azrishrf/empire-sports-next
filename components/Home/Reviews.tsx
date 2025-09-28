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

interface ReviewsProps {
  backgroundColor?: string; // e.g. "bg-gray-800"
  titleColor?: string; // e.g. "text-white"
  descriptionColor?: string; // e.g. "text-gray-300"
}

export default function Reviews({
  backgroundColor = "bg-gray-800",
  titleColor = "text-white",
  descriptionColor = "text-gray-300",
}: ReviewsProps) {
  return (
    <section className={backgroundColor}>
      <div className="container">
        <h2 className={`mb-4 text-center text-2xl font-semibold ${titleColor}`} data-aos="fade-up">
          Our Reviews
        </h2>
        <p className={`mb-6 text-center text-xs md:text-sm ${descriptionColor}`} data-aos="fade-up">
          Various reviews that are satisfied with the products and services we provide throughout our business.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 text-sm lg:flex-row">
          {reviews.map((review) => (
            <div
              key={review.id}
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="300"
              data-aos-offset="0"
              className="max-w-96 rounded-3xl bg-white px-5 py-7 text-center text-black transition-shadow duration-300"
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
