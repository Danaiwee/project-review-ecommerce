// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ShoppingBasket,
  ScrollText,
  DollarSign,
  Upload,
  Loader,
  PlusCircle,
} from "lucide-react";

import InputField from "../components/InputField";
import SelectField from "./SelectField";
import { PRODUCT_CATEGORIES } from "../constants";

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const loading = false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto pb-12'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>
        Create New Product
      </h2>

      <form className='space-y-4' onSubmit={handleFormSubmit}>
        <InputField
          label='Product Name'
          name='name'
          id='name'
          icon={ShoppingBasket}
          placeholder='eg. Slim Fit Stretch Jeans'
          value={formData.name}
          onChange={handleInputChange}
        />

        <InputField
          label='Description'
          name='description'
          id='description'
          placeholder='eg. Slim cut with added stretch for comfort.'
          icon={ScrollText}
          value={formData.description}
          onChange={handleInputChange}
        />

        <InputField
          label='Price'
          name='price'
          id='price'
          type='number'
          placeholder='eg. 49.99'
          icon={DollarSign}
          value={formData.price}
          onChange={handleInputChange}
        />

        <SelectField
          label='Category'
          name='category'
          id='category'
          value={formData.category}
          onChange={handleInputChange}
          categories={PRODUCT_CATEGORIES}
        />

        <div className='mt-2 flex items-center'>
          <input
            type='file'
            id='image'
            name='image'
            accept='image/*'
            className='sr-only'
            onChange={handleImageChange}
          />
          <label
            htmlFor='image'
            className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
          >
            <Upload className='size-5 inline-block mr-2' />
            Upload Image
          </label>
          {formData.image && (
            <span className='ml-3 text-sm text-gray-400'>Image uploaded</span>
          )}
        </div>

        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 cursor-pointer mt-5'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className='mr-2 h-5 w-5 animate-spin'
                aria-hidden='true'
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className='mr-2 h-5 w-5' />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
