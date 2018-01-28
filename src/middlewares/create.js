import { push } from './store'

/**
* stores callback and name to dispatch on route change
*/

const create = (name, callback) => {

  push({ name, callback })

}

export default create
