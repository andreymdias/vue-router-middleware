import test from 'ava'
import { shallow, createLocalVue } from '@vue/test-utils'

import VueRouterMiddleware, { createMiddleware } from '../src'
import { search } from '../src/middlewares/store'

import router from './helpers/router'
import middlewares from './helpers/middlewares'

const localVue = createLocalVue()

localVue.use(router)
localVue.use(VueRouterMiddleware, { router })

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


createMiddleware('require-auth', middlewares.requireAuth)
createMiddleware('guards', middlewares.guards)

test('test createMiddleware method and store in lib', t => {
  const {name} = search('require-auth')
  t.deepEqual(name, 'require-auth')
})

test('test change route pass middleware', t => {
  router.push({'name': 'dashboard'})
  t.deepEqual(t.context.app.vm.$route.name, 'dashboard')
})

test('test change route no pass middleware', t => {
  router.push({'name': 'settings'})
  t.notDeepEqual(t.context.app.vm.$route.name, 'settings')
})
