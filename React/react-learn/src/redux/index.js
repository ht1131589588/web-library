export function createStore(reducer, initState, enhancer) {
  if (typeof initState === 'function' && typeof enhancer === 'function') {
    throw new TypeError('initState 不能是一个方法')
  }
  if (typeof initState === 'function') {
    enhancer = initState
    initState = null
  }
  let currentState = undefined
  const currentListeners = [] // 回调函数数组
  // 如果存在 enhancer 强化函数
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }

  function getState() {
    return currentState
  }

  function dispatch(action) {
    // 修改
    currentState = reducer(currentState, action)
    // 变更通知
    currentListeners.forEach(cb => cb())
    // console.log(currentListeners.length)
    return action
  }

  function subscribe(cb) {
    currentListeners.push(cb)
    return function() {
      const index = currentListeners.indexOf(cb)
      currentListeners.splice(index, 1)
    }
  }

  // 初始化状态
  dispatch({ type: '@ACTION/STARTINIT' })

  return {
    getState,
    dispatch,
    subscribe
  }
}

export function applyMiddleware(...middlewares) {
  // 返回 enhancer
  return createStore => (...args) => {
    // 这里args 为 reducer
    // 完成之前的createStore工作
    const store = createStore(...args)
    // 原来的dispatch
    let dispatch = store.dispatch

    // 强化dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(mw => mw(midApi))
    console.log(chain)
    // 强化后的dispatch，让它可以按顺序的执行中间件函数
    // dispatch =>
    dispatch = compose(...chain)(store.dispatch)
    // 返回全新的store，近更新强化过的dispatch函数
    return {
      ...store,
      dispatch
    }
  }
}

function compose(...funcs) {
  if (!funcs) {
    return args => args
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

export function bindActionCreators(actionCreators, dispatch) {
  // {add: () => ({type: 'add'})}
  // {add: (...args) => dispatch(creator(...args))}
  return Object.keys(actionCreators).reduce((obj, key) => {
    obj[key] = bindActionCreator(actionCreators[key], dispatch)
    return obj
  }, {})
}
