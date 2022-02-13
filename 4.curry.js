/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry (fn) {
  // your code here
  return function curryInner (...args) {
    if (args.length >= fn.length) return fn(...args)
    return (...args2) => curryInner(...args, ...args2)
  }
}


/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry (fn) {
  // your code here
  return function curryInner (...args) {
    if (args.length >= fn.length && !args.includes(curry.placeholder)) return fn(...args)
    return (...args2) => curryInner(...args.map(p => p === curry.placeholder ? args2.shift() : p), ...args2)
  }
}

curry.placeholder = Symbol()


