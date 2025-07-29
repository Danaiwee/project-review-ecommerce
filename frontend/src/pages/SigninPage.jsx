// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import InputField from "../components/InputField";
import { Lock, LogIn, Mail } from "lucide-react";
import InputButton from "../components/InputButton";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loading = false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };
  return (
    <main className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-20'>
      <motion.div
        className='sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='mt-6 text-center text-3xl font-extrabold text-emerald-400'>
          Welcome back
        </h1>
      </motion.div>

      <motion.div
        className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className='bg-gray-800 py-8 px-4 shadow rounded-lg sm:px-10'>
          <form onSubmit={handleFormSubmit} className='space-y-6'>
            <InputField
              label='Email'
              name='email'
              id='email'
              icon={Mail}
              placeholder='john@email.com'
              value={formData.email}
              onChange={handleInputChange}
            />

            <InputField
              label='Password'
              name='password'
              id='password'
              icon={Lock}
              type='password'
              placeholder='●●●●●●●●'
              value={formData.password}
              onChange={handleInputChange}
            />

            <InputButton loading={loading} text='Sign in' icon={LogIn} />
          </form>
        </div>
      </motion.div>
    </main>
  );
};

export default SigninPage;
