const PENDING = 0
const FULFILLED = 1
const REJECTED = 2

class Promise {
  constructor (fn) {
    this._state = this.PENDING
    this._data = undefined

    this._onFulfilledCallbacks = []
    this._onRejectedCallbacks = []
    run(this, fn)
  }

  then (onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function () {}
    }
    if (typeof onRejected !== 'function') {
      onRejected = function () {}
    }
    let promise2
    if (this._state === FULFILLED) {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this._data)
            if (x instanceof Promise) {
              return x.then(resolve, reject)
            }else {
              resolve(x)
            }
          } catch(e) {
            reject(e)
          }
        })
      })
    }	else if (this._state === REJECTED) {
      promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this._data)
            if (x instanceof Promise) {
              return x.then(resolve, reject)
            }else {
              resolve(x)
            }
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
            if (x instanceof Promise) {
              return x.then(resolve, reject)
            }
          } catch(e) {
            reject(e)
          }
        })
        this._onRejectedCallbacks.push(reason => {
          try {
            const x = onRejected(data)
            if (x instanceof Promise) {
              return x.then(resolve, reject)
            }
          } catch(e) {
            reject(e)
          }
        })
      })
    }
    return promise2
  }
  catch (onRejected) {
    return this.then(undefined , onRejected)
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
