import watchKeyboard from './watch-keyboard.js'

import {
  all,
} from 'redux-saga/effects'

export const rootSaga = (document) =>
  function* () {
    yield all([
      watchKeyboard(document),
    ])
  }
