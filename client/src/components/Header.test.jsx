import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { Header } from './Header';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

describe('Header componnet', () => {
  let cart;
  let user;

  beforeEach(() => {
    cart = [
      {
        "id": 9,
        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        "quantity": 2,
        "deliveryOptionId": "1",
        "createdAt": "2025-08-28T02:34:04.409Z",
        "updatedAt": "2025-09-05T02:55:55.433Z",
        "product": {
          "keywords": [
            "socks",
            "sports",
            "apparel"
          ],
          "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
          "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
          "rating": {
            "stars": 4.5,
            "count": 87
          },
          "priceCents": 1090,
          "createdAt": "2025-08-26T17:36:02.611Z",
          "updatedAt": "2025-08-26T17:36:02.611Z"
        }
      },
      {
        "id": 10,
        "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        "quantity": 1,
        "deliveryOptionId": "1",
        "createdAt": "2025-09-05T02:56:28.446Z",
        "updatedAt": "2025-09-05T02:56:28.446Z",
        "product": {
          "keywords": [
            "sports",
            "basketballs"
          ],
          "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          "image": "images/products/intermediate-composite-basketball.jpg",
          "name": "Intermediate Size Basketball",
          "rating": {
            "stars": 4,
            "count": 127
          },
          "priceCents": 2095,
          "createdAt": "2025-08-26T17:36:02.612Z",
          "updatedAt": "2025-08-26T17:36:02.612Z"
        }
      }
    ];

    user = userEvent.setup();
  });
  
  it('displays the details correctly', () => {
    render(
      <MemoryRouter>
        <Header cart={cart} />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId('logo-white-image')
    ).toHaveAttribute('src', '/src/assets/images/logo-white.png');

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
      screen.getByTestId('cart-quantity')
    ).toHaveTextContent('3');
  })

  it('redirects to home', async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <Header cart={cart} />
        <Location />
      </MemoryRouter>
    );

    const homeButton = screen.getByTestId('logo-white-image');
    await user.click(homeButton);

    expect(screen.getByTestId('url-path')).toHaveTextContent('/');
  });
});