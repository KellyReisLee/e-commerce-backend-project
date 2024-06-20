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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

  }

  save() {
    let idNumber = Math.random().toString().split('.')[1]
    this.id = idNumber;
    //'p e  filepath tem o mesmo caminho.'
    // const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    const filePath = path.join(__dirname, '..', 'data', 'products.json');
    // console.log(filePath)
    //console.log(p)

    getProductsFromFile(
      products => {
        products.push(this)
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err)
        })
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