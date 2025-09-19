import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './CheckoutPage.css';
import type { Cart } from '../../types/cart.types';
import type { LoadCart } from '../../types/loadCart.types';

type CheckoutPageProps = {
  cart: Cart;
  loadCart: LoadCart;
};

export function CheckoutPage({ cart, loadCart }: CheckoutPageProps) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchDeliveryOptionsData = async () => {
      const response = await axios.get(
        '/api/delivery-options?expand=estimatedDeliveryTime'
      );
      setDeliveryOptions(response.data);
    }
    fetchDeliveryOptionsData().catch((error) => {
      console.error('Failed to fetch checkout data: ', error)
    });
  }, []);

  useEffect(() => {
    const fetchPaymentSummaryData = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    fetchPaymentSummaryData().catch((error) => {
      console.error('Failed to fetch payment summary data: ', error)
    });
  }, [cart]);

  return (
    <>
      <title>Checkout</title>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <CheckoutHeader
        cart={cart}
      />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          {paymentSummary && (
            <PaymentSummary
              paymentSummary={paymentSummary}
              loadCart={loadCart}
            />
          )}
        </div>
      </div>
    </>
  );
}