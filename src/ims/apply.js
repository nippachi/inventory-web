module.exports = (f, x) =>
  f instanceof Function ? f(x)
    : f instanceof Storage ? JSON.parse(f.getItem(x))
      : f instanceof Object ? f[x]
        : (() => {
          throw Error()
        })();
