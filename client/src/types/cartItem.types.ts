export type CartItem = {
  id: number;
  productId: string;
  quantity: number;
  deliveryOptionId: string;
  createdAt: string;
  updatedAt: string;
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
};