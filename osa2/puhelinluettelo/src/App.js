import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
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
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
      <Person filteredlist={filteredlist} />
      </ul>
    </div>
  )
}


export default App
