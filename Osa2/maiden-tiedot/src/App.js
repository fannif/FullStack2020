import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
    const [countries, setCountries] = useState([])
    const [weathers, setWeathers] = useState([])
    const [ newSearch, setNewSearch ] = useState('')

    // HUOM! Weatherstack tarvitsee api keyta toimiakseen.
    // Niinpä tälle ACCESS_KEY:lle on asetettava arvoksi oma
    // api key, tai muuten ei toimi.
    const ACCESS_KEY = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
          .get('https://restcountries.eu/rest/v2/all').then(response => {
            setCountries(response.data)
          })
      }, [])

    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newSearch.toLowerCase()))

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        if (weathers.length === 0) {
            axios
            .get(`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${country.capital}`)
            .then(response => {
            setWeathers(response.data.current)
            })
        }
        return (
            <div>
                <Filter newSearch = {newSearch} handleSearchChange = {handleSearchChange} />
                <CountryInfo country = {country} weathers = {weathers} />
            </div>
        )
    }

    return (
        <div>
            <Filter newSearch = {newSearch} handleSearchChange = {handleSearchChange} />
            <CountryView countries = {countriesToShow} show = {setNewSearch} weathers = {weathers} />
        </div>
    )
}  

const CountryView = (props) => {
    if (props.countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }
    return (
        <Countries countries = {props.countries} show = {props.show} />
    )
}

const Filter = (props) => {
    return (
        <div>Find countries <input value = {props.newSearch} onChange = {props.handleSearchChange} /></div>
    )
}

const CountryInfo = (props) => {
    return (
        <div>
          <h2>{props.country.name}</h2>
          <div>Capital: {props.country.capital}</div>
          <div>Population: {props.country.population}</div>
          <h3>Languages</h3>
          <ul>
            {props.country.languages.map(language => <li key = {language.name}>{language.name}</li>)}
          </ul>
          <img src = {props.country.flag} alt = 'flag' width = '20%' height = '20%' />
          <h3>Weather in {props.country.capital}</h3>
          <div><strong>Temperature:</strong> {props.weathers.temperature} Celsius </div>
          <img src = {props.weathers.weather_icons} alt = "weather icon" />
          <div><strong>Wind:</strong> {props.weathers.wind_speed} mph in direction {props.weathers.wind_dir}</div>
        </div>
    )
}

const Country = (props) => {
    return (
      <div>
          {props.country.name} 
          <button onClick={() => props.show(props.country.name)}>show</button>
      </div>
    )
}

const Countries = (props) => {
    return (
      <div>
          {props.countries.map(country => <Country key={country.name} country = {country} show = {props.show} />)}
      </div>
    )
}

export default App