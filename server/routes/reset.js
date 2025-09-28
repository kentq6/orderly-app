import express from 'express';
import { writeJsonFile } from '../utils/jsonHandler.js';
import { defaultProducts } from '../defaultData/defaultProducts.js';
import { defaultDeliveryOptions } from '../defaultData/defaultDeliveryOptions.js';
import { defaultCart } from '../defaultData/defaultCart.js';
import { defaultOrders } from '../defaultData/defaultOrders.js';

const router = express.Router();

router.post('/', (req, res) => {
  // Reset all JSON files to default data
  writeJsonFile('products', defaultProducts);
  writeJsonFile('deliveryOptions', defaultDeliveryOptions);
  writeJsonFile('cart', defaultCart);
  writeJsonFile('orders', defaultOrders);

  res.status(204).send();
});

export default router;
