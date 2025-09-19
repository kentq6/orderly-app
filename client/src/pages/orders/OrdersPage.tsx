import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrdersGrid } from './OrdersGrid';
import type { Cart } from '../../types/cart.types';
import type { LoadCart } from '../../types/loadCart.types';
import './OrdersPage.css';

type OrdersPageProps = {
  cart: Cart;
  loadCart: LoadCart;
};

export function OrdersPage({ cart, loadCart }: OrdersPageProps) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    fetchOrdersData()
      .catch((error) => { console.error('Failed to fetch orders data: ', error) });
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/order-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid 
          orders={orders}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}