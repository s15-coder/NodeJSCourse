const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {

  Product.fetchAll().then(([rows]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(console.log)


};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then(([productData]) => {
    const product = productData[0]
    res.render('shop/product-detail', {
      product,
      path: '/products',
      pageTitle: product.title
    })
  }).catch((err) => {
    console.log(err);
  });

};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })

};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {

    Product.fetchAll().then(([rows]) => {
      const productsData = []
      for (let product of rows) {
        const cardProduct = cart.products.find(p => p.id === product.id)
        if (cardProduct) {
          productsData.push({ product, quantity: cardProduct.quantity })
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        productsData: productsData
      });
    }).catch(console.log)


  })
};


exports.addCart = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId, product => {
    Cart.addProduct(product.id, Number(product.price))
  })
  return res.redirect('/cart')
};

exports.deleteCartItem = (req, res) => {
  const productId = req.body.productId
  Product.findById(productId, product => {
    Cart.removeProduct(product)
    return res.redirect('/cart')
  })
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
