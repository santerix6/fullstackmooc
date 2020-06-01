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
    console.log(newPerson)
    let n = persons.some((person) => {
      return person['name']=== newPerson.name
    })
    console.log(n)
    if(n === true){
      alert(`${newPerson.name} already added to phonebook`)
    } else{
      setPersons(persons.concat(newPerson))
      setNewName('')
    }

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
        return <Person key={person.name} person={person}/>
      })}
      </ul>
    </div>
  )
}
const Person = (props) => {
  return <li>{props.person.name}</li>
}

export default App
