
const express = require('express')
const app = express();
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes.router)
app.use(shopRoutes)


app.use((req, res, next) => {
  //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' })
})

app.listen(3000)