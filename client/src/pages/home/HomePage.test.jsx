import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HomePage } from './HomePage';
import { products as mockProducts } from '../../utils/mock'
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('HomePage component', () => {
  let loadCart;
  let products;
  let productContainers;
  let user;

  beforeEach(async () => {
    products = mockProducts;
    loadCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === '/api/products') {
        return { data: products };
      }
    });

    user = userEvent.setup();

    // MemoryRouter is used for links
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );

    productContainers = await screen.findAllByTestId('product-container');
  });

  it('displays the products correctly', async () => {
    expect(productContainers.length).toBe(2);

    expect(
      within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });

  it('adds products to the cart', async () => {
    const quantitySelector1 = within(productContainers[0]).getByTestId('product-quantity-selector');
    const quantitySelector2 = within(productContainers[1]).getByTestId('product-quantity-selector');

    expect(quantitySelector1).toHaveValue('1');
    expect(quantitySelector2).toHaveValue('1');

    await user.selectOptions(quantitySelector1, '2');
    await user.selectOptions(quantitySelector2, '3');

    expect(quantitySelector1).toHaveValue('2');
    expect(quantitySelector2).toHaveValue('3');

    const addToCartButton1 = within(productContainers[0]).getByTestId('add-to-cart-button');
    const addToCartButton2 = within(productContainers[1]).getByTestId('add-to-cart-button');

    await user.click(addToCartButton1);
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items',
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
      });

    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items',
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 3
      });

    expect(loadCart).toHaveBeenCalledTimes(2);
  });
});