/**
 * 流式文件写入
 * fs.createReadStream(path[, options])
 */

let fs = require("fs")
let ws = fs.createWriteStream("helloStream.txt")

ws.once("open", function () {
    console.log("流打开了")
})

ws.once("close", function () {
    console.log("流关闭了")
})

ws.write("写入一些内容1")
ws.write("写入一些内容2")
ws.write("写入一些内容3")
ws.write("写入一些内容4")
ws.write("写入一些内容5")
ws.write("写入一些内容6")

ws.end()