import ElevateGameSection from "@/components/Home/ElevateGameSection";
import FeaturedSections from "@/components/Home/FeaturedSections";
import NewHeroSection from "@/components/Home/HeroSection";
import NewTestimonials from "@/components/Home/Testimonials";
import ShopByCategory from "@/components/Home/ShopByCategory";
import TopTrending from "@/components/Home/TopTrending";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <NewHeroSection />
      <FeaturedSections />
      <TopTrending />
      <ElevateGameSection />
      <NewTestimonials />
      <ShopByCategory />
    </main>
  );
}
