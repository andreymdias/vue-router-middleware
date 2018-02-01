export default (...fns) =>
  fns.reduce((fn, nextFn) =>
    (...args) => fn(nextFn(...args)
  )
)
