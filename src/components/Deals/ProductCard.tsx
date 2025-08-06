import { Link } from "react-router-dom";


export const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const discountedPrice = Math.round(
    product.price * (1 - product.discount_percentage / 100)
  );

  return (
    <Link to={`/product/${product.id}`}>
      <article className="flex flex-col gap-3 items-start p-3 shadow-md w-55 max-md:min-w-40 max-md:w-[calc(50%_-_6px)] max-sm:w-full max-sm:max-w-[280px]">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="self-stretch h-44 rounded-xl max-sm:h-[200px] object-cover"
      />
      <div className="flex flex-col items-start self-stretch">
        <h3 className="self-stretch text-base font-medium leading-6 text-neutral-900">
          {product.title}
        </h3>
        <p className="text-sm leading-5 text-gray-500">
          Original Price: ${product.price}
        </p>
        <p className="text-sm leading-5 text-green-600">
          Discounted Price: ${discountedPrice}
        </p>
        <p className="text-sm leading-5 text-red-500">
          {product.discount_percentage}% off
        </p>
        <p className="text-sm text-yellow-600">⭐ Rating: {product.rating}/5</p>
      </div>
    </article>
    </Link>
  );
};
