/**
 * 简单文件写入
 * fs.writeFile(file, data[, options], callback)
 * fs.writeFileSync(file, data[, options])
 *      - file 
 *      - data
 *      - options
 *      - callback
 */

let fs = require('fs')
fs.writeFile('helloFileSync.txt', '这是通过writeFile写入', {flag: 'a'}, function (err) {
  if (!err) {
    console.log('写入成功')
  }
})
