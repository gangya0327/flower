import request from '@/utils/request'
const ApiURL = process.env.Activity_API

export function test () {
  console.log('test ok!')
}

// 获取活动列表
export function fetchList (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/activity/list?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize,
    method: 'post',
    data: data
  })
}

// 活动下线
export function offlineActivity (id, data) {
  return request({
    url: ApiURL + '/groupBooking/admin/offlineActivity/' + id,
    method: 'post',
    data: data
  })
}
// 活动上线
export function onlineActivity (id, data) {
  return request({
    url: ApiURL + '/groupBooking/admin/onlineActivity/' + id,
    method: 'post',
    data: data
  })
}

// 添加活动
export function addGroupbook (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/addGroupBookingActivity',
    method: 'post',
    data: data
  })
}

// 添加活动
export function updateGroupbook (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/updateGroupBookingActivity',
    method: 'post',
    data: data
  })
}

// 获取活动内容
export function getGroupbook (id, data) {
  return request({
    url: ApiURL + '/groupBooking/admin/activity/detail/' + id,
    method: 'post',
    data: data
  })
}

// 获取活动详情列表
export function getDetailList (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/activity/detail/list/' + data.id + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize + '&status=' + data.status,
    method: 'post',
    data: data
  })
}

// 获取活动详情
export function getDetailInfo (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/activity/detail/list/info/' + data.orderId + '?pageNo=' + data.pageNo + '&pageSize=' + data.pageSize,
    method: 'post',
    data: data
  })
}

// 获取活动详情
export function mergeGroupbook (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/merge',
    method: 'post',
    data: data
  })
}

// 获取活动详情
export function refundGroupbook (data) {
  return request({
    url: ApiURL + '/groupBooking/admin/auto/refund?groupOrderId=' + data.groupOrderId,
    method: 'get'
  })
}
