import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
const Header = (props) =>{
  return (
    <div>
    <h1>{props.course}</h1>
  </div>
  )
}
const Content = (props) =>{
  return (
    <div>
      <Part part={props.parts[0]}  />
      <Part part={props.parts[1]}  />
      <Part part={props.parts[2]}  />
    </div>
  )
}
const Total = (props) =>{
  let total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}
const Part = (props) =>{
  return(
    <p>{props.part.name} {props.part.exercises}</p>
  )
  }
ReactDOM.render(
  <App />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
