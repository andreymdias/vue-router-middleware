import test from 'ava'

import { getRoute } from './helpers/router'

test('check home is not guarded', t => {
  t.deepEqual(getRoute('home').meta, undefined)
})

test('check dashboard is guarded', t => {
  t.true(Array.isArray(getRoute('dashboard').meta.middlewares))
})

test('check dashboard has middleware requireAuth', t => {
  t.true(getRoute('dashboard').meta.middlewares.indexOf('require-auth') !== -1)
})

test('test settings is inherit middleware', t => {
  t.true(getRoute('settings').meta.middlewares.length === 2)
})

test('test settings pass params in middleware', t => {
  const middleware = getRoute('settings').meta.middlewares.find(val => typeof val === "object")
  t.deepEqual(middleware, {'guards': 'super-user'})
})
