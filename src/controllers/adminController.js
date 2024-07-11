
//const Product = require('../models/product');
const db = require('../models');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  req.user.createProduct({
    title, price, imageUrl, description
  }).then((result) => {
    console.log(result)
    res.redirect('/admin/products')
  }).catch((err) => console.log(err))

};


// GET product that will be edit.
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  // Product.findByPk(prodId)
  req.user.getProducts({ where: { id: prodId } })
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product

      })

    }).catch(err => console.log(err))

};



// POST the data for the edit product:
exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  db.Product.findByPk(productId)
    .then(product => {
      if (!product) {
        // handle case where product is not found
        console.log('Product not found');
        return res.redirect('/admin/products'); // or handle it another way
      }
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then(result => {
      console.log('Product updated');

    })
    .catch(err => {
      console.log(err);

    });
  res.redirect('/admin/products')
};


exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then((products) => {

      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    }).catch(err => console.log(err))
};



exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  db.Product.findByPk(prodId).then((product) => {
    return product.destroy()
  }).then(() => {
    console.log('Product Deleted!')
    res.redirect('/admin/products');
  })
    .catch(err => console.log(err))

};
