const database = require('../database/productDatabase');

async function delayReadData() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return await database.readData();
}

async function getProducts() {
    return await delayReadData();
}

async function getProductById(id) {
    let products = await delayReadData();

    return products.find((item) => item.id === id);
}

async function createProduct(name, price) {
    let products = await database.readData();

    let newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    };

    products.push(newProduct);

    await database.writeData(products);

    return newProduct;
}

async function updateProduct(id, name, price) {
    let products = await database.readData();

    let product = products.find((item) => item.id === id);

    if (!product) {
        return null;
    }

    product.name = name;
    product.price = price;

    await database.writeData(products);

    return product;
}

async function patchProduct(id, name, price) {
    let products = await database.readData();

    let product = products.find((item) => item.id === id);

    if (!product) {
        return null;
    }

    if (name !== undefined) {
        product.name = name;
    }

    if (price !== undefined) {
        product.price = price;
    }

    await database.writeData(products);

    return product;
}

async function deleteProduct(id) {
    let products = await database.readData();

    let product = products.find((item) => item.id === id);

    if (!product) {
        return null;
    }

    products = products.filter((item) => item.id !== id);

    await database.writeData(products);

    return product;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};