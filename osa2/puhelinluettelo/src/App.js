import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personservice from './services/personservice.js'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    personservice
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  const addnewInput = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    let newPerson = {
      name : newName,
      number : newNumber
    }
    console.log(newPerson)
    let n = persons.some((person) => {
      return person['name']=== newPerson.name
    })
    console.log(n)
    if(n === true){
      alert(`${newPerson.name} already added to phonebook`)
    } else{
      personservice
        .newPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handlenumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handlenameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlesearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const filteredlist = persons.filter(person => {
    console.log(person)
    return person.name.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter search={search} onChange={handlesearchChange}/>
      </div>
      <h2>add a new</h2>
      <PersonForm onSubmit={addnewInput} value1={newName} onChange1={handlenameChange}
      onChange2={handlenumberChange} value2={newNumber}/>
      <h2>Numbers</h2>
      <ul>
      <Person filteredlist={filteredlist} persons={persons} setPersons={setPersons}/>
      </ul>
    </div>
  )
}


export default App
