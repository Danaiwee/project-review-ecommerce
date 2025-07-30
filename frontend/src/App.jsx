import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseCanceled from "./pages/PurchaseCanceled";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";

function App() {
  const { user, checkAuth } = useUserStore();
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
          <Route path='/category/:category' element={<CategoryPage />} />

          <Route
            path='/signup'
            element={!user ? <SignupPage /> : <Navigate to='/' />}
          />
          <Route
            path='/signin'
            element={!user ? <SigninPage /> : <Navigate to='/' />}
          />
          <Route
            path='/cart'
            element={user ? <CartPage /> : <Navigate to='/signin' />}
          />
          <Route
            path='/admin'
            element={user && isAdmin ? <AdminPage /> : <Navigate to='/' />}
          />
          <Route
            path='/success'
            element={
              user && isAdmin ? <PurchaseSuccess /> : <Navigate to='/signin' />
            }
          />
          <Route
            path='/canceled'
            element={user ? <PurchaseCanceled /> : <Navigate to='/signin' />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
