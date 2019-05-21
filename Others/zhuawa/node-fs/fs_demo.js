/**
 * @author raven
 * @file fs demo
 */

const fs = require('fs')
const path = require('path')

console.log('before writefile1')

//异步执行
fs.writeFile(
  path.resolve(__dirname, 'hello.txt'),
  'hello node',
  {
    encoding: 'utf-8'
  },
  function (err) {
    console.log(err)
    console.log('after writefile')
  }
)

//同步执行
fs.writeFileSync(
  path.resolve(__dirname, './hello.txt'),
  'hello node2',
  {
    encoding: 'utf-8'
  }
)

console.log('before writefile2')
