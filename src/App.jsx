import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import { Home, Shop, Wishlist, Admin, Login, ProductDetails } from './pages';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useStore();
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

import Toast from './components/Toast';

function App() {
  return (
    <>
      <Toast />
      <Navbar />
      <div style={{ paddingBottom: '4rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;
