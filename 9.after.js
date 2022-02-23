let after = function (num, fn) {
  return () => {
    if (--num === 0) {
      return fn()
    }
  }
}
let newAfter = after(3, () => {
  console.log('执行了三次')
})
newAfter()
newAfter()
newAfter()