import { Link } from "react-router-dom";
import {
  ShoppingCart,
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Loader2,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";

const Navbar = () => {
  const { user, logout, isLogingOut } = useUserStore();

  const isAdmin = user?.role === "admin" || false;
  const cart = user?.catItems || [];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className='fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex flex-wrap justify-between items-center'>
          <Link
            to='/'
            className='text-2xl font-bold text-emerald-400 items-center space-x-2 flex gap-2s'
          >
            <img src='/ecommerce-logo.png' className='size-10' />
            Shopnest
          </Link>

          <nav className='flex flex-wrap items-center gap-6 text-md'>
            <Link
              to='/'
              className='text-gray-300 hover:text-emerald-400 transition duration-300 font-semibold'
            >
              Home
            </Link>

            {user && (
              <Link
                to='/cart'
                className='relative group text-gray-300 hover:text-emerald-400 transition duration-300 flex items-center'
              >
                <ShoppingCart
                  className='inline-block mr-1 group-hover:text-emerald-400'
                  size={20}
                />
                <span className='hidden sm:inline'>Cart</span>
                {cart.length > 0 && (
                  <span className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {isAdmin && (
              <Link
                to='/admin'
                className='bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-medium'
              >
                <Lock className='inline-block mr-1' size={18} />
                <span className='hidden sm:inline'>Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className='text-sm text-gray-300 hover:text-gray-500 py-2 rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer'
                onClick={handleLogout}
              >
                {isLogingOut ? (
                  <Loader2 classNmae='size-5 animate-spin' />
                ) : (
                  <LogOut size={18} />
                )}
                <span className='hidden sm:inline ml-2'>Log Out</span>
              </button>
            ) : (
              <Link
                to='/signin'
                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out cursor-pointer'
              >
                <LogIn size={18} />
                <span className='hidden sm:inline ml-2'>Log In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
