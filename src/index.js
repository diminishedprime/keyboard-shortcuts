import {
  createStore as cs,
  applyMiddleware,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {
  rootSaga,
} from './sagas/index.js'
import {
  app,
} from './reducers.js'

export const createStore = (document) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = cs(
    app,
    applyMiddleware(sagaMiddleware)
  )
  const root = rootSaga(document)
  sagaMiddleware.run(root)
  return store
}
