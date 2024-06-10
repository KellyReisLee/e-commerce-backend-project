const router = require('express').Router();



router.get('/', (req, res, next) => {
  console.log('One middleware')
  res.send('<h1>Hello from Express</h1>')
})


module.exports = router