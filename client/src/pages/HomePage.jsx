import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import CheckmarkIcon from '../assets/images/icons/checkmark.png'
import './HomePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((e) => {
        console.error("Failed to load products:", e);
      });
  }, []);

  return (
    <>
      <title>E-Commerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header 
        cart={cart}
      />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (<div className="product-container">
              <div key={product.id} className="product-image-container">
                <img className="product-image"
                  src={product.image} />
              </div>

              <div className="product-name limit-text-to-2-lines">
                {product.name}
              </div>

              <div className="product-rating-container">
                <img className="product-rating-stars"
                  src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                  {product.rating.count}
                </div>
              </div>

              <div className="product-price">
                {`$${(product.priceCents / 100).toFixed(2)}`}
              </div>

              <div className="product-quantity-container">
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              <div className="product-spacer"></div>

              <div className="added-to-cart">
                <img src={CheckmarkIcon} />
                Added
              </div>

              <button className="add-to-cart-button button-primary">
                Add to Cart
              </button>
            </div>);
          })}
        </div>
      </div>
    </>
  );
}