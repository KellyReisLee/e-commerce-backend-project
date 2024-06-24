
require('dotenv').config()
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path')
const errorController = require('./controllers/404')
const sequelize = require('./util/database')


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

//Checking if mySQL database is working.
// db.execute('SELECT * FROM products').then((result) => console.log(result[0], result[1])).catch((err) => console.log(err))

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorController.notFound)

sequelize.sync().then((result) => {
  //console.log(result)
  app.listen(3000)
}).catch((err) => console.log(err))

