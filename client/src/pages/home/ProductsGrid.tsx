import type { ProductType } from '../../types/product.types';
import type { LoadCartFunction } from '../../types/loadCart.types';
import { Product } from './Product';

type ProductsGridProps = {
  products: ProductType[];
  loadCart: LoadCartFunction;
};

export function ProductsGrid({ products, loadCart }: ProductsGridProps) {
  
  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Product key={product.id} product={product} loadCart={loadCart} />
        );
      })}
    </div>
  );
}