import test from 'tape'
import { createStore } from '../src/index.js'
import { KEY_EVENT } from '../src/sagas/watch-keyboard.js'

test('No existing document.onkeypress', (t) => {
  t.plan(1)
  const document = {}
  const store = createStore(document)
  document.onkeypress({key: 'h'})
  document.onkeypress({key: 'e'})
  document.onkeypress({key: 'l'})
  document.onkeypress({key: 'l'})
  document.onkeypress({key: 'o'})
  const expected = 'hello'
  const actual = store
    .getState()
    .keys
    .filter((a) => a.type === KEY_EVENT)
    .map((a) => a.key)
    .join('')
  t.same(actual, expected, 'Hello was typed out')
})

test('With existing document.onkeypress', (t) => {
  t.plan(2)
  const document = {}
  document.onkeypress = (e) => t.same(e.key, 'h')
  const store = createStore(document)
  document.onkeypress({key: 'h'})
  const expected = 'h'
  const actual = store
    .getState()
    .keys
    .filter((a) => a.type === KEY_EVENT)
    .map((a) => a.key)
    .join('')
  t.same(actual, expected, 'Hello was typed out')
})
