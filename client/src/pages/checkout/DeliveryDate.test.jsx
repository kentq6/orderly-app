import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryDate } from './DeliveryDate';
import { cart as mockCart, deliveryOptions as mockDeliveryOptions } from '../../utils/mock'
import dayjs from 'dayjs';

describe('DeliveryDate component', () => {
  it('displays the correct delivery date', () => {
    render(<DeliveryDate cartItem={mockCart[0]} deliveryOptions={mockDeliveryOptions} />);

    // Assuming mockDeliveryOptions[0] has a specific date
    const formattedDate = dayjs(mockDeliveryOptions[0].estimatedDeliveryTimeMs)
      .format('dddd, MMMM D');

    expect(screen.getByText(`Delivery date: ${formattedDate}`))
      .toBeInTheDocument();
  });
});