const fs = require('fs');
const path = require('path')
const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

  }

  save() {

    //'p e  filepath tem o mesmo caminho.'
    // const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    const filePath = path.join(__dirname, '..', 'data', 'products.json');
    // console.log(filePath)
    //console.log(p)

    getProductsFromFile(
      products => {
        if (this.id) {
          const existingProductIndex = products.findIndex(p => p.id === this.id)
          const updatedProducts = [...products];
          updatedProducts[existingProductIndex] = this;

          fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
            console.log(err)
          })
        } else {
          let idNumber = Math.random().toString().split('.')[1]
          this.id = idNumber;
          products.push(this)
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err)
          })
        }

      }
    )
  }

  static fetchAll(cd) {
    getProductsFromFile(cd)
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)
      cb(product)
    })

  }
}