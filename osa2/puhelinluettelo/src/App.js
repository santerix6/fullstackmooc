import React, { useState } from 'react'

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
      <form>
      <div>
        filter shown with <input value={search}onChange={handlesearchChange}/>
      </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addnewInput}>
        <div>
          name: <input value={newName} onChange={handlenameChange}/> <br/>
          number: <input value={newNumber} onChange={handlenumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {filteredlist.map((person, i) => {
        return <Person key={person.name} person={person}/>
      })}
      </ul>
    </div>
  )
}
const Person = (props) => {
  return <li>{props.person.name} {props.person.number}</li>
}

export default App
