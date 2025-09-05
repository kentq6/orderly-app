import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { CheckoutHeader } from './CheckoutHeader';
import { cart as mockCart } from '../../utils/mock'
import userEvent from '@testing-library/user-event';

describe('CheckoutHeader component', () => {
  let cart;
  let user;

  function Location() {
    const location = useLocation();
    return <div data-testid="url-path">{location.pathname}</div>;
  }

  beforeEach(() => {
    cart = mockCart;

    user = userEvent.setup();
  });

  it('displays the details correctly', () => {
    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('header-logo')
    ).toHaveAttribute('src', '/src/assets/images/logo.png');

    expect(
      screen.getByTestId('header-mobile-logo')
    ).toHaveAttribute('src', '/src/assets/images/mobile-logo.png');

    expect(
      screen.getByTestId('checkout-items-quantity')
    ).toHaveTextContent('Checkout (3 items)');

    expect(
      screen.getByTestId('checkout-lock-icon')
    ).toHaveAttribute('src', '/src/assets/images/icons/checkout-lock-icon.png');
  });

  it('logo redirects to home', async () => {
    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const homeButton = screen.getByTestId('header-logo');
    await user.click(homeButton);

    expect(screen.getByTestId('url-path')).toHaveTextContent('/');
  });

  it('checkout items quantity redirects to home', async () => {
    render(
      <MemoryRouter>
        <CheckoutHeader cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const homeButton = screen.getByTestId('header-logo');
    await user.click(homeButton);

    expect(screen.getByTestId('url-path')).toHaveTextContent('/');
  });
});