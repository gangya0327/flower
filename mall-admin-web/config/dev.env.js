'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LOGIN_API: '"http://zup-gateway.zatgo-test.svc.flybycs.com"',
  BASE_API: '"http://zup-gateway.zatgo-test.svc.flybycs.com/trade/admin"',
  Activity_API: '"http://zup-gateway.zatgo-test.svc.flybycs.com/activity"', // activity后端地址，用于活动接口
  Oss_URL: '"http://yikuaiban-img-test.oss-cn-hangzhou.aliyuncs.com"', // 测试环境oss地址
// BASE_API: '"http://192.168.1.197:8071"',
// Activity_API: '"http://192.168.1.133:8087/activity"', //蔡宇activity后端地址，用于活动接口
})
