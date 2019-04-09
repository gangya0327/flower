const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')

//开启node服务
http.createServer(function (request, response) {
    //1-3读取请求路径
    var pathname = url.parse(request.url).pathname
    switch (pathname) {
        case '/':
            response.end('index')
        case '/a':
        response.end('aaa')
        case '/b':
            break;

    }
}).listen(3300)