/**
 * fs 文件系统
 * 同步文件的写入
 * 1. 打开文件 fs.openSync(path, flags[, mode])
 *      - path 打开的文件路径
 *      - flags 打开文件要做的操作的类型，r-只读 w-可写
 *      - mode 设置文件的权限，一般不传
 * 
 *      返回值：返回一个文件的操作符作为结果
 * 
 * 2. 向文件写入内容 fs.writeSync(fd, string[, postion[, encoding]])
 *      - fd 文件的描述符
 *      - string 写入的内容
 * 
 * 3. 保存关闭文件 fs.closeSync(fd)
 */
let fs = require('fs')
let fd = fs.openSync('helloSync.txt', 'w')
console.log(fd)

fs.writeSync(fd, '今天天气不错', 10)
fs.closeSync(fd)
