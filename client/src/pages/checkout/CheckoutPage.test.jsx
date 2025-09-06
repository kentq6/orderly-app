import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutPage } from './CheckoutPage';
import { cart as mockCart, deliveryOptions as mockDeliveryOptions, paymentSummary as mockPaymentSummary } from '../../utils/mock'
import axios from 'axios';

vi.mock('axios');

describe('CheckoutPage component', () => {
  let loadCart;
  let cart;
  let deliveryOptions;
  let paymentSummary;

  beforeEach(() => {
    loadCart = vi.fn();

    cart = mockCart;
    deliveryOptions = mockDeliveryOptions;
    paymentSummary = mockPaymentSummary;

    axios.get.mockImplementation(async (url) => {
      if (url === '/api/delivery-options?expand=estimatedDeliveryTime') {
        return { data: deliveryOptions };
      }
      if (url === '/api/payment-summary') {
        return { data: paymentSummary };
      }
    });
  });

  it('displays the page correctly', async () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    );

    const paymentSummary = await screen.findByTestId('payment-summary-product-cost');

    expect(axios.get).toHaveBeenNthCalledWith(
      1,
      '/api/delivery-options?expand=estimatedDeliveryTime'
    );
    expect(axios.get).toHaveBeenNthCalledWith(
      2,
      '/api/payment-summary'
    );

    expect(screen.getByText('Review your order')).toBeInTheDocument();
    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();

    expect(paymentSummary).toBeInTheDocument();
    expect(screen.getByText('Payment Summary')).toBeInTheDocument();
    expect(screen.getByTestId('payment-summary-items'))
      .toHaveTextContent('Items (3):');
    expect(screen.getByTestId('payment-summary-shipping-cost'))
      .toHaveTextContent('$0.00');
  });
});