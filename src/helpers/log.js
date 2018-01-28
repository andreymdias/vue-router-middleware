export default (msg) => {
	console.warn(`[Vue Router Middleware] ${new Date().toISOString()}: ${msg}`)
}
