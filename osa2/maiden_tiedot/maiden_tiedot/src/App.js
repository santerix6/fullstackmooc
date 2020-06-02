import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import Countries from'./components/Countries'
import './App.css';
import axios from 'axios'
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    console.log('aping')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('api gotten')
        setCountries(response.data)
      })
  }, [])
  console.log(countries)
  const handlesearchChange = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const filteredlist = countries.filter(country => {
    return country.name.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <div>
    <div>
        <Filter search={search} onChange={handlesearchChange} />
    </div>
    <div>
        <Countries filteredlist={filteredlist}/>
    </div>
    </div>
  )
}

export default App;
