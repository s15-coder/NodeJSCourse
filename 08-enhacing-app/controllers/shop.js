const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    })
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/products-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
}
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/prders',
    });
}
