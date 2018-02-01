<h1 align=center>VUE ROUTER MIDDLEWARE</h1>
<p align=center>🔥 Get more power to Vue Router with middlewares. 🔥</p>

------
## Instalation

with [npm](https://npmjs.com)
```bash
  npm install --save vue-router-middleware
```

with [yarn](https://yarnpkg.com/)
```bash
  yarn add vue-router-middleware
```


## Get Started

Install it as a [Vue Plugin](https://vuejs.org/v2/guide/plugins.html#Using-a-Plugin) like this.

```javascript
  const Vue from 'vue'
  const VueRouter from 'vue-router'

  const VueRouterMiddleware from 'vue-router-middleware'

  const routes = [
    // ...
    // Create your route schema here.
  ]

  const router = new VueRouter({ routes })
  Vue.use(VueRouter)

  // Install it by pass your router instance to be an option argument.
  Vue.use(VueRouterMiddleware, { router })

  new Vue({ router })

```

And create middleware

```javascript
  const { createMiddleware } from 'vue-router-middleware'

  const FakeAuth = {
    isAuthenticated() {
      return true
    }
  }

  // Pass middleware name and callback function
  createMiddleware('require-auth', (args, to, from, next) => {

    if(FakeAuth.isAuthenticated())
      // ok, all is fine. go to next route
      next()
    else
      // hum... not's fine, cancel the middleware
      next(false)

  })

```

with Vue.use

```javaScript

  Vue.use(VueRouterMiddleware, {
    router,
    middlewares: {
      // Convert to camelcase to dash string ex. requireAuth saves require-auth
      requireAuth(params, to, from, next) {
        // Logic here
      },
      checkPermission(params, to, from, next) {
        // Get params
        next( params.includes('super-user') )
      }
    }
  })

```

Set middleware in routes
Use [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) with ```middleware()``` to make more simple and pretty

```javascript
  import VueRouter from 'vue-router'
  import VueRouterMiddleware, { middleware } from 'vue-router-middleware'

  const routes = [

    ...middleware('require-auth', [

      {
        // Active middleware ['require-auth']
        component: Dashboard
        path: '/dashboard',
        name: 'dashboard'
      },

      // Pass parameters to middleware
      ...middleware({ 'check-permission': ['super-user'] }, [
        {
          // Active middlewares in sequence ['require-auth', 'check-permission']
          component: Settings
          path: '/settings',
          name: 'settings',

          children: [
            // Active middlewares in sequence ['require-auth', 'check-permission']
            // Childrens inherits middleware from parent route
            {
              component: SettingsAccount
              path: '/settings/account',
              name: 'settings.account'
            }
          ]
        }
      ])

    ]),
    {
      // Route without middlewares
      path: '/login',
      name: 'login',
      component: LoginComponent
    }
  ]
  Vue.use(VueRouter)

  const router = new VueRouter({ routes })

  Vue.use(VueRouterMiddleware, { router })
```

Capture on middleware is canceled

```javascript
  const VueRouter from 'vue-router'
  const VueRouterMiddleware from 'vue-router-middleware'

  const router = new VueRouter({ routes })

  Vue.use(VueRouter)
  Vue.use(VueRouterMiddleware, {
    router,
    events: {
      onCancelMiddleware(middlewareName, to, from, next) {
        console.log(`next(false) has called in ${middlewareName}`)
      }
    }
  })
```

Simple, a right?
You need more ?
~~[Full documentation here](https://andreymdias.github.io/vue-router-middleware)~~

## License

[MIT](http://opensource.org/licenses/MIT)
Copyright (c) Andrey Dias
