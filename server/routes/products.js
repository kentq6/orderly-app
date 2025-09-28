import express from 'express';
import { readJsonFile } from '../utils/jsonHandler.js';

const router = express.Router();

router.get('/', (req, res) => {
  const search = req.query.search;

  let products = readJsonFile('products');

  if (search) {
    // Filter products by case-insensitive search on name or keywords
    const lowerCaseSearch = search.toLowerCase();

    products = products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(lowerCaseSearch);
      const keywordsMatch = product.keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearch));
      return nameMatch || keywordsMatch;
    });
  }

  res.json(products);
});

export default router;