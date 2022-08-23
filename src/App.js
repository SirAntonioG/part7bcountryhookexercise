import { useState, useEffect } from "react";
import axios from "axios";
import FinderCountries from "./components/FinderCountries";
import CountriesFound from "./components/CountriesFound";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryToFind, setCountryToFind] = useState("");
  const [countriesFound, setCountriesFound] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handlerFinderChange = (event) => {
    setCountryToFind(event.target.value);
    if (event.target.value === "") {
      setCountriesFound([]);
    } else {
      const regexp = new RegExp(event.target.value, "i");
      const countriesAux = countries.filter((item) =>
        regexp.test(item.name.common)
      );
      setCountriesFound(countriesAux);
    }
  };

  const buttonClick = (item) => {
    setCountriesFound([item]);
  };

  return (
    <>
      <FinderCountries value={countryToFind} onChange={handlerFinderChange} />
      <div>
        <CountriesFound countries={countriesFound} onClick={buttonClick} />
      </div>
    </>
  );
}

export default App;
