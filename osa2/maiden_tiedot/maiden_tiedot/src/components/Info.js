import React from 'react'

const Info = (props) => {
  return(
    <div>
    <h1>{props.country.name}</h1>
    <p>capital: {props.country.capital}</p>
    <p>population: {props.country.population}</p>
    <h3>languages</h3>
    <ul>
    {props.country.languages.map((language) => {
      return <li key={language.name}>{language.name}</li>
    })}
    </ul>
    <div>
      <img src={props.country.flag} alt='Flowers' ></img>
    </div>
    </div>
  )
}
export default Info
