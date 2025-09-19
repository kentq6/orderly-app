export type Product = {
  keywords: string[];
  id: string;
  image: string;
  name: string;
  rating: {
    stars: number;
    count: number;
  };
  priceCents: number;
  createdAt: number;
  updatedAt: number;
};