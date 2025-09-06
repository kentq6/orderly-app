import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DeliveryOptions } from './DeliveryOptions';
import { cart as mockCart, deliveryOptions as mockDeliveryOptions } from '../../utils/mock'
import axios from 'axios';
import dayjs from 'dayjs';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('OrderSummary component', () => {
  let deliveryOptions;
  let cartItem;
  let loadCart;
  let user;

  let freeShippingDate;
  let threeDayShippingDate;
  let oneDayShippingDate;

  beforeEach(() => {
    cartItem = mockCart[0];
    deliveryOptions = mockDeliveryOptions;

    freeShippingDate = dayjs(mockDeliveryOptions[0].estimatedDeliveryTimeMs)
      .format('dddd, MMMM D');
    threeDayShippingDate = dayjs(mockDeliveryOptions[1].estimatedDeliveryTimeMs)
      .format('dddd, MMMM D');
    oneDayShippingDate = dayjs(mockDeliveryOptions[2].estimatedDeliveryTimeMs)
      .format('dddd, MMMM D');

    loadCart = vi.fn();
    user = userEvent.setup();

    render(<DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />);
  });

  it('displays the correct details', () => {
    expect(screen.getByText('Choose a delivery option:')).toBeInTheDocument();

    const deliveryDates = screen.getAllByTestId('delivery-option');
    expect(deliveryDates[0]).toHaveTextContent(freeShippingDate);
    expect(deliveryDates[1]).toHaveTextContent(threeDayShippingDate);
    expect(deliveryDates[2]).toHaveTextContent(oneDayShippingDate);

    expect(screen.getByText('FREE Shipping')).toBeInTheDocument();
    expect(screen.getByText('$4.99 - Shipping')).toBeInTheDocument();
    expect(screen.getByText('$9.99 - Shipping')).toBeInTheDocument();
  });

  it('selects the different delivery option', async () => {
    // check if first option is selected
    expect(screen.getAllByTestId('delivery-option-input')[0]).toBeChecked();

    // user clicks the third shipping option
    await user.click(screen.getAllByTestId('delivery-option-input')[2]);

    // check if payment summary is updated
    expect(axios.put).toHaveBeenCalledWith(
      `/api/cart-items/${cartItem.productId}`,
      { deliveryOptionId: deliveryOptions[2].id }
    );

    // check if loadCart is called
    expect(loadCart).toHaveBeenCalled();
  });
});