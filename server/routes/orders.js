import express from 'express';
import { readJsonFile, writeJsonFile, findById, generateId } from '../utils/jsonHandler.js';

const router = express.Router();

router.get('/', (req, res) => {
  const expand = req.query.expand;
  let orders = readJsonFile('orders');

  // Sort by most recent
  orders.sort((a, b) => b.orderTimeMs - a.orderTimeMs);

  if (expand === 'products') {
    const products = readJsonFile('products');
    orders = orders.map(order => {
      const orderProducts = order.products.map(product => {
        const productDetails = findById(products, product.productId);
        return {
          ...product,
          product: productDetails
        };
      });
      return {
        ...order,
        products: orderProducts
      };
    });
  }

  res.json(orders);
});

router.post('/', (req, res) => {
  const cartItems = readJsonFile('cart');

  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const products = readJsonFile('products');
  const deliveryOptions = readJsonFile('deliveryOptions');

  let totalCostCents = 0;
  const orderProducts = cartItems.map(item => {
    const product = findById(products, item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    const deliveryOption = findById(deliveryOptions, item.deliveryOptionId);
    if (!deliveryOption) {
      throw new Error(`Invalid delivery option: ${item.deliveryOptionId}`);
    }
    const productCost = product.priceCents * item.quantity;
    const shippingCost = deliveryOption.priceCents;
    totalCostCents += productCost + shippingCost;
    const estimatedDeliveryTimeMs = Date.now() + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000;
    return {
      productId: item.productId,
      quantity: item.quantity,
      estimatedDeliveryTimeMs
    };
  });

  totalCostCents = Math.round(totalCostCents * 1.1);

  const order = {
    id: generateId(),
    orderTimeMs: Date.now(),
    totalCostCents,
    products: orderProducts
  };

  // Add order to orders file
  const orders = readJsonFile('orders');
  orders.push(order);
  writeJsonFile('orders', orders);

  // Clear cart
  writeJsonFile('cart', []);

  res.status(201).json(order);
});

router.get('/:orderId', (req, res) => {
  const { orderId } = req.params;
  const expand = req.query.expand;

  const orders = readJsonFile('orders');
  let order = findById(orders, orderId);
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  if (expand === 'products') {
    const products = readJsonFile('products');
    const orderProducts = order.products.map(product => {
      const productDetails = findById(products, product.productId);
      return {
        ...product,
        product: productDetails
      };
    });
    order = {
      ...order,
      products: orderProducts
    };
  }

  res.json(order);
});

export default router;
