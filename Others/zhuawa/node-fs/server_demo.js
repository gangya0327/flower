/**
 * @file http server
 * @author raven
 */

const http = require('http')

let server = http.createServer(function (request, response) {
  console.log(request.headers)
  response.setHeader('Content-Type', 'text/html')
  response.setHeader('x-my-header', 'raven')
  response.write('Hello http')
  response.end()
})

server.listen(8001, '127.0.0.1', function () {
  console.log('server is listening on 8001')
})
