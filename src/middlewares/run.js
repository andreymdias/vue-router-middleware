import { emitEvent } from './events'
import { getMiddlewareInfo } from './getInfo'


/**
* Run middleware logic.
*
* run middleware callbacks in sequence
* when in callback call method next(), init next middleware
* if params in next() method is equal false,
* block other middlewares and dispatch cancel event
* if last middleware dispatch next() native from vue-router
*/

const run = ({ to, from, next }) => {
  let middlewares = []

  const nextMiddleware = (nextIndex) => {
    resolve(nextIndex, middlewares[nextIndex])
  }

  const resolve = (index, { name, callback }) => {
    const nextTick = (routeParams) => {

      if(routeParams == false){
        emitEvent('onCancelMiddleware', [name, to, from, next])
      }

      const rulesToCallNext = ([
        typeof routeParams === 'object',
        typeof routeParams === 'string',
        routeParams === false,
        index == (middlewares.length -1)
      ])

      if( rulesToCallNext.some( value => value ) ) {
        next(routeParams)
      } else {
        nextMiddleware(index + 1)
      }
    }

    const { args } = getMiddlewareInfo(name, to)

    callback(args, to, from, nextTick)
  }

  return (store) => {
    middlewares = store
    nextMiddleware(0)
  }
}

export default run
