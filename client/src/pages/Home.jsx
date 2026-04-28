import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionGrid from "@/components/home/CollectionGrid";
import Lookbook from "@/components/home/LookBook";
import DarkBand from "@/components/home/DarkBand";
import BrandLogos from "@/components/home/BrandLogos";
import Journal from "@/components/home/Journal";
import Testimonials from "@/components/home/Testimonials.jsx";
import InstagramGrid from "@/components/home/InstagramGrid";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div style={{ background: "var(--color-canvas)" }}>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <CollectionGrid />
      <DarkBand />
      <BrandLogos />
      <Journal />
      <Lookbook />
      <Testimonials />
      <InstagramGrid />
      <Footer />
    </div>
  );
}
