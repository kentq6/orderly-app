import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderHeader } from './OrderHeader';
import { orders as mockOrders } from '../../utils/mock';
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';

describe('OrderHeader component', () => {
  let order;

  beforeEach(() => {
    order = mockOrders[0];

    render(<OrderHeader order={order} />);
  });

  it('displays the order header correctly', () => {
    const orderTimeMs = dayjs(order.orderTimeMs).format('MMMM D');
    expect(screen.getByTestId('order-date'))
      .toHaveTextContent(`Order Placed:${orderTimeMs}`);

    expect(screen.getByTestId('order-total'))
      .toHaveTextContent(`Total:${formatMoney(order.totalCostCents)}`);

    expect(screen.getByTestId('order-id'))
      .toHaveTextContent(`Order ID:${order.id}`);
  });
});