import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ProductsGrid } from './ProductsGrid';
import { products as mockProducts } from '../../utils/mock';

describe('ProductsGrid component', () => {
  let products;
  let loadCart;

  beforeEach(() => {
    products = [...mockProducts];
    loadCart = vi.fn();
  });

  it('renders the products', async () => {
    render(<ProductsGrid products={products} loadCart={loadCart} />);

    const productContainers = await screen.findAllByTestId('product-container');
    expect(productContainers).toHaveLength(2);

    expect(
      within(productContainers[0])
        .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

    expect(
      within(productContainers[1])
        .getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
  });
});