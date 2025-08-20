import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid'
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }
    getHomeData()
      .catch((e) => { console.error('Failed to get products data: ', e) });
  }, []);

  return (
    <>
      <title>E-Commerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}