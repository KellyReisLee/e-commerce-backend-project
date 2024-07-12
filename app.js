
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
const db = require('./src/models/index');


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(async (req, res, next) => {
  try {
    // Obtém o usuário com id 1 e o adiciona ao req
    const user = await db.User.findByPk(1);
    req.user = user;
    next();
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    next(error); // Passe o erro para o middleware de tratamento de erros
  }
});

//Checking if mySQL database is working.
// db.execute('SELECT * FROM products').then((result) => console.log(result[0], result[1])).catch((err) => console.log(err))

app.use('/admin', adminRoutes)
app.use(shopRoutes);

app.use(errorController.notFound)

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User)
// Cart.belongsToMany(Product, { through: CartItem })
// Product.belongsToMany(Cart, { through: CartItem })
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// Sincroniza com database:
// sequelize
//   // .sync({ force: true })
//   .sync({ alter: true })
//   .then(result => {
//     //console.log(result)
//     
//   })
//   .catch(err => {
//     console.log(err);
//   })

app.listen(3000)