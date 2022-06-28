import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = ({ match }) => {
  //const [singleMatch] = match
  const capital = match.map(country => country.capital)
  const area = match.map(country => country.area)
  let languages  = match.map(country => country.languages)
  languages = Object.values(...languages)
  const flagUrl =  match.map(country => country.flags.png)

  return (
    <>
    <h1>{match.map(country => country.name.common)}</h1>
    <p>{capital}</p>
    <p>{area}</p>
    <h2>languages: </h2>
    <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={flagUrl}></img>
    </>
  )
}

const Search = ({ countries, searchName }) => {
  const matches = countries
                    .filter(country => country.name.common
                                              .toLowerCase()
                                              .includes(searchName
                                                          .toLowerCase()
                                              )
                    )
  console.log(matches)

  if (matches.length > 10) {
    return <p>Too many matches, specify another filer</p>
  }

  if (matches.length === 1) {
    return <CountryView match={matches} />
  }

  return (
    <>
      {matches.map(country => <p key={country.name.common}>{country.name.common}</p>)}
    </>
  )
}

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const endpoint = 'https://restcountries.com/v3.1/all'

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }
  
  useEffect(() => {
    axios
      .get(endpoint)
      .then(response => response.data)
      .then(returnedCountries => {
        setCountries(returnedCountries)
        console.log(returnedCountries)
      })
  }, [])

  return (
    <div>
      find countries 
      <input value={searchName} 
        onChange={handleSearchChange}
      />
      <Search countries={countries} searchName={searchName} />  
    </div>
  )
}

export default App;
