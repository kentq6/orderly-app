
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrdersPage } from './OrdersPage';
import { orders as mockOrders } from '../../utils/mock';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

describe('OrdersPage component', () => {
  let cart;
  let loadCard;
  
  beforeEach(() => {    
    // axios.get.mockImplementation(async (url) => {
    //   if (url === '/api/orders?expand=products') {
    //     return { data: orders };
    //   }
    // });

    // render(<OrdersPage cart={} loadCart={} />);
  });

  it('displays the page correctly', () => {
  });
});