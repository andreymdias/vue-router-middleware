/**
* Normalize diferent ways to find middleware in route.meta
*/

const normalizeArgs = (val, name) => {
  if(val.hasOwnProperty(name))
    return {name, args: val[name]}
  else if(val == name)
    return {name, args: null}
  else
    return false
}

/**
* Get name and arguments from route.meta middlewares
*/

const getInfo = ({ name, route }) => {
  const { middlewares } = route.meta

  return (middlewares || [])
    .map(val => normalizeArgs(val, name))
    .find(val => val.name === name)
}

/**
* Check if is match attribute in route
*/

const isMatched = (route) => {
  return (route.matched)
}

/**
* Check if has middleware active in route
*/

const matchMiddleware = (name, route) => {
  if(isMatched(route)) {
    return route.matched
      .some(record => {
        return getInfo({ name, route: record })
      })
  }

  return !!(getInfo({ name, route }))
}

/**
* get all middlewares marched info
*/

const getMiddlewareInfo = (name, route) => {
  if(isMatched(route)) {
    return route.matched
      .map(record => getInfo({ name, route: record }) )
      .filter(middleware => middleware !== undefined)
      .find(middleware => middleware.name === name)
  }

  return getInfo({ name, route })
}

export default getInfo

export { isMatched, matchMiddleware, getMiddlewareInfo }
