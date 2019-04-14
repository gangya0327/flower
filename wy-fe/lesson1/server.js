const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const url = require('url')
const compressing = require('compressing')

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
                response.end(_data)
            })
            break;
        case '/download':
            var post = ''
            var dirname = './download'
            var length = 0
            var nowdd = 0
            //获取数据
            request.on('data', function (chunk) {
                post += chunk
            })
            request.on('end', function () {
                post = querystring.parse(post)
                //创建文件夹
                fs.mkdir(dirname, function () {
                    for (var item in post) {
                        length++
                        (function (name) {
                            fs.readFile('./mycom/' + name + 'vue', function (err, data) {
                                fs.writeFile(dirname + '/' + name + '.vue', data, function () {
                                    nowdd++
                                    //等全部写入，则压缩
                                    if (nowdd == length) {
                                        var zipname = 'download.zip'
                                        compressing.zip.compressDir(dirname, './' + zipname)
                                            .then(function () {
                                                //压缩完成后，返回给使用者
                                                fs.readFile('./' + zipname, function (err, data) {
                                                    response.writeHead(200, {
                                                        'Content-Type': 'application/x-zip-compressed'
                                                    })
                                                    response.end(data)
                                                })
                                            })
                                    }
                                })
                            })
                        })(item)

                    }
                })
            })


            break;
        case '/b':
            break;

    }
}).listen(3300)