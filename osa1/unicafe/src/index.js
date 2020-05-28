import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const StatisticLine = (props) => {
  return <div>
    <p>{props.text} {props.value}</p>
  </div>
}
const Button = (props) => {
 return <button onClick={props.handleClick}>{props.text}</button>
}
const Statistics = (props) => {
  const getTotal = () =>{
    return props.good+props.neutral+props.bad
  }
  const getAverage = () =>{
    let pretotal = props.good*1 + props.bad*-1 + props.neutral*0
    return pretotal/getTotal()
  }
  const getPercentage = () =>{
    return props.good/getTotal() * 100
  }
  if(getTotal() ===0){
    return <p>No Feedback given</p>
  } else{
    return <div>
    
    <StatisticLine text='good' value={props.good}/>
    <StatisticLine text='neutral' value={props.neutral}/>
    <StatisticLine text='bad' value={props.bad}/>
    <StatisticLine text='all' value={getTotal()} />
    <StatisticLine text='average' value={getAverage()} />
    <p>positive {getPercentage()} %</p>
  </div>
  }
  
}
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
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text ='good'/>
      <Button handleClick={() => handleNeutralClick()} text ='neutral'/>
      <Button handleClick={() => handleBadClick()} text ='bad'/>
      <h1>statistics</h1>
      <Statistics good ={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
