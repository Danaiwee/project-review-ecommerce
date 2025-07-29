import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCanceled from "./pages/PurchaseCanceled";

function App() {
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/*Background gradient*/}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      <div className='relative z-50'>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/success' element={<PurchaseSuccess />} />
          <Route path='/canceled' element={<PurchaseCanceled />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
