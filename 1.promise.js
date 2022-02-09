class Promise {

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
Promise.prototype.finally = function(){
  
}