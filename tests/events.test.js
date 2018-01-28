import test from 'ava'

import { shallow, createLocalVue } from '@vue/test-utils'

import VueRouterMiddleware from '../src'

import router from './helpers/router'
import middlewares from './helpers/middlewares'

const localVue = createLocalVue()

localVue.use(router)
localVue.use(VueRouterMiddleware, {
  middlewares,
  router,
  events: {
    onCancelMiddleware(middleware, to, from, next) {
      next({ name: 'dashboard' })
    }
  }
})

test.beforeEach((t) => {
  const Component = {
    render(h) {
      return h('main', h('router-view'))
    }
  }

  t.context.app = shallow(Component, {
    localVue,
    router
  })
})

test('test cancellMiddleware redirect to other route', t => {
  router.push({ name: 'settings' })
  t.deepEqual(t.context.app.vm.$route.name, 'dashboard')
})
