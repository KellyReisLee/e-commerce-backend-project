const router = require('express').Router();
const path = require('path')
const adminData = require('./admin')


router.get('/', (req, res, next) => {
  console.log('One middleware')
  console.log('shop.js', adminData.products)
  const products = adminData.products;
  // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  })
})


module.exports = router