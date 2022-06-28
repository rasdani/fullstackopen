import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = ({ match, getWeather }) => {
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

const Weather = ({ match , getWeather }) => {
  const capital = match.map(country => country.capital)
  const capitalInfo = match.map(country => country.capitalInfo)
  const latlng = Object.values(...capitalInfo)
  const latlngString = latlng.map(latlng => latlng,toString().split(","))
  const [latlon, ...rest] = latlngString
  const [lat, lon] = latlon
  useEffect(() => {
    getWeather(lat, lon)
  }, [])

  return (
    <>
    <h1>Weather in {capital}</h1>
    <p>
    </p>
    </>
  )
}

const RenderWeather = ({ weather }) => {
  if (weather.length !== 0) {
    const temp = weather['main']['temp']
    const wind = weather['wind']['speed']
    const icon = weather['weather'].map(weather => weather.icon)
    return (
      <>
      <p> temperature {temp} Celsius</p>
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
      <p> wind {wind} m/s</p>
      </>
    )
  }
}

const Search = ({ countries, searchName , onClick, getWeather , getWeatherState, weather}) => {
  const matches = countries
                    .filter(country => country.name.common
                                              .toLowerCase()
                                              .includes(searchName
                                                          .toLowerCase()
                                              )
                    )

  if (matches.length > 10) {
    return <p>Too many matches, specify another filer</p>
  }

  if (matches.length === 1) {
    return (
      <>
      <CountryView match={matches} getWeather={getWeather} />
      <Weather match={matches} getWeather={getWeather} />
      <RenderWeather weather={weather} />
      </>
    )
  }
  

  return (
    <>
      {matches.map(country => 
        <p key={country.name.common}>
        {country.name.common} 
        <button id={country.name.common} 
                onClick={event => onClick(event)}>
        show
        </button>
        </p>)
      }
    </>
  )
}

const App = () => {
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState([])
  const [weather , setWeather] = useState([])
  const endpoint = 'https://restcountries.com/v3.1/all'
  const api_key = process.env.REACT_APP_API_KEY
  const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const weatherAppId = `&units=metric&APPID=${api_key}`

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }
  const handleShowButton = (event) => {
    setSearchName(event.target.id)
  }
  
  useEffect(() => {
    axios
      .get(endpoint)
      .then(response => response.data)
      .then(returnedCountries => {
        setCountries(returnedCountries)
      })
  }, [])

  const getWeather = (lat, lon) => {
    const weatherEndpoint = `${weatherBaseUrl}?lat=${lat}&lon=${lon}${weatherAppId}`
    axios
      .get(weatherEndpoint)
      .then(response => {
        setWeather(response.data)
      })
  }

  return (
    <div>
      find countries 
      <input value={searchName} 
        onChange={handleSearchChange}
      />
      <Search countries={countries} searchName={searchName} onClick={handleShowButton} getWeather={getWeather} weather={weather} />
    </div>
  )
}

export default App;
