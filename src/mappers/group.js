import middlewareMapper from './middleware'
import nameMapper from './name'
import prefixMapper from './prefix'

import compose from '../helpers/compose'

export default ({middlewares, name, prefix}) => {
  return (routes = []) => {

    const mappers = [
      {fn: middlewareMapper, arg: middlewares},
      {fn: nameMapper, arg: name},
      {fn: prefixMapper, arg: prefix}
    ]

    return compose.apply(null, [
      ...mappers
        .filter(({fn, arg}) => (fn && arg))
        .map(({fn, arg}) => fn(arg)),
      () => routes
    ])()
  }
}
