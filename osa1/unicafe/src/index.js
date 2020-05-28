import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Display = (props) => (
  <div>
    <p>{props.text} {props.value}</p>
  </div>
)
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () =>{
    setGood(good +1)
  }
  const handleNeutralClick = () =>{
    setNeutral(neutral +1)
  }
  const handleBadClick = () =>{
    setBad(bad +1)
  }
  const getTotal = () =>{
    return good+neutral+bad
  }
  const getAverage = () =>{
    let pretotal = good*1 + bad*-1 + neutral*0
    return pretotal/getTotal()
  }
  const getPercentage = () =>{
    return good/getTotal() * 100
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text ='good'/>
      <Button handleClick={() => handleNeutralClick()} text ='neutral'/>
      <Button handleClick={() => handleBadClick()} text ='bad'/>
      <h1>statistics</h1>
      <Display text='good' value={good}/>
      <Display text='neutral' value={neutral}/>
      <Display text='bad' value={bad}/>
      <Display text='all' value={ getTotal()} />
      <Display text='average' value={getAverage() } />
      <p>positive {getPercentage()} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
