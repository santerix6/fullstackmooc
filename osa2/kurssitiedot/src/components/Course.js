import React from 'react'

const Course = (props) => {
  return  (<div>
  <Header course={props.course} />
  <Content parts={props.course.parts} /></div>
  )
}
const Header = (props) =>{
    console.log(props.course.name)
    return (
      <div>
      <h1>{props.course.name}</h1>
    </div>
    )
  }
  const Content = (props) =>{
    console.log(props.parts[0])
    return (
      <div>
          <ul>
              {props.parts.map(part => 
                  <li key={part.id}><Part part={part}/></li>
              )}
          </ul>
      </div>
    )
  }
const Part = (props) =>{
    return(
        <> {props.part.name} {props.part.exercises}</>
    )
}
  
export default Course