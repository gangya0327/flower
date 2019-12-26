import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url: '/subject/listAll',
    method: 'get',
  })
}

export function fetchList(params) {
  return request({
    url: '/subject/list',
    method: 'get',
    params: params
  })
}

export function createSubject(data) {
  return request({
    url: '/subject/create',
    method: 'post',
    data: data
  })
}

export function updateSubject(data) {
  return request({
    url: '/subject/update',
    method: 'post',
    data: data
  })
}

export function deleteSubject(id) {
  return request({
    url: '/subject/delete/' + id,
    method: 'post',
  })
}