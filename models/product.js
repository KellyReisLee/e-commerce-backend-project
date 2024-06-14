const fs = require('fs');
const path = require('path')


module.exports = class Product {
  constructor(t) {
    this.title = t;

  }
  save() {
    //'p e  filepath tem o mesmo caminho.'
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    const filePath = path.join(__dirname, '..', 'data', 'products.json');
    // console.log(filePath)
    //console.log(p)


    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent)
      }
      products.push(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })


  }
  //
  static fetchAllData(cd) {
    const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cd([])
      } else {
        cd(JSON.parse(fileContent))
      }

    })
  }
}