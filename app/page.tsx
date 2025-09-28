import FadeSlideShow from "@/components/Home/FadeSlideShow";
import Promotion from "@/components/Home/Promotion";
import Reviews from "@/components/Home/Reviews";
import Services from "@/components/Home/Services";
import TopBanner from "@/components/Home/TopBanner";
import TopPicks from "@/components/Home/TopPicks";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Promotion />
      <TopBanner />
      <TopPicks />
      <Services />
      <FadeSlideShow />
      <Reviews />
      <section className="my-12">
        <Image
          src="/images/brand.png"
          alt="Brands"
          width={1200}
          height={400}
          className="mx-auto block h-auto max-w-full"
        />
      </section>
    </main>
  );
}
