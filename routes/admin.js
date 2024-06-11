const router = require('express').Router()
const path = require('path');
const { title } = require('process');
const products = [];

router.get('/add-product', (req, res, next) => {
  console.log('In another middleware')
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
})

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title })
  res.redirect('/')
})


module.exports = {
  router, products
}