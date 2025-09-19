export type Order = {
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
    };
  }[];
  createdAt: string;
  updatedAt: string;
};
