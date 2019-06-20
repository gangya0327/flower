/**
 * 1. 同步文件读取
 * 2. 异步文件读取
 * 3. 简单文件读取
 *      fs.readFile(path[, options], callback)
 *      fs.readFileSync(path[, options])
 *          - callback(err, data)
 * 
 */

let fs = require('fs')
fs.readFile('helloFileSync.txt', function (err, data) {
  if (!err) {
    console.log(data)
    console.log(data.toString())
    fs.writeFile('helloWrite.txt', data.toString(), function (err) {
      console.log('读取内容写入成功')
    })
  }
})
