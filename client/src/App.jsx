import { Routes, Route } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((res) => {
        setCart(res.data);
      })
      .catch((e) => {
        console.error("Failed to load products:", e);
      });
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>} />
      <Route path="/checkout" element={<CheckoutPage cart={cart}/>} />
      <Route path="/orders" element={<OrdersPage cart={cart}/>} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App