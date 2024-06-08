const http = require('http');
const routes = require('./routes')
//const testRoutes = require('./testRoutes')

const server = http.createServer(routes)

server.listen(3000)