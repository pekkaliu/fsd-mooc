import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Content = ({countries, handleShow}) => 
  countries.length === 1 ? 
    <Country country={countries[0]} />
    :
    <CountryList countries={countries} handleShow={handleShow} />


const CountryList = ({countries, handleShow}) => 
  countries.map(country => 
    <div key={country.area}> 
      {country.name} <button value={country.name} onClick={handleShow} >show</button>
    </div>
  )

const Country = ({country}) =>
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <Languages languages={country.languages} />
    <div><img alt="flag" src={country.flag} width="200" height="100"/></div>
    <h2>Weather in {country.name}</h2>
    <Weather capital={country.capital} />
  </div>

const Languages = ({languages}) => 
  <div>
    <h3>languages</h3>
    <ul>
      {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
    </ul>
  </div>

const Weather = ({capital}) => {
    const [weather, setWeather] = useState([])
    const weatherHook = () => {
      axios
        .get(`http://api.apixu.com/v1/current.json?key=<api-key>&q=${capital}`)
        .then(response => setWeather(response.data) )
      }
    useEffect(weatherHook, [])
    
    return weather.current ? 
      <div>
        <p><b>temperature</b> {weather.current ? weather.current.temp_c : ""} Celsius</p>
        <p><img alt="weather icon" src={`http:${weather.current.condition.icon}`} /></p>
        <p><b>wind</b> {weather.current.wind_kph} kph, direction {weather.current.wind_dir}</p>
      </div> 
      : <></>
  }

function App() {
  const [searchWord, setSearchWord] = useState('')
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleSearch = (event) => {
    setSearchWord(event.target.value)
  }
  const filterCallback = (country) => RegExp(searchWord, 'i').test(country.name)
  const countriesToShow = countries.filter(filterCallback)
 
  return (
    <div className="App">
      <h2>Maiden tiedot</h2>
      <div>find countries: <input value={searchWord} onChange={handleSearch}/></div>
      { countriesToShow.length > 10 ?
          <p>Too many matches, specify another filter</p>
          :
          <Content countries={countriesToShow} handleShow={handleSearch} />
      }
    </div>
  );
}

export default App;
