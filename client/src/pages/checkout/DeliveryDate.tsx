import dayjs from 'dayjs';
import type { CartItem } from '../../types/cartItem.types';
import type { DeliveryOptions } from '../../types/deliveryOptions.types';

type DeliveryDateProps = {
  cartItem: CartItem;
  deliveryOptions: DeliveryOptions;
};

export function DeliveryDate({ cartItem, deliveryOptions }: DeliveryDateProps) {
  const selectedDeliveryOption = deliveryOptions.
    find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId;
    });

  return (
    <div className="delivery-date">
      Delivery date: {selectedDeliveryOption
        ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
        : 'Not Available'}
    </div>
  );
}