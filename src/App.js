import { useEffect, useState } from "react";
import axios from "axios";
import { apikey, baseURL } from "./data/constants";

import WeatherDetailsCard from "./components/WeatherDetailsCard";
import Homepage from "./components/Homepage";

function App() {
  const [currentWeather, setCurrentWeather] = useState("");
  const [singleLocation, setSingleLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = async (e) => {
    const city = e.target.elements.city.value;
    e.preventDefault();

    if (city === "") {
      setError(true);
      setSingleLocation("");
    } else {
      try {
        const loc_url = `${baseURL}/locations/v1/search?apikey=${apikey}&q=${city}`;
        const res = await axios.get(loc_url);
        const cities = await res.data;
        if (!cities.length) {
          setError(true);
          setSingleLocation("");
        } else {
          setIsLoading(true);
          getMoreInfo(cities[0]);
        }
      } catch (err) {
        alert(err);
      }
    }
    e.target.elements.city.value = "";
  };

  const getMoreInfo = async (location) => {
    if (location) {
      try {
        const url = `${baseURL}/currentconditions/v1/${location.Key}?apikey=${apikey}`;
        const res = await axios.get(url);
        const locations = await res.data;
        setCurrentWeather(locations);
        setSingleLocation(location);
      } catch (err) {
        alert(err);
      }
    }
  };
  useEffect(() => {
    setIsLoading("");
    setError("");
  }, [singleLocation]);

  return (
    <>
      <div className="main">
        <Homepage cityName={getData} />

        <div>{isLoading ? "It's loading...." : null}</div>

        {currentWeather && singleLocation ? (
          <WeatherDetailsCard
            currentWeather={currentWeather}
            singleLocation={singleLocation}
          />
        ) : null}
        <div>{error ? "Please, enter a valid city name..." : null}</div>
      </div>
    </>
  );
}

export default App;
