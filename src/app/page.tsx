import { FeaturedCategories } from "@/components/FeaturedCategories";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { LocationHours } from "@/components/LocationHours";
import { MobileOrderBar } from "@/components/MobileOrderBar";
import { Navbar } from "@/components/Navbar";
import { OrderCTA } from "@/components/OrderCTA";
import { SignatureItems } from "@/components/SignatureItems";
import { Testimonials } from "@/components/Testimonials";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <HeroSlider />
        <FeaturedCategories />
        <SignatureItems />
        <WhyUs />
        <Testimonials />
        <LocationHours />
        <OrderCTA />
      </main>
      <Footer />
      <MobileOrderBar />
    </>
  );
}
