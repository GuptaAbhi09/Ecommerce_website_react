"use client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utilsHelper/supabaseClient";
import { useCart } from "../contexts/CartContext";
import { Plus, Minus, ShoppingCart, Loader2, Star } from "lucide-react";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, isInCart, getItemQuantity, updateQuantity } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching product details:", error);
        } else {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleUpdateCartQuantity = (newQuantity) => {
    if (product) {
      updateQuantity(product.id, newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const cartQuantity = getItemQuantity(product.id);
  const isInCartItem = isInCart(product.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-[500px] object-cover rounded-xl shadow-lg"
              />

              {/* Additional Images Placeholder */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({product.rating?.toFixed(1)} / 5)
                  </span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  {product.discount_percentage > 0 && (
                    <span className="text-lg text-gray-500 line-through">
                      $
                      {(
                        product.price /
                        (1 - product.discount_percentage / 100)
                      ).toFixed(2)}
                    </span>
                  )}
                </div>
                {product.discount_percentage > 0 && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.discount_percentage}% OFF
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">Brand:</span>
                  <p className="text-gray-600">{product.brand || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">Category:</span>
                  <p className="text-gray-600">{product.category || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">Stock:</span>
                  <p
                    className={`${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} Available`
                      : "Out of stock"}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-700">SKU:</span>
                  <p className="text-gray-600">#{product.id}</p>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                {!isInCartItem ? (
                  <>
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-700">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= (product.stock || 99)}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </>
                ) : (
                  /* Cart Management */
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800 mb-2">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="font-medium">In Cart</span>
                      </div>
                      <p className="text-sm text-green-700">
                        This item is already in your cart with quantity:{" "}
                        {cartQuantity}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-700">
                        Update Quantity:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            handleUpdateCartQuantity(cartQuantity - 1)
                          }
                          disabled={cartQuantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                          {cartQuantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateCartQuantity(cartQuantity + 1)
                          }
                          disabled={cartQuantity >= (product.stock || 99)}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Add to Wishlist
                </button>
                <button className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
