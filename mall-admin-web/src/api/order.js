import request from '@/utils/request'
const ApiURL = process.env.Activity_API

export function fetchList(params) {
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/order/delete',
    method:'post',
    params:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/order/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/order/update/note',
    method:'post',
    params:params
  })
}

export function payMoney(data) {
  return request({
    url:'/order/confirm/payment',
    method:'post',
    data:data
  })
}

export function finishStuff(data) {
  return request({
    url:'/order/handle/finish',
    method:'post',
    data:data
  })
}

export function agreementSign(data) {
  return request({
    url:'/order/sign/agreement',
    method:'post',
    data:data
  })
}

export function completeOrder(data) {
  return request({
    url:'/order/complete',
    method:'post',
    data:data
  })
}

export function refundOrder(data) {
  return request({
    url:'/order/refund/price',
    method:'post',
    data:data
  })
}

export function closeThisOrder(data) {
  return request({
    url:'/order/close',
    method:'post',
    data:data
  })
}

//根据joinId获取活动id
export function getActivityIdByJoinId(activityId) {
  return request({
    url: ApiURL + '/getActivityId/' + activityId,
    method:'get',
  })
}
