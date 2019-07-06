import React, {useState, useEffect} from 'react';

const CountryInfo = ({country}) => {

  return (
    <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital} <br></br>
          population: {country.population}
        </p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="flag"></img>
      </div>
  )
}

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
    setCountry(countries.filter(country => country.name.toLowerCase().includes(filter)))
  }

  const fetchHook = () => {
    const url = "https://restcountries.eu/rest/v2/all"
    
    fetch(url)
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err))
  }

  const showInfo = () => {

    if (country.length > 10) {
      return "Too many matches, specify another filter"
    } else if (country.length > 1) {
      return country.map((land, index) => {
        return (
          <div key={land.name}>
            <p >{land.name}</p>
            <button  onClick={() => setCountry([country[index]])}>show</button>
          </div>
        )
      })
    } else if (country.length === 1) {
      return <CountryInfo country={country[0]} />
    }
  }

  useEffect(fetchHook, [])

  return (
    <div>
      <label>Find countries: 
        <input type="text" name="search" value={filter} onChange={handleFilter} />
      </label>
      <div>
        {showInfo()}
      </div>
    </div>
  );
}

export default App;
