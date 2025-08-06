import React, { useState } from 'react'
import TechHavenHomepage from '../components/TechHavenHomepage'
import AboutUs from '../components/About_company/AboutUs'
import ContactPage from '../components/Contact/ContactPage'
import { Route, Routes } from 'react-router-dom'
import DealsPage from "../components/Deals/DealsPage";
import ProductCatalog from "../components/Products/ProductCatalog";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import {CheckoutForm} from "../components/CheckoutSection/CheckoutForm"
import ShopPage from "../components/ShopSection/ShopPage"
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import ForgotPassword from '../components/Authentication/ForgotPassword'
import ProtectedRoute from '../components/ProtectedRoute'
import { ProductDetails } from '../components/ProductDetails'
import AddProductSection from '../components/Add_Product/AddProductSection'

const Routing = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  return (
    <Routes>
        <Route path="/" element={<TechHavenHomepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path='/deals' element={<DealsPage />} />
        <Route path='/product' element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path='/cart' element={<ShoppingCart cartItems={cartItems} />} />
        <Route path='/checkout' element={<CheckoutForm />} />
        <Route path='/shopNow' element={<ShopPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <CheckoutForm />
          </ProtectedRoute>
        } />
        <Route path='/addProductSection' element={<AddProductSection />} />
    </Routes>
  )
}

export default Routing