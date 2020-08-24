import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Language = ({ language }) => <li>{language.name}</li>

const Country = ({ country }) => {

  const [showCountryDetail, setShowCountryDetail] = useState(false)

  if (showCountryDetail)
    return (
      <>
      <p>{country.name} <button onClick={() => setShowCountryDetail(false)}>hide</button></p>
      <CountryDetail country={country} />
      </>
    )
  else
    return (
      <>
        <p>{country.name} <button onClick={() => setShowCountryDetail(true)}>show</button></p>
      </>
    )
}

const CountryDetail = ({ country }) => {

  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: api_key,
          query: country.capital
        }
      })
      .then(response => {
        setWeather(response.data.current)
      })
  }, [country.capital])

  return (
    <>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Spoken languages</h3>
      {country.languages.map(language =>
        <Language key={language.name} language={language} />
      )}
      <img src={country.flag} alt="flag" height="100" width="100" />
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature:</b> {weather.temperature} Celcius</p>
      <img src={weather.weather_icons} alt="weather" height="70" width="70" />
      <p><b>{weather.weather_descriptions}:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </>
  )
}

const Countries = (props) => {
  let country_num = props.filterCountries.length
  if (country_num > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (country_num !== 1) {
    return (
      <>
        {props.filterCountries.map(country =>
          <Country key={country.name} country={country} />
        )}
      </>
    )
  } else {
    return (<><CountryDetail country={props.filterCountries[0]} /></>)
  }

}

export default Countries