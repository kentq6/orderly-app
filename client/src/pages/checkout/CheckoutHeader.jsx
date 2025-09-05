import { Link } from 'react-router';
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png';
import Logo from '../../assets/images/logo.png';
import MobileLogo from '../../assets/images/mobile-logo.png';
import './CheckoutHeader.css';

export function CheckoutHeader({ cart }) {
  let totalQuantity = 0;
  
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" data-testid="header-logo" src={Logo} />
            <img className="mobile-logo" data-testid="header-mobile-logo" src={MobileLogo} />
          </Link>
        </div>

        <div className="checkout-header-middle-section" data-testid="checkout-items-quantity">
          Checkout (<Link className="return-to-home-link"
            to="/">{totalQuantity}{totalQuantity > 1 ? ' items' : ' item'}</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} data-testid="checkout-lock-icon"/>
        </div>
      </div>
    </div>
  );
}