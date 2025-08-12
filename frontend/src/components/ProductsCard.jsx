import { Loader2, ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";

const ProductsCard = ({ product }) => {
  const navigate = useNavigate();

  const { name, description, price, image } = product;

  const { addToCart, isAdding } = useCartStore();
  const { user } = useUserStore();

  console.log(user);

  const handleAddCart = (product) => {
    if (!user) navigate("/signin");
    addToCart(product);
  };
  return (
    <div className='w-full flex flex-col relative overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
      <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl bg-white'>
        <img src={image} alt={name} className='object-cover w-full' />
        <div className='absolute inset-0 bg-black/20' />
      </div>

      <div className='mt-4 px-5 pb-5'>
        <h5 className='text-xl font-semibold tracking-tight text-white'>
          {name}
        </h5>
        <div className='h-12'>
          <p className='text-sm text-gray-400 font-normal mt-1 line-clamp-2'>
            {description}
          </p>
        </div>

        <div className='mt-2 mb-5 flex items-center justify-between'>
          <p className='text-3xl font-bold text-emerald-400'>${price}</p>
        </div>

        <button
          className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer'
          onClick={() => handleAddCart(product)}
        >
          {isAdding ? (
            <>
              <Loader2 className='size-5 animate-spin mr-2' />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={18} className='mr-2' />
              Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
