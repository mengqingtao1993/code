// let EventEmitter = require('events')

let util = require('util')

class EventEmitter {
  constructor() {
    this._events = Object.create(null)
  }
  on (eventName, callback) {
    if (!this._events) this._events = Object.create(null)
    if (eventName !== 'newListener') {
      this.emit('newListener', eventName)
    }
    if (this._events[eventName]) {
      this._events[eventName].push(callback)
    } else {
      this._events[eventName] = [callback]
    }
  }
  once (eventName, callback) {
    let one = () => {
      callback()
      this.off(eventName, one)
    }
    one.l = callback
    this.on(eventName, one)
  }
  off (eventName, callback) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      return fn != callback && fn.l !== callback
    })
  }
  emit (eventName, ...args) {
    this._events[eventName].forEach(callback => callback(...args))
  }
}





// let E = new EventEmitter()
// function A () { }

// util.inherits(A, E)
let a = new EventEmitter()
a.on('newListener', type => {
  console.log(type)
  process.nextTick(() => {
    a.emit(type)
  })
})

let b = () => {
  console.log('aaa1')
}
a.once('aaa', b)
// a.off('aaa', b)
a.once('aaa', () => {
  console.log('aaa3')
})
a.once('aaa', () => {
  console.log('aaa2')
})
a.emit('aaa')

