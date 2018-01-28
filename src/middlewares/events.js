let events = {
  onCancelMiddleware: []
}

/**
* get listeners by name
*/

const getListeners = name => {
  return events[name]
}

/**
* add a store events
*/

const addListener = (name, callback) => {
  getListeners(name).push({ callback })
}


/**
* add multiples listeners
*/


const addMultipleListeners = (listeners) => {
  for(let eventName in listeners) {
    if( listeners.hasOwnProperty(eventName) )
      addListener(eventName, listeners[eventName])
  }
}


/**
* remove listener from store of events
*/

const removeListener = (name, callback) => {
  events = getListeners(name)
    .filter(
      (evStore) => evStore.callback.toString() !== callback.toString()
    )
}

/**
* dispatch function callback
*/

const emitEvent = (name, args = []) => {
  getListeners(name)
    .forEach(ev => ev.callback.apply(null, args))
}


export { addListener, removeListener, emitEvent, addMultipleListeners }
