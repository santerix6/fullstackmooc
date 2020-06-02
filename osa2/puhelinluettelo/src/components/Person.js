import React from 'react'
import personservice from 'C:/Users/Santeri/fullstack/fullstackmooc/osa2/puhelinluettelo/src/services/personservice.js'
const Person = (props) => {

  const handleClick = (x) =>{
    if(window.confirm(`Delete ${x.name}`)){
      personservice
        .deletePerson(x.id)
        .then(response => {
          personservice
            .getAll()
            .then(response => {
              props.setPersons(response)
            })
        })
    }

  }
  return (<div>
  {props.filteredlist.map((person) => {
    return ( <div><li key={person.name}>{person.name} {person.number}</li>
      <button onClick = {() => handleClick(person)} >delete</button></div>)
  })}</div>)
}
export default Person
