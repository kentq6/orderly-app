import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/logo-white.png';
import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import './Header.css';
import type { CartType } from '../types/cart.types';

type HeaderProps = {
  cart: CartType[];
};

export function Header({ cart }: HeaderProps) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');

  const [search, setSearch] = useState<string>(searchText || '');

  const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') searchProducts();
    if (event.key === 'Escape') setSearch('');
  }

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" data-testid="logo-white-image"
            src={LogoWhite} />
          <img className="mobile-logo"
            src={MobileLogoWhite} />
        </NavLink>
      </div>

      <div className="middle-section">
        <div className="search-container">
          <input
            className="search-bar"
            data-testid="search-bar-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={updateSearchInput}
            onKeyDown={handleKeyDown}
          />

          <button
            className="search-button"
            onClick={searchProducts}
          >
            <img className="search-icon" src={SearchIcon}
              data-testid="search-button" />
          </button>
        </div>
      </div>

      <div className="right-section">
        <NavLink className="orders-link header-link" to="/orders" data-testid="orders-link">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-link header-link" to="/checkout" data-testid="cart-link">
          <img className="cart-icon" data-testid="cart-icon-image" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}