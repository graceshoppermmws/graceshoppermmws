import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import races from './races'
import raceCandidates from './raceCandidates'
import candidates from './candidates'

const reducer = combineReducers({user, races, raceCandidates, candidates})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './races'
export * from './raceCandidates'
export * from './candidates'
