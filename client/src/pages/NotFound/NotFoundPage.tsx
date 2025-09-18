import { Header } from '../../components/Header';
import type { Cart } from '../../types/cart.types';
import './NotFoundPage.css';

type NotFoundProp = {
  cart: Cart;
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