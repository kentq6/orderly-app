import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

type OrderHeaderProp = {
  order: {
    id: string;
    orderTimeMs: number;
    totalCostCents: number;
    products: {
      productId: string;
        quantity: number;
        estimatedDeliveryTimeMs: number;
        product: {
          keywords: string[];
          id: string;
          image: string;
          name: string;
          rating: {
            stars: number;
            count: number;
          };
          priceCents: number;
          createdAt: string;
          updatedAt: string;
        }[];
      };
    createdAt: string;
    updatedAt: string;
  };
};

export function OrderHeader({ order }: OrderHeaderProp) {
  return (
    <div className="order-header">
      <div className="order-header-left-section">
        <div className="order-date" data-testid="order-date">
          <div className="order-header-label">Order Placed:</div>
          <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
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
