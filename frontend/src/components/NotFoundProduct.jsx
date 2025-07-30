const NotFoundProduct = () => {
  return (
    <div className='w-screen mt-20 flex flex-col items-center justify-center'>
      <img src='/empty-cart.png' width={250} height={100} />
      <h2 className='mt-10 text-xl font-semibold text-gray-300 text-center col-span-full'>
        Oops, looks like we’ve sold out in this category. New arrivals are on
        the way!!!
      </h2>
    </div>
  );
};

export default NotFoundProduct;
