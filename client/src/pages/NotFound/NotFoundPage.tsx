import { Header } from '../../components/Header';
import type { CartItem } from '../../types/cartItem.types';
import './NotFoundPage.css';

type NotFoundProp = {
  cart: CartItem[];
};

export function NotFoundPage({ cart }: NotFoundProp) {
  return (
    <>
      <title>404: Page Not Found</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="not-found-message">
        Page Not Found
      </div>
    </>
  );
}