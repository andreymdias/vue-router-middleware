import log from './helpers/log'
import camelToDash from './helpers/camelToDash'

import initMiddleware from './core/initMiddleware'
import createMiddleware from './core/createMiddleware'

import events from './core/events'

import middleware from './mappers/middleware'

export default (router, options = {}) => {
	if(!router)
		return log('error router')

  if(options.middlewares)
    for(let keyName in options.middlewares) {
      createMiddleware(camelToDash(keyName), options.middlewares[keyName])
    }

  if(options.onCancel)
    events.onCancel.push(options.onCancel)

	router.beforeEach(initMiddleware)
}

export { createMiddleware, middleware }
