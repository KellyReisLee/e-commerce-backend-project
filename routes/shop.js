const router = require('express').Router();
const path = require('path')
const adminData = require('./admin')


router.get('/', (req, res, next) => {
  console.log('One middleware')
  console.log('shop.js', adminData.products)
  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
})


module.exports = router