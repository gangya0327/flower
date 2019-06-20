let str = 'buffer字节流'
let buf = Buffer.from(str)
console.log(buf)
console.log('buf.length: ', buf.length)
console.log('str.length: ', str.length)

let buf2 = Buffer.alloc(10)
console.log(buf2)
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa
console.log(buf2)
console.log(buf2[2], '输入内容为十进制')

let buf3 = Buffer.allocUnsafe(10)
console.log(buf3, '可能含有敏感数据，遗留数据，但性能好')

let buf4 = Buffer.from('我是一段文本内容')
console.log(buf4)
console.log(buf4.toString())
