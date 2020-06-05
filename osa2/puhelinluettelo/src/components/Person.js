import React from 'react'
import personservice from 'C:/Users/Santeri/fullstack/fullstackmooc/osa2/puhelinluettelo/src/services/personservice.js'
const Person = (props) => {

  const handleClick = (x) =>{
    if(window.confirm(`Delete ${x.name}`)){
      personservice
        .deletePerson(x.id)
        .then(response =>{
          props.setMessage(`deleted ${x.name} `)
          setTimeout(() => {
          props.setMessage(null)
        }, 5000)
        })
        .then(response => {
          personservice
            .getAll()
            .then(response => {
              props.setPersons(response)
            }).catch(error => {
              props.setMessage(`${x.name} has allready been removed.`)
            })
        })
    }

  }
  return (<div>
  {props.filteredlist.map((person) => {
    return ( <div key={person.id}><li >{person.name} {person.number}</li>
      <button onClick = {() => handleClick(person)} >delete</button></div>)
  })}</div>)
}
export default Person
