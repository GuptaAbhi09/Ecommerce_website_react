import * as React from "react";
import { useEffect, useState } from "react";
import { HeroSection } from "./HeroSection";
import { ProductGrid } from "./ProductGrid";
import { CustomerTestimonials } from "./CustomerTestimonials";
import { NewsletterSignup } from "./NewsletterSignup";

import { getTopDeals, getNewArrivals } from "../api/productApi"; // 👈 import API

export const TechHavenHomepage: React.FC = () => {
  const [topDealsProducts, setTopDealsProducts] = useState([]);
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);

  // 🔁 Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const topDealsRes = await getTopDeals();
        const newArrivalsRes = await getNewArrivals();

        // 🔧 Map to match your expected structure (imageUrl, title, price)
        const mapProduct = (product) => ({
          imageUrl: product.thumbnail,
          title: product.title,
          price: `$${product.price}`,
          imageAspectRatio: "aspect-[1.77]",
          imageWidth: "w-[161px]",
        });

        setTopDealsProducts(topDealsRes.data.products.map(mapProduct));
        setNewArrivalsProducts(newArrivalsRes.data.products.map(mapProduct));
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <main className="flex justify-center items-start px-10 py-6 max-w-full md:px-40">
        <div className="w-full max-w-[960px] flex flex-col gap-10">
          <HeroSection />

          <ProductGrid title="Top Deals" products={topDealsProducts} />

          <ProductGrid
            title="New Arrivals"
            products={newArrivalsProducts}
            containerClassName="flex flex-wrap gap-3 p-4 w-full"
          />

          <CustomerTestimonials />
          <NewsletterSignup />
        </div>
      </main>
    </div>
  );
};

export default TechHavenHomepage;
