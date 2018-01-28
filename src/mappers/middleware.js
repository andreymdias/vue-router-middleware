export default (options, arr) => {

	const pushMeta = (option) => {
		return arr.map((route) => {
			if(!route.meta) {
				route.meta = {
					middlewares: []
				}
			}

			if(!route.meta.middlewares) {
				route.meta.middlewares = []
			}

			if(route.meta.middlewares.indexOf(option) == -1)
				route.meta.middlewares.push(option)

			return route
		})
	}

  if(!options){
    return arr
  }
	if (Array.isArray(options)) {
    let routes = arr

    for(let i = 0, len = options.length; i < len; i++) {
      routes = pushMeta(options[i])
    }

    return routes
  } else {
    return pushMeta(options)
  }
}
