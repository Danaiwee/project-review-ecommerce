// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { formatNumber } from "../lib/utils.js";

const AnalyticsCard = ({ analytic }) => {
  const { title, value, icon: Icon, color } = analytic;

  return (
    <motion.div
      className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='flex justify-between items-center'>
        <div className='z-10'>
          <p className='text-emerald-300 text-sm mb-1 font-semibold'>{title}</p>
          <h3 className='text-white text-3xl font-bold'>
            {title === "Total Revenue" ? "$" + formatNumber(value) : value}
          </h3>
        </div>
      </div>
      <div className='absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30' />
      <div className='absolute -bottom-4 -right-4 text-emerald-800 opacity-50'>
        <Icon className='size-34' />
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;
