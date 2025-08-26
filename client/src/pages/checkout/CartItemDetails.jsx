import axios from 'axios';
import { useState, Fragment } from 'react';
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
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

  const selectQuantity = (event) => {
    const quantitySelected = Number(event.target.value);
    setQuantity(quantitySelected);
  };

  return (
    <Fragment>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {isUpdatingQuantity
              ? <input type="text" 
                className="quantity-textbox" 
                value={quantity} 
                onChange={selectQuantity}/>
              : <span className="quantity-label">{cartItem.quantity}</span>
            }
          </span>
          <span 
            className="update-quantity-link link-primary"
            onClick={() => { 
              setIsUpdatingQuantity(!isUpdatingQuantity);
              updateQuantity();
            }}>
                Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}>
              Delete
          </span>
        </div>
      </div>
    </Fragment>
  );
}