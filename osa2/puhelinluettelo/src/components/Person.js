import React from 'react'

const Person = (props) => {
  return (<div>
  {props.filteredlist.map((person) => {
    return ( <li key={person.name}>{person.name} {person.number}</li>)
  })}</div>)
}
export default Person
