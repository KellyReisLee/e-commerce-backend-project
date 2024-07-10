
require('dotenv').config()
const express = require('express')
const app = express();
const adminRoutes = require('./src/routes/admin')
const shopRoutes = require('./src/routes/shop')
const path = require('path')
const errorController = require('./src/controllers/404')
const sequelize = require('./src/util/database');
const Product = require('./src/models/product');
const User = require('./src/models/user');
const Cart = require('./src/models/cart');
const CartItem = require('./src/models/cart-item');


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findByPk(1).then((user) => {
    req.user = user;
    next();

  }).catch((err) => console.log(err))
})

//Checking if mySQL database is working.
// db.execute('SELECT * FROM products').then((result) => console.log(result[0], result[1])).catch((err) => console.log(err))

app.use('/admin', adminRoutes)
app.use(shopRoutes);

//app.use(errorController.notFound)

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User)
// Cart.belongsToMany(Product, { through: CartItem })
// Product.belongsToMany(Cart, { through: CartItem })

// Sincroniza com database:
sequelize
  // .sync({ force: true })
  .sync({ force: true })
  .then(result => {
    //console.log(result)
    app.listen(3000)
  })
  .catch(err => {
    console.log(err);
  })
