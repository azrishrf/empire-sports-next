import Image from "next/image";

export default function Services() {
  const services = [
    {
      icon: "/images/delivery.png",
      title: "FREE DELIVERY",
      description: "Free shipping on all local orders above RM 250",
    },
    {
      icon: "/images/payment.png",
      title: "SECURE PAYMENT",
      description: "Your payment details are securely encrypted from start till finish",
    },
    {
      icon: "/images/return.png",
      title: "RETURN POLICY",
      description: "Every delivery error can be returned free of charge",
    },
    {
      icon: "/images/authentication.png",
      title: "100% AUTHENTICITY",
      description: "We verify and authenticate all products through expertise and numerous inspections",
    },
  ];

  return (
    <section className="container">
      <div
        className="mx-auto grid grid-cols-1 gap-4 rounded-3xl px-3 py-8 shadow-2xl sm:grid-cols-2 sm:flex-row sm:justify-around lg:grid-cols-4"
        style={{ boxShadow: "rgba(0, 0, 0, 0.2) 5px 4px 11px 2px" }}
      >
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`mx-auto px-5 text-center ${
              index < services.length - 1 ? "lg:border-r-2 lg:border-gray-200" : ""
            }`}
          >
            <Image
              src={service.icon}
              width={90}
              height={84}
              alt={service.title}
              className="mx-auto mb-2.5 h-20 object-contain"
            />
            <p className="mb-2 text-base font-bold">{service.title}</p>
            <p className="max-w-56 text-xs text-gray-600 md:text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
