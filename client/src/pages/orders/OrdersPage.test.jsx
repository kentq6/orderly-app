import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrdersPage } from './OrdersPage';
import { cart as mockCart } from '../../utils/mock';
import axios from 'axios';
import { MemoryRouter } from 'react-router';

vi.mock('axios');

describe('OrdersPage component', () => {
  let cart;
  let loadCart;
  let orders;

  beforeEach(() => {
    cart = mockCart;
    loadCart = vi.fn();

    axios.get.mockImplementation(async (url) => {
      if (url === '/api/orders?expand=products') {
        return { data: orders };
      }
    });
  });

  it('displays the page correctly', () => {
    render(
      <MemoryRouter>
        <OrdersPage cart={cart} loadCart={loadCart} />
      </MemoryRouter>
    );

    expect(axios.get).toHaveBeenCalledWith(
      '/api/orders?expand=products'
    );

    expect(screen.getByText('Your Orders')).toBeInTheDocument();
  });
});