import React , {useState, useEffect} from 'react'
import axios from 'axios'



const Info = (props) => {
  const api_key = '60abfb70a19f3e5d9ad07658ea586af1'
  const [weather, setWeather] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    console.log('apingweather')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.country.capital}`)
      .then(response => {
        console.log('api gotten')
        console.log(response.data, 1)
        console.log(response.data, 2)
        setWeather(response.data)
        setIsLoading(false)
      }).catch(error => {
        console.log(error)
      })
  }, [])
  console.log(weather.current)
  if(isLoading === true){
    return(
      <h1> API still loading </h1>
    )
  } else{
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
        <div>
          <h3>Weather in {props.country.capital}</h3>
          <p>temperature: {weather.current.temperature} celsius</p>
          <img src={weather.current.weather_icons[0]} alt='weather icon'></img>
          <p>wind: {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
        </div>
      </div>
    )
  }

}
export default Info
