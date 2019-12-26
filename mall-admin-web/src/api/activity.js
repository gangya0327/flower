import request from '@/utils/request'
// const ApiURL = 'http://192.168.1.133:8087'
// const ApiURL = 'http://mall-activity.yikuaiban.svc.flybycs.com'
const ApiURL = process.env.Activity_API

//商品同步
export function productSync(data) {
    return request({
        url: '/product/sync',
        method: 'post',
        data: data
    })
}
//获取活动列表
export function fetchList(data) {
    return request({
        url: ApiURL + '/admin/getActivityList',
        method: 'post',
        data: data
    })
}
//活动下线
export function offlineActivity(id, data) {
    return request({
        url: ApiURL + '/admin/offlineActivity/' + id,
        method: 'post',
        data: data
    })
}
//活动上线
export function onlineActivity(id, data) {
    return request({
        url: ApiURL + '/admin/onlineActivity/' + id,
        method: 'post',
        data: data
    })
}
//同步产品列表
export function syncProductList(params) {
    return request({
        url: ApiURL + '/productList',
        method: 'get',
        params: params
    })
}
//更新活动
export function updateActivity(data) {
    return request({
        url: ApiURL + '/admin/updateActivity',
        method: 'post',
        data: data
    })
}
//新增活动
export function addActivity(data) {
    return request({
        url: ApiURL + '/admin/addActivity',
        method: 'post',
        data: data
    })
}
//获取活动内容
export function getActivity(id, data) {
    return request({
        url: ApiURL + '/admin/getActivity/' + id,
        method: 'post',
        data: data
    })
}
//获取活动内容
export function getExamineList(params) {
    return request({
        url: ApiURL + '/admin/examine/list',
        method: 'get',
        params: params
    })
}
//获取活动内容
export function examineExecute(params) {
    return request({
        url: ApiURL + '/admin/examine/execute',
        method: 'get',
        params: params
    })
}