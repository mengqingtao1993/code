function sum(a,b){
  return a+b
}
function len(str){
  return str.length
}

let r = compose(len,sum)('abc','def')
//compose函数从右到左依次收敛执行

function compose(...args){
  // 返回一个函数
  return function(...values){
      // 最后一项函数的入参不固定，因此拿出来先处理
      let fn = args.pop()
      return args.reduceRight((prev,current)=>{
          return current(prev)
      },fn(...values))
  }
}
console.log(r)