const express = require('express')
const sha1 = require('sha1')

const app = express()

const config = {
    appID: 'wx32cd396b1fab33fa',
    appsecret: '74f1a63f1837a85c245c111d774f813c',
    token: 'wxpublicTest0404'
}

app.use((req, res, next) => {
    console.log(req.query)
    // { 
    //      signature: 'f3240576485824f92e09366c60d1ec9011d04dad', 微信加密签名
    //      echostr: '8488736909185481695',                        随机字符串
    //      timestamp: '1554346462',                               发送请求的时间戳
    //      nonce: '995292151'                                     随机数字 
    // }
    const { signature, echostr, timestamp, nonce } = req.query
    const { token } = config

    const arr = [timestamp, nonce, token]
    const arrSort = arr.sort()
    console.log('arrSort ', arrSort)

    const str = arrSort.join('')
    const strSha1 = sha1(str)
    console.log('strSha1 ', strSha1);

    if (strSha1 === signature) {
        res.send(echostr)
    } else {
        res.end('error')
    }
})

app.listen(3010, () => {
    console.log("服务器启动成功...");
})