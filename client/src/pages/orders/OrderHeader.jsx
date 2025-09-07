import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export function OrderHeader({ order }) {
  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div className="order-date" data-testid="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
        </div>
        <div className="order-total" data-testid="order-total">
          <div className="order-header-label">Total:</div>
          <div>{formatMoney(order.totalCostCents)}</div>
        </div>
      </div>

      <div className="order-header-right-section" data-testid="order-id">
        <div className="order-header-label">Order ID:</div>
        <div>{order.id}</div>
      </div>
    </div>
  );
}