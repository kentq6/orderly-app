import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { PaymentSummary } from './PaymentSummary';
import { paymentSummary as mockPaymentSummary } from '../../utils/mock'
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('PaymentSummary component', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = mockPaymentSummary;

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('displays the correct details', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('payment-summary-product-cost')
    ).toHaveTextContent('$42.75');

    expect(
      screen.getByTestId('payment-summary-shipping-cost')
    ).toHaveTextContent('$0.00');

    expect(
      screen.getByTestId('payment-summary-total-cost-before-tax')
    ).toHaveTextContent('$42.75');

    expect(
      screen.getByTestId('payment-summary-tax')
    ).toHaveTextContent('$4.28');

    expect(
      screen.getByTestId('payment-summary-total-cost')
    ).toHaveTextContent('$47.03');
  });

  it('places an order', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
});