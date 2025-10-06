import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const categoryLinks = [
  { href: "/collections/running", label: "Running" },
  { href: "/collections/sneakers", label: "Sneakers" },
  { href: "/collections/clothing", label: "Clothing" },
  { href: "/collections/sandals", label: "Sandals" },
  { href: "/collections/basketball", label: "Basketball" },
];

const accountItems = ["My Account", "Shopping Cart", , "Orders"];

const socialLinks = [
  {
    href: "https://www.facebook.com/",
    icon: "/images/Facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://www.tiktok.com/",
    icon: "/images/Tiktok.png",
    alt: "Tiktok",
  },
  {
    href: "https://www.instagram.com/",
    icon: "/images/Instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://www.youtube.com/",
    icon: "/images/Youtube.png",
    alt: "Youtube",
  },
];

export default function Footer() {
  return (
    <div className="bg-neutral-900">
      <footer className="mx-auto max-w-7xl px-6 py-16 text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Shop Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 block">
              <Image src="/logo.png" alt="Logo business" width={120} height={60} className="h-12 w-auto" />
            </Link>
            <p className="mb-6 max-w-md leading-relaxed text-gray-300">
              Empire Sports is your ultimate destination for premium sportswear and footwear. We are committed to
              providing top-quality products that enhance your performance and style.
            </p>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center">
                <FaPhone className="text-primary-green mr-3" />
                +60 12-345 6789
              </p>
              <p className="flex items-center">
                <FaLocationDot className="text-primary-green mr-3" />
                Lot 27, Taman Sri Permai, 43300 Seri Kembangan, Selangor, Malaysia.
              </p>
              <p className="flex items-center">
                <MdEmail className="text-primary-green mr-3" />
                empiresports@gmail.com
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-semibold text-white">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.alt}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative"
                  >
                    <div className="flex items-center justify-center rounded-full bg-gray-800 transition-all duration-300 group-hover:scale-110">
                      <Image
                        src={social.icon}
                        width={30}
                        height={30}
                        alt={social.alt}
                        className="transition-all duration-300"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Our Store
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-green inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Customer Support
            </h3>
            <ul className="space-y-3">
              {accountItems.map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "My Account"
                        ? "/my-account"
                        : item === "Shopping Cart"
                          ? "/cart"
                          : item === "Wishlist"
                            ? "/wishlist"
                            : item === "Orders"
                              ? "/orders"
                              : "#"
                    }
                    className="hover:text-primary-green inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-400 md:mb-0">
              © {new Date().getFullYear()} Empire Sports. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
