const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class Promise {
  constructor(executor) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      this.value = value
      if (this.status === PENDING) this.status = FULFILLED
      this.onFulfilledCallbacks.forEach(callback => callback())
    }
    let reject = reason => {
      this.reason = reason
      if (this.status === PENDING) this.status = REJECTED
      this.onRejectedCallbacks.forEach(callback => callback())
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
}
Promise.then = function (onFulfilled, onRejected) {
  let promise2 = new Promise((resolve, reject) => {
    if (this.status === FULFILLED) {
      queueMicrotask(() => {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(x, promise2, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    } else if (this.status === REJECTED) {
      queueMicrotask(() => {
        try {
          let x = onRejected(this.reason)
          resolvePromise(x, promise2, resolve, reject)
        } catch (err) {
          reject(err)
        }
      })
    } else if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(x, promise2, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })
      this.onRejectedCallbacks.push(() => {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(x, promise2, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      })
    }
  })
  return promise2
}
function resolvePromise (x, promise2, resolve, reject) {
  if (x === promise2) {
    return reject(new Error())
  }
  if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          resolvePromise(y, promise2, resolve, reject)
        }, err => {
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (err) {
      reject(err)
    }
  } else {
    resolve(x)
  }
}

// deferred 返回一个延迟对象
Promise.deferred = function () {
  let deferred = {}
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}

// catch
Promise.prototype.catch = function (err) {
  return this.then(null, err)
}

// finally 无论如何都会执行它,然后继续往后抛状态
Promise.prototype.finally = function (callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => { throw reason })
  )
}

// all 
Promise.all = function (promises) {
  function isPromise (value) {
    if (typeof value === 'function' || (typeof value === 'object' && value !== null)) return true
    return false
  }
  return new Promise((resolve, reject) => {
    let arr = [], num = 0
    for (let index = 0; index < promises.length; index++) {
      if (!isPromise(promises[index])) promises[index] = Promise.resolve(promises[index])
      promises[index].then(value => processData(index, value), reject)
    }
    function processData (index, value) {
      arr[index] = value
      if (++num === promises.length) resolve(arr)
    }
  })
}

// race
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let index = 0; index < promises.length; index++) {
      Promise.resolve(promises[index]).then(resolve, reject)
    }
  })
}
// any
Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    let reasonList = []
    for (let index = 0; index < promises.length; index++) {
      Promise.resolve(promises[index]).then(value => {
        resolve(value)
      }, reason => {
        reasonList.push(reason)
        if (reasonList.length === promises.length) {
          reject(new AggregateError(reasonList))
        }
      })
    }
  })
}
// allSettled
Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([])
    let list = [], num = 0
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(value => {
        processData({ status: 'fulfilled', value }, i)
      }, reason => {
        processData({ status: 'rejected', reason }, i)
      })
      function processData (value, index) {
        list[index] = value
        if (++num === promises.length) {
          resolve(list)
        }
      }
    }
  })
}
// resolve
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
// reject
Promise.reject = function (reason) {
  return new Promise((resolve, reject)=>{
    reject(reason)
  })
}
// try
Promise.try = function () {
  
}