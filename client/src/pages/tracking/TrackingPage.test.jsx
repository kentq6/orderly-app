import { it, expect, describe, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router';
import { TrackingPage } from './TrackingPage';
import { cart as mockCart, ordersDetails as mockOrdersDetails } from '../../utils/mock';
import axios from 'axios';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('TrackingPage component', () => {
  const orderId = '27cba69d-4c3d-4098-b42d-ac7fa62b7664';
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  let cart;

  beforeEach(() => {
    cart = mockCart;
  });

  it('displays the tracking page correctly', async () => {
    axios.get.mockResolvedValue({
      data: mockOrdersDetails[0]
    });

    render(
      <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
        <Routes>
          <Route
            path="/tracking/:orderId/:productId"
            element={<TrackingPage cart={cart} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(axios.get).toHaveBeenCalledWith(
      `/api/orders/${orderId}?expand=products`
    );

    expect(await screen.findByTestId('back-to-orders-link'))
      .toHaveTextContent('View All Orders');

    expect(screen.getByText('Delivered on Thursday, August 15'))
      .toBeInTheDocument();

    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'))
      .toBeInTheDocument();

    expect(screen.getByText('Quantity: 1'))
      .toBeInTheDocument();

    expect(screen.getByTestId('product-image'))
      .toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(await screen.findByTestId('progress-labels-container')).toHaveTextContent('Preparing');
    expect(await screen.findByTestId('progress-labels-container')).toHaveTextContent('Shipped');
    expect(await screen.findByTestId('progress-labels-container')).toHaveTextContent('Delivered');

    const progressBarContainer = await screen.findByTestId('progress-bar-container');
    const progressBar = within(progressBarContainer).getByTestId('progress-bar');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });

  it('shows the progress bar at 50%', async () => {
    vi.setSystemTime(dayjs('2025-08-12').toDate());

    axios.get.mockResolvedValue({
      data: {
        id: orderId,
        orderTimeMs: dayjs('2025-08-10').valueOf(),
        products: [{
          productId: productId,
          estimatedDeliveryTimeMs: dayjs('2025-08-14').valueOf(),
          quantity: 1,
          product: {
            name: 'Test Product',
            image: 'test.jpg'
          }
        }]
      }
    });

    render(
      <MemoryRouter initialEntries={[`/tracking/${orderId}/${productId}`]}>
        <Routes>
          <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={[]} />} />
        </Routes>
      </MemoryRouter>
    );

    const progressBarContainer = await screen.findByTestId('progress-bar-container');
    const progressBar = within(progressBarContainer).getByTestId('progress-bar');

    expect(progressBar).toHaveStyle({ width: '50%' });
  });
});