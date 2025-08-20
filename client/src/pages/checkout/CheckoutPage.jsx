import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((res) => {
        setDeliveryOptions(res.data);
      })
      .catch((e) => {
        console.error('Failed to get delivery data: ', e);
      });

    axios.get('/api/payment-summary')
      .then((res) => {
        setPaymentSummary(res.data);
      })
      .catch((e) => {
        console.error('Failed to get payment data: ', e);
      })
  }, []);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
          />

          <PaymentSummary 
            paymentSummary={paymentSummary}
          />
        </div>
      </div>
    </>
  );
}