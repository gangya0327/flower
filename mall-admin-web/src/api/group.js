import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url: '/pmsProductGroup/list',
    method: 'get',
    params: params
  })
}

export function fetchProductList(params) {
  return request({
    url: '/pmsProductGroup/product/list',
    method: 'get',
    params: params
  })
}

export function getGroup(params) {
  return request({
    url: '/pmsProductGroup/detail/' + params,
    method: 'get',
    params: params
  })
}

export function createGroup(data) {
  return request({
    url: '/pmsProductGroup/create',
    method: 'post',
    data: data
  })
}

export function updateGroup(data) {
  return request({
    url: '/pmsProductGroup/update',
    method: 'post',
    data: data
  })
}

export function deleteGroup(id) {
  return request({
    url: '/pmsProductGroup/delete/' + id,
    method: 'post',
    data: id
  })
}

export function deleteGroups(ids) {
  return request({
    url: '/pmsProductGroup/delete/group?ids=' + ids,
    method: 'post',
  })
}