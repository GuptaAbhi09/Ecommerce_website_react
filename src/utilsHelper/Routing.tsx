import React from "react";
import TechHavenHomepage from "../components/TechHavenHomepage";
import AboutUs from "../components/About_company/AboutUs";
import ContactPage from "../components/Contact/ContactPage";
import { Route, Routes } from "react-router-dom";
import DealsPage from "../components/Deals/DealsPage";
import ProductCatalog from "../components/Products/ProductCatalog";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import { CheckoutForm } from "../components/CheckoutSection/CheckoutForm";
import ShopPage from "../components/ShopSection/ShopPage";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import ForgotPassword from "../components/Authentication/ForgotPassword";
import UpdatePassword from "../components/Authentication/UpdatePassword";
import UserProfile from "../components/Authentication/UserProfile";
import ProtectedRoute from "../components/ProtectedRoute";
import { ProductDetails } from "../components/ProductDetails";
import AddProductSection from "../components/Add_Product/AddProductSection";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TechHavenHomepage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/product" element={<ProductCatalog />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<ShoppingCart />} />
      <Route path="/shopNow" element={<ShopPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/addProductSection"
        element={
          <ProtectedRoute requiredRole="admin">
            <AddProductSection />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
