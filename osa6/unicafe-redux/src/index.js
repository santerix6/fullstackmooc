import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  const getAverage = () => {
    const pre = store.getState().bad*-1 + store.getState().good*1 + store.getState().ok*0
    const asd=  pre/(store.getState().bad+store.getState().ok+store.getState().good)
    console.log(asd);
    return asd
  }
  const getGoodPer= () => {
    const goodper = store.getState().good / (store.getState().bad+store.getState().ok+store.getState().good)
    return goodper
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <div>total {store.getState().bad+store.getState().ok+store.getState().good}</div>
      <div>average {getAverage()}</div>
      <div>percentage of goods {getGoodPer()} %</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
