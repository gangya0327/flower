const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')

//读取文件内的文件
var readDir = fs.readdirSync('./mycom')

//开启node服务
http.createServer(function (request, response) {
    //循环拼接html
    var _word = ""
    for (var i = 0; i < readDir.length; i++) {
        var name = readDir[i].split('.')[0]
        _word += "<div class='arow'><li>"
        _word += "<input type='checkbox' id='" + name + "' name='" + name + "'/>"
        _word += name + "</li></div>"

    }
    //1-3读取请求路径
    var pathname = url.parse(request.url).pathname
    switch (pathname) {
        case '/':
            fs.readFile('./template.html', function (err, data) {
                var _data = data.toString().replace("{{list}}", _word)
                response.end(data)
            })
        case '/a':
            response.end('aaa')
        case '/b':
            break;

    }
}).listen(3300)