const express = require('express')
const auth = require('./wechat/auth')

const app = express()

app.use(auth())

app.listen(3010, () => {
    console.log("服务器启动成功...");
})