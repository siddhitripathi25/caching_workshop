const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

const { cacheMiddleware } = require('../middleware/cacheMiddleware');


// GET all products
router.get(
    '/products',
    cacheMiddleware,
    productController.getProducts
);


// GET product by ID
router.get(
    '/products/:id',
    cacheMiddleware,
    productController.getProductById
);


// CREATE product
router.post(
    '/products',
    productController.createProduct
);


// UPDATE entire product
router.put(
    '/products/:id',
    productController.updateProduct
);


// UPDATE part of product
router.patch(
    '/products/:id',
    productController.patchProduct
);


// DELETE product
router.delete(
    '/products/:id',
    productController.deleteProduct
);


module.exports = router;