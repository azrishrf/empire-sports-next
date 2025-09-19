import Image from "next/image";

export default function TopBanner() {
  return (
    <div className="relative">
      <Image src="/images/top banner new.png" alt="Top banner" width={1200} height={400} className="h-auto w-full" />
    </div>
  );
}
