//引入express
const express = require('express')
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
 */
//接受所有消息
app.use((req, res, next) => {
  console.log(req.query)
})
//监听端口号
app.listen(4000, () => console.log('服务器启动咯'))