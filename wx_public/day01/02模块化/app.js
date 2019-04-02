//引入express
const express = require('express')
//引入auth
const auth = require('./wechat/auth')

//创建app应用对象
const app = express()

//接受所有消息
app.use(auth())
//监听端口号
app.listen(4000, () => console.log('服务器启动咯~~~'))