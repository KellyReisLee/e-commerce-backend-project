
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products')
router.get('/add-product', productsController.getAllProducts)

router.post('/add-product', productsController.addProducts)


module.exports = router