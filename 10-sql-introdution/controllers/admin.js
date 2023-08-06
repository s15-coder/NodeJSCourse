const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(console.log)

};


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save().then((result) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err);
  });
};

exports.editProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/')
  }
  const productId = req.params.productId;

  Product.findById(productId, product => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  })
};

exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;
  const editedTitle = req.body.title;
  const editedImageUrl = req.body.imageUrl;
  const editedPrice = req.body.price;
  const editedDescription = req.body.description;
  const editedProduct = new Product(
    productId,
    editedTitle,
    editedImageUrl,
    editedDescription,
    editedPrice,
  )
  editedProduct.save()
  res.redirect('/admin/products')
}

exports.deleteProduct = (req, res) => {
  const productId = req.body.productId
  console.log(productId);
  Product.deleteById(productId)
  return res.redirect('/admin/products')
}
