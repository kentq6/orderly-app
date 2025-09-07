import axios from 'axios';
import dayjs from 'dayjs';
import BuyAgainIcon from '../../assets/images/icons/buy-again.png'
import { Fragment } from 'react';
import { Link } from 'react-router';

export function OrderDetailsGrid({ order, loadCart }) {
  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => {
        
        const addToCart = async () => {
          await axios.post('/api/cart-items', {
            productId: orderProduct.product.id,
            quantity: 1
          });
          loadCart();
        };

        return (
          <Fragment key={orderProduct.productId}>
            <div className="product-image-container" data-testid="product-image-container">
              <img src={orderProduct.product.image} data-testid="product-image" />
            </div>

            <div className="product-details" data-testid="product-details">
              <div className="product-name">
                {orderProduct.product.name}
              </div>
              <div className="product-delivery-date" data-testid="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
              </div>
              <div className="product-quantity" data-testid="product-quantity">
                Quantity: {orderProduct.quantity}
              </div>
              <button
                className="buy-again-button button-primary"
                onClick={addToCart} data-testid="buy-again-button">
                <img className="buy-again-icon" src={BuyAgainIcon} data-testid="buy-again-button-icon"/>
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions" data-testid="product-actions">
              <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                <button className="track-package-button button-secondary" data-testid="track-package-button">
                  Track Package
                </button>
              </Link>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}