import init from './middlewares/init'
import { addMultipleListeners } from './middlewares/events'
import createMiddleware from './middlewares/create'

import camelToDash from './helpers/camelToDash'
import log from './helpers/log'

const install = (Vue, { router, middlewares, events }) => {
  if(router === undefined)
    log('Unvalid router instance')

  /**
  * create middleware passed by arguments
  */

  if(middlewares !== undefined)
    for(let keyName in middlewares) {
      createMiddleware(
        camelToDash(keyName),
        middlewares[keyName]
      )
    }


  /**
  * Set Events
  */

  addMultipleListeners(events)

  /**
  * integrate logic with vue-router
  */


  router.beforeEach(init)
}

export default install
