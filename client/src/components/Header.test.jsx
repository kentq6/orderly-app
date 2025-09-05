import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { Header } from './Header';
import { cart as mockCart } from '../utils/mock'
import userEvent from '@testing-library/user-event';

describe('Header componnet', () => {
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
        <Header cart={cart} />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('header-logo')
    ).toHaveAttribute('src', '/src/assets/images/logo-white.png');
    
    expect(
      screen.getByTestId('header-mobile-logo')
    ).toHaveAttribute('src', '/src/assets/images/mobile-logo-white.png');

    expect(
      screen.getByTestId('search-bar-input')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('search-button')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Orders')
    ).toBeInTheDocument();

    expect(
      screen.getByText('Cart')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('cart-icon-image')
    ).toHaveAttribute('src', '/src/assets/images/icons/cart-icon.png');

    expect(
      screen.getByTestId('cart-link')
    ).toHaveTextContent('3');

    expect(
      screen.getByTestId('cart-link')
    ).toHaveAttribute('href', '/checkout');
  })

  it('redirects to home', async () => {
    // function Location() {
    //   const location = useLocation();
    //   return <div data-testid="url-path">{location.pathname}</div>;
    // }

    render(
      <MemoryRouter>
        <Header cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const homeButton = screen.getByTestId('header-logo');
    await user.click(homeButton);

    expect(screen.getByTestId('url-path')).toHaveTextContent('/');
  });

  // it('searches for products', async () => {
  //   render(
  //     <MemoryRouter>
  //       <Header cart={cart} />
  //       <Location />
  //     </MemoryRouter>
  //   );

  //   const searchButton = screen.getByTestId('search-button');
  //   const searchBarInput = screen.getByTestId('search-bar-input');

  //   await user.type(searchBarInput, 'basketball');
  //   await user.click(searchButton);

  //   expect(screen.getByTestId('url-path')).toHaveTextContent('/?search=basketball');
  // });

  it('redirects to orders page', async () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const ordersLink = screen.getByTestId('orders-link');
    await user.click(ordersLink);

    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');
  });
  
  it('redirects to checkout page', async () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const checkoutLink = screen.getByTestId('cart-link');
    await user.click(checkoutLink);

    expect(screen.getByTestId('url-path')).toHaveTextContent('/checkout');
  });
});