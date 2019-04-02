/**
 * 获取access_token：微信调用接口全局唯一接口
 * 特点：
 *  1. 唯一；
 *  2. 有效期2小时，需要提前5分钟请求
 * 请求地址：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
 * 请求方式：GET
 * 
 * 设计思路
 *  1. 首次本地没有，发送请求获取access_token，并保存（本地文件）
 *  2. 第二次及以后，先去读取本地文件，判断是否过期
 *      - 过期：重新获取access_token，覆盖之前的本地文件
 *      -未过期：直接使用
 * 
 * 整体思路
 *  读取本地文件(readAccessToken)
 *   - 本地有文件
 *      - 判断是否过期(isValidAccessToken)
 *          - 过期了：重新获取(getAccessToken)，保存覆盖之前的文件(saveAccessToken)
 *          - 没有过期：直接使用
 *   - 本地没有文件
 *      - 发送请求获取(getAccessToken)，保存文件(saveAccessToken)
 */

 class Wechat {
    constructor(){

    }
    //获取access_token
    getAccessToken(){

    }
 }