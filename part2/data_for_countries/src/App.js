import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';
import Filter from './components/Filter'
import Countries from './components/Countries'

function App() {
  const [filterValue, setFilterValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log(response)
        setCountries(response.data)
      })
  }, [])

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value)
  }

  const filterCountries = countries.filter(country => country.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)

  return (
    <div>
      <Filter filterValue={filterValue} handleFilterValueChange={handleFilterValueChange} />
      <Countries filterCountries={filterCountries}/>
    </div>
  );
}

export default App;
