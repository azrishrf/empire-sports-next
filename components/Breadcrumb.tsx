import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-200">
      <div className="container mx-auto px-4 !py-4">
        <ol className="flex items-center space-x-2 text-xs">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-500">›</span>}
              {index === items.length - 1 ? (
                <span className="font-medium text-gray-800">{item.label}</span>
              ) : (
                <Link href={item.href} className="text-gray-600 transition-colors hover:text-gray-800">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
