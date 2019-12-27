import request from '@/utils/request'
const ApiURL = process.env.LOGIN_API

export function login(loginName, loginPassword) {
  return request({
    // url: '/admin/login',
    url: ApiURL + '/auth/login/admin?cloudUserId=8ce72a140c57480296cd48412677081f',
    method: 'post',
    data: {
      loginName,
      loginPassword
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/admin/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
