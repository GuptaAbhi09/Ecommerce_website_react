import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProductDetails = ({ cartItems, setCartItems }: any) => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  const handleAddToCart = () => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      const updated = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.thumbnail,
          quantity: 1,
        },
      ]);
    }
  };

  if (!product) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-[500px] object-cover rounded-xl shadow-lg"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <p className="text-xl font-semibold text-green-600">${product.price}</p>
          <p className="text-sm text-yellow-500">⭐ {product.rating} / 5</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} Available` : "Out of stock"}</p>
            <p><span className="font-semibold">Discount:</span> {product.discountPercentage}% off</p>
          </div>

          <button onClick={handleAddToCart} className="mt-6 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
