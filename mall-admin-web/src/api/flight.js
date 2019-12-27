import request from '@/utils/request'
export function fetchList(data) {
  return request({
    url: '/product/flight/list',
    method: 'post',
    params: data
  })
}

export function createFlightgroup(data) {
  return request({
    url: '/product/flight/create',
    method: 'post',
    data: data
  })
}

export function updateFlightgroup(data) {
  return request({
    url: '/product/flight/update',
    method: 'post',
    data: data
  })
}

export function deleteFlightgroup(id) {
  return request({
    url: '/product/flight/delete/' + id,
    method: 'post'
  })
}

export function getFlightgroup(id) {
  return request({
    url: '/product/flight/details/' + id,
    method: 'post',
  })
}

// 机票新做接口4.23

//创建机票产品
export function createFlight(data) {
  return request({
    url: '/product/flight/create',
    method: 'post',
    data: data
  })
}

//更新机票产品
export function updateFlight(data) {
  return request({
    url: '/product/flight/update',
    method: 'post',
    data: data
  })
}

//获取机票详情
export function getFlight(id) {
  return request({
    url: '/product/flight/details/' + id,
    method: 'post',
  })
}

//获取机票详情
export function getFlightPrice(id) {
  return request({
    url: '/product/flight/price/list/' + id,
    method: 'get',
  })
}

//新增机票价格
export function createFlightPrice(data, id) {
  return request({
    url: '/product/flight/create/price/' + id,
    method: 'post',
    data: data
  })
}

//修改机票价格
export function updateFlightPrice(data) {
  return request({
    url: '/product/flight/update/price',
    method: 'post',
    data: data
  })
}