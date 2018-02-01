export default (path = '') => {
  return (routes = []) => {
    return routes.map(route => {
      route.path = `${path}/${route.path}`.replace(/\/\//g, '')
      return route
    })
  }
}
