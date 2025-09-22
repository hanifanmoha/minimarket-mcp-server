import express from 'express';
import * as data from './minimarket-data.js';

const router = express.Router();

// GET /companies - Get all companies
router.get('/companies', async (req, res) => {
  res.status(200).json(data.companies);
});

// GET /companies/:id - Get company by id
router.get('/companies/:id', async (req, res) => {
  const company = data.companies.find(c => c.id === req.params.id);
  if (company) {
    res.status(200).json(company);
  } else {
    res.status(404).json({ error: "Company not found" });
  }
});

// GET /brands - Get all brands
router.get('/brands', async (req, res) => {
  res.status(200).json(data.brands);
});

// GET /brands/:id - Get brand by id
router.get('/brands/:id', async (req, res) => {
  const brand = data.brands.find(b => b.id === req.params.id);
  if (brand) {
    res.status(200).json(brand);
  } else {
    res.status(404).json({ error: "Brand not found" });
  }
});

// GET /categories - Get all categories
router.get('/categories', async (req, res) => {
  res.status(200).json(data.categories);
});

// GET /categories/:id - Get category by id
router.get('/categories/:id', async (req, res) => {
  const category = data.categories.find(c => c.id === req.params.id);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

// GET /products - Get all products
router.get('/products', async (req, res) => {
  res.status(200).json(data.products);
});

// GET /products/:id - Get product by id
router.get('/products/:id', async (req, res) => {
  const product = data.products.find(p => p.id === req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// GET /transactions - Get all transactions
router.get('/transactions', async (req, res) => {
  res.status(200).json(data.transactions);
});

// GET /transactions/:id - Get transaction by id
router.get('/transactions/:id', async (req, res) => {
  const transaction = data.transactions.find(t => t.id === req.params.id);
  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

export default router;
