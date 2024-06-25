
require('dotenv').config()
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path')
const errorController = require('./controllers/404')
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user')


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Checking if mySQL database is working.
// db.execute('SELECT * FROM products').then((result) => console.log(result[0], result[1])).catch((err) => console.log(err))

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorController.notFound)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize.sync({ alter: true }).then((result) => {
  //console.log(result)

}).catch((err) => console.log(err))

app.listen(3000, () => {
  console.log('Listening in PORT 3000')
})
