import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = (props)=>{
  return <div><button onClick={props.handleclick}>{props.text}</button></div>
}
const App = (props) => {
  const [points, setPoints] = useState([0,0,0,0,0,0])
  const [selected, setSelected] = useState(0)
  const HandleClick = () => {
    let arvo = Math.floor(Math.random() * anecdotes.length)
    setSelected(arvo)
  }
  const handleVote = () =>{
    let copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  const mostVotes = () =>{
    var max_value = points[0]
    var max_index = 0
    for(var x = 1;x < points.length;x++){
      if(points[x]>max_value){
        max_index = x
        max_value = points[x]
      }
    }
    return max_index
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleclick={() => HandleClick()} text='next anecdote'/>
      <Button handleclick={()=>handleVote()} text='vote'/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
      <p>has {points[mostVotes()]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
