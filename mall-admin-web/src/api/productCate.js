import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/productCategory/list/'+parentId,
    method:'get',
    params:params
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/productCategory/delete/'+id,
    method:'post'
  })
}

export function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/productCategory/update/'+id,
    method:'post',
    data:data
  })
}

export function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    url:'/productCategory/list/withChildren',
    method:'get'
  })
}

//普通商品类目 start ---
export function listProductCateCommon(params) {
  return request({
    url:'/common/productCategory/getChild',
    method:'get',
    params:params?params:null
  })
}

export function createProductCateCommon(data) {
  return request({
    url:'/common/productCategory/create',
    method:'post',
    data:data
  })
}

export function deleteProductCateCommon(id) {
  return request({
    url:'/common/productCategory/delete/'+id,
    method:'post'
  })
}

export function getProductCateCommon(id) {
  return request({
    url:'/common/productCategory/detail/'+id,
    method:'get',
  })
}

export function updateProductCateCommon(id, data) {
  return request({
    url:'/common/productCategory/update/'+id,
    method:'post',
    data:data
  })
}

//普通商品类目 end ---