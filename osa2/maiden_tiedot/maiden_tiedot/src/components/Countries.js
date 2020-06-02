import React from 'react'


const Countries = (props) =>{
  if(props.filteredlist.length >10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  } if(props.filteredlist.length ===1){
    return(
      <div>
      <h1>{props.filteredlist[0].name}</h1>
      <p>capital: {props.filteredlist[0].capital}</p>
      <p>population: {props.filteredlist[0].population}</p>
      <h3>languages</h3>
      <ul>
      {props.filteredlist[0].languages.map((language) => {
        return <li key={language.name}>{language.name}</li>
      })}
      </ul>
      <div>
        <img src={props.filteredlist[0].flag} alt='Flowers' ></img>
      </div>
      </div>
    )
  }
  else{
    return (<div>

    {props.filteredlist.map((country) => {

      return ( <li key={country.name}>{country.name} {props.filteredlist.length}</li>)
    })}</div>)
  }

}
export default Countries
