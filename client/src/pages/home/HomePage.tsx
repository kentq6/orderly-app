import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid'
import { useSearchParams } from 'react-router';
import './HomePage.css';
import type { Cart } from '../../types/cart.types';
import type { LoadCart } from '../../types/loadCart.types';

type HomePageProps = {
  cart: Cart;
  loadCart: LoadCart;
};

export function HomePage({ cart, loadCart }: HomePageProps) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
    }
    getHomeData()
      .catch((e) => { console.error('Failed to fetch products data: ', e) });
  }, [search]);

  return (
    <>
      <title>E-Commerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}