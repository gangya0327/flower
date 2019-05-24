const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

class Promise {
  constructor (fn) {
    this._state = PENDING
    this._data = undefined

    this._onFulfilledCallbacks = []
    this._onRejectedCallbacks = []
    run(this, fn)
  }

  then (onFulfilled, onRejected) {
    //处理穿透问题
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (data) { return data}
    }
    if (typeof onRejected !== 'function') {
      onRejected = function (reason) { throw reason}
    }
    let promise2
    if (this._state === FULFILLED) {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this._data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
      // 基于H5的“一块伴旅行”系统的设计与实现
      // 楼学庆，干红华，姚宇明
      // 该同学从以前工作的公司中选取实际项目内容作为论文题目，对H5技术及应用有较深入了解，目标明确内容丰富，同意开题
      // 通过，达到软件工程硕士论文开题要求，同意开题
    }	else if (this._state === REJECTED) {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this._data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
    }else if (this._state === PENDING) {
      promise2 = new Promise((resolve, reject) => {
        this._onFulfilledCallbacks.push(data => {
          try {
            const x = onFulfilled(data)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
        this._onRejectedCallbacks.push(reason => {
          try {
            const x = onRejected(reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
    }
    return promise2
  }
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
}

function resolvePromise (promise2, x, resolve, reject) {
  if (x instanceof Promise) {
    return x.then(resolve, reject)
  }else {
    resolve(x)
  }
}

function run (promise, fn) {
  try {
    fn(
      data => {
        resolve(promise, data)
      },
      reason => {
        reject(promise, reason)
      }
    )
  } catch(e) {
    reject(promise, e)
  }
}

function resolve (promise, data) {
  // 处理resolve的值是Promise本身
  if (data instanceof Promise) {
    return data.then(
      d => {
        resolve(promise, d)},
      r => {
        reject(promise, r)}
    )
  }

  if (promise._state !== PENDING) {
    return
  }

  setTimeout(() => {
    promise._state = FULFILLED
    promise._data = data

    for (let callback of promise._onFulfilledCallbacks) {
      callback(data)
    }
  })
}
function reject (promise, reason) {
  if (promise._state !== PENDING) {
    return
  }

  setTimeout(() => {
    promise._state = REJECTED
    promise._data = reason

    for (let callback of promise._onRejectedCallbacks) {
      callback(reason)
    }
  })
}

module.exports = Promise
