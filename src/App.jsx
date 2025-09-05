import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Routing from "./utilsHelper/Routing";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <Routing />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
