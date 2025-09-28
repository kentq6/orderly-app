import express from 'express';
import { readJsonFile, findById } from '../utils/jsonHandler.js';

const router = express.Router();

router.get('/', (req, res) => {
  const cartItems = readJsonFile('cart');
  const products = readJsonFile('products');
  const deliveryOptions = readJsonFile('deliveryOptions');
  
  let totalItems = 0;
  let productCostCents = 0;
  let shippingCostCents = 0;

  for (const item of cartItems) {
    const product = findById(products, item.productId);
    const deliveryOption = findById(deliveryOptions, item.deliveryOptionId);
    totalItems += item.quantity;
    productCostCents += product.priceCents * item.quantity;
    shippingCostCents += deliveryOption.priceCents;
  }

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  res.json({
    totalItems,
    productCostCents,
    shippingCostCents,
    totalCostBeforeTaxCents,
    taxCents,
    totalCostCents
  });
});

export default router;
