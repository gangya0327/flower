/**
 * fs 文件系统
 * 异步文件的写入
 * 1. 打开文件 fs.open(path, flags[, mode], callback)
 *      - path 打开的文件路径
 *      - flags 打开文件要做的操作的类型，r-只读 w-可写
 *      - mode 设置文件的权限，一般不传
 * 
 *      无返回值，结果都是通过回调函数返回
 *          { '0': null, '1': 3 }
 *          - err 错误对象，如果没有错误则为null
 *          - fd 文件描述符
 * 
 * 2. 向文件写入内容 fs.write(fd, string[, postion[, encoding]], callback)
 *      - fd 文件的描述符
 *      - string 写入的内容
 * 
 * 3. 保存关闭文件 fs.closeSync(fd)
 */
let fs = require('fs')
let fd = fs.open('helloAsync.txt', 'w', function (err, fd) {
  if (!err) {
    fs.write(fd, '这是异步写入的内容', function (err, written, string) {
      if (!err) {
        console.log('写入成功')
      }
      fs.close(fd, function (err) {
        if (!err) {
          console.log('文件关闭')
        }
      })
    })
  }else {
    console.log(err)
  }
})
