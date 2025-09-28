import express from 'express';
import { readJsonFile, writeJsonFile, findById, updateItem, removeItem } from '../utils/jsonHandler.js';

const router = express.Router();

router.get('/', (req, res) => {
  const expand = req.query.expand;
  let cartItems = readJsonFile('cart');

  if (expand === 'product') {
    const products = readJsonFile('products');
    cartItems = cartItems.map(item => {
      const product = findById(products, item.productId);
      return {
        ...item,
        product
      };
    });
  }

  res.json(cartItems);
});

router.post('/', (req, res) => {
  const { productId, quantity } = req.body;

  const products = readJsonFile('products');
  const product = findById(products, productId);
  if (!product) {
    return res.status(400).json({ error: 'Product not found' });
  }

  if (typeof quantity !== 'number' || quantity < 1 || quantity > 10) {
    return res.status(400).json({ error: 'Quantity must be a number between 1 and 10' });
  }

  let cartItems = readJsonFile('cart');
  let cartItem = findById(cartItems, productId);
  
  if (cartItem) {
    cartItem.quantity += quantity;
    updateItem(cartItems, productId, cartItem);
  } else {
    cartItem = { productId, quantity, deliveryOptionId: "1" };
    cartItems.push(cartItem);
  }

  writeJsonFile('cart', cartItems);
  res.status(201).json(cartItem);
});

router.put('/:productId', (req, res) => {
  const { productId } = req.params;
  const { quantity, deliveryOptionId } = req.body;

  let cartItems = readJsonFile('cart');
  const cartItem = findById(cartItems, productId);
  
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be a number greater than 0' });
    }
    cartItem.quantity = quantity;
  }

  if (deliveryOptionId !== undefined) {
    const deliveryOptions = readJsonFile('deliveryOptions');
    const deliveryOption = findById(deliveryOptions, deliveryOptionId);
    if (!deliveryOption) {
      return res.status(400).json({ error: 'Invalid delivery option' });
    }
    cartItem.deliveryOptionId = deliveryOptionId;
  }

  updateItem(cartItems, productId, cartItem);
  writeJsonFile('cart', cartItems);
  res.json(cartItem);
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;

  let cartItems = readJsonFile('cart');
  const cartItem = findById(cartItems, productId);
  
  if (!cartItem) {
    return res.status(404).json({ error: 'Cart item not found' });
  }

  removeItem(cartItems, productId);
  writeJsonFile('cart', cartItems);
  res.status(204).send();
});

export default router;
