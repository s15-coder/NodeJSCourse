const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id)
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        Product.#writeProducts(updatedProducts)
      } else {
        this.id = Math.random().toString()
        products.push(this);
        Product.#writeProducts(products)
      }

    });
  }

  static #writeProducts(products) {
    fs.writeFile(p, JSON.stringify(products), err => {
      if (err) {
        console.log(err);
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static deleteById(id) {
    getProductsFromFile(products => {
      const existingProductIndex = products.findIndex(p => p.id === id)
      const existingProduct = products[existingProductIndex]
      Cart.removeProduct(existingProduct)
      let updatedProducts = [...products]
      updatedProducts.splice(existingProductIndex, 1)
      Product.#writeProducts(updatedProducts)
    })
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id)
      callback(product)
    });

  }
};
