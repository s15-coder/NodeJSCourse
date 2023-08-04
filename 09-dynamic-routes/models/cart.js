const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);
module.exports = class Cart {

    static addProduct(productId, price) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            const existingProductIndex = cart.products.findIndex(p => p.id === productId)
            const existingProduct = cart.products[existingProductIndex]

            // Validate both use cases
            if (existingProduct) {
                existingProduct.quantity += 1;
                cart.products[existingProductIndex] = existingProduct;
            } else {
                const newProduct = { id: productId, quantity: 1, price: price }
                cart.products.push(newProduct)
            }
            cart.totalPrice += Number(price);
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    console.log(err);
                }
            })
        })
    }

    static removeProduct(product) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent)
            const updatedCart = { ...cart }
            const cartProduct = updatedCart.products.find(prod => prod.id === product.id)
            if (!cartProduct) {
                return;
            }
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== product.id)
            updatedCart.totalPrice -= cartProduct.quantity * cartProduct.price
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                if (err) {
                    console.log(err);
                }
            })
        })
    }

    static getCart(callback) {

        fs.readFile(p, (err, fileContent) => {
            if (err) {
                callback(null)
                return
            }
            const cart = JSON.parse(fileContent)
            callback(cart)
        })
    }
}