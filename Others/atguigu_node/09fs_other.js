let fs = require('fs')
/**
 * 检查文件是否存在
 * fs.existsSync(path) 
 */
let isExist = fs.existsSync('hello.txt')
console.log('检查文件是否存在：', isExist)

/**
 * 获取文件状态
 * fs.stat(path, callback) 
 * fs.statSync(path)
 * 
 */

fs.stat('hello.txt', function (err, stat) {
  console.log(stat)
})

/**
 * 删除文件
 * fs.unlink(path, callback)
 * fs.unlinkSync(path)
 */

/**
 * 读取一个目录的目录结构
 * fs.readdir(path[, options], callback)
 * fs.readdirSync(path[, options])
 *      - callback(err, files) files 是一个数组，对应每个文件或文件夹
 */

fs.readdir('.', function (err, files) {
  if (!err) {
    console.log(files)
  }
})

/**
 * 截断文件，将文件修改为指定大小
 * fs.truncate(path, len, callback)
 * fs.truncateSync(path, len)
 */

/**
 * 创建一个目录
 * fs.mkdir(path[, mode], callback)
 * fs.mkdirSync(path[, mode])
 * 
 * 删除一个目录
 * fs.rmdir(path, callback)
 * fs.rmdirSync(path)
 * 
 * 重命名文件
 * fs.rename(oldPath, newPath, callback)
 * fs.renameSync(oldPath, newPath)
 */

/**
 * 监视文件的修改
 * fs.watchFile(filename[, option], listener)
 *      - listener 当文件发生变化时，执行回调函数
 */
fs.watchFile('hello.txt', function (curr, prev) {
  console.log('文件被修改了')
})
