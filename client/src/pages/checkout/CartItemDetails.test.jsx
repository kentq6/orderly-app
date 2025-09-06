import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartItemDetails } from './CartItemDetails';
import { cart as mockCart } from '../../utils/mock'
import axios from 'axios';
import userEvent from '@testing-library/user-event';

vi.mock('axios');

describe('CartItemDetails component', () => {
  let cartItem;
  let loadCart;
  let user;

  beforeEach(() => {
    cartItem = mockCart[0];

    loadCart = vi.fn();
    user = userEvent.setup();

    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);
  });

  it('displays the correct details', () => {
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'))
      .toBeInTheDocument();

    expect(screen.getByTestId('product-image'))
      .toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

    expect(screen.getByText('$10.90'))
      .toBeInTheDocument();

    expect(screen.getByTestId('product-quantity'))
      .toHaveTextContent('Quantity: 2');

    expect(screen.getByText('Update'))
      .toBeInTheDocument();

    expect(screen.getByText('Delete'))
      .toBeInTheDocument();
  });

  it('updates the quantity of items', async () => {
    // check that quantity input is 2 by default
    const quantityLabel = screen.getByTestId('quantity-label');
    expect(quantityLabel).toHaveTextContent('2');

    // user clicks update button
    const updateButton = screen.getByTestId('update-button');
    await user.click(updateButton);

    // check if input field appears
    const quantityTextbox = screen.getByTestId('quantity-textbox');
    expect(quantityTextbox).toBeInTheDocument();

    // user updates field to 3
    await user.type(quantityTextbox, '{backspace}3');
    
    // check if input field value is 3
    expect(quantityTextbox).toHaveValue('3');

    // user clicks update button again
    await user.click(updateButton);

    // check if quantity is updated to 3
    expect(axios.put).toHaveBeenCalledWith(
      '/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      { quantity: 3 }
    );

    // check if loadCart was called
    expect(loadCart).toHaveBeenCalled();
  });

  it('deletes the item from order summary', async () => {
    // check that the item is in the cart
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs'));

    // user clicks delete button
    await user.click(screen.getByTestId('delete-button'));

    // check if item has been deleted from cart
    expect(axios.delete).toHaveBeenCalledWith(
      '/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    );

    // check if loadCart was called
    expect(loadCart).toHaveBeenCalled();
  });
});