const PRODUCT_DATA = require('../../db/seeds/PRODUCT_DATA.json');

const ProductController = {
  // Get all product records
  index: (req, res) => {
    res.status(200).json(PRODUCT_DATA);
  },

  // Create a new product record
  create: (req, res) => {
    const newProduct = req.body;
    PRODUCT_DATA.push(newProduct);
    res.status(201).json(newProduct);
  },

  // Get a single product record by ID
  show: (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = PRODUCT_DATA.find(p => p.id === productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  },

  // Update a product record
  update: (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = PRODUCT_DATA.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      const updatedProduct = { ...PRODUCT_DATA[productIndex], ...req.body };
      PRODUCT_DATA[productIndex] = updatedProduct;
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  },
  
  // Delete a product record
  destroy: (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = PRODUCT_DATA.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      PRODUCT_DATA.splice(productIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
};

module.exports = ProductController;
