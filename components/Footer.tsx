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

const accountItems = ["My Account", "Checkout", "Wishlist", "Orders Tracking", "FAQ"];

const socialLinks = [
  {
    href: "https://www.facebook.com/myempiresports/",
    icon: "/images/Facebook.png",
    alt: "Facebook",
  },
  {
    href: "https://www.tiktok.com/@empiresports.my?_t=8X8HlpE81dC&_r=1",
    icon: "/images/Tiktok.png",
    alt: "Tiktok",
  },
  {
    href: "https://www.instagram.com/empiresports.my/?igshid=1glx2uqqvl1ck",
    icon: "/images/Instagram.png",
    alt: "Instagram",
  },
  {
    href: "https://www.youtube.com/channel/UCxHD2vqErBAl1lJabnTEPHg",
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
              <Image src="/images/logo.jpg" alt="Logo business" width={120} height={60} className="h-12 w-auto" />
            </Link>
            <p className="mb-6 max-w-md leading-relaxed text-gray-300">
              Empire Sports is your premier destination for high-quality sports equipment and apparel. We&apos;re
              dedicated to helping athletes at every level reach their potential.
            </p>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center">
                <FaPhone className="text-primary-green mr-3" />
                +60156721632
              </p>
              <p className="flex items-center">
                <FaLocationDot className="text-primary-green mr-3" />
                Lot 23, SU 3, Saujana Utama, 47000 Sungai Buloh, Selangor
              </p>
              <p className="flex items-center">
                <MdEmail className="text-primary-green mr-3" />
                empiresports@gmail.com
              </p>
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
                  <a
                    href="#"
                    className="hover:text-primary-green inline-block text-gray-300 transition-colors duration-300 hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              About Us
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a
                  href="#"
                  className="hover:text-primary-green inline-block transition-colors duration-300 hover:translate-x-1"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-green inline-block transition-colors duration-300 hover:translate-x-1"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-green inline-block transition-colors duration-300 hover:translate-x-1"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-green inline-block transition-colors duration-300 hover:translate-x-1"
                >
                  News
                </a>
              </li>
            </ul>

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
                    <div className="group-hover:bg-primary-green flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-all duration-300 group-hover:scale-110">
                      <Image
                        src={social.icon}
                        width={20}
                        height={20}
                        alt={social.alt}
                        className="transition-all duration-300 group-hover:brightness-0"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-400 md:mb-0">© 2025 Empire Sports. All rights reserved.</p>

            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-primary-green transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-green transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-green transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
