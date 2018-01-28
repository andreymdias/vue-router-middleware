import test from 'ava'

import { shallow, createLocalVue } from '@vue/test-utils'

import VueRouterMiddleware from '../src'

import router from './helpers/router'
import middlewares from './helpers/middlewares'

const localVue = createLocalVue()

localVue.use(router)
localVue.use(VueRouterMiddleware, { middlewares, router })

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

test('test install dont break vue render', t => {
  t.true( t.context.app.contains('main') )
})

test('test next route dispatch middleware', t => {
  router.push({'name': 'dashboard'})
  t.deepEqual(t.context.app.vm.$route.name, 'dashboard')
})

test('test next route dispatch middleware', t => {
  router.push({'name': 'settings'})
  t.notDeepEqual(t.context.app.vm.$route.name, 'settings')
})
