import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { NotFoundPage } from './NotFoundPage';
import { cart as mockCart } from '../../utils/mock';

describe('NotFoundPage component', () => {
  it('displays the page correctly', () => {
    const cart = mockCart;

    render(
      <MemoryRouter>
        <NotFoundPage cart={cart}/>
      </MemoryRouter>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});