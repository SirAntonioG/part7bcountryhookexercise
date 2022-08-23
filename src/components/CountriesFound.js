import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const CountriesFound = ({ countries, onClick }) => {
  const [weather, setWeather] = useState({});

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${countries[0].latlng[0]}&lon=${countries[0].latlng[1]}&appid=${apiKey}`
        )
        .then((res) => {
          const dataWeather = {
            temperature: (res.data.main.temp - 273.15).toFixed(2),
            wind: res.data.wind.speed,
            icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
          };
          setWeather(dataWeather);
        });
    }
  }, [apiKey, countries]);

  if (countries.length === 1) {
    console.log("weather", weather);

    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <p>
          Capital: {countries[0].capital[0]} <br />
          Area: {countries[0].area}
        </p>
        <h3>Languajes</h3>
        <ul>
          {Object.values(countries[0].languages).map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <img src={countries[0].flags.png} alt="" />
        <h3>Weather in {countries[0].capital[0]}</h3>
        <p>Temperature: {weather.temperature} Celcius</p>
        <img src={weather.icon} alt="" />
        <p>Wind: {weather.wind} m/s</p>
      </div>
    );
  } else if (countries.length > 10) {
    return (
      <>
        <div>
          <p>"Too many matches, specify another filter"</p>
        </div>
      </>
    );
  } else if (countries.length <= 10) {
    return (
      <div>
        {countries.map((item, i) => (
          <div key={i}>
            <span>{item.name.common}</span>
            <button onClick={(e) => onClick(item)}>show</button>
          </div>
        ))}
      </div>
    );
  }
};

export default CountriesFound;
