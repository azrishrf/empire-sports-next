import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const categoryLinks = [
  { href: "/category-running", label: "Running" },
  { href: "/category-sneakers", label: "Sneakers" },
  { href: "/category-clothing", label: "Clothing" },
  { href: "/category-sandals", label: "Sandals" },
  { href: "/category-basketball", label: "Basketball" },
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
    <div className="bg-zinc-900">
      <footer className="mx-auto max-w-[1300px] border-b-2 border-zinc-800 px-6 py-6 text-xs">
        <div className="flex flex-col justify-around gap-8 font-medium md:flex-row">
          {/* Shop Info */}
          <div className="rounded-3xl bg-white px-4 py-5 md:w-2/5">
            <Link href="/" className="mb-4 block">
              <Image src="/images/logo.jpg" alt="Logo business" width={90} height={50} />
            </Link>
            <p className="mb-3">
              <FaPhone className="mr-2 inline"></FaPhone>+60156721632
            </p>
            <p className="mb-3">
              <FaLocationDot className="mr-2 inline"></FaLocationDot>
              Lot 23, SU 3, Saujana Utama, 47000 Sungai Buloh, Selangor
            </p>
            <p className="mb-3">
              <MdEmail className="mr-2 inline"></MdEmail>empiresports@gmail.com
            </p>
          </div>

          <div className="flex gap-10 md:w-2/5 md:justify-around">
            {/* Categories */}
            <div className="text-white">
              <h3 className="pb-5 text-base font-semibold">CATEGORIES</h3>
              <ul className="list-none space-y-2">
                {categoryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white no-underline transition-colors hover:text-blue-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div className="text-white">
              <h3 className="pb-5 text-base font-semibold">ACCOUNT</h3>
              <ul className="list-none space-y-2">
                {accountItems.map((item) => (
                  <li key={item} className="cursor-pointer text-white transition-colors hover:text-blue-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Follow Us */}
          <div className="md:w-1/5">
            <h3 className="pb-5 text-base font-semibold text-white">FOLLOW US</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <Image src={social.icon} width={32} height={32} alt={social.alt} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="py-2.5 text-center text-xs text-white">
        <p>Copyright © 2022 Empire Sports. All rights reserved.</p>
      </div>
    </div>
  );
}
