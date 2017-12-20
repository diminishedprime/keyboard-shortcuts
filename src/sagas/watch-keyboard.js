import {
  delay,
  eventChannel,
} from 'redux-saga'

import {
  takeEvery,
  put,
} from 'redux-saga/effects'

export const KEY_EVENT = 'key event was fired'
const actionForKey = (key, ctrlKey, altKey) => ({
  type: KEY_EVENT,
  key,
  ctrl: ctrlKey,
  alt: altKey,
})

const keyboard = (document) =>
  eventChannel((emitter) => {
    const oldEventHandler = document.onkeypress
    document.onkeypress = (e) => {
      emitter(e)
      if (oldEventHandler) {
        oldEventHandler(e)
      }
    }
    return () => document.onkeypress = oldEventHandler
  })

export default function* (document) {
  const chan = keyboard(document)
  yield takeEvery(chan, function* ({key, ctrlKey, altKey}) {
    yield put(actionForKey(key, ctrlKey, altKey))
  })
}
