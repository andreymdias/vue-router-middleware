import { all } from './store'
import { matchMiddleware } from './getInfo'
import run from './run'

/**
* Get all middlewares in store
* check contains in route
* and run middleware logic
*/

const init = (to, from, next) => {

  const middlewares = all().filter(({ name }) => {
    return matchMiddleware(name, to)
  })

  if(middlewares.length)
    run({to, from, next})(middlewares)
  else
    next()
}

export default init
