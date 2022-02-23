function debounce (func, time = 0) {
  if (typeof func !== 'function') {
    throw new TypeError('Expect a function')
  }
  let timer
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
      clearTimeout(timer)
    }, time)
  }
}

// 时间戳版本
function throttle (func, wait) {
  let oldTime = 0
  return (...args) => {
    let newTime = new Date().getTime()
    if (newTime - oldTime > wait) {
      func(...args)
      oldTime = newTime
    }
  }
}

// 定时器版
function throttle (func, wait) {
  let timer = null
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        func(...args)
      }, wait)
    }
  }
}