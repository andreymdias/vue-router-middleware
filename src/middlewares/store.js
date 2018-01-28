/**
* middlewares sleeps here, wait for route change
*/

let store = []

/**
* add function to store of middlewares
*/

const push = ({ name, callback }) => {
  store = [
    ...store,
    { name, callback }
  ]
}

/**
* remove middleware by name
*/

const remove = (middlewareName) => {
  store = store.filter(({ name }) => {
    return name !== middlewareName
  })
}

/**
* find middleware by name
*/

const search = (middlewareName) => {
  return [...store].find(({ name }) => {
    return name === middlewareName
  })
}

/**
* return middleware store
*/

const all = () => {
  return [...store]
}

export { push, remove, search, all }
