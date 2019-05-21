/**
 * @author raven
 * @file fs demo
 */

const fs = require('fs')
const path = require('path')

const filepath = path.resolve(__dirname, './hello.txt')

// 同步执行
fs.writeFileSync(
  filepath,
  'hello node2',
  {
    encoding: 'utf-8'
  }
)

fs.readFile(
  filepath,
  function (err, buffer) {
    if (err) {
      console.log(err)
      return
    }
    console.log(buffer)
    console.log(buffer.toString())
  }
)
