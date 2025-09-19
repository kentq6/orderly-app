import axios from 'axios';
import { useState, Fragment } from 'react';
import { formatMoney } from "../../utils/money";
import type { CartItem } from '../../types/cartItem.types';
import type { LoadCart } from '../../types/loadCart.types';

type CartItemDetailsProps = {
  cartItem: CartItem;
  loadCart: LoadCart;
};

export function CartItemDetails({ cartItem, loadCart }: CartItemDetailsProps) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateQuantity = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity
    });
    await loadCart();
  }

  const updateQuantityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleQuantityKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      updateQuantity();
    } else if (keyPressed === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <Fragment>
      <img className="product-image"
        src={cartItem.product.image}
        data-testid="product-image" />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity" data-testid="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity
              ? <input type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleQuantityKeyDown}
                data-testid="quantity-textbox" />
              : <span className="quantity-label" data-testid="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span
            className="update-quantity-link link-primary" data-testid="update-button"
            onClick={() => {
              setIsUpdatingQuantity(!isUpdatingQuantity);
              updateQuantity();
            }}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" data-testid="delete-button"
            onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </Fragment>
  );
}