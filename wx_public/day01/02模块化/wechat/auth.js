//验证服务器有效性模块
//引入sha1
const sha1 = require('sha1')
//引入config
const config = require('../config')

module.exports = () => {
    return (req, res, next) => {
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
    }
}