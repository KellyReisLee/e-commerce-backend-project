
require('dotenv').config()
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path')
const errorController = require('./controllers/404')
const db = require('./util/database')


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

db.execute('SELECT * FROM products').then((result) => console.log(result[0], result[1])).catch((err) => console.log(err))

app.use('/admin', adminRoutes)
app.use(shopRoutes)


app.use(errorController.notFound)

app.listen(3000)