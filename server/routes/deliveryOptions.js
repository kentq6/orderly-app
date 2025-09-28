import express from 'express';
import { readJsonFile } from '../utils/jsonHandler.js';

const router = express.Router();

router.get('/', (req, res) => {
  const expand = req.query.expand;
  const deliveryOptions = readJsonFile('deliveryOptions');
  let response = deliveryOptions;

  if (expand === 'estimatedDeliveryTime') {
    response = deliveryOptions.map(option => {
      const deliveryTimeMs = Date.now() + option.deliveryDays * 24 * 60 * 60 * 1000;
      return {
        ...option,
        estimatedDeliveryTimeMs: deliveryTimeMs
      };
    });
  }

  res.json(response);
});

export default router;
