import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/product/list',
    method: 'get',
    params: params
  })
}

export function fetchSimpleList(params) {
  return request({
    url: '/product/simpleList',
    method: 'get',
    params: params
  })
}

export function updateDeleteStatus(params) {
  return request({
    url: '/product/update/deleteStatus',
    method: 'post',
    params: params
  })
}

export function updateNewStatus(params) {
  return request({
    url: '/product/update/newStatus',
    method: 'post',
    params: params
  })
}

export function updateRecommendStatus(params) {
  return request({
    url: '/product/update/recommendStatus',
    method: 'post',
    params: params
  })
}

export function updatePublishStatus(params) {
  return request({
    url: '/product/update/publishStatus',
    method: 'post',
    params: params
  })
}

export function remoteProduct(params) {
  return request({
    url: '/esProduct/importAll',
    method: 'get',
  })
}

export function createProduct(data) {
  return request({
    url: '/product/create',
    method: 'post',
    data: data
  })
}

export function createTravels(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data: data
  })
}

export function updateProduct(id, data) {
  return request({
    url: '/product/update/' + id,
    method: 'post',
    data: data
  })
}

export function updateTravels(id, data) {
  return request({
    url: '/article/update/' + id,
    method: 'post',
    data: data
  })
}

export function getProduct(id) {
  return request({
    url: '/product/updateInfo/' + id,
    method: 'get',
  })
}

export function getTravels(id) {
  return request({
    url: '/article/updateInfo/' + id,
    method: 'get'
  })
}
// 酒店导入excel
export function importHotelExcel(file) {
  return request({
    url: '/excel/hotel',
    method: 'post',
    data: file
  })
}

// 保存酒店房型报价信息
export function saveHotelExcel(data) {
  return request({
    url: '/product/hotel/create',
    method: 'post',
    data: data
  })
}
// 查询酒店房型报价信息
export function getHotelData(id) {
  return request({
    url: '/product/hotel/list/' + id,
    method: 'get'
  })
}

// 更新酒店房型信息
export function updateHotelData(data) {
  return request({
    url: '/product/hotel/update',
    method: 'post',
    data: data
  })
}

// 酒店房型批量上下架
export function batchOnOffLineHotel(data) {
  return request({
    url: '/product/hotel/update/status/' + data.productId + '/' + data.status,
    method: 'post',
  })
}

// 获取商品可关联的其他商品
export function getRelationProducts() {
  return request({
    url: '/product/relation/list',
    method: 'get',
  })
}

// 获取产品已关联的其他产品
export function getRelationProductsById(id, params) {
  return request({
    url: '/product/relation/product/list/' + id,
    method: 'get',
    params: params
  })
}

// 批量同步到活动产品列表
export function productSync(data) {
  return request({
    url: '/product/sync',
    method: 'post',
    data: data
  })
}
