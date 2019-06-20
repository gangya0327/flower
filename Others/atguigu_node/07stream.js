/**
 * 流式文件读取适用于大文件，可以分多次将文件读取到内存中
 */

let fs = require('fs')

// 创建一个可读流
let rs = fs.createReadStream('yys.jpg')
// 创建一个可写流
let ws = fs.createWriteStream('per.jpg')

// 监听流的开启与关闭
rs.once('open', function () {
  console.log('可读流打开了')
})

rs.once('close', function () {
  console.log('可读流关闭了')
  ws.end()
})

ws.once('open', function () {
  console.log('可读流打开了')
})

ws.once('close', function () {
  console.log('可读流关闭了')
})

//方法一
// 如果要读取一个可读流中的数据，必须要为可读流绑定一个data事件，data事件绑定完毕，他会自动开始读取数据
// rs.on('data', function (data) {
//   // console.log(data.length)
//   ws.write(data)
// })

//方法二
//pipe可以将可读流的内容直接输出到可写流
rs.pipe(ws)
