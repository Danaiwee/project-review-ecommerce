// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";
import { ADMIN_TABS } from "../constants";

import CreateProductForm from "../components/CreateProductForm";
import ProductList from "../components/ProductList";
import AnalyticsTab from "../components/AnalyticsTab";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const handleChangeTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <main className='min-h-screen relative overflow-hidden pt-20'>
      <div className='relative z-10'>
        <motion.h1
          className='text-4xl font-bold mb-8 text-emerald-400 text-center'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className='flex justify-center mb-8'>
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab._id + tab.label}
              onClick={() => handleChangeTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className='mr-2 size-5' />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "create" && <CreateProductForm />}
        {activeTab === "products" && <ProductList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </main>
  );
};

export default AdminPage;
