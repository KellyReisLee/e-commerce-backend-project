
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId, product => {
    if (!product) {
      res.redirect('/')

    }
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product',
      path: '/product/productId'
    })
  })


}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

//GET all products from cart.
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  //console.log(productId)
  Product.findById(productId, ((product) => {
    Cart.addProduct(productId, product.price)
  }))
  res.redirect('/cart')
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders'
  })
}


exports.postDeleteCart = (req, res, next) => {
  const { productId } = req.body;

  Product.findById(productId, product => {
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart')
  })


}

