const Auth = {
  isAuthenticated() {
    return true
  }
}

export default {
  requireAuth(args, to, from, next) {
    next(Auth.isAuthenticated())
  },
  guards(args, to, from, next) {
    next(false)
  }
}
