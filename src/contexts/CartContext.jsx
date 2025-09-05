import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("techHaven_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
        localStorage.removeItem("techHaven_cart");
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("techHaven_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1) => {
    setIsLoading(true);

    try {
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCartItems(updatedItems);
        toast.success(`Updated ${product.title} quantity in cart`);
      } else {
        // Add new item to cart
        const newItem = {
          id: product.id,
          name: product.title || product.name,
          price: parseFloat(product.price),
          image: product.thumbnail || product.imageUrl || product.image,
          quantity: quantity,
          description: product.description,
          brand: product.brand,
          category: product.category,
        };

        setCartItems((prev) => [...prev, newItem]);
        toast.success(`${product.title || product.name} added to cart`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    try {
      const item = cartItems.find((item) => item.id === productId);
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      toast.success(`${item?.name} removed from cart`);
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    }
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared");
  };

  // Get cart totals
  const getCartTotals = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    };
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    isInCart,
    getItemQuantity,
    setCartItems, // For backward compatibility
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
