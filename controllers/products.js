
const path = require('path');
const products = [];


//GET - Get all products:
exports.getAllProducts = async (req, res, next) => {
  console.log('In another middleware')
  //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true })
}


//POST - Adding new Products:
exports.addProducts = (req, res, next) => {
  products.push({ title: req.body.title })
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {

  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  })
}



