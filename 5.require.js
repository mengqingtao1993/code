let fs = require('fs')
let path = require('path')
let vm = require('vm')
class Module {
  constructor(id) {
    this.id = id
    this.exports = {}
  }
  static cache = {}
  static resolveFileName (filename) {
    let absPath = path.resolve(__dirname, filename)
    let flag = fs.existsSync(absPath)
    let current = absPath
    if (!flag) {
      let keys = Object.keys(Module.extensions)
      for (let i = 0; i < keys.length; i++) {
        current = absPath + keys[i]
        let flag2 = fs.existsSync(current)
        if (flag2) {
          break
        } else {
          current = null
        }
      }
    }
    if (!current) {
      throw new Error('没有该文件')
    }
    return current
  }
  static wrapper = [
    '(function(module,exports,require,__filname,__dirname){',
    '})'
  ]
  static extensions = {
    '.js' (module) {
      let script = fs.readFileSync(module.id)
      let fnStr = Module.wrapper[0] + script + Module.wrapper[1]
      let fn = vm.runInThisContext(fnStr)
      fn.call(module.exports, module, module.exports, req,module.id, path.dirname(module.id))
    },
    '.json' (module) {
      let script = fs.readFileSync(module.id, 'utf8')
      module.exports = JSON.parse(script)
    }
  }
  load () {
    let ext = path.extname(this.id)
    Module.extensions[ext](this)
  }
}


function req (filename) {
  let current = Module.resolveFileName(filename)
  if (Module.cache[current]) {
    return Module.cache[current].exports
  }
  let module = new Module(current)
  Module.cache[current] = module
  module.load()
  return module.exports
}
