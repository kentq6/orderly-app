import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutPage } from './CheckoutPage';

describe('CheckoutPage component', () => {  


  it('displays the correct details', () => {
    render(
      <MemoryRouter>
        <CheckoutPage cart={[]} loadCart={{}} />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Review your order')
    ).toBeInTheDocument();
  });
});