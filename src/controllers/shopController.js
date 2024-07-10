
const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  // Estmaos usando os métodos publicos provenientes da class, sem precisar instanciar um objeto.
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });

    }
    )
    .catch((err) => console.log(err))


};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;

  // This  approach returns an array.
  //Or do this: Retorna um array.
  // Product.findAll({ where: { id: productId } })
  //   .then((product) =>
  //     res.render('shop/product-detail', {
  //       product: product[0],
  //       pageTitle: 'Product',
  //       path: '/product/productId'
  //     }))
  //   .catch(err => console.log(err))

  Product.findByPk(productId).then((product) => {
    //console.log(product);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Product',
      path: '/product/productId'
    })
  }).catch(err => console.log(err))

}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });

    }
    )
    .catch((err) => console.log(err))


};

//GET all products from cart.
exports.getCart = (req, res, next) => {

  req.user.getCart()
    .then((cart) => {
      return cart.getProducts()
        .then((cartProducts) => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts
          });
        })
    })
    .catch(err => console.log(err))
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}



exports.postDeleteCart = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));


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