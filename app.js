const http = require('http');
const handleRoutes = require('./routes.js')

const server = http.createServer(handleRoutes)

server.listen(3000)