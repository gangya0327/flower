//引入express
const express = require('express')
//引入sha1
const sha1 = require('sha1')
//创建app应用对象
const app = express()
//验证服务器有效性
/**
 * 1. 微信服务器知道开发者服务器地址
 * - 测试号管理页面上填写url开发者服务器地址
 * - 使用ngrok内网穿透，将本地端口号开启的服务器映射到外网跨域访问一个网址
 * - 填写token
 * - 参与微信签名加密的一个参数
 * 2. 开发者服务器，验证消息是否来自微信服务器
 * - 计算得出signature签名，和微信传递的对比
 * - 将参与签名的三个参数(timestamp,nonce,token)按照字典组合排序并组合在一起
 * - 将数组里所有参数拼接成一个字符串，进行sha1加密，生成一个signature
 * - 对比微信返回的signature，相同则返回echostr给微信服务器，否则返回error
 */
const config = {
  token: 'wxpublicTest0329',
  appID: 'wx32cd396b1fab33fa',
  appsecret: '74f1a63f1837a85c245c111d774f813c'
}
//接受所有消息
app.use((req, res, next) => {
  //微信服务器提交的参数
  console.log(req.query)
  // { 
  //   signature: 'f967af147d6a9a9a98f1d6427ea28e670418d0d2', 微信加密签名
  //   echostr: '5595648072418827774',                        微信随机字符串
  //   timestamp: '1553826252',                               微信发送请求的时间戳
  //   nonce: '266319517'                                     微信随机数字
  // }
  const { signature, echostr, timestamp, nonce } = req.query
  const { token } = config
  //将参与签名的三个参数(timestamp,nonce,token)按照字典组合排序并组合在一起
  const arr = [timestamp, nonce, token]
  const arrSort = arr.sort()
  console.log(arrSort)
  //将数组里所有参数拼接成一个字符串，进行sha1加密，生成一个signature
  const str = arrSort.join('')
  const strSha1 = sha1(str)
  console.log(strSha1);
  //对比微信返回的signature，相同则返回echostr给微信服务器，否则返回error
  if (strSha1 === signature) {
    res.send(echostr)
  } else {
    res.end('error')
  }
})
//监听端口号
app.listen(4000, () => console.log('服务器启动咯'))