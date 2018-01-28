import Vue from 'vue'
import VueRouter from 'vue-router'
import { middleware } from '../../src'

const Component = {
  render(h) {
    return h('div', this.$route.name)
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    Component
  },
  ...middleware('require-auth', [
    {
      path: '/dashboard',
      name: 'dashboard',
      Component
    },
    ...middleware({'guards': 'super-user'}, [
      {
        path: '/settings',
        name: 'settings',
        Component,

        children: [
          {
            name: 'settings.accounts',
            path: '/accounts',
            Component
          }
        ]
      }
    ])
  ])
]

const getRoute = (name) => {
  return routes.find(route => {
    return (name == route.name ) || route.children && route.children.find(child => {
      return (name == child.name )
    })
  })
}

Vue.use(VueRouter)

export { routes, getRoute }
export default new VueRouter({ routes })
