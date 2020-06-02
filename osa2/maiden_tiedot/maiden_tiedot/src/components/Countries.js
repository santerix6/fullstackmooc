import React from 'react'
import Info from './Info'

const Countries = (props) =>{
  const handleClick = (x) =>{
    console.log(x)
    props.setSearch(x.name)
  }
  if(props.filteredlist.length >10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  } if(props.filteredlist.length ===1){
    return <Info country={props.filteredlist[0]}/>
  }
  else{
    return (<div>
    {props.filteredlist.map((country) => {
      return ( <div key={country.name}><p >{country.name} 
         <button key={country.name} value={country} onClick={() => handleClick(country)}>show</button></p>
         </div> )
    })}
    </div>)
  }

}
export default Countries
