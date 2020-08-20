import React from 'react'

const Language = ({ language }) => <li>{language.name}</li>

const Country = ({ country }) => <p>{country.name}</p>

const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      {country.languages.map(language =>
        <Language key={language.name} language={language} />
      )}
      <img src={country.flag} alt="flag" height="100" width="100" />
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