import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Header } from '../../components/Header';
import './OrdersPage.css';
import { OrdersGrid } from './OrdersGrid';

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }
    fetchOrdersData()
      .catch((e) => { console.error('Failed to fetch orders data: ', e) });
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
        />
      </div>
    </>
  );
}