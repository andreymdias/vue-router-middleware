export default (prefix = '') => {
  return function walk(routes = []) {
    return routes.map(route => {
      if(route.name)
        route.name = `${prefix}${route.name}`

      if(route.children)
        route.children = walk(route.children)

      return route
    })
  }
}
