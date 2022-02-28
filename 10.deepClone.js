let arr1 = [1, 1, 3, 2, 3, [1, 2]]
let arr2 = [4, 2, 6, 4]
// 交集
let fn1 = function (a1, a2) {
  let s1 = new Set(a1)
  let s2 = new Set(a2)
  return [...s1].filter(i => s2.has(i))
}
// 并集
let fn2 = function (a1, a2) {
  let s1 = new Set(a1)
  let s2 = new Set(a2)
  return [...s1].filter(i => !s2.has(i))
}

// console.log(fn1(arr1, arr2), fn2(arr1, arr2))



let fn3 = function (arr) {
  let newArr = []
  arr.forEach(i => {

  })
}

/**
 *     
 * 
 * 
 * 
 * 
 */
let deepClone = function (value, hash = new WeakMap()) {
  if (typeof value !== 'object') return value
  if (value == null) return value
  if (value instanceof Date) return value
  let instance = new value.constructor
  if (hash.has(value)) {
    return hash.get(value)
  }
  hash.set(value, instance)
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      instance[key] = deepClone(value[key], hash)
    }
  }
  return instance
}

let obj = {
  a: 123,
  b: {
    c: 234
  },
}
obj.d = obj
let aaaa = deepClone(obj)
obj.a = 222
console.log(aaaa, obj)

let deepClone = (value, hash = new WeakMap()) => {
  if (typeof value !== 'object') return value
  if (value === null) return value
  let instance = new value.constructor
  if(hash.has(value)){
    return hash.get(value)
  }
  hash.set(value,instance)
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      instance[key] = deepClone(value[key],hash)
    }
  }
  return instance
}