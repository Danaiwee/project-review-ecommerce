import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const { href, name, imageUrl } = category;

  return (
    <div className='relative overflow-hidden h-96 w-full rounded-lg group'>
      <Link to={href}>
        <div className='w-full h-full cursor-pointer'>
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-gray-500/20 z-20 ' />
          <div className='absolute inset-0 bg-white'>
            <img
              src={imageUrl}
              alt={name}
              className='w-full h-full object-cover object-center transition-transform duration-500 ease-out group:scale-110'
            />

            <div className='absolute bottom-0 left-0 p-6 z-30'>
              <h3 className='text-gray-900 text-2xl font-bold mb-2'>{name}</h3>
              <p className='text-gray-700 text-sm'>Explore {name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
