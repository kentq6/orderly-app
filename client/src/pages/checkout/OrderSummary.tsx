import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';
import type { Cart } from '../../types/cart.types';
import type { DeliveryOptions as DeliveryOptionsType } from '../../types/deliveryOptions.types';
import type { LoadCart } from '../../types/loadCart.types';

type OrderSummaryProps = {
  cart: Cart;
  deliveryOptions: DeliveryOptionsType;
  loadCart: LoadCart;
};

export function OrderSummary({ cart, deliveryOptions, loadCart }: OrderSummaryProps) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {
        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate 
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
            />

            <div className="cart-item-details-grid">
              <CartItemDetails 
                cartItem={cartItem}
                loadCart={loadCart}
              />

              <DeliveryOptions 
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
                loadCart={loadCart}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}