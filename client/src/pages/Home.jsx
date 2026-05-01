import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CollectionGrid from "@/components/home/CollectionGrid";
import DarkBand from "@/components/home/DarkBand";
import BrandLogos from "@/components/home/BrandLogos";
import Journal from "@/components/home/Journal";
import Testimonials from "@/components/home/Testimonials.jsx";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

export default function Home() {
  // At the top of the return:
  <Helmet>
    <title>Lumiere — Handcrafted Jewelry</title>
    <meta
      name="description"
      content="Discover handcrafted gold and silver jewelry. Unique pieces made for everyday luxury."
    />
    <meta property="og:title" content="Lumiere — Handcrafted Jewelry" />
    <meta
      property="og:description"
      content="Unique handcrafted pieces made for everyday luxury."
    />
  </Helmet>;
  return (
    <div style={{ background: "var(--color-canvas)" }}>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <div style={{ marginBottom: "5rem" }}>
        <CollectionGrid />
      </div>
      <DarkBand />
      <BrandLogos />
      <Journal />
      <Testimonials />

      <Footer />
    </div>
  );
}
