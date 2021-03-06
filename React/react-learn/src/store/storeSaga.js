import { user } from './user'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSageMiddleware from 'redux-saga'
import logger from 'redux-logger'
import mySaga from './sagas'
// 1.创建saga中间件并注册
const sagaMiddleware = createSageMiddleware()

const store = createStore(
  combineReducers({
    user
  }),
  applyMiddleware(logger, sagaMiddleware)
)
// 2.中间件运行saga
sagaMiddleware.run(mySaga)
export default store
