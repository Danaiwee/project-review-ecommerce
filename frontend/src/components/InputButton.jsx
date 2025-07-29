import { Loader, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const InputButton = ({ loading, text, icon: Icon }) => {
  const linkText =
    text === "Sign up" ? "Already have an account?" : "Don't have an account";
  const linkText2 = text === "Sign up" ? "signin" : "signup";
  const linkText3 = text === "Sign up" ? "Sign in" : "Sign up";
  return (
    <>
      <button
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opaciry-50 cursor-pointer'
        type='submit'
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
            Loading...
          </>
        ) : (
          <>
            {Icon && <Icon className='mr-2 h-5 w-5' aria-hidden='true' />}
            {text}
          </>
        )}
      </button>

      <div className='mt-8 text-center text-sm text-gray-400'>
        {linkText}
        <Link
          to={`/${linkText2}`}
          className='font-medium text-emerald-400 hover:text-emerald-300 pl-1'
        >
          {linkText3} <ArrowRight className='inline h-4 w-4' />
        </Link>
      </div>
    </>
  );
};

export default InputButton;
