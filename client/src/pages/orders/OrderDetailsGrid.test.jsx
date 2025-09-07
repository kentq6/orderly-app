
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import { OrderDetailsGrid } from './OrderDetailsGrid';
import { ordersDetails as mockOrdersDetails } from '../../utils/mock';
import axios from 'axios';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('OrderDetailsGrid component', () => {
  let order;
  let loadCart;
  let productDetails;
  let productActions;
  let user;

  function Location() {
    const location = useLocation();
    return <div data-testid="url-path">{location.pathname}</div>;
  }

  beforeEach(async () => {
    order = mockOrdersDetails[0];
    loadCart = vi.fn();
    user = userEvent.setup();

    render(
      <MemoryRouter>
        <OrderDetailsGrid order={order} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    productDetails = await screen.findAllByTestId('product-details');
    productActions = await screen.findAllByTestId('product-actions');
  });

  it('displays the order details correctly', async () => {
    const productImages = await screen.findAllByTestId('product-image-container');

    expect(
      within(productImages[0]).getByTestId('product-image')
    ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');


    expect(
      within(productDetails[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productDetails[0]).getByTestId('product-delivery-date')
    ).toHaveTextContent(`Arriving on: ${dayjs(1723716000000).format('MMMM D')}`);

    expect(
      within(productDetails[0]).getByTestId('product-quantity')
    ).toHaveTextContent('Quantity: 1');

    expect(
      within(productDetails[0]).getByTestId('buy-again-button')
    ).toHaveTextContent('Add to Cart');

    expect(
      within(productDetails[0]).getByTestId('buy-again-button-icon')
    ).toHaveAttribute('src', '/src/assets/images/icons/buy-again.png');

    expect(
      within(productActions[0]).getByTestId('track-package-button')
    ).toHaveTextContent('Track Package');

    expect(
      within(productImages[1]).getByTestId('product-image')
    ).toHaveAttribute('src', 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg');

    expect(
      within(productDetails[1]).getByText('Adults Plain Cotton T-Shirt - 2 Pack')
    ).toBeInTheDocument();

    expect(
      within(productDetails[1]).getByTestId('product-delivery-date')
    ).toHaveTextContent(`Arriving on: ${dayjs(1723456800000).format('MMMM D')}`);

    expect(
      within(productDetails[1]).getByTestId('product-quantity')
    ).toHaveTextContent('Quantity: 2');
  });

  it('buys product again', async () => {
    // user clicks buy again button
    await user.click(
      within(productDetails[0]).getByTestId('buy-again-button')
    );

    // check axios.post information
     expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
      }
    );

    // check if loadCart was called
    expect(loadCart).toHaveBeenCalled();
  });

  it('redirects to tracking page for product', async () => {
    // user clicks the track package button
    await user.click(
      within(productActions[0]).getByTestId('track-package-button')
    );

    // check if user is redirected to tracking page of specific order
    expect(screen.getByTestId('url-path')).toHaveTextContent('/tracking/27cba69d-4c3d-4098-b42d-ac7fa62b7664/e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
  });
});