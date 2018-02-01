import camelToDash from '../helpers/camelToDash'


/**
* Add middlewares meta in route
*/

const addMiddlewareMeta = (route, middleware) => {
	const camelMiddleware = camelToDash(middleware)

	if(!route.meta)
		route.meta = { middlewares: [] }

	if(!route.meta.middlewares)
		route.meta.middlewares = []

	if(route.meta.middlewares.indexOf(camelMiddleware) == -1)
		route.meta.middlewares.push(camelMiddleware)

	return route
}

export default (options) => {

	return (routes = []) => {
		if(!options)
			return routes

		if(Array.isArray(options))
			return options.reduce((reducedRoute, option) => {
				return (reducedRoute).map(
					route => addMiddlewareMeta(route, option)
				)
			}, [addMiddlewareMeta(routes[0], options[0])])
		else
			return routes.map(route => addMiddlewareMeta(route, options))
	}
}
