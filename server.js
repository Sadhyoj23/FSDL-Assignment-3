const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve products JSON
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'data', 'products.json'));
});

// Single product
app.get('/api/products/:id', (req, res) => {
  const products = require('./assets/data/products.json');
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Receive a cart (demo only)
app.post('/api/cart', (req, res) => {
  // In a real app you'd save the cart/session; here we just echo back
  res.json({ success: true, received: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
