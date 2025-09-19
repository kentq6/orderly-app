export type Cart = {
  createdAt: string;
  deliveryOptionId: string;
  id: number;
  product: {
    createdAt: string;
    id: string;
    image: string;
    keywords: string[];
    name: string;
    priceCents: number;
    rating: {
      count: number;
      stars: number;
    };
    updatedAt: string;
  };
  productId: string;
  quantity: number;
  updatedAt: string;
}[];