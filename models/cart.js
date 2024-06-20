
const fs = require('fs');
const path = require('path')
const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');


// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([])
//     } else {
//       cb(JSON.parse(fileContent))
//     }
//   })
// }

module.exports = class Cart {

  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent)
      }

      let updatedProduct;
      // 'existingProduct' retorna o primeiro objeto que satisfaz a condição.
      const existingProduct = cart.products.find(prod => prod.id === id);

      if (existingProduct) {
        let filteredProducts = cart.products.filter((item) => item.id !== id);
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1
        updatedProduct.price = updatedProduct.price * updatedProduct.qty
        cart.products = [...filteredProducts, updatedProduct]
      } else {
        updatedProduct = { id, qty: 1, price: productPrice }
        cart.products = [...cart.products, updatedProduct]

      }
      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err)
      })

    })
  }
}