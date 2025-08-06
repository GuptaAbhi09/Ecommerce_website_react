"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { HeroSection } from "./HeroSection";
import ProductGrid from "./ProductGrid";
import { CustomerTestimonials } from "./CustomerTestimonials";
import { NewsletterSignup } from "./NewsletterSignup";
import { supabase } from "../utilsHelper/supabaseClient";
import AddProductSection from "./Add_Product/AddProductSection";
import { Link } from "react-router-dom";

export interface Product {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  description: string;
  rating?: number;
}

export const TechHavenHomepage: React.FC = () => {
  const [topDealsProducts, setTopDealsProducts] = useState<Product[]>([]);
  const [newArrivalsProducts, setNewArrivalsProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data: allProducts, error } = await supabase
          .from("products")
          .select("*");

        if (error) throw error;

        const topDeals = allProducts
          .filter((p) => p.discount_percentage > 15)
          .slice(0, 6);

        const newArrivals = [...allProducts]
          .sort((a, b) => b.id - a.id)
          .slice(0, 6);

        const mapProduct = (product: any): Product => ({
          id: product.id.toString(),
          imageUrl: product.thumbnail,
          title: product.title,
          price: product.price.toString(),
          description: product.description,
          rating: product.rating,
        });

        setTopDealsProducts(topDeals.map(mapProduct));
        setNewArrivalsProducts(newArrivals.map(mapProduct));
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    fetchProducts();
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
          <div>
            <Link to='/addProductSection' className="py-1 px-3 bg-blue-500 font-semibold flex justify-center text-white rounded-lg">Add Products</Link>
          </div>
          <CustomerTestimonials />
          <NewsletterSignup />
        </div>
      </main>
    </div>
  );
};

export default TechHavenHomepage;
