/**
 * 蚂蚁金服 笔试题
 * 请实现 find 函数，使下列的代码调用正确
 */

var data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' }
]

var find = function (origin) {
  // your code are here...
  let obj = Object.create(Array.prototype)

  Object.setPrototypeOf(origin, obj);
  obj.where = function (target) {
    for (const key of target) {
      origin = origin.filter(i => {
        target[key].test(i[key])
      })
    }
    return origin
  }
  obj.orderBy = function (id, type) {
    if (type === 'desc') {
      origin.sort((a, b) => a.id - b.id)
    }
    return origin
  }
  return origin
}

// 查找 data 中，符合条件的数据，并进行排序
var result = find(data).where({
  'title': /\d$/
}).orderBy('userId', 'desc')

console.log(result) // [ { userId: 19, title: 'title2' }, { userId: 8, title: 'title1' } ]


/**
 * 蚂蚁金服 笔试题
 * 请实现 find 函数，使下列的代码调用正确
 */

// var data = [
//   { userId: 8, title: 'title1' },
//   { userId: 11, title: 'other' },
//   { userId: 15, title: null },
//   { userId: 19, title: 'title2' }
// ];

// var find = function (origin) {
//   // your code are here...

//   const arrayProto = Array.prototype;
//   const finderProto = Object.create(arrayProto);

//   finderProto.where = function where(rules) {
//     const nextOrigin = Object.keys(rules).reduce((acc, key) => {
//       return acc.filter(item => {
//         return rules[key].test(item[key]);
//       });
//     }, this);

//     return find(nextOrigin);
//   };

//   finderProto.orderBy = function orderBy(key, by) {
//     this.sort((a, b) => {
//       const aVal = a[key];
//       const bVal = b[key];

//       return by !== 'desc' ? aVal - bVal : bVal - aVal;
//     });

//     return this;
//   };

//   Object.setPrototypeOf(origin, finderProto);

//   return origin;
// };

// // 查找 data 中，符合条件的数据，并进行排序
// var result = find(data).where({
//   'title': /\d$/
// }).orderBy('userId', 'desc');

// console.log(result); // [ { userId: 19, title: 'title2' }, { userId: 8, title: 'title1' } ]