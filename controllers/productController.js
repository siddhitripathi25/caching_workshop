const productService = require('../services/productService');
const { cache } = require('../middleware/cacheMiddleware');
const { clearCache } = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
    try {

        let products = await productService.getProducts();

        cache[req.originalUrl] = {
            data: products,
            createdAt: Date.now()
        };

        res.json(products);

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function getProductById(req, res) {
    try {

        let id = Number(req.params.id);

        let product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        cache[req.originalUrl] = {
            data: product,
            createdAt: Date.now()
        };

        res.json(product);

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function createProduct(req, res) {
    try {

        let newProduct = await productService.createProduct(
            req.body.name,
            req.body.price
        );

        clearCache();

        res.status(201).json(newProduct);

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function updateProduct(req, res) {
    try {

        let id = Number(req.params.id);

        let product = await productService.updateProduct(
            id,
            req.body.name,
            req.body.price
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        res.json(product);

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function patchProduct(req, res) {
    try {

        let id = Number(req.params.id);

        let product = await productService.patchProduct(
            id,
            req.body.name,
            req.body.price
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        res.json(product);

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

async function deleteProduct(req, res) {
    try {

        let id = Number(req.params.id);

        let product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        res.json({
            message: "Product deleted successfully",
            product: product
        });

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};