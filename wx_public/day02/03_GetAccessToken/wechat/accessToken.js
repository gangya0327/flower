/**
 * 获取access_token，微信调用接口全局唯一凭证
 * 特点：1. 唯一
 *      2. 有效期2小时，提前5分钟请求
 *      3. 接口权限，每天2000次
 * 请求地址：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * 请求方式：GET
 * 
 * 设计思路：
 * 1. 首次没有本地文件，发送请求获取access_token，保存文件
 * 2. 第二次及以后
 *  1） 先去本地读取文件，判断是否过期
 *      - 如果过期，重新获取，保存
 *      - 如果未过期，直接使用
 * 
 * 实现思路：
 * 读取本地文件 readAccessToken
 *  - 本地有文件：判断是否过期 isValidAccessToken
 *      - 过期：重新请求获取access_token getAccessToken，保存覆盖本地文件，保证唯一性 saveAccessToken
 *      - 未过期：直接使用
 *  - 本地没有文件：请求获取access_token getAccessToken，保存覆盖本地文件，保证唯一性 saveAccessToken
 */

const { appID, appsecret } = require('../config/idnex')

class wechat {
    constructor() {

    }
    //获取access_token
    getAccessToken() {
        //定义请求地址
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`
        //发送请求
        /**
         * request
         * request-promise-narive
         */


    }
}