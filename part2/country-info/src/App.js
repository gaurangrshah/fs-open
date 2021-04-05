import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ filteredCountries }) => {
  if (filteredCountries?.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  if (filteredCountries?.length > 10) {
    return <p>Too many matches! Please narrow your search criteria</p>;
  }

  return filteredCountries?.length < 10 && JSON.stringify(filteredCountries);
};

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country?.name}</h2>
      <p>capital: {country?.capital}</p>
      <p>population: {country?.population}</p>
      <h3>languages:</h3>
      <ul>
        {country?.languages?.map((lang) => (
          <li key={lang?.name}>{lang?.name}</li>
        ))}
      </ul>
      <img src={country.flag} width='150' />
      <Weather capital={country?.capital} />
    </div>
  );
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}&units=m`
      )
      .then((response) => {
        console.log(response?.data);
        setWeather(response?.data);
      });
  }, []);

  return (
    <div>
      <h2>Weather in {capital}</h2>
      {!weather && <div>Sorry No Forecast Available</div>}
      <p>
        <strong>temperature</strong> {weather?.current?.temperature} celcius
        <br />
        <img
          src={weather?.current?.weather_icons[0]}
          alt={weather?.current?.weather_descriptions[0]}
        />
      </p>
      <p>
        <strong>wind</strong> {weather?.current?.wind_speed} km/h direction{" "}
        <strong>{weather?.current?.wind_dir}</strong>
      </p>
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("promise fulfilled", response);
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => setFilter(e?.target?.value);

  const filterCountry = (country) => {
    return filter && country?.name.toLowerCase().includes(filter.toLowerCase());
  };
  const filteredCountries = countries.filter(filterCountry);

  return (
    <div className='App'>
      <input type='search' onChange={handleChange} />
      {!filter && <p>Please enter your search criteria</p>}

      {filter && <Countries filteredCountries={filteredCountries} />}
    </div>
  );
}

export default App;
