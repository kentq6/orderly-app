import { OrderHeader } from './OrderHeader';
import { OrderDetailsGrid } from './OrderDetailsGrid';
import type { Order } from '../../types/order.types';
import type { LoadCart } from '../../types/loadCart.types';

type OrdersGridProps = {
  orders: Order[];
  loadCart: LoadCart;
};

export function OrdersGrid({ orders, loadCart }: OrdersGridProps) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrderHeader 
              order={order}
            />

            <OrderDetailsGrid 
              order={order}
              loadCart={loadCart}
            />
          </div>
        );
      })}
    </div>
  );
}