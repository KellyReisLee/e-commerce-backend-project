

const Product = require('../models/product')


//GET - Get all products:
exports.getAllProducts = async (req, res, next) => {
  //console.log('In another middleware')
  //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
  res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true })
}


//POST - Adding new Products:
exports.addProducts = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save();
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAllData(products => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    })
  });

}



