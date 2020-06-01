import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')
  const addnewName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    let newPerson = {
      name : newName
    }
    setPersons(persons.concat(newPerson))
  }
  const handlenameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addnewName}>
        <div>
          name: <input value={newName} onChange={handlenameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {persons.map((person, i) => {
        return <Person key={i} person={person}/>
      })}
      </ul>
    </div>
  )
}
const Person = (props) => {
  return <li>{props.person.name}</li>
}

export default App
