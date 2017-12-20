import R from 'ramda'

export const app = (state={}, action) =>
  R.over(R.lensPath(['keys']), R.append(action), state)
