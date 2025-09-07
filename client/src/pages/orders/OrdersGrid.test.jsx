import { it, expect, describe } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { OrdersGrid } from './OrdersGrid';
import { ordersDetails as mockOrdersDetails } from '../../utils/mock';

describe('OrdersGrid component', () => {
  it('displays the order grid correctly', async () => {
    render(
      <MemoryRouter>
        <OrdersGrid orders={mockOrdersDetails} loadCart={() => {}} />
      </MemoryRouter>
    );
    
    const orderPlacedDates = await screen.findAllByTestId('order-date');
    expect(orderPlacedDates).toHaveLength(2);

    expect(
      within(orderPlacedDates[0])
        .getByText('Order Placed:')
    ).toBeInTheDocument();
    expect(
      within(orderPlacedDates[0])
        .getByText('August 12')
    ).toBeInTheDocument();
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'))
      .toBeInTheDocument();
    
    expect(
      within(orderPlacedDates[1])
        .getByText('Order Placed:')
    ).toBeInTheDocument();
    expect(
      within(orderPlacedDates[1])
        .getByText('June 10')
    ).toBeInTheDocument();
    expect(screen.getByText('Intermediate Size Basketball'))
      .toBeInTheDocument();
  });
});